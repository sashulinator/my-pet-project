import './defaultCalendar.less'
import './defaultDatepicker.less'
import './indexDatepicker.less'

import React, { FC } from 'react'

import { DateTime } from 'luxon'

import cx from 'clsx'

import DatePicker, { DatePickerProps } from 'react-date-picker/dist/entry.nostyle'

import CloseIcon from './icons/close'

type DatePickerAppProps = Modify<
  DatePickerProps,
  {
    onChange?: (dt: DateTime | null) => void
    value?: string | DateTime
    minDate?: string
    maxDate?: string
    wide?: boolean
  }
>

const DatePickerApp: FC<DatePickerAppProps> = ({
  className,
  onChange,
  value,
  minDate,
  maxDate,
  wide,
  ...props
}): JSX.Element => {
  const additionalClassName = cx(wide && 'wide', value ? 'set' : 'unset')

  return (
    <DatePicker
      className={cx('DatePickerApp', className, additionalClassName)}
      dayPlaceholder="ДД"
      monthPlaceholder="ММ"
      yearPlaceholder="ГГГГ"
      locale="ru-RU"
      clearIcon={<CloseIcon />}
      {...props}
      calendarIcon={null}
      onChange={onDatePickerChange}
      value={value ? toJSDate(value.toString()) : undefined}
      minDate={minDate ? toJSDate(minDate) : undefined}
      maxDate={maxDate ? toJSDate(maxDate) : undefined}
    />
  )

  function onDatePickerChange(date: Date | Date[]) {
    if (date) {
      onChange?.(DateTime.fromJSDate(date as Date).toUTC())
    } else {
      onChange?.(null)
    }
  }

  function toJSDate(string: string): Date {
    return DateTime.fromISO(string).toJSDate()
  }
}

export default DatePickerApp

type Modify<T, R> = Omit<T, keyof R> & R
