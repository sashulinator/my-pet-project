import React, { FC } from 'react'

import cx from 'clsx'

type SvgComponentProps = React.SVGProps<SVGSVGElement> & {
  role?: string
  onClick?: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void
}

const SvgComponent: FC<SvgComponentProps> = ({
  'aria-label': ariaLabel,
  className,
  role,
  tabIndex,
  onClick,
  ...svgProps
}: React.SVGProps<SVGSVGElement>) => {
  return (
    <span
      className={cx(className, 'IconAppCheck iconApp')}
      aria-label={ariaLabel}
      role={role}
      tabIndex={tabIndex}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onClick={onClick as any}
    >
      <svg viewBox="0 0 24 24" width="14px" height="14px" {...svgProps}>
        <path
          d="M16.293 8.293l-6.294 6.294c.001-.001-2.292-2.294-2.292-2.294a1 1 0 0 0-1.414 1.414l2.294 2.294c.78.78 2.05.777 2.826 0l6.294-6.294a1 1 0 1 0-1.414-1.414z"
          fill="currentColor"
          stroke="none"
        />
      </svg>
    </span>
  )
}

const MemoSvgComponent = React.memo(SvgComponent)
export default MemoSvgComponent
