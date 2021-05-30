import React, { FC, useState } from 'react'

import Portal from '@/components/popup/_popup'

export type OnChange = (v: boolean) => void

export type FormRemove = {
  doNotAskOnRemove: boolean
}

export type PopupRemoveProps = {
  stateRef?: React.MutableRefObject<undefined | boolean>
  setStateRef?: React.MutableRefObject<undefined | OnChange>
}

const PopupRemove: FC<PopupRemoveProps> = ({ stateRef, setStateRef }): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false)

  stateRef = stateRef || { current: undefined }
  setStateRef = setStateRef || { current: undefined }

  stateRef.current = isOpen
  setStateRef.current = setIsOpen

  return (
    <Portal title="Название рассылки" onClose={() => setIsOpen(false)} isOpen={isOpen}>
      <div>mailing list</div>
    </Portal>
  )
}

export default PopupRemove
