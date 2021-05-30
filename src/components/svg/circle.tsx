import * as React from 'react'

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M16 0C7.178 0 0 7.178 0 16c0 8.823 7.178 16 16 16s16-7.177 16-16c0-8.822-7.178-16-16-16zm0 29.09C8.782 29.09 2.91 23.219 2.91 16S8.781 2.91 16 2.91 29.09 8.781 29.09 16 23.219 29.09 16 29.09z" />
    </svg>
  )
}

const MemoSvgComponent = React.memo(SvgComponent)
export default MemoSvgComponent
