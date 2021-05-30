import { MailingHistoryState } from '@/type/state.d'

import { ReducerManager } from '@/util/reducerManager'

import * as CONSTANTS from '../constant/mailingHistory'

const initialState: Partial<MailingHistoryState> = {
  doNotAskOnRemove: false,
}

const reducerManager = new ReducerManager(CONSTANTS, initialState)

export default reducerManager.reduce
