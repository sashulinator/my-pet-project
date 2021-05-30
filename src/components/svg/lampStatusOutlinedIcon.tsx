import * as React from 'react'

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <span className="IconWrapperUI">
      <svg width="1em" height="1em" viewBox="0 0 30 22" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.965 1.63a13.293 13.293 0 00-2.77 4.299A13.678 13.678 0 002.222 11c0 1.74.33 3.464.973 5.071a13.293 13.293 0 002.77 4.3L4.394 22a15.605 15.605 0 01-3.252-5.047A16.057 16.057 0 010 11c0-2.043.388-4.066 1.142-5.953A15.605 15.605 0 014.394 0l1.57 1.63zM26.805 5.929a13.294 13.294 0 00-2.77-4.3L25.606 0a15.605 15.605 0 013.252 5.047A16.058 16.058 0 0130 11c0 2.043-.388 4.066-1.142 5.953A15.605 15.605 0 0125.606 22l-1.57-1.63a13.294 13.294 0 002.77-4.299c.642-1.607.972-3.33.972-5.071 0-1.74-.33-3.464-.973-5.071z"
          fill="currentColor"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M17.38 2.726a8.054 8.054 0 00-5.608.297 8.451 8.451 0 00-4.152 3.92 8.925 8.925 0 00-.811 5.762 8.702 8.702 0 002.897 4.988 8.15 8.15 0 005.291 1.948L15 20.793v-1.152a8.014 8.014 0 003.183-.66 8.259 8.259 0 002.694-1.88l.002-.001a8.779 8.779 0 002.391-5.269 8.889 8.889 0 00-1.374-5.646 8.362 8.362 0 00-4.517-3.46zM15 21.946a10.323 10.323 0 01-6.7-2.469c-1.89-1.602-3.188-3.834-3.67-6.317A11.305 11.305 0 015.659 5.86c1.147-2.236 3.006-3.99 5.26-4.965A10.201 10.201 0 0118.02.52c2.338.73 4.36 2.28 5.72 4.383a11.26 11.26 0 011.742 7.151 11.12 11.12 0 01-3.029 6.672 10.478 10.478 0 01-3.415 2.383c-1.28.553-2.651.838-4.037.838z"
          fill="currentColor"
        />
        <path fillRule="evenodd" clipRule="evenodd" d="M16.11 5.24v6.912h-2.22V5.24h2.22z" fill="currentColor" />
        <path
          d="M15 16.3c.614 0 1.11-.516 1.11-1.152 0-.636-.496-1.152-1.11-1.152-.614 0-1.11.515-1.11 1.152 0 .636.496 1.152 1.11 1.152z"
          fill="currentColor"
        />
      </svg>
    </span>
  )
}

const MemoSvgComponent = React.memo(SvgComponent)
export default MemoSvgComponent