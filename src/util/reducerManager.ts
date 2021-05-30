/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { StageActionTypes } from '@savchenko91/rc-redux-api-mw'

// eslint-disable-next-line import/prefer-default-export
export class ReducerManager {
  constants: {
    SET?: string
    RESET_ALL?: string
    CREATE?: StageActionTypes
    GET_LIST?: StageActionTypes
    GET_CURRENT?: StageActionTypes
    GET?: StageActionTypes
    UPDATE?: StageActionTypes
    REMOVE?: StageActionTypes
    REFRESH_LIST?: StageActionTypes
  }

  reducers: ((s: any, a: any) => void | any)[]

  state: any

  // eslint-disable-next-line prettier/prettier
  constructor(
    constants: ReducerManager['constants'],
    initialState?: Record<string, unknown>,
    reducers?: ((...arg: any) => any)[],
  ) {
    this.constants = { ...constants, RESET_ALL: 'RESET_ALL' }

    this.reducers = reducers || []
    this.state = {}
    this.getInitial(initialState)
  }

  public reduce = (s = this.state, a: any): any => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    for (let i = 0; i < this.reducers.length; i += 1) {
      if (a.type === this.constants.RESET_ALL) return this.state

      const newState = this.reducers[i](s, a)
      if (newState) return newState
    }

    return s
  }

  private getInitial(initialState: any) {
    if (this.constants.SET) {
      this.reducers.push(this.set as any)
      this.state = initialState
    }
    if (this.constants.GET) {
      this.reducers.push(this.get as any)

      this.state = {
        entity: null,
        abortController: null,
        ...this.state,
        ...initialState,

        loading: {
          ...this.state?.loading,
          ...initialState?.loading,
          get: false,
        },
      }
    }
    if (this.constants.UPDATE) {
      this.reducers.push(this.update as any)

      this.state = {
        ...this.state,
        ...initialState,

        loading: {
          ...this.state?.loading,
          ...initialState?.loading,
          update: false,
        },
      }
    }
    if (this.constants.REFRESH_LIST) {
      this.reducers.push(this.refreshList as any)

      this.state = {
        ...this.state,
        ...initialState,

        loading: {
          ...this.state?.loading,
          ...initialState?.loading,
          refreshList: false,
        },
      }
    }
    if (this.constants.GET_LIST) {
      this.reducers.push(this.getList as any)

      this.state = {
        list: [],

        totalElements: 0,

        ...this.state,
        ...initialState,

        filter: {
          page: 0,
          size: 10,
          ...this.state?.filter,
          ...initialState?.filter,
        },

        loading: {
          ...this.state?.loading,
          ...initialState?.loading,
          getList: false,
        },
      }
    }
  }

  private set = (state: any, action: any) => {
    switch (action.type) {
      case this.constants?.SET:
        return {
          ...state,
          ...action.payload,
          error: '',
        }
    }
  }

  private getList = (state: any, action: any) => {
    switch (action.type) {
      case this.constants?.GET_LIST?.START:
        return {
          ...state,
          abortController: action.payload.abortController,
          loading: {
            ...state.loading,
            getList: true,
          },

          error: '',

          list: [],
        }
      case this.constants?.GET_LIST?.FAIL:
        return {
          ...state,

          loading: {
            ...state.loading,
            getList: false,
          },

          error: action.payload?.body?.errorDescription || '',
        }
      case this.constants?.GET_LIST?.SUCCESS:
        return {
          ...state,

          loading: {
            ...state.loading,
            getList: false,
          },

          error: '',

          list: action.payload.body?.content,

          totalElements: action.payload.body?.totalElements || 0,

          filter: action.payload?.action?.query || state.filter,
        }
    }
  }

  private get = (state: any, action: any) => {
    switch (action.type) {
      case this.constants?.GET?.START:
      case this.constants?.GET_CURRENT?.START:
        return {
          ...state,

          abortController: action.payload.abortController,
          error: '',

          entity: null,

          loading: {
            ...state.loading,
            get: true,
          },
        }
      case this.constants?.GET?.FAIL:
      case this.constants?.GET_CURRENT?.FAIL:
        return {
          ...state,

          loading: {
            ...state.loading,
            get: false,
          },

          error: action.payload?.body?.errorDescription || '',
        }
      case this.constants?.GET?.SUCCESS:
      case this.constants?.GET_CURRENT?.SUCCESS:
        return {
          ...state,

          error: '',

          loading: {
            ...state.loading,
            get: false,
          },

          entity: action.payload.body || null,
        }
    }
  }

  private create(state: any, action: any) {
    switch (action.type) {
      case this.constants?.CREATE?.START:
        return {
          ...state,
          error: '',
          loading: {
            ...state.loading,
            // create: 'Создание шаблона рассылки',
          },
        }
      case this.constants?.CREATE?.FAIL:
        return {
          ...state,
          error: action.payload?.body?.errorDescription || '',
          loading: {
            ...state.loading,
            // create: false,
          },
        }
      case this.constants?.CREATE?.SUCCESS:
        return {
          ...state,
          error: '',
          loading: {
            ...state.loading,
            // create: false,
          },
        }
    }
  }

  // ------------------------------------
  // Refresh list
  // ------------------------------------

  private refreshList = (state: any, action: any) => {
    switch (action.type) {
      case this.constants?.REFRESH_LIST?.START:
        action.payload.action.query = state.filter

        return {
          ...state,
          error: '',
          loading: {
            ...state.loading,
            refreshList: true,
          },
        }
      case this.constants?.REFRESH_LIST?.FAIL:
        return {
          ...state,
          error: action.payload?.body?.errorDescription || '',
          loading: {
            ...state.loading,
            refreshList: false,
          },
        }
      case this.constants?.REFRESH_LIST?.SUCCESS:
        return {
          ...state,
          list: action.payload.body?.content || { ...state.list },
          error: '',
          totalElements: action.payload.body?.totalElements || 0,
          filter: action.payload?.action?.query || state.filter,
          loading: {
            ...state.loading,
            refreshList: false,
          },
        }
    }
  }

  private remove(state: any, action: any) {
    switch (action.type) {
      case this.constants?.UPDATE?.START:
        return {
          ...state,
          error: '',
          loading: {
            ...state.loading,
            // remove: true,
          },
        }
      case this.constants?.UPDATE?.FAIL:
        return {
          ...state,
          error: action.payload?.body?.error || '',
          loading: {
            ...state.loading,
            // remove: false,
          },
        }
      case this.constants?.UPDATE?.SUCCESS:
        return {
          ...state,
          error: '',
          loading: {
            ...state.loading,
            // remove: false,
          },
        }
    }
  }

  private update = (state: any, action: any) => {
    switch (action.type) {
      case this.constants?.UPDATE?.START:
        return {
          ...state,

          error: '',

          loading: {
            ...state.loading,
            remove: true,
          },
        }
      case this.constants?.UPDATE?.FAIL:
        return {
          ...state,

          error: action.payload?.body?.errorDescription || '',

          loading: {
            ...state.loading,

            remove: false,
          },
        }
      case this.constants?.UPDATE?.SUCCESS:
        return {
          ...state,

          error: '',

          loading: {
            ...state.loading,
            remove: false,
          },
        }
    }
  }
}
