/* eslint-disable react/button-has-type */

import './index.less'

import './app.less'

import React, { FC } from 'react'

import cx from 'clsx'

import { useHistory } from 'react-router-dom'

import Loading from './icons/loading'

type ButtonAppProps = React.ButtonHTMLAttributes<Element> & {
  className?: string
  href?: string
  type?: 'button' | 'submit' | 'reset'
  icon?: boolean
  wide?: boolean
  loading?: boolean
}

const ButtonApp: FC<ButtonAppProps> = ({
  className,
  children,
  href,
  onClick,
  type = 'button',
  icon,
  wide,
  disabled,
  loading,
  ...props
}): JSX.Element => {
  const history = useHistory()

  const additionalClassNames = cx(icon && 'icon', wide && 'wide', disabled && 'disabled')

  return (
    <button
      type={type}
      className={cx('ButtonApp nowrap', className, additionalClassNames)}
      onClick={onButtonClick}
      {...props}
    >
      {(() => {
        if (loading) {
          if (icon) {
            return <Loading />
          }

          return (
            <>
              <Loading />
              {children}
            </>
          )
        }

        return children
      })()}
    </button>
  )

  function onButtonClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    onClick?.(e)

    if (href) history.push(href)
  }
}

export default ButtonApp
