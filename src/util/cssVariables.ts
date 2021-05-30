import theme from '@/constant/theme'
import { THEME_NAME, DEFAULT_THEME_NAME, IS_SIDER_COLLAPSED } from '@/constant/localStorage'

import * as store from '@/util/localStorage'

export function getCurrentTheme(): Record<string, string | number> {
  return theme[store.get(THEME_NAME, DEFAULT_THEME_NAME)]
}

export function setCurrentThemeName(themeName: string): void {
  localStorage.setItem(THEME_NAME, themeName)
}

export function getCurrentThemeName(): string {
  return store.get(THEME_NAME, DEFAULT_THEME_NAME)
}

export function getFromLocalStorage(): Record<string, string | number | boolean> {
  return {
    [IS_SIDER_COLLAPSED]: store.get(IS_SIDER_COLLAPSED) === 'true',
  }
}

export function getAll(): Record<string, string | number | boolean> {
  return {
    ...getCurrentTheme(),
    ...getFromLocalStorage(),
  }
}
