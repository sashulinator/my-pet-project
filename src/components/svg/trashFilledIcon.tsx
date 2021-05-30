import * as React from 'react'

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <span className="IconWrapperUI">
      <svg width="1em" height="1em" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
          d="M4.88 17.778c0 1.228.994 2.222 2.222 2.222h7.07a2.222 2.222 0 002.223-2.222l.909-13.334H3.971l.909 13.334zM14.526 1.111L13.415 0H7.859L6.75 1.111h-3.89v2.222h15.556V1.111h-3.889z"
          fill="currentColor"
        />
      </svg>
    </span>
  )
}

const MemoSvgComponent = React.memo(SvgComponent)
export default MemoSvgComponent
