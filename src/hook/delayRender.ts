import { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'

import { CSSVariableState, RootState } from '@/type/state'

export default function delayRender(): number {
  const cssVariableState = useSelector((s: RootState): CSSVariableState => s.cssVariableState)

  const [renderDelay, setRenderDelay] = useState(cssVariableState.appPageSwitchAnimation)

  useEffect(() => {
    setTimeout(() => {
      setRenderDelay(0)
    }, renderDelay)
  }, [])

  return renderDelay
}
