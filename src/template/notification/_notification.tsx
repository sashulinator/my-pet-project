/* eslint-disable jsx-a11y/anchor-is-valid */

import './_notification.less'

import React, { FC, useCallback, useEffect, useMemo, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import cx from 'clsx'

import NotificationIcon from '@/components/svg/notificationFilledIcon'

import * as notificationActions from '@/store/action/notification'

import NotificationList from '@/template/notification/list'

import { RootState } from '@/type/state'

type NotificationProps = {
  className?: string
}

const Notification: FC<NotificationProps> = ({ className }): JSX.Element => {
  const dsp = useDispatch()

  const [isNotificationVisible, setIsNotificationVisible] = useState(false)

  const { notificationState } = useSelector((s: RootState) => s)
  const { list, newestList } = notificationState

  const unreadList = useMemo(() => list?.concat(newestList).filter((iNotif) => !iNotif.isRead), [list, newestList])

  useEffect(addListener, [isNotificationVisible])
  useEffect(getNotification, [])

  const onClickOutside = useCallback((e) => {
    if (!e.target.closest('.clickable')) setIsNotificationVisible(false)
  }, [])

  return (
    <div className={cx('Notification tall', className, isNotificationVisible && 'notificationListVisible')}>
      <a className="notificationWrapper tall" onClick={() => setIsNotificationVisible(!isNotificationVisible)}>
        {unreadList.length ? <div className="count">{unreadList.length}</div> : null}
        <NotificationIcon className="notificationIcon" />
      </a>
      {isNotificationVisible && (
        <NotificationList className="clickable" setIsNotificationVisible={setIsNotificationVisible} />
      )}
    </div>
  )

  function addListener() {
    if (isNotificationVisible) {
      document.addEventListener('click', onClickOutside)
    } else {
      document.removeEventListener('click', onClickOutside)
    }
  }

  function getNotification() {
    if (!list.length) {
      dsp(notificationActions.getNewestList())
    }

    setInterval(() => {
      dsp(notificationActions.refreshList())
    }, 1000 * 60 * 5) // 5min
  }
}

export default Notification
