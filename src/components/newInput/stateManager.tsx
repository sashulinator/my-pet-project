import React, { useEffect } from 'react'

interface StateManagerProps {
  element: { value: string; dispatchEvent: (ev: Event) => void } | null
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  value?: string
  clearable?: boolean
  icon?: JSX.Element
}

const StateManager: React.FC<StateManagerProps> = (props) => {
  const { element, onChange, value, clearable, icon: Icon } = props

  useEffect(handleValueChange, [value, element])

  if (clearable && value) {
    return Icon ? React.cloneElement(Icon, { onClick: clear }) : <span onClick={clear}>X</span>
  }

  return null

  function handleValueChange() {
    if (!element) return
    element.value = value || ''
  }

  function clear() {
    if (!element) return

    const ev = new Event('input', { bubbles: true })

    element.value = ''
    element?.dispatchEvent?.(ev)
    onChange?.((ev as unknown) as React.ChangeEvent<HTMLInputElement>)
  }
}

export default StateManager
