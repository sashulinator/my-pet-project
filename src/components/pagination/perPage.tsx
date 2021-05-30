import React, { FC } from 'react'

import Select from '@/components/select'

type PerPageProps = {
  onChange: (v: number) => void
  value: number
}

const PerPage: FC<PerPageProps> = ({ onChange, value }): JSX.Element => {
  return (
    <div className="PerPage">
      <span className="perPageLabel f-center-center nowrap">
        Записей на
        <br />
        странице
      </span>

      <Select
        value={value.toString()}
        allowClear={false}
        style={{ width: '9rem' }}
        className="fs20"
        onChange={(v) => onChange(parseInt(v?.toString() || '', 10))}
        options={['10', '25', '50', '100'].map((v) => ({ value: v, label: v }))}
      />
    </div>
  )
}

export default PerPage
