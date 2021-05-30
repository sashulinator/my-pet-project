// eslint-disable import/no-extraneous-dependencies

import './_collapseHeader.less'

import React, { FC } from 'react'

import c from 'clsx'

import Skl from '@/components/skelet/_skelet'

import ArrowIcon from '@/components/svg/arrowFilledIcon'

type CollapseHeaderProps = {
  title: string
  icon?: JSX.Element
  className?: string
  noArrow?: boolean
}

const CollapseHeader: FC<CollapseHeaderProps> = ({ title, icon, className, noArrow }): JSX.Element => {
  return (
    <div className={c('CollapseHeader f-left-center', className)}>
      {icon && <span className="collapseHeaderIcon">{icon}</span>}
      <span className="collapseTitle wrap">
        <Skl load={!title}>{title}</Skl>
      </span>
      {title && !noArrow && <ArrowIcon className="collapseArrowIcon" />}
    </div>
  )
}

export default CollapseHeader
