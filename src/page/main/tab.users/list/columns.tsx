/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useState } from 'react'

import { UseTableOptions } from 'react-table'

import Skeleton from 'react-loading-skeleton'

import Checkbox from '@/components/checkboxButton'
import Skl from '@/components/skelet/_skelet'
import Button from '@/components/button'
import PencilIcon from '@/components/svg/pencilFilledIcon'

import { ROLES, PERMISSIONS } from '@/constant/keyValue'
import ROUTES from '@/constant/routes'

import store from '@/index/redux/store'

import * as userActions from '@/store/action/user'

import { UserModel } from '@/type/model'
import { useSelector } from 'react-redux'
import { RootState } from '@/type/state'

const columns: UseTableOptions<UserModel & { skl?: true }>['columns'] = [
  // <UserModel & { skl?: true }>['columns'] = [
  {
    Header: 'ФИО',
    accessor: 'firstName',
    Cell: ({ value, row }): JSX.Element => {
      return (
        <div title={`${row.original.lastName} ${value} ${row.original.middleName}`} style={{ width: '25rem' }}>
          <p className="bold overflow-ellipsis">
            <Skl row={row}>{row.original.lastName}</Skl>
          </p>
          <p className="nowrap overflow-ellipsis">
            <Skl row={row}>{value}</Skl>
            &nbsp;
            <Skl row={row}>{row.original.middleName}</Skl>
          </p>
        </div>
      )
    },
  },
  {
    Header: 'Роль',
    accessor: 'role',
    Cell: ({ value, row }): JSX.Element => (
      <div className="overflow-ellipsis" style={{ width: '25rem' }}>
        <Skl row={row}>{ROLES[value]}</Skl>
      </div>
    ),
  },
  {
    Header: 'Доступ',
    accessor: 'permissions',
    Cell: ({ value: permissions, row }): JSX.Element => {
      return (
        <div className="overflow-ellipsis" style={{ width: '25rem' }}>
          <Skl row={row}>
            {permissions?.map(
              (iP: string): JSX.Element => (
                <p key={iP} className="nowrap">
                  <Skl>{PERMISSIONS[iP as keyof typeof PERMISSIONS]}</Skl>
                </p>
              ),
            )}
          </Skl>
        </div>
      )
    },
  },
  {
    Header: 'Email',
    accessor: 'email',
    Cell: ({ value, row }): JSX.Element => (
      <div title={value} className="overflow-ellipsis" style={{ width: '25rem' }}>
        <a href={`mailto:${value}`} className="underline">
          <Skl row={row}>{value}</Skl>
        </a>
      </div>
    ),
  },
  {
    Header: <span className="nowrap">Последний вход</span>,
    accessor: 'lastEntry',
    Cell: ({ value, row }): JSX.Element => (
      <div className="overflow-ellipsis" style={{ width: '20rem' }}>
        <Skl row={row}>{value}</Skl>
      </div>
    ),
  },
  {
    Header: 'Активность',
    accessor: 'enabled',
    width: '1%',
    Cell: ({ value: status, row }): JSX.Element => {
      const [changing, setChanging] = useState(false)

      const list = useSelector((s: RootState): UserModel[] => s.userState.list)

      return (
        <div className="wrap f-center" style={{ width: '10rem' }}>
          {row.original.skl ? (
            <Skeleton style={{ width: '4rem', height: '4rem' }} />
          ) : (
            <Checkbox
              color={status ? 'primary' : 'default'}
              checked={status}
              type="checkbox"
              className="selectClientCheckbox absolute"
              onChange={toggleActive}
              loading={changing}
            />
          )}
        </div>
      )

      function toggleActive(e: React.ChangeEvent<HTMLInputElement>) {
        setChanging(true)

        const entity = {
          ...row.original,
          enabled: e.target.checked,
        }

        store.dispatch(
          userActions.toggleActive(
            entity.collaboratorId,
            e.target.checked ? 'enable' : 'block',
            function onSuccess() {
              setChanging(false)
              store.dispatch(
                userActions.set({
                  list: list.map((i) => (String(i.collaboratorId) === String(entity.collaboratorId) ? entity : i)),
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                } as any),
              )
            },
            function onFail() {
              setChanging(false)
            },
          ),
        )
      }
    },
  },
  {
    accessor: 'collaboratorId',
    Cell: ({ value: id, row }): JSX.Element => {
      return (
        <div className="actionCell wrap f-top-right">
          {row.original.skl ? (
            <Skeleton style={{ width: '4rem', height: '4rem' }} />
          ) : (
            <Button
              href={ROUTES.USER.PATH.replace(':id', id?.toString())}
              onClick={() => store.dispatch(userActions.set(row.original))}
              className="fs12"
              icon
            >
              <PencilIcon />
            </Button>
          )}
        </div>
      )
    },
  },
]

export default columns
