/* eslint-disable @typescript-eslint/lines-between-class-members */
/* eslint-disable max-classes-per-file */

import {
  // PERMISSION,
  TOKEN,
} from '@/constant/localStorage'

import history from '@/index/route/history'

import { toast, ToastOptions } from 'react-toastify'

import ROUTES from '@/constant/routes'

const toastProps: ToastOptions = {
  type: 'error',
}

export class Permission {
  private _permissionName: string

  private _cache: Record<string, string[]>

  constructor(permissionName: string) {
    this._permissionName = permissionName
    this._cache = {}
  }
  // eslint-disable-next-line class-methods-use-this
  get permissions(): string[] {
    const token = localStorage.getItem(TOKEN) ?? ''

    if (this._cache[token]) return this._cache[token]

    return [
      'PERMISSION_CLIENT_FEEDBACK',
      'PERMISSION_DEALER_CARS',
      'PERMISSION_DEALER_CLIENTS',
      'PERMISSION_DEALER_DATA',
      'PERMISSION_MANAGEMENT',
      'PERMISSION_MAILINGS',
      'PERMISSION_PARAMS_CONFIG',
      'PERMISSION_SERVICE_STATION_SCHEDULE',
    ]

    // const permissionString = localStorage.getItem(PERMISSION)

    // if (!permissionString) {
    //   history.push(ROUTES.LOGIN.PATH)
    //   localStorage.clear()
    //   toast('Доступы текущего пользователя не были обнаружены в локальном хранилище браузера', toastProps)
    // }

    try {
      // const permissionsArr = (JSON.stringify(permissionString) as unknown) as string[]
      // this._cache[token] = permissionsArr
    } catch (e) {
      history.push(ROUTES.LOGIN.PATH)
      localStorage.clear()
      toast('Не удалось распарсить доступы в локальном хранилище браузера', toastProps)
      return []
    }
  }

  toString = (): string => {
    return this._permissionName
  }

  get is(): boolean {
    return this.permissions.includes(this._permissionName)
  }
}

class Permissions {
  PERMISSION_DEALER_DATA: Permission

  PERMISSION_DEALER_CLIENTS: Permission

  PERMISSION_DEALER_CARS: Permission

  PERMISSION_MANAGEMENT: Permission

  PERMISSION_MAILINGS: Permission

  PERMISSION_SERVICE_STATION_SCHEDULE: Permission

  PERMISSION_CLIENT_FEEDBACK: Permission

  PERMISSION_PARAMS_CONFIG: Permission

  constructor() {
    this.PERMISSION_CLIENT_FEEDBACK = new Permission('PERMISSION_CLIENT_FEEDBACK')
    this.PERMISSION_DEALER_CARS = new Permission('PERMISSION_DEALER_CARS')
    this.PERMISSION_DEALER_CLIENTS = new Permission('PERMISSION_DEALER_CLIENTS')
    this.PERMISSION_DEALER_DATA = new Permission('PERMISSION_DEALER_DATA')
    this.PERMISSION_MANAGEMENT = new Permission('PERMISSION_MANAGEMENT')
    this.PERMISSION_MAILINGS = new Permission('PERMISSION_MAILINGS')
    this.PERMISSION_PARAMS_CONFIG = new Permission('PERMISSION_PARAMS_CONFIG')
    this.PERMISSION_SERVICE_STATION_SCHEDULE = new Permission('PERMISSION_SERVICE_STATION_SCHEDULE')
  }
}

const PERMISSIONS = new Permissions()

export default PERMISSIONS
