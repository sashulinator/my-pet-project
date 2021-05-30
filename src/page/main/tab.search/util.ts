import { CarModel } from '@/type/model'

export function buildCarTitle(Car: CarModel): string {
  return `${Car.brand ? Car.brand : ''}${Car.brand && Car.model ? ', ' : ''}${Car.model ? Car.model : ''}${
    Car.carParameter?.issueYear && Car.model ? ', ' : ''
  }${Car.carParameter?.issueYear ? Car.carParameter?.issueYear : ''}`
}
