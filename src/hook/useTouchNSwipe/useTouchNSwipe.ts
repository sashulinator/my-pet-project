/* eslint-disable no-new */
import { useRef, MutableRefObject, useEffect } from 'react'
import TouchNSwipeStateManager, { TouchNSwipeStateManagerSettings } from './TouchNSwipeStateManager'

type UseTouchNSwipeSettings = TouchNSwipeStateManagerSettings

type UseTouchNSwipe = (s: UseTouchNSwipeSettings, ownRef?: MutableRefObject<null>) => MutableRefObject<null>

const useTouchNSwipe: UseTouchNSwipe = (settings, ownRef?) => {
  const ref = useRef(null)
  const currentRef = ownRef || ref

  useEffect(() => {
    const element = currentRef.current as HTMLElement | null

    new TouchNSwipeStateManager({ ...settings, element })
  }, [currentRef])

  return currentRef
}

export default useTouchNSwipe
