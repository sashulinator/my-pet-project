// import MailingHistoryMock from '@/mock/mailingHistory'
import qs from 'qs'

import { REDUX_API_MIDDLEWARE as type, APIAction } from '@savchenko91/rc-redux-api-mw'

import { Content, MailingTemplateModel } from '@/type/model'
import { MailingTemplateState } from '@/type/state'
import { PageableRow, Action } from '@/type/type'
import { OnStage } from '@/type/transfer'

import * as CONSTANTS from '../constant/mailingHistory'

export const set = (payload: Partial<MailingTemplateState>): Action => ({
  type: CONSTANTS.SET,
  payload,
})

export const getList = (
  query: PageableRow,
  onStage?: OnStage<Content<MailingTemplateModel[]>>,
): APIAction<Content<MailingTemplateModel[]>> => {
  return {
    type,
    stageActionTypes: CONSTANTS.GET_LIST,
    url: `/api/mailing-history${qs.stringify(query, { addQueryPrefix: true })}`,
    method: 'get',
    ...onStage,
  }
}
