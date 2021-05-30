import { Action } from '@/type/type.d'

import { TelematicRecordState } from '@/type/state'

import * as CONSTANTS from '../constant/telematicRecord'

// eslint-disable-next-line import/prefer-default-export
export const set = (payload: Partial<TelematicRecordState>): Action => ({
  type: CONSTANTS.SET,
  payload,
})
