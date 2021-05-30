// import { MailingHistoryState } from '@/type/state.d'

import { ReducerManager } from '@/util/reducerManager'

import * as CONSTANTS from '../constant/paramsConfig'

const reducerManager = new ReducerManager(
  CONSTANTS,
  {
    filter: {
      isActive: true,
    },
    fullActiveList: [],
    loading: {
      refreshFullActiveList: false,
    },
  },
  [
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function getFullActiveList(state: any, action: any) {
      switch (action.type) {
        case CONSTANTS.REFRESH_FULL_ACTIVE_LIST?.START:
          return {
            ...state,

            loading: {
              ...state.loading,
              refreshFullActiveList: true,
            },

            error: '',
          }
        case CONSTANTS.REFRESH_FULL_ACTIVE_LIST?.FAIL:
          return {
            ...state,

            loading: {
              ...state.loading,
              refreshFullActiveList: false,
            },

            error: action.payload?.body?.error || '',
          }
        case CONSTANTS.REFRESH_FULL_ACTIVE_LIST?.SUCCESS:
          return {
            ...state,

            loading: {
              ...state.loading,
              refreshFullActiveList: false,
            },

            error: '',

            fullActiveList: action.payload.body?.content,
          }
      }
    },
  ],
)

export default reducerManager.reduce
