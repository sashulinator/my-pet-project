import React, { FC } from 'react'

import { Redirect, Route } from 'react-router-dom'

// import { TOKEN } from '@/constant/localStorage'

type ProtectedRouteProps = {
  component: (() => JSX.Element) | FC
  path: string
}

const ProtectedRoute: FC<ProtectedRouteProps> = (props): JSX.Element => {
  // const isAuthenticated = Boolean(localStorage.getItem(TOKEN))
  const isAuthenticated = true

  return isAuthenticated ? <Route {...props} /> : <Redirect to={{ pathname: '/login' }} />
}

export default ProtectedRoute
