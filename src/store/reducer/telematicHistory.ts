import { ReducerManager } from '@/util/reducerManager'

import * as CONSTANTS from '../constant/telematicHistory'

const reducerManager = new ReducerManager(
  CONSTANTS,
  {
    telematicHistory: {},
    active: null,
    loading: {
      getOne: false,
    },
  },
  [
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, func-names
    function getOne(state: any, action: any) {
      switch (action.type) {
        case CONSTANTS.GET_ONE?.START:
          return {
            ...state,

            loading: {
              ...state.loading,
              getOne: true,
            },

            error: '',
          }
        case CONSTANTS.GET_ONE?.FAIL:
          return {
            ...state,

            loading: {
              ...state.loading,
              getOne: false,
            },

            error: action.payload?.body?.error || '',
          }
        case CONSTANTS.GET_ONE?.SUCCESS:
          return {
            ...state,

            loading: {
              ...state.loading,
              getOne: false,
            },

            error: '',

            telematicHistory: { ...state.telematicHistory, ...action.payload.body },
          }
      }
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ] as any,
)

export default reducerManager.reduce
