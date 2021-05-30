/* eslint-disable no-nested-ternary */
import './list.less'

import React, { FC, useRef, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import cx from 'clsx'

import Button from '@/components/button'
import LoadingIcon from '@/components/svg/loadingFilledIcon'
import VisibleIcon from '@/components/svg/visibleFilledIcon'

import ROUTES from '@/constant/routes'

import * as notificationActions from '@/store/action/notification'
import * as paramsConfigActions from '@/store/action/paramsConfig'

import { NotificationState, ParamsConfigState, RootState } from '@/type/state'
import { Id, NotificationModel, ParamsConfigModel } from '@/type/model'

import PopupViewConfig from '@/template/popup.viewParamConfig/_popup.viewParamsConfig'

import { apply } from '@/util/paramsConfig'
import { DateTime } from 'luxon'

// import { Link } from 'react-router-dom'

type NotificationListProps = {
  className?: string
  setIsNotificationVisible?: React.Dispatch<React.SetStateAction<boolean>>
  isTab?: boolean
}

const NotificationList: FC<NotificationListProps> = ({ className, setIsNotificationVisible, isTab }): JSX.Element => {
  const dsp = useDispatch()

  const openPopup = useRef<undefined | ((v: boolean) => void)>(undefined)

  const [applyLoadingId, setApplyLoadingId] = useState<Id | null>(null)
  const [viewLoadingId, setViewLoadingId] = useState<Id | null>(null)

  const notificationState = useSelector((s: RootState): NotificationState => s.notificationState)
  const paramsConfigState = useSelector((s: RootState): ParamsConfigState => s.paramsConfigState)

  const { loading, newestList, list } = notificationState

  const isLoading = isTab ? loading.getList : loading.newestList
  const currentList = isTab ? list : newestList

  return (
    <div className={cx('NotificationList', className, !isTab && 'NotificationList absolute appear')}>
      {!isTab && (
        <Button
          style={{ margin: '10px 0', width: '100%', background: 'transparent', color: 'var(--color)', border: 0 }}
          href={ROUTES.NOTIFICATION.PATH}
          onClick={() => setIsNotificationVisible?.(false)}
        >
          Все уведомления
        </Button>
      )}
      <PopupViewConfig setStateRef={openPopup} />
      {isLoading ? (
        'Загрузка...'
      ) : currentList.length ? (
        list.map((iNotif) => {
          return (
            <div
              key={iNotif.id}
              className={cx('messageContainer', !iNotif.isRead && 'new')}
              style={{ cursor: iNotif.configId ? 'pointer' : 'default' }}
              onMouseOver={!iNotif.isRead ? () => onMouseOver(iNotif) : undefined}
            >
              <div className="message margin-bottom-s">{iNotif.message}</div>
              <div className="f">
                <div className="f">
                  <Button
                    className="small actionButton margin-right-xxs"
                    onClick={() => navigateToSearch(iNotif, 'apply')}
                  >
                    {applyLoadingId === iNotif.id && <LoadingIcon className="margin-right-xxs" />}
                    Применить
                  </Button>
                  <Button className="small fs14 actionButton" icon onClick={() => navigateToSearch(iNotif, 'view')}>
                    {viewLoadingId === iNotif.id && <LoadingIcon className="margin-right-xxs" />}
                    <VisibleIcon />
                  </Button>
                </div>
                <div className="notificationDate f-right-center wide">{getFormattedDate(iNotif.createdAt)}</div>
              </div>
            </div>
          )
        })
      ) : (
        <div className="fs20 gray empty">Пусто</div>
      )}
    </div>
  )

  function getFormattedDate(dateStr: string) {
    return DateTime.fromISO(dateStr).toFormat('dd.MM.yyyy HH:mm')
  }

  function navigateToSearch(Notification: NotificationModel, action: string): void {
    const isApply = action === 'apply'

    const ParamsConfig = findParamsConfigLocaly()

    if (ParamsConfig) {
      doAction(ParamsConfig)
    } else {
      if (isApply) setApplyLoadingId(Notification.id)
      else setViewLoadingId(Notification.id)

      dsp(
        paramsConfigActions.get(Notification.configId, {
          onSuccess({ body }) {
            doAction(body)

            setApplyLoadingId(null)
            setViewLoadingId(null)
          },
        }),
      )
    }

    function findParamsConfigLocaly(): ParamsConfigModel | undefined {
      return paramsConfigState.list.find((p) => String(p.id) === String(Notification.configId))
    }

    function doAction(actionParamsConfig: ParamsConfigModel) {
      if (isApply) {
        apply(actionParamsConfig)
      } else {
        dsp(paramsConfigActions.set({ entity: actionParamsConfig }))
        openPopup?.current?.(true)
      }
    }
  }

  function onMouseOver(iNotif: NotificationModel): void {
    const entity = { ...iNotif, isRead: true }

    dsp(
      notificationActions.read(iNotif.id, function onSuccess() {
        dsp(
          notificationActions.set({
            newestList: newestList.map((i) => (String(i.id) === String(entity.id) ? entity : i)),
            list: list.map((i) => (String(i.id) === String(entity.id) ? entity : i)),
          }),
        )
      }),
    )
  }
}

export default NotificationList
