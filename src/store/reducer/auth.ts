import { StageAction } from '@savchenko91/rc-redux-api-mw'

import { combine } from '@/util/combine'
import { AuthState } from '@/type/state'

import { TokenResponseBody } from '../action/auth'
import * as CONSTANTS from '../constant/auth'

const initialState = {
  loading: {
    logging: false,
  },
}

export default combine(initialState, getCard)

function getCard(state: AuthState, action: StageAction<TokenResponseBody>): AuthState | void {
  switch (action.type) {
    case CONSTANTS.LOGIN?.START:
      return {
        ...state,

        loading: {
          ...state.loading,
          logging: true,
        },
      }
    case CONSTANTS.LOGIN?.FAIL:
      return {
        ...state,

        loading: {
          ...state.loading,
          logging: false,
        },
      }
    case CONSTANTS.LOGIN?.SUCCESS:
      return {
        ...state,

        loading: {
          ...state.loading,
          logging: false,
        },
      }
  }
}
