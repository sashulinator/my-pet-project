import { OnFail, OnStart, OnSuccess } from '@/util/api-redux-middleware'

export type OnStage<Body = unknown> = {
  onStart?: OnStart
  onFail?: OnFail<Body>
  onSuccess?: OnSuccess<Body>
}

export type List<M> = {
  list: M[]
  error: string
  filter: PageableRow
  totalElements: number
  loading: {
    getList: boolean
    refreshList: boolean
  }
}

export type Entity<M> = {
  entity: M | null
  error: string
  loading: {
    get: boolean
  }
}

export type Errorable = {
  error: string
}

export type PageableRow = {
  size: number
  page: number
}

export type PageableRowWithParams = Partial<{
  endCreatedAtTimestamp: string
  startCreatedAtTimestamp: string
  page: number
  size: number
  configTypeName: string
}>

export type Pageable = PageableRow & {
  totalElements: number
}

export type Period = {
  minValue: string
  maxValue: string
}

export type Requestable = Errorable & {
  loading: Record<string, boolean | string>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Action<P = any> = {
  type: string
  payload: P
}

export type TelematicsParamsType<T> = {
  isAirbagFiredHistory: T
  isBreakFluidLowLevelHistory: T
  isCoolantLevelLowHistory: T
  isGeneratorMalfunctionHistory: T
  isLamp1213History: T
  isLamp623History: T
  isLamp624History: T
}

export type TelematicItemType = {
  activationDate: string
  odometer: number
  sequenceNumber: number
}
