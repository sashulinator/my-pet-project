import * as React from 'react'

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <span className="IconWrapperUI">
      <svg width="1em" height="1em" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.111 1.923H4.815V0h5.296v1.923zm11.074 0H15.89V0h5.296v1.923zM0 3.846h26V25H0V3.846zM1.926 5.77v17.308h22.148V5.769H1.926zM19.5 12.5v2.644h-1.926V12.5h-2.648v-1.923h2.648V7.933H19.5v2.644h2.648V12.5H19.5zm-8.426 0H3.852v-1.923h7.222V12.5z"
          fill="currentColor"
        />
      </svg>
    </span>
  )
}

const MemoSvgComponent = React.memo(SvgComponent)
export default MemoSvgComponent
