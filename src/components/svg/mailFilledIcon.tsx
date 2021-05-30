import * as React from 'react'

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <span className="IconWrapperUI">
      <svg width="1em" height="1em" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
          d="M7.934 7.386a.844.844 0 01-.443.124.844.844 0 01-.443-.124L0 3.103v5.693A2.21 2.21 0 002.214 11h10.572A2.21 2.21 0 0015 8.796V3.103L7.934 7.386z"
          fill="currentColor"
        />
        <path
          d="M12.786 0H2.214C1.169 0 .284.74.07 1.728L7.509 6.24l7.42-4.512A2.198 2.198 0 0012.786 0z"
          fill="currentColor"
        />
      </svg>
    </span>
  )
}

const MemoSvgComponent = React.memo(SvgComponent)
export default MemoSvgComponent
