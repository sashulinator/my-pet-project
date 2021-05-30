import React, { FC } from 'react'

import { ToastContainer } from 'react-toastify'

const NotificationLayer: FC = ({ children }): JSX.Element => {
  return (
    <>
      {children}
      <div className="NotificationLayer fs20">
        <ToastContainer />
      </div>
    </>
  )
}

export default NotificationLayer
