import * as React from 'react'

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <span className="IconWrapperUI">
      <svg width="1em" height="1em" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect y={1.5} width={18} height={2} rx={1} fill="currentColor" />
        <path fill="currentColor" d="M3 .5h4v4H3z" />
        <rect width={18} height={2} rx={1} transform="matrix(-1 0 0 1 18 13.5)" fill="currentColor" />
        <path fill="currentColor" d="M9 12.5H5v4h4z" />
        <rect width={18} height={2} rx={1} transform="matrix(-1 0 0 1 18 7.5)" fill="currentColor" />
        <path fill="currentColor" d="M15 6.5h-4v4h4z" />
      </svg>
    </span>
  )
}

const MemoSvgComponent = React.memo(SvgComponent)
export default MemoSvgComponent
