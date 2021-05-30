import * as React from 'react'

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <span className="IconWrapperUI">
      <svg width="1em" height="1em" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.398 23.048L1.446 27 0 25.554l3.952-3.952A12.472 12.472 0 01.978 13.5C.978 6.584 6.584.978 13.5.978c3.09 0 5.918 1.12 8.102 2.974L25.554 0 27 1.446l-3.952 3.952a12.472 12.472 0 012.974 8.102c0 6.916-5.606 12.522-12.522 12.522-3.09 0-5.918-1.12-8.102-2.974zm1.451-1.452a10.434 10.434 0 006.651 2.381c5.787 0 10.477-4.69 10.477-10.477 0-2.525-.893-4.842-2.38-6.65L6.848 21.595zM20.151 5.404A10.434 10.434 0 0013.5 3.023c-5.786 0-10.477 4.69-10.477 10.477 0 2.525.893 4.842 2.38 6.65L20.152 5.405z"
          fill="currentColor"
        />
      </svg>
    </span>
  )
}

const MemoSvgComponent = React.memo(SvgComponent)
export default MemoSvgComponent
