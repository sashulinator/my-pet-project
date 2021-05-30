import { REDUX_API_MIDDLEWARE as type, APIAction, OnSuccess } from '@savchenko91/rc-redux-api-mw'

import { TelematicHistoryState } from '@/type/state'
import { Action, Period } from '@/type/type'
import { Id, TelematicHistoryModel } from '@/type/model'

import * as CONSTANTS from '../constant/telematicHistory'

// ------------------------------------
// Set
// ------------------------------------

export const set = (payload: Partial<TelematicHistoryState>): Action => ({
  type: CONSTANTS.SET,
  payload,
})

// ------------------------------------
// Get
// ------------------------------------

export type GetOneProps = {
  carUuid: Id
  body: {
    [k in keyof TelematicHistoryModel]: Period
  }
}

export const getOne = ({ carUuid, body }: GetOneProps, onSuccess?: OnSuccess): APIAction => {
  return {
    type,
    stageActionTypes: CONSTANTS.GET_ONE,
    url: `/api/telematics-records/${carUuid}`,
    method: 'post',
    onSuccess,
    body,
  }
}
