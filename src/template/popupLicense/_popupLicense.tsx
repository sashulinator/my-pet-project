import React, { FC, useState } from 'react'

import Portal from '@/components/popup/_popup'
import Button from '@/components/button'

export type OnChange = (v: boolean) => void

export type FormRemove = {
  doNotAskOnRemove: boolean
}

export type PopupLicenseProps = {
  stateRef?: React.MutableRefObject<undefined | boolean>
  setStateRef?: React.MutableRefObject<undefined | OnChange>
  onAccept?: () => void
}

const PopupLicense: FC<PopupLicenseProps> = ({ onAccept, stateRef, setStateRef }): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false)

  stateRef = stateRef || { current: undefined }
  setStateRef = setStateRef || { current: undefined }

  stateRef.current = isOpen
  setStateRef.current = setIsOpen

  return (
    <Portal title="Пользовательское соглашение" onClose={() => setIsOpen(false)} isOpen={isOpen}>
      <article className="fs18 margin-top" style={{ maxWidth: '70vw' }}>
        <p>
          Настоящим подтверждаю, что: Я даю свое согласие владельцу Web-портала для обработки данных, предоставленных
          мной в регистрационной форме. Я согласен, что обработка данных предполагает любую обработку с использованием
          или без использования автоматических средств. Обработка данных осуществляется с целью создания и сопровождения
          клиентской базы данных, оказания услуг ООО «СТТ» или его аффилированными лицами или партнерами. Данное
          согласие предоставляется без ограничения срока действия.
        </p>
        <p>
          Я согласен получать рекламные и другие материалы в виде SMS-сообщений, электронных сообщений и устной
          информации, предоставляемой по телефону; и для этих целей можно использовать предоставленные мной контактные
          данные. Согласие предоставляется на неопределенный срок. Я полностью осознаю, что согласие может быть отменено
          мной с помощью обращения в отдел.
        </p>
      </article>
      {onAccept && (
        <Button className="fs20 margin-top" onClick={onAcceptButtonClick}>
          Принять
        </Button>
      )}
    </Portal>
  )

  function onAcceptButtonClick(): void {
    setIsOpen(false)
    onAccept?.()
  }
}

export default PopupLicense
