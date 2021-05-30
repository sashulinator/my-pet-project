/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { FC } from 'react'

import c from 'clsx'

import InvisibleIcon from '@/components/svg/invisibleFilledIcon'
import VisibleIcon from '@/components/svg/visibleFilledIcon'

type VisibilitySwitcherProps = {
  isVisible: boolean
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

const VisibilitySwitcher: FC<VisibilitySwitcherProps> = ({ isVisible, className, ...props }): JSX.Element => {
  return (
    <div className={c('VisibilitySwitcher f-center-center', className)} {...props}>
      {isVisible ? <VisibleIcon className="visibilityIcon" /> : <InvisibleIcon className="visibilityIcon" />}
    </div>
  )
}

export default VisibilitySwitcher
