import './_tab.feedback.less'

import React, { FC, memo } from 'react'

import ROUTES from '@/constant/routes'

import Dialog from './dialog/_dialog'
import List from './list/_list'

const Users: FC = (): JSX.Element => {
  const isDialog = ROUTES.FEEDBACK_DIALOG.isCurrent

  return (
    <div className="FeedbackTab wrap">
      <List />
      <Dialog isCurrent={isDialog} />
    </div>
  )
}

const x = memo(Users)
export default x
