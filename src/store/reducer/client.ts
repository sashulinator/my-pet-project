import { ReducerManager } from '@/util/reducerManager'
import { ClientModel } from '@/type/model'
import { get, cloneDeep } from 'lodash'
import * as CONSTANTS from '../constant/client'

const reducerManager = new ReducerManager(
  CONSTANTS,
  {
    checkList: [],
    filterCollapseActiveKeys: ['main'],
    CarList: {},
  },
  [
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, func-names
    function getCarList(state: any, action: any) {
      switch (action.type) {
        case CONSTANTS.GET_CAR_LIST?.START:
          return {
            ...state,

            loading: {
              ...state.loading,
              getCarList: true,
            },

            error: '',
          }
        case CONSTANTS.GET_CAR_LIST?.FAIL:
          return {
            ...state,

            loading: {
              ...state.loading,
              getCarList: false,
            },

            error: action.payload?.body?.error || '',
          }
        case CONSTANTS.GET_CAR_LIST?.SUCCESS:
          return {
            ...state,

            loading: {
              ...state.loading,
              getCarList: false,
            },

            error: '',

            CarList: { [action.payload.action.payload]: action.payload.body?.content, ...state.CarList },
          }
        case CONSTANTS.PUT_CLINT?.SUCCESS:
          const answer: ClientModel = get(action, 'payload.body', {})
          const list = cloneDeep(state.list)
          const index = list.findIndex((item: ClientModel) => item.id === answer.id)
          if (index !== -1) list[index] = answer
          return {
            ...state,
            list,
          }
      }
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ] as any,
)

export default reducerManager.reduce
