import * as React from 'react'

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <span className="IconWrapperUI">
      <svg width="1em" height="1em" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
          d="M6.76 5.214c0-.08-.04-.17-.1-.23L1.978.301a.346.346 0 00-.232-.1c-.08 0-.17.04-.23.1l-.503.503c-.06.06-.1.15-.1.23 0 .081.04.171.1.232l3.948 3.947-3.948 3.948c-.06.06-.1.15-.1.23 0 .091.04.172.1.232l.502.502c.06.06.151.1.231.1.08 0 .171-.04.232-.1l4.68-4.68c.06-.061.1-.151.1-.232z"
          fill="currentColor"
        />
      </svg>
    </span>
  )
}

const MemoSvgComponent = React.memo(SvgComponent)
export default MemoSvgComponent
