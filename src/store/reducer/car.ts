import { CarCardModel } from '@/type/model'
import { CarState } from '@/type/state'
import { Errorable } from '@/type/type'
import { ReducerManager } from '@/util/reducerManager'
import { StageAction } from '@savchenko91/rc-redux-api-mw'

import * as CONSTANTS from '../constant/car'

const reducerManager = new ReducerManager(
  CONSTANTS,
  {
    Card: null,
    loading: {
      getCard: false,
    },
    checkList: [],
    filterCollapseActiveKeys: ['main'],
  },
  [
    function getCard(state: CarState, action: StageAction<CarCardModel & Errorable>): CarState | void {
      switch (action.type) {
        case CONSTANTS.GET_CARD?.START:
          return {
            ...state,

            loading: {
              ...state.loading,
              getCard: true,
            },

            error: '',
          }
        case CONSTANTS.GET_CARD?.FAIL:
          return {
            ...state,

            loading: {
              ...state.loading,
              getCard: false,
            },

            error: action.payload?.body?.error || '',
          }
        case CONSTANTS.GET_CARD?.SUCCESS:
          return {
            ...state,
            loading: {
              ...state.loading,
              getCard: false,
            },

            error: '',

            Card: action.payload.body || null,
          }
      }
    },
  ],
)

export default reducerManager.reduce
