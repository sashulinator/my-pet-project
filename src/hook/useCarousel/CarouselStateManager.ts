import { CarouselState, SetVariable } from './CarouselState'

export type DataOnUserInteraction = {
  dir: 'left' | 'right' | 'up' | 'down' | 'mousedown' | 'nomove'
  velocity: number
  is: {
    start: boolean
    end: boolean
    touch: boolean
  }
  deltaPercent: {
    x: number
    y: number
  }
}

export type CarouselStateManagerSettings = {
  setVariable: SetVariable
  slideAmount: number
  slideDefault?: number
  minSwipeVelosity?: number
  maxSwipeVelosity?: number
  minDeltaSwipe?: number
}

class CarouselStateManager {
  private readonly state: CarouselState

  constructor({
    setVariable,
    slideAmount,
    slideDefault = 0,
    minSwipeVelosity = 0.5,
    maxSwipeVelosity = 1,
    minDeltaSwipe = 40,
  }: CarouselStateManagerSettings) {
    const translateX = (slideDefault / slideAmount) * 100

    this.state = new CarouselState(
      setVariable,
      translateX,
      slideAmount,
      slideDefault,
      minSwipeVelosity,
      maxSwipeVelosity,
      minDeltaSwipe,
    )
  }

  public swipeStart = async (data: DataOnUserInteraction): Promise<void> => {
    this.state.smooth(200)
    this.state.translateX = this.state.calculateTranslateX(-data.deltaPercent.x)
  }

  public swipeListener = (data: DataOnUserInteraction): void => {
    if (data.is.start) this.swipeStart(data)
    else if (data.is.end) this.swipeEnd(data)
    else if (Math.abs(data.deltaPercent.x) > 2) {
      this.state.translateX = this.state.calculateTranslateX(-data.deltaPercent.x)
    }
  }

  private swipeEnd = async (data: DataOnUserInteraction): Promise<void> => {
    if (data.is.touch) await this.state.smooth(0)
    this.state.swipeOrDoNot(data.velocity, data.deltaPercent.x, data.dir)
  }

  public setActiveSlide = async (slide: number, transition?: number): Promise<void> => {
    await this.state.smooth(transition || 500)
    this.state.slide = slide
    this.state.translateX = this.state.destination
    setTimeout(() => this.state.smooth(0), 500)
  }
}

export default CarouselStateManager
