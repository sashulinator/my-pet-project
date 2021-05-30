import * as React from 'react'

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <span className="IconWrapperUI">
      <svg width="1em" height="1em" viewBox="0 0 9 11" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
          d="M8.88 2.079L6.834.115A.406.406 0 006.545 0H1.227C.55 0 0 .528 0 1.179V9.82C0 10.472.55 11 1.227 11h6.546C8.45 11 9 10.472 9 9.821V2.357a.39.39 0 00-.12-.278zm-1.925-.738l.648.623h-.648v-.623zm1.227 8.48a.401.401 0 01-.41.393H1.228a.401.401 0 01-.409-.393V1.18c0-.217.183-.393.41-.393h4.908v1.571c0 .217.184.393.41.393h1.636v7.071z"
          fill="currentColor"
        />
        <path
          d="M1.933 3.793c0-.21.176-.38.395-.38h4.344c.219 0 .395.17.395.38s-.176.38-.395.38H2.328a.387.387 0 01-.395-.38zM1.933 5.619c0-.21.176-.38.395-.38h4.344c.218 0 .395.17.395.38s-.177.379-.395.379H2.328a.387.387 0 01-.395-.38zM1.933 7.444c0-.21.176-.38.395-.38h4.344c.218 0 .395.17.395.38s-.177.38-.395.38H2.328a.387.387 0 01-.395-.38z"
          fill="currentColor"
        />
      </svg>
    </span>
  )
}

const MemoSvgComponent = React.memo(SvgComponent)
export default MemoSvgComponent
