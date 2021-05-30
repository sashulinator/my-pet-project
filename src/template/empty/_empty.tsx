import React, { FC } from 'react'

import cx from 'clsx'

type EmptyProps = {
  className?: string
}

const Empty: FC<EmptyProps> = ({ className }): JSX.Element => {
  return <div className={cx('Empty wrap fs22 gray', className)}>Ничего не найдено</div>
}

export default Empty
