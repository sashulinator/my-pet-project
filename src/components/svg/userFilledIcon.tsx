import * as React from 'react'

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <span className="IconWrapperUI">
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 11 14"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path d="M5.5 6.847c1.608 0 2.912-1.533 2.912-3.424C8.412 1.533 7.984 0 5.5 0 3.017 0 2.588 1.533 2.588 3.423c0 1.891 1.304 3.424 2.912 3.424zM0 12.074c0-.032 0-.115 0 0zM11 12.164c0-.219 0-.031 0 0zM10.993 11.936c-.054-3.294-.498-3.532-3.899-4.126 0 0-.478.59-1.594.59s-1.594-.59-1.594-.59C.542 8.397.07 8.622.009 11.829c-.005.262-.008.275-.008.245v.346S.811 14 5.5 14c4.69 0 5.499-1.58 5.499-1.58v-.256c0 .019-.003-.017-.006-.228z" />
      </svg>
    </span>
  )
}

const MemoSvgComponent = React.memo(SvgComponent)
export default MemoSvgComponent
