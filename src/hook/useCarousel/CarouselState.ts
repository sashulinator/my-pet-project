import animate from './util'

export type SetVariable = (key: string, value: number) => void

export class CarouselState {
  private _translateX: number

  public slide: number

  private readonly minSwipeVelosity: number

  private readonly maxSwipeVelosity: number

  private setVariable: SetVariable

  public readonly slideAmount: number

  public readonly minDeltaPercentSwipe: number

  constructor(
    setVariable: SetVariable,
    translateX: number,
    slideAmount: number,
    slide: number,
    minSwipeVelosity: number,
    maxSwipeVelosity: number,
    minDeltaPercentSwipe: number,
  ) {
    this.setVariable = setVariable
    this._translateX = translateX
    this.slideAmount = slideAmount
    this.slide = slide
    this.minSwipeVelosity = minSwipeVelosity
    this.maxSwipeVelosity = maxSwipeVelosity
    this.minDeltaPercentSwipe = minDeltaPercentSwipe
  }

  public animate = (velocity = this.maxSwipeVelosity): void => {
    const { diff, translateX } = this

    animate({
      duration: 150 / this.getAnimationVelocity(velocity),
      timing: (tf: number) => {
        return tf
      },
      draw: (progress: number) => {
        this.translateX = diff * progress + translateX
      },
    })
  }

  public async smooth(n: number): Promise<void> {
    this.setVariable('smooth', n)
  }

  private getAnimationVelocity(velocityAr: number): number {
    const velocity = velocityAr < this.minSwipeVelosity ? this.minSwipeVelosity : velocityAr
    return velocityAr > 1 ? 1 : velocity
  }

  get destination(): number {
    return (this.slide / this.slideAmount) * 100
  }

  private get diff(): number {
    return this.destination - this.translateX
  }

  public get translateX(): number {
    return this._translateX
  }

  public set translateX(v: number) {
    this.setVariable('translateX', v)
    this._translateX = v
  }

  public calculateTranslateX(deltaPercentX: number): number {
    return this.destination + deltaPercentX / this.slideAmount
  }

  public isSwipeByVelocity(velosity: number): boolean {
    return this.minSwipeVelosity < velosity
  }

  public isSwipeByDeltaPercent(deltaPercentX: number): boolean {
    return Math.abs(deltaPercentX) > this.minDeltaPercentSwipe
  }

  public swipeOrDoNot = (velocity: number, deltaPercentX: number, dir: string): void => {
    if (this.isSwipeByVelocity(velocity) || this.isSwipeByDeltaPercent(deltaPercentX)) {
      if (!this.isLastSlide && dir === 'left') {
        this.slide += 1
      } else if (!this.isFirstSlide && dir === 'right') {
        this.slide -= 1
      }
    }

    this.animate(velocity)
  }

  get isLastSlide(): boolean {
    return this.slide === this.slideAmount - 1
  }

  get isFirstSlide(): boolean {
    return this.slide === 0
  }
}
