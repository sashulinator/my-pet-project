/* eslint-disable @typescript-eslint/no-explicit-any */
import { applyMiddleware, compose, createStore, Store } from 'redux'
import middlewareQuery from '@savchenko91/rc-redux-api-mw-query'
import APIMiddlewareFakeResponse from '@savchenko91/rc-redux-api-mw-fake-response'

import { RootState } from '@/type/state'

import createRootReducer from './allReducers'

import api from './apiMiddleware'

const isDevelopment = process.env.NODE_ENV === 'development'

const composeEnhancer = (isDevelopment && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

function configureStore(preloadedState?: RootState): Store {
  const store = createStore(
    createRootReducer(),
    preloadedState,
    composeEnhancer(
      applyMiddleware(
        middlewareQuery(),
        APIMiddlewareFakeResponse({
          enabled: true,
          reduxAPIMiddlewareConfig: api.config,
        }),
        api.middleware(),
      ),
    ),
  )

  return store
}

export default configureStore()
