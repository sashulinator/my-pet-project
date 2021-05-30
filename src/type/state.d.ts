import React from 'react'

import { Entity, List } from '@/type/type'

import {
  CarModel,
  ClientModel,
  ConfigTypeCatalogModel,
  DealerModel,
  ParamsConfigModel,
  MailingHistoryModel,
  MailingTemplateModel,
  NotificationModel,
  CarCardModel,
  TelematicHistoryModel,
  TicketModel,
  UserModel,
} from './model.d'

export type RootState = {
  // App
  authState: AuthState
  cssVariableState: CSSVariableState
  siderState: SiderState

  // Entity
  carState: CarState
  configTypeCatalogState: ConfigTypeCatalogState
  ticketState: TicketModel
  clientState: ClientState
  dealerState: DealerState
  // telematicRecordState: TelematicRecordState
  telematicHistoryState: TelematicHistoryState
  mailingHistoryState: MailingHistoryState
  mailingTemplateState: MailingTemplateState
  notificationState: NotificationState
  paramsConfigState: ParamsConfigState
  userState: UserState
  valuesCatalogState: ValuesCatalogState
}

// ------------------------------------
// Auth
// ------------------------------------

export type AuthState = {
  loading: {
    logging: boolean
  }
  error: ''
}

// ------------------------------------
// CSS variable
// ------------------------------------

export type CSSVariableState = {
  name: string
  isSiderCollapsed: boolean
  siderCollapsedWidth?: number
  siderUncollapsedWidth?: number
  headerHeight?: number
  primary?: string
  bgDark?: string
  color: string
  background: string
  gray: string
  darkGray: string
  lightGray: string
  bg?: string
  border: string
  appPageSwitchAnimation: number
  inputPlaceholderColor: string
}

// ------------------------------------
// User
// ------------------------------------

export type UserState = Entity<UserModel> & List<UserModel>

// ------------------------------------
// Client
// ------------------------------------

export type ClientFilter = Partial<{
  carCount: number
  connectionDate: {
    maxValue: string
    minValue: string
  }
  contractNumber: string
  email: string
  firstName: string
  fullNameOfLegalEntity: string
  lastName: string
  legalEntityName: string
  phone: string
  supplementaryAgreementNumber: string
  tariffName: string
  uuid: string
}>

export type NotificationFilter = Partial<{
  endCreatedAtTimestamp: string
  startCreatedAtTimestamp: string
  page: number
  size: number
  uuid: string
}>

export type ClientState = Entity<ClientModel> &
  List<ClientModel> & {
    checkList: ClientModel[]
    filter: ClientFilter
    filterCollapseActiveKeys: React.Key[]
    CarList: Record<string, CarModel[]>
    loading: {
      getCarList: boolean
    }
  }

// ------------------------------------
// Config Type Catalog
// ------------------------------------

export type ConfigTypeCatalogState = List<ConfigTypeCatalogModel>

// ------------------------------------
// Car
// ------------------------------------

export type CarFilter = Partial<{
  brand: string
  carGroup: {
    createdAt: string
    name: string
    uuid: string
    version: number
  }
  carParameter: {
    color: string
    createdAt: string
    demo: true
    engineModification: string
    fuelSystemType: string
    fuelSystemTypeExternal: string
    fuelTankVolume: number
    gasTankVolume: number
    id: number
    issueYear: number
    modelModification: string
    name: string
    stateNumber: string
    updateAt: string
  }
  createdAt: string
  dealerId: number
  deviceId: string
  lastTelemetry: {
    airbagFired: true
    breakFluidLowLevel: true
    coolantLevelLow: true
    generatorMalfunction: true
    odometer: number
  }
  model: string
  regionId: number
  uuid: string
  vehiclePassport: string
  version: number
  vin: string
}>

export type CarState = Entity<CarModel> &
  List<CarModel> & {
    checkList: CarModel[]
    filter: CarFilter
    Card: null | CarCardModel
    loading: {
      getCard: boolean
    }
    filterCollapseActiveKeys: React.Key[]
  }

// ------------------------------------
// Dealer
// ------------------------------------

export type DealerState = Entity<DealerModel>

// ------------------------------------
// Mailing history
// ------------------------------------

export type MailingHistoryState = Entity<MailingHistoryModel> &
  List<MailingHistoryModel> & {
    doNotAskOnRemove: boolean
  }

// ------------------------------------
// Mailing template
// ------------------------------------

export type MailingTemplateState = Entity<MailingTemplateModel> &
  List<MailingTemplateModel> & {
    doNotAskOnRemove: boolean
  }

// ------------------------------------
// Notification
// ------------------------------------

export type NotificationState = List<NotificationModel> & {
  newestList: NotificationModel[]
  loading: {
    newestList: boolean
  }
}

// ------------------------------------
// Params Config
// ------------------------------------

export type ParamsConfigState = List<ParamsConfigModel> &
  Entity<ParamsConfigModel> & {
    fullActiveList: ParamsConfigModel[]
    loading: {
      refreshFullActiveList: boolean
    }
  }

// ------------------------------------
// Telematic record
// ------------------------------------

export type TelematicRecordState = Entity<CarCardModel>

// ------------------------------------
// Telematic history
// ------------------------------------

export type TelematicHistoryState = {
  telematicHistory: TelematicHistoryModel
  active: null | keyof TelematicHistoryModel
}

export type ValuesCatalogState = Entity<{
  catalogGroupByParameterType: {
    BRAND: string[]
    ISSUE_YEAR: string[]
    MODEL: string[]
  }
}>
