import * as React from 'react'

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <span className="IconWrapperUI">
      <svg width="1em" height="1em" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
          d="M4.247 6.004L.5 2.258a.948.948 0 01-.285-.697c0-.275.095-.508.285-.698L1.08.285A.949.949 0 011.776 0a.95.95 0 01.698.285l5.025 5.017c.19.19.285.423.285.698a.948.948 0 01-.285.697l-5.025 5.018a.949.949 0 01-.698.285.948.948 0 01-.697-.285l-.578-.578a.943.943 0 01-.285-.694.97.97 0 01.285-.701l3.746-3.738z"
          fill="currentColor"
        />
      </svg>
    </span>
  )
}

const MemoSvgComponent = React.memo(SvgComponent)
export default MemoSvgComponent
