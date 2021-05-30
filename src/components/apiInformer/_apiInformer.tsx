/* eslint-disable no-nested-ternary */
import './_apiInformer.less'

import React, { FC, useEffect, useState, useRef } from 'react'

import { useSelector } from 'react-redux'

import { CSSTransition, SwitchTransition } from 'react-transition-group'

import { RootState } from '@/type/state'

import gifSuccess from '@/img/success.gif'
import gifError from '@/img/error.gif'

const ApiInformer: FC = (): JSX.Element => {
  const rootState = useSelector((s: RootState): RootState => s)

  const [message, isError] = getMessage()

  const msg = useRef('')

  if (message !== msg.current && message) {
    msg.current = message
  }

  const [visible, setVisible] = useState(false)

  const timeoutId = useRef(0)

  useEffect(() => clearOnTimeout(), [message])

  return (
    <SwitchTransition>
      <CSSTransition key={`${visible.toString()}${message}`} timeout={200} classNames="ApiInformer" unmountOnExit>
        {visible ? (
          <div className="ApiInformer" style={{ color: 'white', fontSize: '10px' }}>
            {message && !isError ? (
              <span style={{ fontSize: '16px' }} />
            ) : isError ? (
              <img src={gifError} alt="error" width="18" height="18" style={{ opacity: '0.9' }} />
            ) : (
              <img src={gifSuccess} alt="success" width="18" height="18" style={{ opacity: '0.9' }} />
            )}
            <span>{msg.current}</span>
          </div>
        ) : (
          <span />
        )}
      </CSSTransition>
    </SwitchTransition>
  )

  function clearOnTimeout(): void {
    setVisible(true)

    clearTimeout(timeoutId.current)

    timeoutId.current = window.setTimeout(() => {
      if (!isError) {
        setVisible(false)
      }
    }, 3000)
  }

  function getMessage(): [string, boolean] {
    const rootStateKeys = Object.keys(rootState)

    for (let rsi = 0; rsi < rootStateKeys.length; rsi += 1) {
      const state = (rootState[rootStateKeys[rsi] as keyof RootState] as unknown) as any
      // eslint-disable-next-line no-continue
      if (!state?.loading) continue

      const loadingKeys = Object.keys(state?.loading)

      for (let li = 0; li < loadingKeys.length; li += 1) {
        const loadingMsg = state?.loading[loadingKeys[li] as keyof typeof state]

        if (loadingMsg) {
          return [loadingMsg, false]
        }

        if (state.error) return [state.error, true]
      }
    }

    return ['', false]
  }
}

export default ApiInformer
