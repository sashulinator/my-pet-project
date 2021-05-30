import qs from 'qs'

import { REDUX_API_MIDDLEWARE as type, APIAction } from '@savchenko91/rc-redux-api-mw'

import { Content, Id, MailingTemplateModel } from '@/type/model'

import { MailingTemplateState } from '@/type/state'
import { Action, OnStage, PageableRow } from '@/type/type.d'
import { replaceLocallyByIdAfterCRUD } from '@/util/reduxActions'

import * as CONSTANTS from '../constant/mailingTemplate'

export const set = (payload: Partial<MailingTemplateState>): Action => {
  return {
    type: CONSTANTS.SET,
    payload,
  }
}

export const getList = (
  query?: PageableRow,
  onStage?: OnStage<Content<MailingTemplateModel[]>>,
): APIAction<undefined, Content<MailingTemplateModel[]>> => {
  return {
    type,
    stageActionTypes: CONSTANTS.GET_LIST,
    url: `/api/mailing-templates${qs.stringify(query, { skipNulls: true, addQueryPrefix: true })}`,
    ...onStage,
  }
}

export const refreshList = (): APIAction => {
  return {
    type,
    stageActionTypes: CONSTANTS.REFRESH_LIST,
    url: '/api/mailing-templates',
  }
}

export const get = (id: string): APIAction => ({
  type,
  stageActionTypes: CONSTANTS.GET,
  url: `/api/mailing-templates/${id}`,
})

export const remove = (id: Id, onStage: OnStage): APIAction => ({
  type,
  stageActionTypes: CONSTANTS.UPDATE,
  url: `/api/mailing-templates/${id}`,
  method: 'DELETE',
  ...onStage,
})

export const create = (MailingTemplate: MailingTemplateModel, onStage: OnStage): APIAction => {
  return {
    type,
    stageActionTypes: CONSTANTS.CREATE,
    url: '/api/mailing-templates',
    method: 'POST',
    body: createCRUDBody(MailingTemplate),
    ...onStage,
  }
}

// '{"mailingType":"AUTOMATIC","isActive":true,"startDate":"2021-03-02T21:56:31.164Z","endDate":"2021-03-09T21:56:31.165Z","name":",mjnyuyukjn,mn","text":"kjnkjn","configIds":[1,3]}',

export const update = (MailingTemplate: MailingTemplateModel, onStage: OnStage): APIAction => ({
  type,
  stageActionTypes: CONSTANTS.UPDATE,
  url: `/api/mailing-templates/${MailingTemplate.id}`,
  body: createCRUDBody(MailingTemplate),
  method: 'put',
  payload: MailingTemplate,
  ...onStage,
  onSuccess: replaceLocallyByIdAfterCRUD('mailingTemplateState', set, onStage.onSuccess),
})

// ------------------------
// Helpers
// ------------------------

type MailingTemplatesCRUD = Omit<MailingTemplateModel, 'configs'> & { configIds: Id[] }

function createCRUDBody(MailingTemplate: MailingTemplateModel): MailingTemplatesCRUD {
  const { configs, ...MailingTemplatesCRUD } = MailingTemplate

  const configIds = configs?.map((ParamsConfig) => ParamsConfig.id) || []

  return { configIds, ...MailingTemplatesCRUD }
}
