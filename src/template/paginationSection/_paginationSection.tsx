import './_paginationSection.less'

import React, { FC, useEffect, useState } from 'react'

import Button from '@/components/button'
import Pagination from '@/components/pagination/_pagination'

import CheckAll from '@/template/checkAll/_checkAll'

type PaginationSectionProps = {
  paginationProps: {
    onPerPageChange: (v: number) => void
    perPage: number
    onPageChange: (n: number) => void
    pageCount: number
  }
  loading?: unknown
  checkAll?: (e: React.ChangeEvent<HTMLInputElement>) => void
  list: unknown[]
  checkList?: unknown[]
  setIsModalOpen?: React.Dispatch<React.SetStateAction<boolean>>
  typeOfParent?: string
}

const PaginationSection: FC<PaginationSectionProps> = ({
  checkAll,
  list,
  checkList,
  paginationProps,
  setIsModalOpen,
  loading,
  typeOfParent,
}): JSX.Element => {
  const [checkAllIsChecked, setCheckAllIsChecked] = useState<boolean>(false)

  const key: 'id' | 'uuid' = typeOfParent === 'client' ? 'id' : 'uuid'

  useEffect(checkCheckBoxes, [checkList, list])

  function checkCheckBoxes(): void {
    if (checkList) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const listElems = list.map((elem: any) => elem[key])
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const checkListElems = checkList.map((item: any) => item[key])

      for (let i = 0; i < listElems.length; i += 1) {
        if (!checkListElems.includes(listElems[i])) {
          setCheckAllIsChecked(false)
          break
        } else {
          setCheckAllIsChecked(true)
        }
      }
    } else setCheckAllIsChecked(list.length !== 0)
  }

  return (
    <section className="PaginationSection f-spaceBetween relative">
      <Pagination {...paginationProps} />
      <div className="f appear">
        {checkList && (
          <div className="CheckListLength f-center-center bold fs13 absolute">
            {checkList.length ? checkList.length : ''}
          </div>
        )}
        {setIsModalOpen && checkList?.length ? (
          <Button
            className="nowrap margin-right"
            color="primary"
            disabled={!checkList?.length}
            onClick={() => setIsModalOpen(true)}
          >
            Отправить сообщение
          </Button>
        ) : null}
        {!!list?.length && checkAll && <CheckAll checked={checkAllIsChecked} loading={loading} onChange={checkAll} />}
      </div>
    </section>
  )
}

export default PaginationSection
