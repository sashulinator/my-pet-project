/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import './_popup.less'

import React, { FC } from 'react'

import { Portal } from 'react-portal'

import cx from 'clsx'

import { CSSTransition, SwitchTransition } from 'react-transition-group'

import CloseIcon from '@/components/svg/closeOutlinedIcon'
import Button from '../button'

type PopupProps = {
  title: string
  onClose: () => void
  isOpen: boolean
  top?: boolean
}

const Pupup: FC<PopupProps> = ({ children, title, onClose, isOpen, top = false }): JSX.Element => {
  return (
    <SwitchTransition>
      <CSSTransition key={isOpen.toString()} timeout={200} classNames="appear" unmountOnExit>
        {isOpen ? (
          <Portal node={document && document.getElementById('root')}>
            <div className="Popup">
              <div className="frameWrapper">
                <div className={cx('frame clickable', top && 'top')} style={{ padding: '5rem' }}>
                  <div className="popupTitleWrapper f">
                    <div className="popupTitle">{title}</div>
                    <Button style={{ marginLeft: '6rem' }} onClick={onClose} icon>
                      <CloseIcon />
                    </Button>
                  </div>
                  <div className="popupContent">{children}</div>
                </div>
              </div>
            </div>
          </Portal>
        ) : (
          <span />
        )}
      </CSSTransition>
    </SwitchTransition>
  )
}

export default Pupup
