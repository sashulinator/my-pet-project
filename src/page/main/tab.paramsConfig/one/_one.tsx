import './_one.less'

import React, { FC, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { Form } from 'react-final-form'
import { FieldArray } from 'react-final-form-arrays'
import arrayMutators from 'final-form-arrays'

import Input from '@/components/input'
import Checkbox from '@/components/checkboxButton'
import Button from '@/components/button'
import Select from '@/components/select'
import FieldApp from '@/components/field'
import RefillableList from '@/components/refillableList'

import ROUTES from '@/constant/routes'

import { required, validateEmail } from '@/helper/validate'

import * as paramConfigActions from '@/store/action/paramsConfig'
import * as configTypeCatalogActions from '@/store/action/configTypeCatalog'

import { ParamsConfigModel } from '@/type/model'
import { ConfigTypeCatalogState, ParamsConfigState, RootState } from '@/type/state'

const ParamsConfig: FC = (): JSX.Element => {
  const dsp = useDispatch()

  const { id } = useParams<{ id: string }>()

  const isCreate = ROUTES.PARAMS_CONFIG_CREATE.isCurrent || ROUTES.PARAMS_CONFIG_CREATE.isPrevious

  const history = useHistory()

  const paramsConfigState = useSelector((s: RootState): ParamsConfigState => s.paramsConfigState)
  const configTypeCatalogState = useSelector((s: RootState): ConfigTypeCatalogState => s.configTypeCatalogState)

  const catalogTypeIdOptions = useMemo(buildCatalogConfigTypeIdOptions, [configTypeCatalogState])
  const initialValues = useMemo(buildInitialValues, [paramsConfigState.entity])

  useEffect(() => getMailingTemplate(), [])
  useEffect(() => getConfigTypeCatalog(), [])

  return (
    <div className="ParamsConfig scrollableContent wrap">
      <section className="first">
        <h1>
          {isCreate ? 'Создать' : 'Редактировать'}
          &nbsp; событие
        </h1>
      </section>
      <section className="last">
        <Form<ParamsConfigModel>
          onSubmit={onSubmit}
          initialValues={initialValues}
          mutators={{ ...arrayMutators }}
          render={({ handleSubmit, form }) => (
            <form onSubmit={handleSubmit} className="fc fs18">
              <div className="margin-bottom">
                <FieldApp name="name" validate={required}>
                  <Input placeholder="Название" wide />
                </FieldApp>
              </div>
              <div className="margin-bottom">
                <FieldApp name="catalogConfigTypeId" validate={required}>
                  <Select placeholder="Тип события" options={catalogTypeIdOptions} wide />
                </FieldApp>
              </div>
              <div className="fc" style={{ width: '50%' }}>
                <FieldApp name="isNotifyInProfile" type="checkbox" className="margin-bottom">
                  <Checkbox placeholder="Уведомлять в профиле" />
                </FieldApp>

                <FieldApp name="isSearchTemplate" type="checkbox" className="margin-bottom">
                  <Checkbox placeholder="Использовать как шаблон для поиска" />
                </FieldApp>
              </div>
              <div className="fc margin-bottom-s" style={{ width: '50%' }}>
                <FieldApp name="isNotifyByEmail" type="checkbox">
                  <Checkbox placeholder="Уведомлять по email" />
                </FieldApp>
              </div>

              {form.getState().values.isNotifyByEmail && (
                <div className="fc emailSection margin-bottom-s">
                  <FieldArray name="mails" validate={validateEmail}>
                    {(props) => {
                      return (
                        <RefillableList
                          list={form.getState().values.mails || []}
                          placeholder="email"
                          fieldArrayProps={props}
                        />
                      )
                    }}
                  </FieldArray>
                </div>
              )}

              <div className="f wrap margin-top-s">
                <Button type="submit" color="primary">
                  Сохранить
                </Button>
              </div>
            </form>
          )}
        />
      </section>
    </div>
  )

  function getMailingTemplate() {
    if (!paramsConfigState.entity && id && !isCreate) {
      dsp(paramConfigActions.get(id))
    }
  }

  function getConfigTypeCatalog() {
    dsp(configTypeCatalogActions.getList())
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function onSubmit(values: any) {
    dsp(
      paramConfigActions[isCreate ? 'create' : 'update'](values, {
        onSuccess() {
          history.push(ROUTES.PARAMS_CONFIG_LIST.PATH)
          dsp(paramConfigActions.getList(paramsConfigState.filter))
        },
      }),
    )
  }

  function buildInitialValues() {
    const { entity } = paramsConfigState

    return {
      ...entity,
      catalogConfigTypeId: entity?.catalogConfigType.id.toString(),
    }
  }

  function buildCatalogConfigTypeIdOptions() {
    return configTypeCatalogState.list.map((i) => ({ label: i.name, value: i.id.toString() }))
  }
}

export default ParamsConfig
