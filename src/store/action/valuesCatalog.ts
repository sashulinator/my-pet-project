import { REDUX_API_MIDDLEWARE as type, APIAction } from '@savchenko91/rc-redux-api-mw'

import { GET } from '../constant/valuesCatalog'

export const getBrandModelIssueYear = (): APIAction => {
  return {
    type,
    method: 'get',
    url: `/api/values-catalog`,
    stageActionTypes: GET,
  }
}
