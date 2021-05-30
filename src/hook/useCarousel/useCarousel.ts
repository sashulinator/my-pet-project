import { useMemo } from 'react'
import CarouselStateManager, { CarouselStateManagerSettings } from './CarouselStateManager'

type UseCarousel = (c: UseCarouselSettings) => CarouselStateManager

type UseCarouselSettings = CarouselStateManagerSettings

const useCarousel: UseCarousel = (settings) => {
  const carousel = useMemo(() => new CarouselStateManager(settings), [])

  return carousel
}

export default useCarousel
