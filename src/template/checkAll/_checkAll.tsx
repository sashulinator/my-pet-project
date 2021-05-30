import './_checkAll.less'

import React, { FC } from 'react'

import c from 'clsx'
import CheckboxButton from '@/components/checkboxButton'

type CheckAllProps = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  checked: boolean
  className?: string
  loading?: unknown
}

const CheckAll: FC<CheckAllProps> = ({ className, checked, loading, onChange }): JSX.Element => {
  return (
    <div className={c(className, 'CheckAll fs18 f-center-center')}>
      <CheckboxButton
        loading={!!loading}
        checked={checked}
        className="margin-right"
        onChange={onChange}
        placeholder="Выбрать всех"
      />
    </div>
  )
}

export default CheckAll
