import qs from 'qs'

import ROUTES from '@/constant/routes'

import history from '@/index/route/history'

import { ParamsConfigModel } from '@/type/model'

export function apply(NavigateParamsConfig: ParamsConfigModel): void {
  const isCar = NavigateParamsConfig.configType === 'CAR'

  const params = isCar ? NavigateParamsConfig.params?.carParams : NavigateParamsConfig.params?.clientParams

  const query = qs.stringify({ page: 0, size: 10, ...params }, { skipNulls: true, addQueryPrefix: true })

  const path = isCar ? ROUTES.SEARCH_CAR.PATH : ROUTES.SEARCH_CLIENT.PATH

  history.push(`${path}${query}`)
}
