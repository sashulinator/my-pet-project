import { useMemo } from 'react'

import * as H from 'history'

import { AnyAction } from 'redux'

import qs from 'qs'

import Route from '@/util/route-constant'

import store from '@/index/redux/store'

import history from '@/index/route/history'

// import { Content } from '@/type/model'
import {
  // OnStage,
  PageableRow,
} from '@/type/type'
import { isEmpty } from 'lodash'

// ------------------------------------
// createListManager
// ------------------------------------

export function useListManager(settings: Settings): ListManager {
  const listManager = useMemo(() => new ListManager(settings), [])

  // Обновляем ссылку на редаксовский стэет
  listManager.state = settings.state

  return listManager
}

// ------------------------------------
// Settings
// ------------------------------------

export type Settings = {
  state: {
    list: unknown[]
    totalElements: number
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    filter: PageableRow & Record<string, unknown>
    loading: {
      getList: boolean | string
      refreshList?: boolean | string
    }
    // abortController: AbortController
  }
  actions: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getList: (filter: PageableRow & Record<string, unknown>, onStage: any) => AnyAction
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    set: (state: any) => AnyAction
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onStage?: any

  route: Route
}

// ------------------------------------
// ListManager
// ------------------------------------

export class ListManager implements Settings {
  state: Settings['state']

  initialState: Settings['state']

  actions: Settings['actions']

  history: H.History

  route: Settings['route']

  onStage?: Settings['onStage']

  initial: {
    request: boolean
    list: boolean
  }

  constructor(settings: Settings) {
    this.state = settings.state

    this.initialState = settings.state

    this.actions = settings.actions

    this.initial = {
      request: false,
      list: !!settings.state.list?.length,
    }

    this.onStage = settings.onStage

    this.history = history

    this.route = settings.route
  }

  get pageCount(): number {
    return Math.ceil(this.state.totalElements / this.state.filter.size)
  }

  get isEmpty(): boolean {
    return !this.isFormFilterEmpty && !this.state.list.length && !this.state.loading.getList
  }

  get isLoading(): boolean {
    return Boolean(this.state.loading.getList || this.state.loading.refreshList)
  }

  get formFilter(): Record<symbol, string> {
    const { size, page, ...filter } = this.state.filter
    return filter
  }

  get isSearchEmpty(): boolean {
    return !this.history.location.search
  }

  get parsedSearch(): ListManager['state']['filter'] | null {
    const result = qs.parse(this.history.location.search, {
      ignoreQueryPrefix: true,
      decoder: (str, qsDecoder) => {
        return /^([0-9]+)$/.test(str) ? parseFloat(str) : qsDecoder(str)
      },
    }) as ListManager['state']['filter']

    if (isEmpty(result)) return null

    return result
  }

  get isFormFilterEmpty(): boolean {
    return JSON.stringify(this.formFilter) === '{}'
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get paginationProps(): any {
    return {
      perPage: this.state.filter.size,
      forcePage: this.state.filter.page,
      pageCount: this.pageCount,
      onPageChange: this.onPageChange,
      onPerPageChange: this.onSizeChange,
    }
  }

  reset = (): void => {
    const filter = { size: 10, page: 0 }
    store.dispatch(this.actions.set({ filter }))
    this.history.push({
      search: qs.stringify(filter, { skipNulls: true }),
    })
  }

  onPageChange = (n: number): void => {
    this.dispatchAction({ ...this.state.filter, page: n })
  }

  onSizeChange = (n: number): void => {
    this.dispatchAction({ ...this.state.filter, page: 0, size: n })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onFilterChange = (f: Record<string, any>): void => {
    this.dispatchAction({ ...f, page: 0, size: this.state.filter.size })
  }

  // fromQueryToState = (): void => {
  //   if (!this.route.isCurrent) return

  //   const fixParam = this.parsedSearch
  //   let isRequest = false
  //   if (fixParam.isFind) isRequest = true

  //   setTimeout(() => {
  //     const parameters = this.parsedSearch
  //     if (parameters.isFind) delete parameters.isFind

  //     store.dispatch(this.actions.set({ filter: parameters }))
  //   }, 1)

  //   if (isRequest && !isEmpty(fixParam)) this.dispatchAction()
  // }

  dispatchAction = (filter?: ListManager['state']['filter']): void => {
    filter = filter || this.parsedSearch || this.state.filter
    ;(document.querySelector('.scrollToTopOnRequest') as Element)?.scrollTo({
      top: 0,
      behavior: 'smooth',
    })

    this.initial.request = true

    store.dispatch(this.actions.set({ filter }))

    history.push({ search: qs.stringify(filter) })

    this.route.REDIRECT = `${this.route.PATH}${qs.stringify(filter, { addQueryPrefix: true, skipNulls: true })}`
    ;(this.state as any).abortController?.abort()
    store.dispatch(
      this.actions.getList(filter, {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onSuccess: (args: any) => {
          this.onStage?.onSuccess?.(args)
        },
        onStart: (args: any) => {
          this.onStage?.onStart?.(args)
        },
      }),
    )
  }
}
