import * as React from 'react'

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <span className="IconWrapperPointer">
      <svg width="2.2em" height="2.2em" viewBox="0 0 42 41" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path fill="#50ACD5" d="M.5.536h40.637v40.03H.5z" />
        <path
          d="M11.638 24.887a.65.65 0 00-.182.33l-.943 4.576a.637.637 0 00.183.585.678.678 0 00.602.176l4.714-.915a.67.67 0 00.341-.178l10.55-10.24-4.714-4.574-10.55 10.24zM30.161 11.483c-1.3-1.262-3.414-1.262-4.713 0l-1.846 1.79 4.714 4.576 1.845-1.791a3.167 3.167 0 000-4.575z"
          fill="#EEEDEE"
        />
      </svg>
    </span>
  )
}

const MemoSvgComponent = React.memo(SvgComponent)
export default MemoSvgComponent
