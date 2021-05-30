/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useRef, useState } from 'react'

import { Column } from 'react-table'

import { useSelector } from 'react-redux'

import Skeleton from 'react-loading-skeleton'

import Skl from '@/components/skelet/_skelet'
import Button from '@/components/button'
import CheckboxButton from '@/components/checkboxButton'
import PencilIcon from '@/components/svg/pencilFilledIcon'
import VisibleIcon from '@/components/svg/visibleFilledIcon'

import ROUTES from '@/constant/routes'

import store from '@/index/redux/store'

import * as paramsConfigActions from '@/store/action/paramsConfig'

import { ParamsConfigModel } from '@/type/model'
import { RootState } from '@/type/state'

import PopupViewConfig from '@/template/popup.viewParamConfig/_popup.viewParamsConfig'

const columns: Column<ParamsConfigModel & { skl?: true }>[] = [
  {
    Header: 'Название',
    accessor: 'name',
    width: '20%',
    Cell: ({ value, row }): JSX.Element => {
      return (
        <div className="bold" title={value} style={{ width: '100%' }}>
          <Skl row={row}>{value}</Skl>
        </div>
      )
    },
  },
  {
    Header: 'Тип',
    accessor: 'catalogConfigType',
    width: '20%',
    Cell: ({ row, value }): JSX.Element => {
      return (
        <div style={{ width: '100%' }}>
          <Skl row={row}>{value?.name ?? ''}</Skl>
        </div>
      )
    },
  },
  {
    Header: 'Email',
    accessor: 'mails',
    width: '20%',
    Cell: ({ value, row }): JSX.Element => (
      <div title={value?.join('; ')} className="overflow-ellipsis" style={{ width: '23rem' }}>
        <a href={`mailto:${value}`} className="underline">
          <Skl row={row}>{value?.join('; ')}</Skl>
        </a>
      </div>
    ),
  },
  {
    Header: 'Шаблон поиска',
    accessor: 'isSearchTemplate',
    width: '10%',
    Cell: ({ value, row }): JSX.Element => {
      const [changing, setChanging] = useState(false)

      return (
        <div>
          <CheckboxButton
            style={{ margin: 'auto' }}
            skeleton={row.original.skl}
            loading={changing}
            checked={value}
            onChange={toggleActive}
          />
        </div>
      )

      function toggleActive(e: React.ChangeEvent<HTMLInputElement>) {
        setChanging(true)

        const entity = buildEntity()

        const onEnd = () => setChanging(false)

        store.dispatch(paramsConfigActions.updateAlsoLocaly(entity, { onSuccess: onEnd, onFail: onEnd }))

        function buildEntity() {
          return {
            ...row.original,
            isSearchTemplate: e.target.checked,
            catalogConfigTypeId: row.original.catalogConfigType.id,
          }
        }
      }
    },
  },
  {
    Header: 'Получать уведомления',
    accessor: 'isNotifyInProfile',
    width: '10%',
    Cell: ({ value, row }): JSX.Element => {
      const [changing, setChanging] = useState(false)

      const list = useSelector((s: RootState): ParamsConfigModel[] => s.paramsConfigState.list)

      return (
        <div className="wrap f-center">
          {row.original.skl ? (
            <Skeleton style={{ width: '4rem', height: '4rem', margin: '0 auto' }} />
          ) : (
            <CheckboxButton
              style={{ margin: '0 auto' }}
              loading={changing}
              checked={value}
              type="checkbox"
              color={value ? 'primary' : 'default'}
              className="selectClientCheckbox absolute"
              onChange={toggleActive}
            />
          )}
        </div>
      )

      function toggleActive(e: React.ChangeEvent<HTMLInputElement>) {
        setChanging(true)

        const entity = {
          ...row.original,
          isNotifyInProfile: e.target.checked,
          catalogConfigTypeId: row.original.catalogConfigType.id,
        }

        store.dispatch(
          paramsConfigActions.update(entity, {
            onSuccess() {
              setChanging(false)
              store.dispatch(
                paramsConfigActions.set({ list: list.map((i) => (String(i.id) === String(entity.id) ? entity : i)) }),
              )
            },
            onFail() {
              setChanging(false)
            },
          }),
        )
      }
    },
  },
  {
    Header: 'Активность',
    accessor: 'isActive',
    width: '10%',
    Cell: ({ value, row }): JSX.Element => {
      const [changing, setChanging] = useState(false)
      const list = useSelector((s: RootState): ParamsConfigModel[] => s.paramsConfigState.list)

      return (
        <div className="wrap f-center">
          {row.original.skl ? (
            <Skeleton style={{ width: '4rem', height: '4rem', margin: '0 auto' }} />
          ) : (
            <CheckboxButton
              style={{ margin: '0 auto' }}
              loading={changing}
              checked={value}
              type="checkbox"
              color={value ? 'primary' : 'default'}
              className="selectClientCheckbox absolute"
              onChange={toggleActive}
            />
          )}
        </div>
      )

      function toggleActive(e: React.ChangeEvent<HTMLInputElement>) {
        setChanging(true)

        const entity = {
          ...row.original,
          isActive: e.target.checked,
          catalogConfigTypeId: row.original.catalogConfigType.id,
        }

        store.dispatch(
          paramsConfigActions.update(entity, {
            onSuccess() {
              setChanging(false)
              store.dispatch(
                paramsConfigActions.set({ list: list.map((i) => (String(i.id) === String(entity.id) ? entity : i)) }),
              )
            },
            onFail() {
              setChanging(false)
            },
          }),
        )
      }
    },
  },
  {
    accessor: 'id',
    width: '10%',
    Cell: ({ value: id, row }): JSX.Element => {
      const openPopup = useRef<undefined | ((v: boolean) => void)>(undefined)

      return (
        <div className="actionCell wrap f-top-right">
          {row.original.skl ? (
            <>
              <Skeleton style={{ width: '4rem', height: '4rem' }} />
              <Skeleton style={{ width: '4rem', height: '4rem' }} />
            </>
          ) : (
            <>
              <PopupViewConfig setStateRef={openPopup} />
              <Button color="primary" icon onClick={viewConfig} className="fs12">
                <VisibleIcon />
              </Button>
              <Button
                color="primary"
                icon
                href={ROUTES.PARAMS_CONFIG_EDIT.PATH.replace(':id', id.toString())}
                onClick={() => store.dispatch(paramsConfigActions.set({ entity: row.original }))}
                className="fs12"
              >
                <PencilIcon />
              </Button>
            </>
          )}
        </div>
      )

      function viewConfig() {
        store.dispatch(paramsConfigActions.set({ entity: row.original }))
        openPopup.current?.(true)
      }
    },
  },
]

export default columns
