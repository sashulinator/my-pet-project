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
      className={cx(className, 'IconAppLoadingCircle iconApp')}
      aria-label={ariaLabel}
      role={role}
      tabIndex={tabIndex}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onClick={onClick as any}
    >
      <svg
        className="rotateRight"
        fill="currentColor"
        viewBox="0 0 399.389 399.389"
        width="14px"
        height="14px"
        {...svgProps}
      >
        <path d="M340.896 58.489C303.18 20.773 253.031.001 199.693.001c-53.34 0-103.487 20.771-141.204 58.488C20.772 96.207 0 146.355 0 199.694c0 53.34 20.772 103.489 58.49 141.206 37.717 37.717 87.864 58.488 141.204 58.488 53.339 0 103.486-20.771 141.205-58.488 37.717-37.717 58.49-87.865 58.49-141.206-.002-53.339-20.776-103.487-58.493-141.205zM77.457 199.694c0-67.401 54.835-122.236 122.236-122.236S321.93 132.293 321.93 199.694s-54.836 122.237-122.237 122.237S77.457 267.096 77.457 199.694zm250.604 128.369c-34.289 34.287-79.877 53.17-128.368 53.17v-41.147c77.413 0 140.389-62.979 140.389-140.391 0-77.412-62.979-140.391-140.389-140.391-4.593 0-9.134.229-13.615.662V18.655c4.508-.332 9.049-.5 13.615-.5 48.491 0 94.079 18.883 128.368 53.171 34.289 34.289 53.172 79.878 53.172 128.368-.001 48.493-18.883 94.082-53.172 128.369z" />
      </svg>
    </span>
  )
}

const MemoSvgComponent = React.memo(SvgComponent)
export default MemoSvgComponent
