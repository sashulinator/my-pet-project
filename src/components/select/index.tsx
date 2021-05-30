import './default.less'

import './index.less'

import './app.less'

import React, { FC } from 'react'

import cx from 'clsx'

import Select, { SelectProps } from 'rc-select'

import NextLabel from '@/components/svg/arrowOutlinedIcon'

import CloseIcon from './icons/close'
import LoadingIcon from './icons/loading'

type SelectAppProps = SelectProps & {
  className?: string
  wide?: boolean
}

const SelectApp: FC<SelectAppProps> = ({
  className,
  optionLabelProp,
  value,
  clearIcon,
  allowClear = true,
  loading,
  wide,
  ...props
}): JSX.Element => {
  const additionalClassNames = cx(value ? 'rc-select-selected' : 'rc-select-unselected', wide && 'wide')

  const notFoundContent = (
    <div className="fs20 f-center-center" style={{ height: '15rem' }}>
      Пусто
    </div>
  )

  return (
    <Select
      className={cx('SelectApp rc-select-customize-input', className, additionalClassNames)}
      notFoundContent={notFoundContent}
      {...props}
      allowClear={allowClear}
      inputIcon={loading ? <LoadingIcon /> : <NextLabel style={{ transform: 'rotate(90deg)' }} className="iconApp" />}
      clearIcon={clearIcon || <CloseIcon className="iconApp" />}
      value={value === '' ? undefined : value}
      menuItemSelectedIcon=""
    />
  )
}

export function objToOptions(obj: Record<string, string>): Record<'value' | 'label', string>[] {
  return Object.entries(obj).map(([value, label]) => ({ value, label }))
}

export default SelectApp
