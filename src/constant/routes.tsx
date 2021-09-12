import React from 'react'

import Route from '@savchenko91/rc-route-constant'

import InfoIcon from '@/components/svg/infoFilledIcon'
import MailIcon from '@/components/svg/mailFilledIcon'
import PhoneIcon from '@/components/svg/phoneFilledIcon'
import SearchIcon from '@/components/svg/searchFilledIcon'
import StarIcon from '@/components/svg/starFilledIcon'
import UserIcon from '@/components/svg/userFilledIcon'

const { PUBLIC_URL } = process.env
export interface Payload {
  ICON: React.ReactElement
  LABEL: string
}

class Routes {
  // public readonly ROOT: Route

  public readonly LOGIN: Route

  public readonly APP: Route

  public readonly ABOUT: Route<string, Payload>

  public readonly SEARCH: Route<string, Payload>

  public readonly SEARCH_CAR: Route

  public readonly SEARCH_CLIENT: Route

  public readonly SEARCH_CAR_CAR: Route

  public readonly SEARCH_CLIENT_CAR: Route

  public readonly FEEDBACK: Route<string, Payload>

  public readonly FEEDBACK_DIALOG: Route

  public readonly PARAMS_CONFIG_CREATE: Route

  public readonly PARAMS_CONFIG_EDIT: Route

  public readonly PARAMS_CONFIG_VIEW: Route

  public readonly PARAMS_CONFIG_APPLY: Route

  public readonly PARAMS_CONFIG_LIST: Route<string, Payload>

  public readonly MAILING: Route<string, Payload>

  public readonly MAILING_HISTORY: Route

  public readonly MAILING_TEMPLATE_LIST: Route

  public readonly MAILING_TEMPLATE: Route

  public readonly MAILING_TEMPLATE_CREATE: Route

  public readonly NOTIFICATION: Route

  public readonly USER: Route

  public readonly USER_LIST: Route<string, Payload>

  constructor() {
    // Root

    // this.ROOT = new Route('root', '/')

    // Login

    this.LOGIN = /*                              */ new Route({ name: 'Логин', path: '/my-pet-project/login' })

    // App

    const app = '/my-pet-project/'

    this.APP = /*                                */ new Route({ name: 'Дилер', path: app })

    const appAbout = `${app}about`

    const appEvent = `${app}params-config`
    const appEventEdit = `${appEvent}/:id/edit`
    const appEventView = `${appEvent}/:id/view`
    const appEventCreate = `${appEvent}/create`
    const appEventApply = `${appEvent}/:id/apply`

    const appFeedback = `${app}feedback`
    const appFeedbackDialog = `${app}feedback/dialog`

    const appMailing = `${app}mailing`
    const appMailingTemplateList = `${appMailing}/templates`
    const appMailingTemplate = `${appMailingTemplateList}/:id/edit`
    const appMailingTemplateCreate = `${appMailingTemplateList}/create`
    const appMailingHistory = `${appMailing}/history`

    const appNotification = `${app}notification`

    const appSearch = `${app}search`
    const appSearchCar = `${appSearch}/cars`
    const appSearchCarCar = `${appSearchCar}/:uuid`
    const appSearchClient = `${appSearch}/clients`
    const appSearchClientCar = `${appSearchClient}/:uuid`

    const appUserList = `${app}users`
    const appUser = `${appUserList}/:id`

    // About

    this.ABOUT = /*                              */ new Route({
      name: 'О дилере',
      path: appAbout,
      payload: {
        ICON: <InfoIcon />,
        LABEL: 'about',
      },
    })

    // Search

    this.SEARCH_CAR = /*                         */ new Route({ name: 'Автомобили', path: appSearchCar })

    this.SEARCH_CAR_CAR = /*                     */ new Route({ name: 'Карточка ТС', path: appSearchCarCar })

    this.SEARCH_CLIENT = /*                      */ new Route({ name: 'Клиенты', path: appSearchClient })

    this.SEARCH_CLIENT_CAR = /*                  */ new Route({ name: 'Карточка ТС', path: appSearchClientCar })

    this.SEARCH = /*                             */ new Route({
      name: 'Поиск',
      path: appSearch,
      redirect: this.SEARCH_CLIENT,
      payload: {
        ICON: <SearchIcon />,
        LABEL: 'search',
      },
    })

    // Feedback

    this.FEEDBACK = /*                           */ new Route({
      name: 'Обратная связь',
      path: appFeedback,
      payload: {
        ICON: <PhoneIcon />,
        LABEL: 'feedback',
      },
    })

    this.FEEDBACK_DIALOG = /*                    */ new Route({ name: 'Чат', path: appFeedbackDialog })

    // Events

    this.PARAMS_CONFIG_LIST = /*                 */ new Route({
      name: 'События',
      path: appEvent,
      payload: {
        ICON: <StarIcon />,
        LABEL: 'params-config-list',
      },
    })

    this.PARAMS_CONFIG_VIEW = /*                 */ new Route({ name: 'Редактирование', path: appEventView })

    this.PARAMS_CONFIG_EDIT = /*                 */ new Route({ name: 'Редактирование', path: appEventEdit })

    this.PARAMS_CONFIG_CREATE = /*               */ new Route({ name: 'Создание', path: appEventCreate })

    this.PARAMS_CONFIG_APPLY = /*                */ new Route({ name: 'Применить', path: appEventApply })

    // Mailing

    this.MAILING_TEMPLATE_LIST = /*              */ new Route({ name: 'Шаблоны', path: appMailingTemplateList })

    this.MAILING_TEMPLATE_CREATE = /*            */ new Route({ name: 'Создание', path: appMailingTemplateCreate })

    this.MAILING_TEMPLATE = /*                   */ new Route({ name: 'Редактирование', path: appMailingTemplate })

    this.MAILING_HISTORY = /*                    */ new Route({ name: 'История рассылок', path: appMailingHistory })

    this.MAILING = /*                            */ new Route({
      name: 'Рассылка',
      path: appMailing,
      redirect: this.MAILING_TEMPLATE_LIST,
      payload: {
        ICON: <MailIcon />,
        LABEL: 'mailing',
      },
    })

    // Notification

    this.NOTIFICATION = /*                       */ new Route({ name: 'Уведомления', path: appNotification })

    // User

    this.USER_LIST = /*                          */ new Route({
      name: 'Пользователи',
      path: appUserList,
      payload: {
        ICON: <UserIcon />,
        LABEL: 'user-list',
      },
    })

    this.USER = /*                               */ new Route({ name: 'Доступы', path: appUser })
  }
}

// ------------------------------------
// Используй default экспорт если необходимы автоподсказки
// ------------------------------------

export { Routes }

const routes = new Routes()

const ROUTES = {
  USER_LIST: new Route({
    name: 'Users',
    path: `${PUBLIC_URL}/users`,
    payload: {
      ICON: <UserIcon />,
      LABEL: 'user-list',
    },
  }),
} as const

export { ROUTES }

export default routes
