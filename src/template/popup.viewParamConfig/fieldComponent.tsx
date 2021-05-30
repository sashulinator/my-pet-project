import { Range } from '@/type/model'

import React, { FC } from 'react'

type LeftFieldProps = {
  label: string
  value?: boolean | string | null | Range | JSX.Element
  colon?: boolean
}

export const LeftField: FC<LeftFieldProps> = ({ colon, label, value }): JSX.Element | null => {
  if (!value) return null

  const value1 = isRange(value) ? `${value?.minValue ?? '∞'} - ${value?.maxValue ?? '∞'}` : value
  const label1 = colon ? `${label}:` : label

  return (
    <ol className="fc">
      <div className="wrap f">
        <div>{label1}</div>
        <div>{value1}</div>
      </div>
    </ol>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isRange(value?: any): value is Range {
  return Boolean(
    Object.prototype.hasOwnProperty.call(value, 'minValue') || Object.prototype.hasOwnProperty.call(value, 'maxValue'),
  )
}
