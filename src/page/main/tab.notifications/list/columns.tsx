/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useRef, useState } from 'react'

import { UseTableOptions } from 'react-table'

import { useSelector } from 'react-redux'

import { DateTime } from 'luxon'

import Skeleton from 'react-loading-skeleton'

import { apply } from '@/util/paramsConfig'

import Skl from '@/components/skelet/_skelet'

import store from '@/index/redux/store'

import Button from '@/components/button'
import VisibleIcon from '@/components/svg/visibleFilledIcon'

import * as paramsConfigActions from '@/store/action/paramsConfig'

import { ParamsConfigState, RootState } from '@/type/state'
import { NotificationModel, ParamsConfigModel } from '@/type/model'

import PopupViewConfig from '@/template/popup.viewParamConfig/_popup.viewParamsConfig'

const columns: UseTableOptions<NotificationModel & { skl?: true }>['columns'] = [
  // <NotificationModel & { skl?: true }>['columns'] = [
  {
    Header: <div className="wrap f-left">Событие</div>,
    accessor: 'message',
    Cell: ({ value, row }): JSX.Element => {
      return (
        <div title={value} style={{ width: '25rem' }} className="bold">
          <Skl row={row}>{value?.replace('Событие', '')}</Skl>
        </div>
      )
    },
  },
  {
    Header: <div className="wrap f-left">Тип</div>,
    accessor: 'configType',
    Cell: ({ value, row }): JSX.Element => (
      <div title={value} style={{ width: '25rem' }}>
        <Skl row={row}>{CONFIG_TYPE[value]}</Skl>
      </div>
    ),
  },
  {
    Header: <div className="wrap f-left">Дата создания</div>,
    accessor: 'createdAt',
    Cell: ({ value, row }): JSX.Element => (
      <div title={value} style={{ width: '25rem' }}>
        <Skl row={row}>{getFormattedDate(value)}</Skl>
      </div>
    ),
  },
  {
    accessor: 'id',
    Cell: ({ row }): JSX.Element => {
      const openPopup = useRef<undefined | ((v: boolean) => void)>(undefined)
      const [isLoading, setIsLoading] = useState<boolean>(false)
      const [isApplyLoading, setIsApplyLoading] = useState<boolean>(false)
      const paramsConfigState = useSelector((s: RootState): ParamsConfigState => s.paramsConfigState)

      // console.log(row)

      return (
        <div className="actionCell wrap f-top-right">
          {row.original.skl ? (
            <>
              {/* <Skeleton style={{ width: '4rem', height: '4rem' }} /> */}
              <Skeleton style={{ width: '4rem', height: '4rem' }} />
            </>
          ) : (
            <>
              <PopupViewConfig setStateRef={openPopup} />
              <Button
                color="primary"
                icon
                loading={isLoading}
                onClick={() => navigateToSearch((row.original as unknown) as NotificationModel, 'view')}
                className="fs12"
              >
                <VisibleIcon />
              </Button>
              <Button
                color="primary"
                onClick={() => navigateToSearch((row.original as unknown) as NotificationModel, 'apply')}
                loading={isApplyLoading}
              >
                Применить
              </Button>
            </>
          )}
        </div>
      )

      function navigateToSearch(Notification: NotificationModel, action: string): void {
        const isApply = action === 'apply'

        const ParamsConfig = findParamsConfigLocaly()

        if (ParamsConfig) {
          doAction(ParamsConfig)
        } else {
          if (isApply) {
            setIsApplyLoading(true)
          } else {
            setIsLoading(true)
          }

          store.dispatch(
            paramsConfigActions.get(Notification.configId, {
              onSuccess({ body }) {
                doAction(body)
                if (isApply) {
                  setIsApplyLoading(false)
                } else {
                  setIsLoading(false)
                }
              },
              onFail() {
                if (isApply) {
                  setIsApplyLoading(false)
                } else {
                  setIsLoading(false)
                }
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
            store.dispatch(paramsConfigActions.set({ entity: actionParamsConfig }))
            openPopup?.current?.(true)
          }
        }
      }
    },
  },
]

const CONFIG_TYPE = {
  CAR: 'Атомобиль',
  CLIENT: 'Клиент',
}

function getFormattedDate(dateStr: string) {
  if (!dateStr) return ''
  return DateTime.fromISO(dateStr).toFormat('dd.MM.yyyy HH:mm:ss')
}

export default columns
