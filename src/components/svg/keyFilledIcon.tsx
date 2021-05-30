import * as React from 'react'

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <span className="IconWrapperUI KeyOutlinedIconWrapper">
      <svg width="1em" height="1em" viewBox="0 0 211 211" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <g clipPath="url(#prefix__clip0)" fill="currentColor">
          <path d="M150.007 70.908c7.283 0 13.188-5.904 13.188-13.187 0-7.284-5.905-13.188-13.188-13.188s-13.187 5.904-13.187 13.188c0 7.283 5.904 13.187 13.187 13.187z" />
          <path d="M208.724 68.385c-4.402-11.207-12.473-27.377-25.928-40.769C169.388 14.27 153.389 6.43 142.329 2.203c-12.142-4.64-25.94-1.716-35.15 7.452L74.812 41.869c-9.594 9.55-12.36 24.243-6.881 36.562a152.274 152.274 0 005.52 11.17L2.414 160.637A8.244 8.244 0 000 166.466v36.265a8.242 8.242 0 008.242 8.243h36.266a8.242 8.242 0 008.242-8.243v-14.836h14.836a8.242 8.242 0 008.242-8.242v-14.836h14.836a8.242 8.242 0 100-16.484H67.586a8.242 8.242 0 00-8.242 8.242v14.836H44.508a8.242 8.242 0 00-8.242 8.242v14.836H16.484V169.88l73.09-73.09a8.242 8.242 0 001.219-10.103 133.387 133.387 0 01-7.799-14.953c-2.72-6.116-1.334-13.422 3.448-18.182l32.366-32.214a16.626 16.626 0 0117.637-3.737c9.57 3.658 23.363 10.39 34.723 21.698 11.43 11.376 18.388 25.373 22.212 35.11a16.366 16.366 0 01-3.694 17.592l-32.757 32.604c-4.77 4.747-11.89 6.135-18.139 3.536a107.04 107.04 0 01-14.836-7.569 8.241 8.241 0 00-11.336 2.713 8.242 8.242 0 002.713 11.336 123.523 123.523 0 0017.128 8.74c12.422 5.167 26.591 2.39 36.098-7.073l32.757-32.603a32.843 32.843 0 007.41-35.3z" />
        </g>
        <defs>
          <clipPath id="prefix__clip0">
            <path fill="currentColor" d="M0 0h211v211H0z" />
          </clipPath>
        </defs>
      </svg>
    </span>
  )
}

const MemoSvgComponent = React.memo(SvgComponent)
export default MemoSvgComponent