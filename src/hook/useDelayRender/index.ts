import Route from '@/util/route-constant'

import { useState, useEffect } from 'react'

export default function useDelayRender(delayArg: number, route: Route): boolean {
  if (!delayArg) return true

  const [isRender, setIsRender] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      if (route.isCurrent) {
        setIsRender(true)
      }
    }, delayArg)
  }, [])

  return isRender
}
