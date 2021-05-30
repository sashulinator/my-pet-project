import qs from 'qs'

import { REDUX_API_MIDDLEWARE as type, APIAction } from '@savchenko91/rc-redux-api-mw'

import { Content, TicketModel } from '@/type/model'
import { ClientState } from '@/type/state'
import { Action } from '@/type/type.d'
import { OnStage } from '@/type/transfer'

import * as CONSTANTS from '../constant/ticket'

export const get = (id: string): APIAction => ({
  type,
  stageActionTypes: CONSTANTS.GET,
  url: `/api/tickets/${id}`,
  method: 'get',
})

type QueryGetList = {
  page: number
  size: number
}

export const getList = (
  query: QueryGetList,
  onStage: OnStage<Content<TicketModel[]>>,
): APIAction<Content<TicketModel[]>> => {
  return {
    type,
    stageActionTypes: CONSTANTS.GET_LIST,
    url: `/api/tickets${qs.stringify(query, { skipNulls: true, addQueryPrefix: true })}`,
    method: 'get',
    ...onStage,
  }
}

export const set = (payload: Partial<ClientState>): Action => ({
  type: CONSTANTS.SET,
  payload,
})
