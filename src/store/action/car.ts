import qs from 'qs'
import { REDUX_API_MIDDLEWARE as type, APIAction } from '@savchenko91/rc-redux-api-mw'

import { Action } from '@/type/type.d'
import { OnStage } from '@/type/transfer'
import { CarModel, Content, Id } from '@/type/model'
import { CarFilter, CarState } from '@/type/state'

import * as CONSTANTS from '../constant/car'

export const set = (payload: Partial<CarState>): Action => ({
  type: CONSTANTS.SET,
  payload,
})

export const get = (id: string): APIAction => ({
  type,
  stageActionTypes: CONSTANTS.GET,
  url: `/api/cars/${id}`,
  method: 'get',
})

export const getCard = (uuid: Id, onStage?: OnStage): APIAction => {
  return {
    type,
    stageActionTypes: CONSTANTS.GET_CARD,
    url: `/api/cars/${uuid}/telematics`,
    method: 'get',
    ...onStage,
  }
}

export const getList = (
  requestFilter: CarState['filter'],
  onStage?: OnStage<Content<CarModel[]>, CarFilter>,
): APIAction<Content<CarModel[]>, CarFilter> => {
  const { page, size, ...body } = requestFilter

  return {
    type,
    stageActionTypes: CONSTANTS.GET_LIST,
    url: `/api/cars${qs.stringify({ page, size }, { skipNulls: true, addQueryPrefix: true })}`,
    method: 'post',
    body,
    ...onStage,
  }
}
