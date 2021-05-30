import { Reducer, combineReducers } from 'redux'

// import produce from 'immer'

// import { combineReducers } from 'redux-immer'

import { RootState } from '@/type/state'

function importAllReducers(): Record<keyof RootState, Reducer> {
  const r = require.context('@/store/reducer', true, /\.ts$/)

  const allReducers: Record<string, Reducer> = {}

  r.keys().forEach((key) => {
    allReducers[`${key.replace('.ts', '').replace('./', '')}State`] = r(key).default
  })

  return allReducers
}

const createRootReducer = (): Reducer<RootState> => combineReducers(importAllReducers())

export default createRootReducer
