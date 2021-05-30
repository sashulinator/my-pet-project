import { AnyAction } from 'redux'

import * as CONSTANTS from '@/store/constant/cssVariable'

import { CSSVariableState } from '@/type/state'

import { getAll, setCurrentThemeName } from '@/util/cssVariables'

export const set = (payload: Partial<CSSVariableState>): AnyAction => {
  const keys = Object.keys(payload)

  for (let i = 0; i < keys.length; i += 1) {
    const value = payload[keys[i] as keyof CSSVariableState]
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    value && setCSSVariable(keys[i], value.toString())
  }

  return {
    type: CONSTANTS.SET,
    payload,
  }
}

export const setTheme = (themeName: string): AnyAction => {
  setCurrentThemeName(themeName)

  const theme = getAll()

  const keys = Object.keys(theme)

  document.body.setAttribute('style', '')

  for (let i = 0; i < keys.length; i += 1) {
    const value = theme[keys[i] as keyof CSSVariableState]
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    value && setCSSVariable(keys[i], value.toString())
  }

  return {
    type: CONSTANTS.SET,
    payload: theme,
  }
}

const setCSSVariable = (key: string, value: number | string) => {
  document.body.style.setProperty(`--${key}`, value.toString())
}
