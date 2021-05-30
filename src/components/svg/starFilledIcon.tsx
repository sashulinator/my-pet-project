import * as React from 'react'

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <span className="IconWrapperUI">
      <svg width="1em" height="1em" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
          d="M7.494.361c.16-.481.853-.481 1.012 0l1.524 4.608a.531.531 0 00.506.36h4.931c.515 0 .73.648.313.946l-3.99 2.847a.517.517 0 00-.193.584l1.524 4.608c.159.481-.402.881-.819.584l-3.99-2.848a.54.54 0 00-.625 0l-3.99 2.848c-.416.297-.977-.103-.818-.584l1.524-4.608a.517.517 0 00-.193-.584L.22 6.275c-.417-.298-.202-.946.313-.946h4.931c.23 0 .435-.145.506-.36L7.494.36z"
          fill="currentColor"
        />
      </svg>
    </span>
  )
}

const MemoSvgComponent = React.memo(SvgComponent)
export default MemoSvgComponent
