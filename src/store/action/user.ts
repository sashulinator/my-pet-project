import { REDUX_API_MIDDLEWARE as type, APIAction, OnFail, OnSuccess } from '@savchenko91/rc-redux-api-mw'

import fakeResponse from '@/fakeResponse'
import { usersFilter } from '@/fakeResponse/user'
import { Content, Id, UserModel } from '@/type/model.d'
import { Action, PageableRow } from '@/type/type'
import { OnStage } from '@/type/transfer'

import * as CONSTANTS from '../constant/user'

export const get = (id: string): APIAction => ({
  type,
  stageActionTypes: CONSTANTS.GET,
  url: `/api/users/${id}`,
  method: 'get',
})

export const getCurrent = (onSuccess?: OnSuccess): APIAction => ({
  type,
  stageActionTypes: CONSTANTS.GET,
  url: `/api/users/current`,
  method: 'get',
  onSuccess,
})

export const toggleActive = (
  id: Id,
  action: 'block' | 'enable',
  onSuccess?: OnSuccess,
  onFail?: OnFail,
): APIAction => ({
  type,
  stageActionTypes: CONSTANTS.TOGGLE_ACTIVE,
  url: `/api/users/block/${action}/${id}`,
  method: 'PATCH',
  onSuccess,
  onFail,
  headers: {
    Accept: '*/*',
  },
})

export const getList = (
  query: PageableRow,
  onStage?: OnStage<Content<UserModel[]>>,
): APIAction<Content<UserModel[]>> => {
  return {
    fakeResponse: fakeResponse(usersFilter(query)),
    stageActionTypes: CONSTANTS.GET_LIST,
    url: `/api/users`,
    method: 'get',
    type,
    query,
    ...onStage,
  }
}

export const set = (payload: unknown): Action => ({
  type: CONSTANTS.SET,
  payload,
})
