import * as React from 'react'

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <span className="IconWrapperUI">
      <svg width="1em" height="1em" viewBox="0 0 4 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
          d="M2 .788c-1.07 0-1.939.87-1.939 1.94 0 1.07.87 1.939 1.939 1.939 1.07 0 1.939-.87 1.939-1.939 0-1.07-.87-1.94-1.939-1.94zM2 7.576c-.803 0-1.455.65-1.455 1.454v8.728a1.455 1.455 0 002.91 0V9.03c0-.803-.652-1.454-1.455-1.454z"
          fill="currentColor"
        />
      </svg>
    </span>
  )
}

const MemoSvgComponent = React.memo(SvgComponent)
export default MemoSvgComponent
