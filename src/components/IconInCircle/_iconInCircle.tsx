import './_iconInCircle.less'

import React, { FC } from 'react'

import c from 'clsx'

import CircleSvg from '@/components/svg/circle'

type IconInCircleProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

const IconInCircle: FC<IconInCircleProps> = ({ children, className, ...props }): JSX.Element => {
  return (
    <div className={c('IconInCircle', className)} {...props}>
      <CircleSvg className="circleSvg" />
      {children}
    </div>
  )
}

export default IconInCircle
