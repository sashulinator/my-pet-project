import './index.less'

import React, { FC, memo } from 'react'

import { useTable, UseTableOptions } from 'react-table'

import cx from 'clsx'

import { SklList } from '@/components/skelet/_skelet'
import Empty from '@/template/empty/_empty'

type TableProps = {
  className?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: UseTableOptions<Record<any, any> & { skl?: true }>['columns']
  data: { skl?: true } & Record<string, unknown>[]
  loading: unknown
  name: string
}

const Table: FC<TableProps> = ({ columns, className, data, loading, name }): JSX.Element => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    data: SklList(data, !!loading, name),
    columns,
  })

  if (!data.length && !loading) {
    return <Empty />
  }

  return (
    <table className={cx('Table', className)} {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <td width={cell.column.width} {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

const x = memo(Table)
export default x
