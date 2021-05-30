import 'react-toastify/dist/ReactToastify.css'

import React, { FC } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import setThemeOnce from './helper.setThemeOnce'
import NotificationLayer from './notificationLayer'

import Routes from './route'
import store from './redux/store'
import '../style/index.less'

const App: FC = (): JSX.Element | null => {
  setThemeOnce()

  return (
    <Provider store={store}>
      <NotificationLayer>
        <Routes />
      </NotificationLayer>
    </Provider>
  )
}

window.onload = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}
