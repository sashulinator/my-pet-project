export type Coordinates = {
  x: number
  y: number
}

export type Time = {
  start: number
  delta: number
  now: number
  end: number | null
}

export type Direction = 'left' | 'right' | 'up' | 'down' | 'mousedown' | 'nomove'

class TouchNSwipeState {
  public coorInitial: Coordinates

  public coorInitialElement: Coordinates

  public previous: TouchNSwipeState | null

  public event: TouchEvent | MouseEvent

  public element: HTMLElement

  public is: { start: boolean; end: boolean; touch: boolean }

  private _timeStart!: number

  constructor(element: HTMLElement, event: TouchEvent | MouseEvent) {
    const coorInit = {
      x: event instanceof MouseEvent ? event.screenX : event?.touches[0].clientX,
      y: event instanceof MouseEvent ? event.screenY : event?.touches[0].clientY,
    }

    const coorInitElement = {
      x: event instanceof MouseEvent ? event.offsetX : event?.targetTouches[0].pageX,
      y: event instanceof MouseEvent ? event.offsetY : event?.targetTouches[0].pageY,
    }

    this.coorInitial = Object.assign(coorInit)

    this.previous = null

    this.coorInitialElement = Object.assign(coorInitElement)

    this.event = event

    this.element = element

    this._timeStart = Date.now()

    this.is = { start: true, end: false, touch: event.type === 'touchstart' }
  }

  public get coorCurrent(): Coordinates {
    if (this.is.end && this.previous) return this.previous.coorCurrent

    return {
      x: this.event instanceof MouseEvent ? this.event.screenX : this.event?.changedTouches[0]?.clientX,
      y: this.event instanceof MouseEvent ? this.event.screenY : this.event?.changedTouches[0]?.clientY,
    }
  }

  public get coorElement(): Coordinates {
    if (this.event instanceof MouseEvent) {
      return {
        x: this.coorInitialElement.x + this.delta.x,
        y: this.coorInitialElement.y + this.delta.y,
      }
    }
    return {
      x: this.event.targetTouches[0].pageX,
      y: this.event.targetTouches[0].pageY,
    }
  }

  public get time(): Time {
    return {
      start: this.is.start ? Date.now() : this._timeStart,
      now: Date.now(),
      end: this.is.end ? Date.now() : null,
      delta: this._timeStart - Date.now(),
    }
  }

  public get deltaAbs(): Coordinates {
    return {
      x: Math.abs(this.delta.x),
      y: Math.abs(this.delta.y),
    }
  }

  public get delta(): Coordinates {
    return {
      x: this.coorCurrent.x - this.coorInitial.x,
      y: this.coorCurrent.y - this.coorInitial.y,
    }
  }

  public get deltaPercent(): Coordinates {
    return {
      x: (this.delta.x * 100) / window.innerWidth,
      y: (this.delta.y * 100) / window.innerHeight,
    }
  }

  public get velocity(): number {
    if (this.is.end && this.previous) return this.previous.velocity
    return Math.abs(Math.sqrt(this.deltaAbs.x ** 2 + this.deltaAbs.y ** 2) / (this.time.delta || 1) || 0)
  }

  public get dir(): Direction {
    if (this.delta.x === 0 && this.delta.x === 0) return 'nomove'

    if (this.deltaAbs.x > this.deltaAbs.y) {
      if (this.delta.x < 0) return 'left'
      return 'right'
    }

    if (this.delta.y < 0) return 'up'
    return 'down'
  }
}

export default TouchNSwipeState
