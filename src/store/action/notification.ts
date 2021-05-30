import qs from 'qs'

import { REDUX_API_MIDDLEWARE as type, APIAction, OnSuccess } from '@savchenko91/rc-redux-api-mw'

import { Action, PageableRow, PageableRowWithParams } from '@/type/type.d'
import { NotificationState } from '@/type/state'
import { Id } from '@/type/model'

import * as CONSTANTS from '../constant/notification'

export const set = (payload: Partial<NotificationState>): Action => ({
  type: CONSTANTS.SET,
  payload,
})

export const read = (id: Id, onSuccess: OnSuccess): APIAction => {
  return {
    type,
    stageActionTypes: CONSTANTS.READ,
    url: `/api/notifications/${id}`,
    method: 'PATCH',
    onSuccess,
    headers: {
      Accept: '*/*',
    },
  }
}

export const getList = (query: PageableRow): APIAction => {
  return {
    type,
    stageActionTypes: CONSTANTS.GET_LIST,
    url: `/api/notifications${qs.stringify(query, { skipNulls: true, addQueryPrefix: true })}`,
    method: 'get',
  }
}

export const getListByParams = (query: PageableRowWithParams): APIAction => {
  return {
    type,
    stageActionTypes: CONSTANTS.GET_LIST,
    url: `/api/notifications${qs.stringify(query, { skipNulls: true, addQueryPrefix: true })}`,
    method: 'get',
  }
}

export const getNewestList = (): APIAction => {
  return {
    type,
    stageActionTypes: CONSTANTS.GET_NEWEST_LIST,
    url: '/api/notifications',
    method: 'get',
  }
}

export const refreshList = (): APIAction => {
  return {
    type,
    stageActionTypes: CONSTANTS.GET_LIST,
    url: '/api/notifications',
    method: 'get',
  }
}
