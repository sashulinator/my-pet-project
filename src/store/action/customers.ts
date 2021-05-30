/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { REDUX_API_MIDDLEWARE as type, APIAction, OnFail, OnStart, OnSuccess } from '@savchenko91/rc-redux-api-mw'

import { Content, ClientModel, Id } from '@/type/model'
import { ClientFilter, ClientState, RootState } from '@/type/state'
import { Action } from '@/type/type.d'

import { customerFilter } from '@/fakeResponse/customers'
import fakeResponse from '@/fakeResponse'
import * as CONSTANTS from '../constant/client'

type OnStage<ResponseBody = unknown, RequestBody = unknown, Payload = unknown> = {
  onStart: OnStart<ResponseBody, RequestBody, Payload>
  onSuccess: OnSuccess<ResponseBody, RequestBody, Payload>
  onFail: OnFail<ResponseBody, RequestBody, Payload>
}

export const set = (payload: Partial<ClientState>): Action => ({
  type: CONSTANTS.SET,
  payload,
})

export const get = (id: string): APIAction => ({
  type,
  stageActionTypes: CONSTANTS.GET,
  url: `/api/customer/${id}`,
  method: 'get',
})

export const getList = (
  query: ClientState['filter'],
  onStage?: OnStage<Content<ClientModel[]>, ClientFilter>,
): APIAction<Content<ClientModel[]>, ClientFilter> => {
  return {
    fakeResponse: fakeResponse(customerFilter(query)),
    stageActionTypes: CONSTANTS.GET_LIST,
    url: `/api/customers`,
    method: 'get',
    type,
    ...onStage,
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const update = (body: ClientModel, onStage: any): APIAction => {
  return {
    type,
    stageActionTypes: CONSTANTS.PUT_CLINT,
    url: `/api/customers/${body.id}`,
    method: 'put',
    body,
    onSuccess(args) {
      const { store } = args
      const { list } = (store.getState() as RootState).clientState

      store.dispatch(set({ list: list.map((i) => (i.id.toString() === body.id.toString() ? body : i)) }))
      onStage?.onSuccess?.(args)
    },
    onFail: onStage.onFail,
  }
}

export const getCarList = (id: Id, onStage?: OnStage<Content<ClientModel[]>>): APIAction<Content<ClientModel[]>> => {
  return {
    type,
    stageActionTypes: CONSTANTS.GET_CAR_LIST,
    url: `/api/customers/${id}/cars`,
    method: 'get',
    payload: id,
    ...onStage,
  }
}
