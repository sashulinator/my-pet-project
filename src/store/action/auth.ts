import { AnyAction } from 'redux'

import { REDUX_API_MIDDLEWARE as type, APIAction, OnSuccess, SuccessActionParams } from '@savchenko91/rc-redux-api-mw'

import { REFRESH_TOKEN, REFRESH_TOKEN_EXPIRES, TOKEN, TOKEN_EXPIRES, ROLE, PERMISSION } from '@/constant/localStorage'

import { OnStage } from '@/type/type'

import * as CONSTANTS from '../constant/auth'

const saveTokenOnSuccess = (onSuccess?: OnSuccess<TokenResponseBody>) => (
  args: SuccessActionParams<TokenResponseBody>,
) => {
  const { body } = args

  if (body) {
    localStorage.setItem(TOKEN, body.token)
    localStorage.setItem(REFRESH_TOKEN, body.refreshToken)
    localStorage.setItem(REFRESH_TOKEN_EXPIRES, body.refreshTokenExpires)
    localStorage.setItem(TOKEN_EXPIRES, body.tokenExpires)
    localStorage.setItem(ROLE, body.role)
    localStorage.setItem(PERMISSION, JSON.stringify(body.permission))

    onSuccess?.(args)
  }
}

export type TokenResponseBody = {
  token: string
  refreshToken: string
  role: string
  refreshTokenExpires: string
  tokenExpires: string
  permission: string[]
}

// Login

export type LoginProps = OnStage<TokenResponseBody> & {
  body: {
    login: string
    password: string
  }
}

type LoginAction = APIAction<LoginProps['body'], TokenResponseBody>

export const login = ({ body, onFail, onSuccess }: any): any => ({
  type,
  stageActionTypes: CONSTANTS.LOGIN,
  url: '/api/auth',
  method: 'post',
  body,
  onFail,
  onSuccess: saveTokenOnSuccess(onSuccess),
})

// Refresh

type RefreshProps = OnStage<TokenResponseBody> & {
  body: { refreshToken: string }
}

type RefreshAction = APIAction<{ refreshToken: string }, TokenResponseBody>

export const refresh = ({ body, onSuccess, onFail }: any): RefreshAction => ({
  type,
  stageActionTypes: CONSTANTS.REFRESH,
  url: '/api/auth/refreshtoken',
  method: 'post',
  body,
  onFail,
  onSuccess: saveTokenOnSuccess(onSuccess) as any,
})

// Logout

export const logout = (): AnyAction => ({
  type: CONSTANTS.LOGOUT,
})
