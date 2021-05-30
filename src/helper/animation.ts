// eslint-disable import/no-extraneous-dependencies

import { CSSMotionProps, MotionEventHandler, MotionEndEventHandler } from 'rc-motion'

const getCollapsedHeight: MotionEventHandler = () => ({ height: 0, opacity: 0 })
const getRealHeight: MotionEventHandler = (node) => ({ height: node.scrollHeight, opacity: 1 })
const getCurrentHeight: MotionEventHandler = (node) => ({ height: node.offsetHeight })
const skipOpacityTransition: MotionEndEventHandler = (_, event) => (event as TransitionEvent).propertyName === 'height'

const collapseMotion: CSSMotionProps = {
  motionName: 'rc-collapse-motion',
  onEnterStart: getCollapsedHeight,
  onEnterActive: getRealHeight,
  onLeaveStart: getCurrentHeight,
  onLeaveActive: getCollapsedHeight,
  onEnterEnd: skipOpacityTransition,
  onLeaveEnd: skipOpacityTransition,
  motionDeadline: 100,
  leavedClassName: 'rc-collapse-content-hidden',
}

export default collapseMotion

export function delayListItem(i: number, length: number, amount = 11): number {
  let ms = amount

  if (i < amount) {
    ms = i
  } else if (length - i > amount) {
    ms = length - i
  }

  return ms
}
