import * as React from 'react'

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <span className="IconWrapperUI">
      <svg width="1em" height="1em" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
          d="M5.734 11.474c1.18 0 2.27-.36 3.182-.967l3.294 3.294a.685.685 0 00.955 0l.641-.64a.685.685 0 000-.956l-3.305-3.283c.607-.91.967-2.001.967-3.182A5.743 5.743 0 005.734.006 5.743 5.743 0 000 5.74a5.736 5.736 0 005.734 5.734zm0-9.22A3.488 3.488 0 019.219 5.74a3.488 3.488 0 01-3.485 3.485A3.488 3.488 0 012.249 5.74a3.488 3.488 0 013.485-3.485z"
          fill="currentColor"
        />
      </svg>
    </span>
  )
}

const MemoSvgComponent = React.memo(SvgComponent)
export default MemoSvgComponent
