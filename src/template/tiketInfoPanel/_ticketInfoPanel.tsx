import './_ticketInfoPanel.less'

import React, { FC } from 'react'

import cx from 'clsx'

type TicketInfoPanelProps = {
  className?: string
}

const TicketInfoPanel: FC<TicketInfoPanelProps> = ({ className }): JSX.Element => {
  return <div className={cx('TicketInfoPanel', className)}>TicketInfoPanel</div>
}

export default TicketInfoPanel
