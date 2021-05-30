/* eslint-disable  @typescript-eslint/no-explicit-any */
import React, { FC, useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { Form, Field } from 'react-final-form'

import { isEqual } from 'lodash'

import cx from 'clsx'

import Portal from '@/components/popup/_popup'

import Button from '@/components/button'
import Input from '@/components/input'
import Checkbox from '@/components/checkboxButton'
import Select from '@/components/select'
import PlusOutline from '@/components/svg/plusOutlinedIcon'
import CloseCircleOutlined from '@/components/svg/closeCircleOutlined'

import ROUTES from '@/constant/routes'

import { required } from '@/helper/validate'

// import PopupEvents from '@/page/main/tab.mailing/template/_popupEvents'

import * as configTypeCatalogActions from '@/store/action/configTypeCatalog'
import * as paramsConfigActions from '@/store/action/paramsConfig'

import { ConfigTypeCatalogState, RootState } from '@/type/state'

// import { ParamsConfigModel } from '@/type/model'
type PopupSaveTemplateProps = {
  stateRef?: React.MutableRefObject<undefined | boolean>
  setStateRef?: React.MutableRefObject<undefined | ((v: boolean) => void)>
  params: {
    carParams?: any
    clientParams?: any
  }
}

const PopupSaveTemplate: FC<PopupSaveTemplateProps> = ({ params, stateRef, setStateRef }): JSX.Element => {
  const dsp = useDispatch()

  const [isOpen, setIsOpen] = useState(false)

  const [formState, setFormState] = useState<any>({
    params,
    configType: ROUTES.SEARCH_CLIENT.isCurrent ? 'CLIENT' : 'CAR',
    mails: [],
  })

  // const paramsConfigState = useSelector((s: RootState): ParamsConfigState => s.paramsConfigState)
  const configTypeCatalogState = useSelector((s: RootState): ConfigTypeCatalogState => s.configTypeCatalogState)

  stateRef = stateRef || { current: undefined }
  setStateRef = setStateRef || { current: undefined }

  stateRef.current = isOpen
  setStateRef.current = setIsOpen

  useEffect(() => getConfigTypeCatalog(), [])

  return (
    <>
      <Portal
        title="Сохранить как шаблон для поиска"
        onClose={() => {
          setIsOpen(false)
          updateForm()
        }}
        isOpen={isOpen}
        top
      >
        <Form
          initialValues={formState}
          validate={validateConfigTypeName}
          onSubmit={onSubmit}
          render={({ handleSubmit, form }) => {
            return (
              <form onSubmit={handleSubmit} className="popupSendMessageForm fc-center-center fs18 margin-top">
                <Field name="name" validate={required}>
                  {({ input, meta }) => (
                    <div className="formField f-center-center margin-bottom-s">
                      <Input {...input} type="text" placeholder="Название шаблона" wide />
                      {meta.touched && meta.error && <span className="fieldError">{meta.error}</span>}
                    </div>
                  )}
                </Field>

                <Field name="isSearchTemplate" type="checkbox">
                  {({ input }) => (
                    <div className="formField f-center-center margin-bottom">
                      <Checkbox placeholder="Использовать как шаблон" {...input} wide />
                    </div>
                  )}
                </Field>

                <Field name="catalogConfigTypeId">
                  {({ input, meta }) => (
                    <div className="formField f-center-center margin-bottom-s">
                      <Select
                        disabled={Boolean(form.getFieldState('newConfigType')?.value)}
                        placeholder="Тип события"
                        options={getCatalogTypes()}
                        wide
                        {...input}
                      />
                      {meta.touched && meta.error && <span className="fieldError">{meta.error}</span>}
                    </div>
                  )}
                </Field>
                <Field name="newConfigType">
                  {({ input, meta }) => (
                    <div className="formField f-center-center margin-bottom">
                      <Input {...input} wide placeholder="Новый тип" />
                      {meta.touched && meta.error && <span className="fieldError">{meta.error}</span>}
                    </div>
                  )}
                </Field>

                <Field name="isNotifyByEmail" type="checkbox">
                  {({ input }) => (
                    <div
                      className={cx(
                        'formField f-center-center margin-bottom',
                        form.getState().values.isNotifyByEmail && 'margin-bottom1',
                      )}
                    >
                      <Checkbox id="isNotifyByEmail" placeholder="Уведомлять по email" wide {...input} />
                    </div>
                  )}
                </Field>
                {formState.isNotifyByEmail && (
                  <div className="mailsFiled">
                    <Field name="emails" validate={validateEmail}>
                      {({ input, meta }) => (
                        <div className="formField f-center-center margin-bottom">
                          <input
                            {...input}
                            type="text"
                            placeholder="Emails"
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault()
                                addMail(form.getFieldState('emails')?.value)
                              }
                            }}
                          />
                          {meta.touched && meta.error && <span className="fieldError">{meta.error}</span>}
                        </div>
                      )}
                    </Field>
                    <div className="margin-bottom" onClick={() => addMail(form.getFieldState('emails')?.value)}>
                      <PlusOutline className="primary" />
                    </div>
                  </div>
                )}
                {formState.isNotifyByEmail &&
                  formState.mails.map((item: string, index: number) => (
                    <div className="mailList" key={item}>
                      <span>{item}</span>
                      <CloseCircleOutlined onClick={() => deleteMail(index)} />
                    </div>
                  ))}

                {formState.isNotifyByEmail && formState.mails.length > 0 && <div className="margin-bottom"> </div>}
                <Field name="isNotifyInProfile" type="checkbox">
                  {({ input }) => (
                    <div className="formField f-center-center margin-bottom">
                      <Checkbox id="isNotifyInProfile" placeholder="Уведомлять в профиле" wide {...input} />
                    </div>
                  )}
                </Field>

                <div className="f-right-center wrap">
                  <Button type="submit">Сохранить</Button>
                </div>
              </form>
            )
          }}
        />
      </Portal>
    </>
  )

  function validateConfigTypeName(v: any): any {
    if (!isEqual(formState, v)) setFormState({ ...v })

    let emails
    if (v.isNotifyByEmail && formState.mails.length === 0) {
      emails = 'Добавьте адреса рассылки'
    }

    if (!v.catalogConfigTypeId && !v.newConfigType) {
      return {
        catalogConfigTypeId: 'Укажите тип события или создайте новое',
        newConfigType: 'Укажите тип события или создайте новое',
        emails,
      }
    }
    return { emails }
  }

  function getCatalogTypes() {
    return configTypeCatalogState.list.map((i) => ({
      label: i.name,
      value: String(i.id),
    }))
  }

  function getConfigTypeCatalog() {
    dsp(configTypeCatalogActions.getList())
  }

  function onSubmit(values: any): void {
    values.params = params

    const modifiedValue = values

    delete modifiedValue.emails

    if (!modifiedValue.isNotifyByEmail) modifiedValue.mails = []

    if (values.newConfigType) {
      dsp(
        configTypeCatalogActions.create(modifiedValue.newConfigType, function onSuccess(responseBody) {
          createParamConfig({ ...modifiedValue, catalogConfigTypeId: responseBody.body.id })
        }),
      )
    } else {
      createParamConfig(modifiedValue)
    }

    function createParamConfig(v: any) {
      const isEventTrackerConfig = Boolean(v.isNotifyInProfile || v.isNotifyByEmail || v.isSendPushNotifications)

      dsp(
        paramsConfigActions.create(
          {
            ...v,
            isEventTrackerConfig,
          },
          {
            onSuccess: () => {
              setIsOpen(false)
              updateForm()
              dsp(paramsConfigActions.getList())
            },
          },
        ),
      )
    }
  }

  function addMail(value: string) {
    if (!value) return
    if (!validateEmail(value))
      setFormState((old: any) => {
        const mails = [...old.mails]
        mails.push(value)
        return { ...old, mails, emails: null }
      })
  }

  function deleteMail(index: number) {
    setFormState((old: any) => {
      const mails = [...old.mails]
      mails.splice(index, 1)
      return { ...old, mails }
    })
  }

  function validateEmail(value: string) {
    if (value && !/.+@.+\..+/.test(value)) return 'Неверный формат email'
    if (value && formState.mails.includes(value)) return 'Данный email уже добавлен'
    return null
  }

  function updateForm() {
    setFormState({
      params,
      configType: ROUTES.SEARCH_CLIENT.isCurrent ? 'CLIENT' : 'CAR',
      mails: [],
    })
  }
}

export default PopupSaveTemplate
