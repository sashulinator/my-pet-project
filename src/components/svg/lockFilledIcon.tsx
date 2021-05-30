import * as React from 'react'

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <span className="IconWrapperUI">
      <svg width="1em" height="1em" viewBox="0 0 11 15" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
          d="M9.01 6.082V3.987A3.84 3.84 0 005.176.15 3.84 3.84 0 001.34 3.987v2.095A1.477 1.477 0 00.16 7.527v5.311c0 .814.662 1.476 1.475 1.476h7.082c.814 0 1.475-.662 1.475-1.476v-5.31c0-.713-.507-1.309-1.18-1.446zm-3.18 4.532l.227 1.592a.297.297 0 01-.292.337h-1.18a.296.296 0 01-.292-.336l.228-1.593A1.482 1.482 0 013.7 9.298c0-.813.661-1.476 1.475-1.476.814 0 1.475.663 1.475 1.476 0 .56-.327 1.07-.82 1.316zm1.41-4.562H3.11V3.987c0-1.14.926-2.066 2.065-2.066 1.14 0 2.066.927 2.066 2.066v2.065z"
          fill="currentColor"
        />
      </svg>
    </span>
  )
}

const MemoSvgComponent = React.memo(SvgComponent)
export default MemoSvgComponent
