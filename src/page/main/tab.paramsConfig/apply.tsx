import React, { FC, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { useParams } from 'react-router-dom'

import cx from 'clsx'

import * as paramConfigActions from '@/store/action/paramsConfig'

import { ParamsConfigState, RootState } from '@/type/state'

import { apply } from '@/util/paramsConfig'

type ApplyParamsConfigProps = {
  className?: string
}

const ApplyParamsConfig: FC<ApplyParamsConfigProps> = ({ className }): JSX.Element => {
  const paramsConfigState = useSelector((s: RootState): ParamsConfigState => s.paramsConfigState)

  const { id } = useParams<{ id: string }>()

  const dsp = useDispatch()

  const msg = paramsConfigState.loading.getList ? 'Загрузка' : 'Перенаправляю'

  useEffect(getParamConfig, [])

  return <div className={cx('ApplyParamsConfig fs20', className)}>{paramsConfigState.error || msg}</div>

  function getParamConfig() {
    dsp(
      paramConfigActions.get(id, {
        onSuccess({ body }) {
          apply(body)
        },
      }),
    )
  }
}

export default ApplyParamsConfig
