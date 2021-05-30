import { DeepReadonly } from './util.d'

export type Content<T> = { content: T }

export type Id = string | number

export type IdField = DeepReadonly<{
  id: string | number
}>

export type Permission =
  | 'PERMISSION_DEALER_DATA'
  | 'PERMISSION_DEALER_CLIENTS'
  | 'PERMISSION_DEALER_CARS'
  | 'PERMISSION_SERVICE_STATION_SCHEDULE'
  | 'PERMISSION_CLIENT_FEEDBACK'
  | 'PERMISSION_PARAMS_CONFIG'
  | 'PERMISSION_MAILINGS'
  | 'PERMISSION_MANAGEMENT'

export type Role =
  | 'PORTAL_ADMIN'
  | 'DEALER_ADMIN'
  | 'OPERATOR'
  | 'CLIENT'
  | 'CLIENT_DRIVER'
  | 'NOT_SET'
  | 'ROLE_DEALER_OPERATOR'

export type Mailing = 'AUTOMATIC' | 'MANUAL'

// ------------------------------------
// User
// ------------------------------------

export type UserModel = DeepReadonly<{
  collaboratorId: Id
  academyId: Id
  firstName: string
  lastName: string
  middleName: string
  lastEntry: string
  email: string
  enabled: boolean
  authServiceId: string
  createdTimestamp: string
  emailVerified: boolean
  enabled: boolean
  permissions: Permission[]
  role: Role
  roleEntity: {
    id: Id
    name: Role
  }
  username: string
}>

// ------------------------------------
// Client
// ------------------------------------

export type ClientModel = DeepReadonly<{
  id: string
  carCount: number
  legalEntity: string
  contractNumber: string
  connectionDate: string
  name: string
  tariff: string
}>

// ------------------------------------
// Car
// ------------------------------------

export type CarModel = DeepReadonly<{
  brand: string
  issueYear: number
  customers: {
    id: number
    legalEntity: string
  }[]
  carGroup: {
    createdAt: string
    name: string
    uuid: string
    version: number
  }
  carParameter: {
    color: string
    demo: boolean
    id: number
    issueYear: string
    name: string
    stateNumber: string | null
  }
  lastTelemetry: {
    airbagFired: false
    breakFluidLowLevel: false
    coolantLevelLow: null
    generatorMalfunction: null
    odometer: number
  }
  createdAt: string
  deviceId: string
  model: string
  regionId: number
  uuid: string
  vehiclePassport: string
  version: number
  vin: string
}>

// ------------------------------------
// Config Type Catalog
// ------------------------------------

export type ConfigTypeCatalogModel = {
  id: string
  name: string
}

// ------------------------------------
// Dealer
// ------------------------------------

export type DealerModel = DeepReadonly<{
  name: string
  geolocation: string
  address: string
  description: string
  geolocation: string
  mail: string
  phones: string[]
  siteAddress: string
}>

// ------------------------------------
// Event
// ------------------------------------

type Range = {
  minValue: null | number
  maxValue: null | number
}

export type ParamsConfigCar = {
  brand?: null | string
  carParameter?: {
    issueYear: Range
    fuelSystemType?: null | string
    color?: null | string
    engineModification?: null | string
    fuelSystemType?: null | string
    fuelSystemTypeExternal?: null | string
    fuelTankVolume?: null | string
    gasTankVolume?: null | string
    isDemo?: null | string
    modelModification?: null | string
    name?: null | string
    stateNumber?: null | string
  }
  lastTelemetry?: {
    airbagFired?: true | null
    breakFluidLowLevel?: true | null
    coolantLevelLow?: true | null
    generatorMalfunction?: true | null
    glonassStatus?: true | null
    ignitionStatus?: true | null
    powerStatus?: true | null
    accVoltage?: Range
    altitude?: Range
    coolantTemp?: Range
    course?: Range
    engineOilPressure?: Range
    fuelConsumption?: Range
    fuelLevel?: Range
    fuelType?: Range
    gazLevel?: Range
    imei?: string
    latitude?: Range
    longitude?: Range
    maxRpm?: Range
    odometer?: Range
    onboardPowerVoltage?: Range
    remainingDays?: Range
    remainingMileage?: Range
    speedCan?: Range
    speedGps?: Range
    validity?: Range
  }
  model?: null | string
  regionId?: null | string
  vehiclePassport?: null | string
  vin?: null | string
}

export type ParamsConfigModel = DeepReadonly<{
  id: Id
  name: string
  isActive: boolean
  mails: string[]
  type: string
  configType: string
  catalogConfigTypeId: string
  catalogConfigType: {
    id: string
    name: string
  }
  isSearchTemplate: boolean
  isEventTrackerConfig: boolean
  isIndicatorTrackerConfig: boolean
  isNotifyInProfile: boolean
  isNotifyByEmail: boolean
  isSendPushNotifications: boolean
  mailingTemplate: MailingTemplateModel | null
  params?: {
    carParams: null | ParamsConfigCar
    clientParams: null | {
      id?: null | string
      carCount?: null | string
      connectionDate?: Range
      contractNumber?: string
      email?: string
      firstName?: string
      fullNameOfLegalEntity?: string
      lastName?: string
      legalEntityName?: string
      phone?: string
      supplementaryAgreementNumber?: string
      tariffName?: string
    }
  }
  // private MailingTemplateResDto mailingTemplate;
  // private CarOrClientParamsDto params;
}>

// ------------------------------------
// Feedback
// ------------------------------------

export type FeedbackModel = {
  id: string
  subject: string
  messages: {
    date: string
    text: string
  }[]
}

// ------------------------------------
// Mailing history
// ------------------------------------

export type MailingHistoryModel = DeepReadonly<MailingHistoryModelRow & IdField>

export type MailingHistoryModelRow = {
  name: string
  text: string
  is_active: boolean
  mailing_type: MailingType
  start_date: string
  end_date: string
}

// ------------------------------------
// Mailing template
// ------------------------------------

export type MailingType = 'AUTOMATIC'

export type MailingTemplateModel = DeepReadonly<
  MailingTemplateModelRow & IdField & { configs: { id: Id; name: string }[] }
>

export type MailingTemplateModelRow = {
  name: string
  text: string
  isActive: boolean
  mailingType: MailingType
  startDate: string
  endDate: string
}

// ------------------------------------
// Message
// ------------------------------------

export type MessageModel = {
  date: string
  text: string
  author: string
}

// ------------------------------------
// Notification
// ------------------------------------

export type NotificationModel = {
  id: number
  message: string
  isRead: boolean
  createdAt: string
  configId: number
  configType: 'CLIENT' | 'CAR'
  configTypeName: string
}

export type CarCardModel = {
  accVoltage: number
  airbagFired: boolean
  altitude: number
  dateCreated: string
  breakFluidLowLevel: boolean
  coolantLevelLow: boolean
  coolantTemp: number
  course: number
  engineOilPressure: number
  fuelConsumption: number
  fuelLevel: number
  fuelType: null | string
  gazLevel: null | number
  generatorMalfunction: boolean
  glonassStatus: boolean
  id: number
  ignitionStatus: boolean
  latitude: number
  longitude: number
  maxRpm: number
  odometer: number
  onboardPowerVoltage: number
  powerStatus: boolean
  remainingMileage: number
  speedCan: number
  speedGps: number
  time: string
  validity: number
  [index: string]: string | number
}

// ------------------------------------
// Telematic records
// ------------------------------------

export type TicketModel = {
  id: string
  subject: string
  status: 'WORKING'
  messages: MessageModel[]
}

// ------------------------------------
// Telematic history
// ------------------------------------

export type TelematicHistoryModel = Partial<Record<keyof CarCardModel, TelematicHistoryItemModel[]>>

export type TelematicHistoryItemModel = {
  createAt: string
  value: number
}
