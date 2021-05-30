import * as React from 'react'

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <span className="IconWrapperUI">
      <svg width="1em" height="1em" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.079 2.377a1.605 1.605 0 00-2.271.01L2.378 8.87c-.625.63-.621 1.647.008 2.271l5.112 5.072c.63.625 1.646.62 2.271-.009l6.43-6.483c.625-.63.621-1.647-.008-2.271l-5.112-5.073zM7.45 1.04a3.516 3.516 0 014.974-.02l5.112 5.072a3.518 3.518 0 01.02 4.975l-1.07 1.08 9.838 9.84a2.308 2.308 0 010 3.262l-1.076 1.076a2.307 2.307 0 01-3.262 0l-9.821-9.823-1.04 1.049a3.516 3.516 0 01-4.974.02L1.04 12.498a3.518 3.518 0 01-.02-4.974L7.451 1.04zm6.06 14.105l9.827 9.827a.397.397 0 00.56 0l1.075-1.074a.397.397 0 000-.56l-9.833-9.835-1.628 1.642zM5.557 9.051l3.465-3.489 1.356 1.347-3.465 3.49L5.556 9.05z"
          fill="currentColor"
        />
      </svg>
    </span>
  )
}

const MemoSvgComponent = React.memo(SvgComponent)
export default MemoSvgComponent
