import React, { FC } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { DefaultValueType } from 'rc-select/lib/interface/generator'
import Select from '@/components/select'

import * as cssVariableActions from '@/store/action/cssVariable'

import { getCurrentThemeName } from '@/util/cssVariables'
import themes from '@/constant/theme'
import { RootState } from '@/type/state'

const ThemeSetter: FC = (): JSX.Element => {
  const dsp = useDispatch()

  const name = useSelector((s: RootState) => s.cssVariableState.name)
  // console.log(getCurrentThemeName())
  // console.log('render')

  return (
    <span className="fs16">
      <Select
        key={name}
        style={{
          width: '20rem',
          minWidth: '5rem',
          marginLeft: '2rem',
        }}
        value={getCurrentThemeName()}
        options={themesToOptions()}
        onChange={onChange}
        allowClear={false}
      />
    </span>
  )

  function themesToOptions() {
    return Object.entries(themes).map(([value, item]) => ({ value, label: item.name }))
  }

  function onChange(themeName: DefaultValueType) {
    dsp(cssVariableActions.setTheme((themeName as unknown) as string))
  }
}

export default ThemeSetter
