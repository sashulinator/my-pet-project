import { MailingTemplateState } from '@/type/state.d'

import { ReducerManager } from '@/util/reducerManager'

import * as CONSTANTS from '../constant/mailingTemplate'

const initialState: Partial<MailingTemplateState> = {
  doNotAskOnRemove: false,
}

const reducerManager = new ReducerManager(CONSTANTS, initialState)

export default reducerManager.reduce
