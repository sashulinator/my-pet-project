import * as React from 'react'

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <span className="IconWrapperUI">
      <svg width="1em" height="1em" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
          d="M17.748 15.026L29.43 3.335A1.944 1.944 0 1026.682.584L15 12.275 3.318.584A1.944 1.944 0 10.57 3.334l11.682 11.692L.57 26.717a1.944 1.944 0 102.748 2.75L15 17.778l11.682 11.69a1.937 1.937 0 002.748 0c.76-.76.76-1.99 0-2.75L17.749 15.026z"
          fill="currentColor"
        />
      </svg>
    </span>
  )
}

const MemoSvgComponent = React.memo(SvgComponent)
export default MemoSvgComponent
