/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import React, { useState } from 'react'
import { UseTableOptions } from 'react-table'
import Skeleton from 'react-loading-skeleton'
import { DateTime } from 'luxon'

import Checkbox from '@/components/checkboxButton'
import Skl from '@/components/skelet/_skelet'
import Button from '@/components/button'
import PencilIcon from '@/components/svg/pencilFilledIcon'

import { MAILING_TYPE } from '@/constant/keyValue'
import ROUTES from '@/constant/routes'

import store from '@/index/redux/store'

import { set, update } from '@/store/action/mailingTemplate'

import { MailingTemplateModel } from '@/type/model.d'

const columns: UseTableOptions<MailingTemplateModel & { skl?: true }>['columns'] = [
  {
    Header: <div className="f-left">Шаблон</div>,
    accessor: 'name',
    Cell: ({ value, row }): JSX.Element => {
      return (
        <div title={value} style={{ width: '25rem' }}>
          <span className="bold">
            <Skl row={row}>{value}</Skl>
          </span>
        </div>
      )
    },
  },
  {
    Header: <div className="f-left">Время</div>,
    accessor: 'startDate',
    Cell: ({ value, row }): JSX.Element => {
      return (
        <div style={{ width: '25rem' }}>
          <Skl row={row}>
            {DateTime.fromISO(value).toFormat('MM-dd-yyyy')}
            <br />
            {DateTime.fromISO(row.original.endDate).toFormat('MM-dd-yyyy')}
          </Skl>
        </div>
      )
    },
  },
  {
    Header: <div className="f-left">Событие</div>,
    accessor: 'mailingType',
    Cell: ({ value, row }): JSX.Element => {
      return (
        <div style={{ width: '20rem' }}>
          <Skl row={row}>{MAILING_TYPE[value]}</Skl>
        </div>
      )
    },
  },
  {
    Header: 'Текст',
    accessor: 'text',
    width: '100%',
    Cell: ({ value, row }): JSX.Element => {
      const text = value && value?.length > 60 ? `${value.slice(0, 60)}...` : value

      return (
        <div className="templateText" style={{ width: '100%' }}>
          <Skl row={row}>{text}</Skl>
        </div>
      )
    },
  },
  {
    Header: 'Активность',
    accessor: 'isActive',
    width: '1%',
    Cell: ({ value, row }): JSX.Element => {
      const [changing, setChanging] = useState(false)

      return (
        <div className="wrap f-center">
          {row.original.skl ? (
            <Skeleton style={{ width: '4rem', height: '4rem', margin: '0 auto' }} />
          ) : (
            <Checkbox
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

        store.dispatch(update(buildEntity(), buildOnEnd()))

        function buildEntity() {
          return { ...row.original, isActive: e.target.checked }
        }

        function buildOnEnd() {
          return { onSuccess: () => setChanging(false), onFail: () => setChanging(false) }
        }
      }
    },
  },
  {
    accessor: 'id',
    width: '1%',
    Cell: ({ value: id, row }): JSX.Element => {
      return (
        <div className="actionCell wrap f-top-right">
          <Button
            color="primary"
            href={ROUTES.MAILING_TEMPLATE.PATH.replace(':id', id?.toString() || '')}
            onClick={() => store.dispatch(set({ entity: row.original }))}
            className="fs12"
            icon
          >
            <PencilIcon />
          </Button>
        </div>
      )
    },
  },
]

export default columns
