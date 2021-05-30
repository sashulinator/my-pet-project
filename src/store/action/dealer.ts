import { REDUX_API_MIDDLEWARE as type, APIAction, OnSuccess } from '@savchenko91/rc-redux-api-mw'

import { Action } from '@/type/type.d'
import { DealerState } from '@/type/state.d'

import * as CONSTANTS from '../constant/dealer'

export const set = (payload: Partial<DealerState>): Action => ({
  type: CONSTANTS.SET,
  payload,
})

export const getCurrent = (onSuccess?: OnSuccess): APIAction => {
  return {
    type,
    method: 'get',
    url: `/api/dealers/current`,
    stageActionTypes: CONSTANTS.GET_CURRENT,
    onSuccess,
  }
}
