import './_pagination.less'

import React, { FC } from 'react'

import ReactPaginate from 'react-paginate'
import PerPage from '@/components/pagination/perPage'

import NextLabel from '@/components/svg/arrowOutlinedIcon'

type PaginationProps = {
  onPerPageChange: (v: number) => void
  perPage: number
  onPageChange: (n: number) => void
  pageCount: number
  pageRangeDisplayed?: number
  marginPagesDisplayed?: number
  previousLabel?: React.ReactNode
  nextLabel?: React.ReactNode
  breakLabel?: string | React.ReactNode
  breakClassName?: string
  breakLinkClassName?: string
  initialPage?: number
  forcePage?: number
  disableInitialCallback?: boolean
  containerClassName?: string
  pageClassName?: string
  pageLinkClassName?: string
  activeClassName?: string
  activeLinkClassName?: string
  previousClassName?: string
  nextClassName?: string
  previousLinkClassName?: string
  nextLinkClassName?: string
  disabledClassName?: string
  hrefBuilder?(pageIndex: number): void
  extraAriaContext?: string
}

const Pagination: FC<PaginationProps> = ({
  pageCount = 1,
  onPerPageChange,
  perPage = 10,
  onPageChange,
  ...props
}): JSX.Element => {
  return (
    <div className="Pagination">
      <PerPage onChange={onPerPageChange} value={perPage} />
      {!(pageCount < 2) && (
        <ReactPaginate
          {...props}
          pageCount={pageCount}
          pageRangeDisplayed={1}
          marginPagesDisplayed={1}
          // nextLabel=">"
          // previousLabel="<"
          onPageChange={({ selected }) => onPageChange(selected)}
          nextLabel={<NextLabel style={{ fontSize: '0.7em' }} />}
          previousLabel={<NextLabel style={{ fontSize: '0.7em' }} />}
        />
      )}
    </div>
  )
}

export default Pagination
