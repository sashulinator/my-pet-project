import * as React from 'react'

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <span className="IconWrapperUI">
      <svg width="1em" color="currentColor" height="1em" viewBox="0 0 478.125 478.125" {...props}>
        <path
          fill="currentColor"
          d="M439.875 86.062H38.25C17.212 86.062 0 103.275 0 124.312v229.5c0 21.037 17.212 38.25 38.25 38.25h401.625c21.037 0 38.25-17.213 38.25-38.25v-229.5c0-21.037-17.213-38.25-38.25-38.25zm-9.563 19.126l-191.25 166.388-191.25-166.388h382.5zM24.862 367.2c-3.825-3.825-5.737-7.65-5.737-13.388v-229.5c0-5.737 1.913-9.562 5.737-13.388l147.263 128.138L24.862 367.2zm22.95 5.738L187.425 252.45l51.638 43.987L290.7 252.45l139.612 120.487h-382.5zM459 353.812c0 5.737-1.912 9.562-5.737 13.388L306 239.062l147.263-128.138c3.825 3.825 5.737 7.65 5.737 13.388v229.5z"
        />
      </svg>
    </span>
  )
}

const MemoSvgComponent = React.memo(SvgComponent)
export default MemoSvgComponent
