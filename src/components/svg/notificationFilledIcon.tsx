import * as React from 'react'

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <span className="IconWrapperUI">
      <svg height="1em" viewBox="0 0 20 20" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
          d="M10 19c-1.354 0-2.5-.7-2.5-2h5c0 1.3-1.146 2-2.5 2zm5.996-7c0 1.5 2.004 1.5 2.004 2.5 0 .5 0 1.5-2.104 1.5H3.984C2 16 2 15 2 14.5c0-1 1.984-1 2-2.5V9c0-4 2.097-6.5 5-6.9V2c0-.6.5-1 1-1s1 .4 1 1v.1c2.903.4 4.996 2.9 4.996 6.9z"
          fill="currentColor"
          fillRule="evenodd"
        />
      </svg>
    </span>
  )
}

const MemoSvgComponent = React.memo(SvgComponent)
export default MemoSvgComponent
