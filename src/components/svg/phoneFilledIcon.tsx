import * as React from 'react'

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <span className="IconWrapperUI">
      <svg width="1em" height="1em" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
          d="M12.895 9.218c-.864 0-1.71-.135-2.511-.4-.392-.134-.836-.03-1.093.232l-1.59 1.2c-1.823-.973-2.99-2.14-3.95-3.95l1.167-1.552c.294-.294.4-.724.274-1.127a8 8 0 01-.403-2.516C4.79.495 4.294 0 3.684 0H1.105C.495 0 0 .496 0 1.105 0 8.215 5.785 14 12.895 14c.61 0 1.105-.496 1.105-1.105v-2.572c0-.61-.496-1.105-1.105-1.105z"
          fill="currentColor"
        />
      </svg>
    </span>
  )
}

const MemoSvgComponent = React.memo(SvgComponent)
export default MemoSvgComponent
