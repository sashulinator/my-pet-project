import * as React from 'react'

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <span className="IconWrapperUI">
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        color="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          d="M12 0C5.372 0 0 5.373 0 12c0 6.628 5.372 12 12 12 6.627 0 12-5.372 12-12 0-6.627-5.373-12-12-12zm0 21.75c-5.385 0-9.75-4.365-9.75-9.75S6.615 2.25 12 2.25c5.384 0 9.75 4.365 9.75 9.75s-4.366 9.75-9.75 9.75zm4.514-11.25H13.5v-3a.75.75 0 00-.75-.75h-1.5a.75.75 0 00-.75.75v3H7.501a.75.75 0 00-.752.75v1.5c0 .415.336.75.752.75H10.5v2.993c0 .414.335.75.75.75h1.5a.75.75 0 00.75-.75V13.5h3.015a.75.75 0 00.752-.75v-1.5a.753.753 0 00-.753-.75z"
          fill="currentColor"
        />
      </svg>
    </span>
  )
}

const MemoSvgComponent = React.memo(SvgComponent)
export default MemoSvgComponent
