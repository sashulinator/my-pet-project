/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import React, { useRef } from 'react'

import { UseTableOptions } from 'react-table'

import { Link } from 'react-router-dom'

import { DateTime } from 'luxon'

import Skl from '@/components/skelet/_skelet'
import { MAILING_TYPE } from '@/constant/keyValue'

// import store from '@/index/redux/store'

// import * as mailingTemplateActions from '@/store/action/mailingTemplate'

import { MailingTemplateModel } from '@/type/model.d'

import PopupMailingList, { OnChange } from './popup.mailingList'

const columns: UseTableOptions<MailingTemplateModel & { skl?: true }>['columns'] = [
  {
    Header: 'Шаблон',
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
    Header: 'Время',
    accessor: 'startDate',
    Cell: ({ value, row }): JSX.Element => {
      return (
        <div style={{ width: '25rem' }}>
          <Skl row={row}>{value ? DateTime.fromISO(value).toFormat('MM-dd-yyyy HH:mm') : '—'}</Skl>
        </div>
      )
    },
  },
  {
    Header: 'Событие',
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
    accessor: 'id',
    Cell: (): JSX.Element => {
      const setModalOpenRef = useRef<undefined | OnChange>(undefined)

      return (
        <div className="actionCell wrap f-top-right" style={{ width: '19rem' }}>
          <div>
            <PopupMailingList setStateRef={setModalOpenRef} />
          </div>
          <Link to="#" className="underline" onClick={() => setModalOpenRef.current?.(true)}>
            Название списка рассылки
          </Link>
        </div>
      )
    },
  },
]

export default columns
