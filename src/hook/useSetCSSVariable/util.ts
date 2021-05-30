import { MutableRefObject } from 'react'

export type SetCSSVariable = (
  ref: MutableRefObject<null> | null,
  name: string,
  value: number | string,
  s?: SetCSSVariableSettings,
) => void

export type SetCSSVariableSettings = {
  postfix?: string
  prefix?: string
}

const setCSSVariable: SetCSSVariable = (ref, name, value, settings) => {
  const el = ref?.current || document.body

  el?.style.setProperty(`--${settings?.prefix || ''}${name}${settings?.postfix || ''}`, value.toString())
}

export default setCSSVariable
