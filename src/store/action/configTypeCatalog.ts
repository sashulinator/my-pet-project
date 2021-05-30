import { REDUX_API_MIDDLEWARE as type, APIAction, OnSuccess } from '@savchenko91/rc-redux-api-mw'

import { Id } from '@/type/model'

import * as CONSTANTS from '../constant/configTypeCatalog'

const url = '/api/config-type-catalog'

// eslint-disable-next-line import/prefer-default-export
export const getList = (): APIAction => {
  return {
    method: 'GET',
    stageActionTypes: CONSTANTS.GET_LIST,
    url,
    type,
  }
}

type BodyRequestCreate = {
  name: string
}

type BodyResponseCreate = {
  id: Id
  name: string
}

export const create = (
  name: string,
  onSuccess: OnSuccess<BodyResponseCreate, BodyRequestCreate>,
): APIAction<BodyResponseCreate, BodyRequestCreate> => {
  return {
    method: 'POST',
    stageActionTypes: CONSTANTS.CREATE,
    body: { name },
    onSuccess,
    url,
    type,
  }
}
