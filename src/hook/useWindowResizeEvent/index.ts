import { useEffect, useState, useRef } from 'react'

function useWindowResize(): [number, number, React.MutableRefObject<null>] {
  const ref = useRef(null)

  const $el = ref.current || document.documentElement

  const [width, setWidth] = useState($el.clientWidth)
  const [height, setHeight] = useState($el.clientWidth)

  useEffect(() => {
    $el.addEventListener('resize', () => {
      setWidth($el.clientWidth)
      setHeight($el.clientHeight)
    })
  }, [])

  return [width, height, ref]
}

export default useWindowResize
