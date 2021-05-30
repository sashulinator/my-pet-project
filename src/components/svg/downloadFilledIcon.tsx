import * as React from 'react'

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <span className="IconWrapperUI">
      <svg width="1em" height="1em" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
          d="M9 11.083a.548.548 0 01-.406-.183L4.656 6.545c-.341-.376-.088-1.003.407-1.003h2.062V.99c0-.546.42-.99.938-.99h1.875c.516 0 .937.444.937.99v4.552h2.063c.494 0 .747.627.406 1.003L9.407 10.9a.548.548 0 01-.407.183zM16.688 15.833H1.313C.589 15.833 0 15.212 0 14.448v-.396c0-.764.589-1.385 1.313-1.385h15.374c.724 0 1.313.621 1.313 1.385v.396c0 .764-.589 1.385-1.313 1.385z"
          fill="currentColor"
        />
      </svg>
    </span>
  )
}

const MemoSvgComponent = React.memo(SvgComponent)
export default MemoSvgComponent
