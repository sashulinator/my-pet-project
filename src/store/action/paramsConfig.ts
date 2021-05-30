import qs from 'qs'

import { REDUX_API_MIDDLEWARE as type, APIAction } from '@savchenko91/rc-redux-api-mw'

import { OnStage } from '@/type/transfer.d'
import { PageableRow, Action } from '@/type/type.d'
import { Content, ParamsConfigModel, Id } from '@/type/model'
import { ParamsConfigState, RootState } from '@/type/state'

import * as CONSTANTS from '../constant/paramsConfig'

export const set = (payload: Partial<ParamsConfigState>): Action => ({
  type: CONSTANTS.SET,
  payload,
})

export const get = (id: Id, onStage?: OnStage<ParamsConfigModel>): APIAction<ParamsConfigModel> => {
  return {
    type,
    stageActionTypes: CONSTANTS.GET,
    url: `/api/params-config/${id}`,
    method: 'get',
    ...onStage,
  }
}
type GetListFilter = PageableRow & { isActive?: boolean }

export const getList = (
  query: GetListFilter = { size: 1000, page: 0, isActive: true },
  onStage?: OnStage<Content<ParamsConfigModel[]>>,
): APIAction<Content<ParamsConfigModel[]>> => {
  return {
    type,
    stageActionTypes: CONSTANTS.GET_LIST,
    url: `/api/params-config${qs.stringify(query, { skipNulls: true, addQueryPrefix: true })}`,
    method: 'get',
    ...onStage,
  }
}

export const refreshList = (
  query: GetListFilter = { size: 1000, page: 0, isActive: true },
  onStage?: OnStage<Content<ParamsConfigModel[]>>,
): APIAction<Content<ParamsConfigModel[]>> => {
  return {
    type,
    stageActionTypes: CONSTANTS.REFRESH_LIST,
    url: `/api/params-config${qs.stringify(query, { skipNulls: true, addQueryPrefix: true })}`,
    method: 'get',
    ...onStage,
  }
}

export const refreshFullActiveList = (
  onStage?: OnStage<Content<ParamsConfigModel[]>>,
): APIAction<Content<ParamsConfigModel[]>> => {
  const query = { page: 0, size: 10_000, isActive: true }

  return {
    type,
    stageActionTypes: CONSTANTS.REFRESH_FULL_ACTIVE_LIST,
    url: `/api/params-config${qs.stringify(query, { skipNulls: true, addQueryPrefix: true })}`,
    method: 'get',
    ...onStage,
  }
}

export const create = (body: Partial<ParamsConfigState>, onStage: OnStage): APIAction => {
  return {
    type,
    stageActionTypes: CONSTANTS.CREATE,
    url: '/api/params-config',
    method: 'post',
    body,
    ...onStage,
  }
}

export const update = (body: Partial<ParamsConfigModel>, onStage: OnStage): APIAction => ({
  type,
  stageActionTypes: CONSTANTS.UPDATE,
  url: `/api/params-config/${body.id}`,
  body,
  method: 'put',
  ...onStage,
})

export const updateAlsoLocaly = (body: ParamsConfigModel, onStage: OnStage): APIAction => ({
  type,
  stageActionTypes: CONSTANTS.UPDATE,
  url: `/api/params-config/${body.id}`,
  body,
  method: 'put',
  onSuccess(args) {
    const { store } = args

    const { list } = (store.getState() as RootState).paramsConfigState

    store.dispatch(set({ list: list.map((i) => (i.id.toString() === body.id.toString() ? body : i)) }))

    onStage?.onSuccess?.(args)
  },
})
