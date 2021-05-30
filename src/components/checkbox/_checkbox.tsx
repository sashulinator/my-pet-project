import './_checkbox.less'

import React, { FC, InputHTMLAttributes } from 'react'

import cx from 'clsx'

import LoadingIcon from '@/components/svg/loadingFilledIcon'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  loading?: boolean
}

const Input: FC<InputProps> = ({ className, loading, color, style, ...props }): JSX.Element => {
  if (loading) {
    return (
      <div className={cx('CheckboxLoading square f-center-center', className, color)} style={style}>
        <LoadingIcon />
      </div>
    )
  }

  return <input type="checkbox" className={cx('Checkbox square', className)} style={style} {...props} />
}

export default Input
