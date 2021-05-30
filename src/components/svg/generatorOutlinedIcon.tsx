import * as React from 'react'

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <span className="IconWrapperUI">
      <svg width="1em" height="1em" viewBox="0 0 23 27" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4.25 2a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zM4 .007A4.25 4.25 0 00.546 6.335l3.072 16.167.124-.024a6.25 6.25 0 1011.727-4.254l-.542-3.382v-.006a5.066 5.066 0 012.865-5.427l.003-.002 2.71-1.232-.02-.044A4.25 4.25 0 0018.5.007V0H4v.007zM7.856 2a4.25 4.25 0 01-4.902 6.299l1.683 8.855A6.242 6.242 0 019.75 14.5c1.187 0 2.297.331 3.242.906l-.038-.242-.001-.003a7.065 7.065 0 013.52-7.322A4.247 4.247 0 0115.142 2H7.857zM18.75 2a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zm-.25 10.5a1 1 0 100 2 1 1 0 000-2zm-3 1a3 3 0 116 0 3 3 0 01-6 0zm-5.75 3a4.25 4.25 0 100 8.5 4.25 4.25 0 000-8.5z"
          fill="currentColor"
        />
      </svg>
    </span>
  )
}

const MemoSvgComponent = React.memo(SvgComponent)
export default MemoSvgComponent
