import { ReducerManager } from '@/util/reducerManager'

import * as CONSTANTS from '../constant/notification'

const reducerManager = new ReducerManager(
  CONSTANTS,
  {
    newestList: [],
    loading: {
      newestList: false,
    },
  },
  [
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, func-names
    function getCarList(state: any, action: any) {
      switch (action.type) {
        case CONSTANTS.GET_NEWEST_LIST?.START:
          return {
            ...state,

            loading: {
              ...state.loading,
              newestList: true,
            },

            error: '',
          }
        case CONSTANTS.GET_NEWEST_LIST?.FAIL:
          return {
            ...state,

            loading: {
              ...state.loading,
              newestList: false,
            },

            error: action.payload?.body?.error || '',
          }
        case CONSTANTS.GET_NEWEST_LIST?.SUCCESS:
          return {
            ...state,

            loading: {
              ...state.loading,
              newestList: false,
            },

            error: '',

            newestList: action.payload?.body.content,
          }
      }
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ] as any,
)

export default reducerManager.reduce
