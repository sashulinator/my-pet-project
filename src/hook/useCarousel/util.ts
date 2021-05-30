type AnimateArgs = { timing: (tf: number) => number; draw: (tf: number) => void; duration: number }

type Animate = (obj: AnimateArgs) => void

const animate: Animate = ({ timing, draw, duration }) => {
  const start = performance.now()

  window.requestAnimationFrame(function animation(time) {
    let timeFraction = (time - start) / duration

    if (timeFraction > 1) timeFraction = 1

    const progress = timing(timeFraction)
    draw(progress)

    if (timeFraction < 1) {
      requestAnimationFrame(animation)
    }
  })
}

export default animate
