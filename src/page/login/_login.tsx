/* eslint-disable jsx-a11y/anchor-is-valid */
import './_login.less'

import React, { FC, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
  // useDispatch,
  useSelector,
} from 'react-redux'
import { Form, Field } from 'react-final-form'
import c from 'clsx'

import LoadingIcon from '@/components/svg/loadingFilledIcon'
import LockIcon from '@/components/svg/lockFilledIcon'
import UserIcon from '@/components/svg/userFilledIcon'
import IconInCircle from '@/components/IconInCircle/_iconInCircle'
import VisibilitySwitcher from '@/components/visibilitySwitcher/_visibilitySwitcher'
import Checkbox from '@/components/checkboxButton'
import Input from '@/components/input'
import Button from '@/components/button'

// import * as parse from '@/helper/parse'
import * as validate from '@/helper/validate'

import ROUTES from '@/constant/routes'

import * as authActions from '@/store/action/auth'

import PopupLicense from '@/template/popupLicense/_popupLicense'
import { RootState } from '@/type/state'

const LoginPage: FC = (): JSX.Element => {
  // const dsp = useDispatch()

  const history = useHistory()

  const logging = useSelector((s: RootState): boolean => s.authState.loading.logging)

  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const togglePopupLicense = useRef<(b: boolean) => void | undefined>()

  return (
    <main className="f-center-center wrap">
      <div className="loginFormWrapper fc-top-center">
        <div className="logos fc" />
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit, form }) => (
            <form onSubmit={handleSubmit} className="fc-center-center">
              <PopupLicense setStateRef={togglePopupLicense} onAccept={() => form.change('accept', true)} />
              <Field
                name="login"
                validate={validate.required}
                // parse={parse.phone}
                // 3 validate={validate.length(16)}
              >
                {({ input, meta }) => (
                  <div className="formField f-center-center">
                    <label htmlFor="username" style={{ color: 'white' }}>
                      <IconInCircle>
                        <UserIcon />
                      </IconInCircle>
                    </label>
                    <Input
                      {...input}
                      type="text"
                      autoComplete="on"
                      id="username"
                      // placeholder="+7(999)999-99-99"
                      placeholder="Логин"
                      className="borderBottom"
                    />
                    {meta.touched && meta.error && <span className="fieldError">{meta.error}</span>}
                  </div>
                )}
              </Field>
              <Field name="password" validate={validate.required}>
                {({ input, meta }) => (
                  <div className="f-center-center formField">
                    <label htmlFor="password" className="white">
                      <IconInCircle>
                        <LockIcon />
                      </IconInCircle>
                    </label>
                    <Input
                      className="borderBottom"
                      placeholder="Пароль"
                      id="password"
                      type={isPasswordVisible ? 'text' : 'password'}
                      {...input}
                    />
                    <VisibilitySwitcher
                      isVisible={isPasswordVisible}
                      onClick={changePasswordVisibility}
                      className="white"
                    />
                    {meta.touched && meta.error && <span className="fieldError">{meta.error}</span>}
                  </div>
                )}
              </Field>
              <Field name="accept" validate={validate.required} type="checkbox">
                {({ input, meta }) => (
                  <div
                    className={c(
                      'f-center-center formField checkboxField',
                      !meta.pristine || meta.active ? 'white' : 'gray',
                    )}
                  >
                    <Checkbox {...input} id="accept" className="transparent checkbox" />
                    {meta.touched && meta.error && <span className="fieldError">{meta.error}</span>}
                    <div className="checkboxWrapper">
                      <label htmlFor="accept">
                        Принимаю условия&nbsp;
                        <br />
                      </label>
                      <a style={{ cursor: 'pointer' }} onClick={() => togglePopupLicense?.current?.(true)}>
                        пользовательского соглашения
                      </a>
                    </div>
                  </div>
                )}
              </Field>
              <Button type="submit" className="f-center-center">
                {logging && <LoadingIcon className="margin-right-s" />}
                Войти
              </Button>
            </form>
          )}
        />
      </div>
      <div className="fitCover gradient" />
    </main>
  )

  function changePasswordVisibility() {
    setIsPasswordVisible(!isPasswordVisible)
  }

  function onSubmit(values: authActions.LoginProps['body'] & { accept: boolean }) {
    history.push(ROUTES.ABOUT.PATH)
    // const loginAction = authActions.login({
    //   body: values,
    //   onSuccess() {
    //   },
    // })

    // dsp(loginAction)
  }
}

export default LoginPage
