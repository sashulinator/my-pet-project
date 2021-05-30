import './index.less'

import { FieldArrayRenderProps } from 'react-final-form-arrays'
import React, { FC, useRef, useState } from 'react'
import cx from 'clsx'

import Checkbox from '@/components/checkboxButton'
import Input from '@/components/input'
import Button from '@/components/button'
import PlusIcon from '@/components/svg/plusOutlinedIcon'
import { DeepReadonly } from '@/type/util'

type RefillableListProps = {
  className?: string
  placeholder?: string
  list: DeepReadonly<string[]>
  fieldArrayProps: FieldArrayRenderProps<string, HTMLInputElement>
}

const RefillableList: FC<RefillableListProps> = ({ className, list, fieldArrayProps, placeholder }): JSX.Element => {
  const { fields, meta } = fieldArrayProps

  const ref = useRef<null | HTMLInputElement>(null)

  const [initial, setInitial] = useState(true)

  return (
    <div className={cx('RefillableList', className)}>
      <div className="listWrapper">
        {list.map((item, index) => {
          if (!initial && list.length - 1 === index) return null
          return <Checkbox key={item} placeholder={item} onClick={() => fields?.remove(index)} />
        })}
      </div>
      <div className="inputWrapper formItemGroup">
        <Input placeholder={placeholder} onKeyPress={onKeyPress} ref={ref} onChange={onInputChange} />
        <Button icon onClick={submit}>
          <PlusIcon />
        </Button>
      </div>
      <div className="errorWrapper error">{meta.error}</div>
    </div>
  )

  function onInputChange() {
    const value = ref.current?.value || ''
    const index = list.length

    if (initial && value && !list[index + 1]) {
      fields.push(value)
      setInitial(false)
    } else if (!initial && value) {
      fields.update(index - 1, value)
    } else if (list[index] && !value) {
      fields.remove(index)
      setInitial(true)
    }
  }

  function onKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== 'Enter') return
    e.preventDefault()
    submit()
  }

  function submit() {
    if (meta.error) return
    // const value = ref.current?.value || ''
    if (ref.current?.value) ref.current.value = ''
    // fields.push?.(value)
    setInitial(true)
  }
}

export default RefillableList
