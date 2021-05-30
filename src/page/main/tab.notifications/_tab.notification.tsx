import './_tab.notification.less'

import React, { FC, memo } from 'react'

import UserList from './list/_list'

const Users: FC = (): JSX.Element => {
  return (
    <div className="Notification">
      <UserList />
    </div>
  )
}

const x = memo(Users)
export default x
