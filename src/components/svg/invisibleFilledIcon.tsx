import * as React from 'react'

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <span className="IconWrapperUI">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 469.44 469.44" width="1em" height="1em" {...props}>
        <path fill="currentColor" d="M231.147 160.373l67.2 67.2.32-3.52c0-35.307-28.693-64-64-64l-3.52.32z" />
        <path
          fill="currentColor"
          d="M234.667 117.387c58.88 0 106.667 47.787 106.667 106.667 0 13.76-2.773 26.88-7.573 38.933l62.4 62.4c32.213-26.88 57.6-61.653 73.28-101.333-37.013-93.653-128-160-234.773-160-29.867 0-58.453 5.333-85.013 14.933l46.08 45.973c12.052-4.693 25.172-7.573 38.932-7.573zM21.333 59.253l48.64 48.64 9.707 9.707C44.48 145.12 16.64 181.707 0 224.053c36.907 93.653 128 160 234.667 160 33.067 0 64.64-6.4 93.547-18.027l9.067 9.067 62.187 62.293 27.2-27.093L48.533 32.053l-27.2 27.2zM139.307 177.12l32.96 32.96c-.96 4.587-1.6 9.173-1.6 13.973 0 35.307 28.693 64 64 64 4.8 0 9.387-.64 13.867-1.6l32.96 32.96c-14.187 7.04-29.973 11.307-46.827 11.307-58.88 0-106.667-47.787-106.667-106.667 0-16.853 4.267-32.64 11.307-46.933z"
        />
      </svg>
    </span>
  )
}

const MemoSvgComponent = React.memo(SvgComponent)
export default MemoSvgComponent
