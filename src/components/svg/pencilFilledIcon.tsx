import * as React from 'react'

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <span className="IconWrapperUI">
      <svg width="1em" height="1em" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
          d="M1.502 14.585a.65.65 0 00-.183.33L.376 19.49a.637.637 0 00.183.585.678.678 0 00.603.176l4.713-.915a.67.67 0 00.341-.177l10.55-10.24-4.714-4.575-10.55 10.24zM20.024 1.18c-1.3-1.261-3.414-1.261-4.713 0l-1.845 1.792 4.713 4.575 1.845-1.791a3.167 3.167 0 000-4.575z"
          fill="currentColor"
        />
      </svg>
    </span>
  )
}

const MemoSvgComponent = React.memo(SvgComponent)
export default MemoSvgComponent
