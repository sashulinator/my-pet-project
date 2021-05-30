/* eslint-disable @typescript-eslint/no-unused-expressions */
import { cloneDeep } from 'lodash'

import TouchNSwipeState from './TouchNSwipeState'

type Handler = (data: TouchNSwipeState) => void

type ActionName = 'mouseup' | 'touchend'

type TNSElement = { element: HTMLElement | null }

export type TouchNSwipeStateManagerSettings = {
  handler: Handler
  trackMouse?: boolean
  trackTouch?: boolean
}

class TouchNSwipeStateManager {
  public state!: TouchNSwipeState

  public element: HTMLElement | null

  private handler: Handler

  private trackMouse: boolean

  private trackTouch: boolean

  constructor({
    element,
    handler,
    trackMouse = false,
    trackTouch = true,
  }: TouchNSwipeStateManagerSettings & TNSElement) {
    this.element = element

    this.handler = handler

    this.trackMouse = trackMouse
    this.trackTouch = trackTouch

    this.setEventListener('start', 'touch', true)
    this.setEventListener('start', 'touch')
  }

  private setEventListener(type: 'start' | 'move' | 'end', actionType: 'touch' | 'mouse', isRemove = false): void {
    if (actionType === 'touch' && !this.trackTouch) {
      if (this.trackMouse) this.setEventListener(type, 'mouse', isRemove)
      return
    }

    const obj = {
      start: {
        actions: { touch: 'touchstart', mouse: 'mousedown' },
        cb: this.start,
      },
      move: {
        actions: { touch: 'touchmove', mouse: 'mousemove' },
        cb: this.move,
      },
      end: {
        actions: { touch: 'touchend', mouse: 'mouseup' },
        cb: this.end,
      },
    }

    // eslint-disable-next-line no-unused-expressions
    isRemove
      ? this.element?.removeEventListener(obj[type].actions[actionType] as ActionName, obj[type].cb, false)
      : this.element?.addEventListener(obj[type].actions[actionType] as ActionName, obj[type].cb, false)

    // eslint-disable-next-line no-unused-expressions
    actionType === 'touch' && this.trackMouse && this.setEventListener(type, 'mouse', isRemove)
  }

  private end = (event: TouchEvent | MouseEvent): void => {
    this.state.is.end = true
    this.state.event = event

    this.setEventListener('end', 'touch', true)
    this.setEventListener('move', 'touch', true)

    this.handler(this.state)
  }

  private start = (event: TouchEvent | MouseEvent): void => {
    this.setEventListener('end', 'touch')
    this.setEventListener('move', 'touch')

    this.state = new TouchNSwipeState(this.element as HTMLElement, event)

    this.handler(this.state)
  }

  private move = (event: TouchEvent | MouseEvent): void => {
    this.state.event = event

    this.state.is.start = false

    this.state.previous = Object.assign(cloneDeep(this.state), { previous: null })

    this.handler(this.state)
  }
}

export default TouchNSwipeStateManager
