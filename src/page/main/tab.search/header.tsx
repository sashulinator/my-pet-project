import React, { FC } from 'react'

import cx from 'clsx'

import { Link } from 'react-router-dom'

import ROUTES from '@/constant/routes'

type SearchHeaderProps = {
  className?: string
  isCarActiveTab: boolean
}

const SearchHeader: FC<SearchHeaderProps> = ({ className, isCarActiveTab }): JSX.Element => {
  return (
    <h1 className={cx('SearchHeader', className)}>
      <Link
        to={ROUTES.SEARCH_CLIENT.REDIRECT_PATH}
        className={cx(!isCarActiveTab ? 'primary' : 'default')}
        style={{ marginRight: '9rem' }}
      >
        Клиенты
      </Link>
      <Link to={ROUTES.SEARCH_CAR.REDIRECT_PATH} className={cx(isCarActiveTab ? 'primary' : 'default')}>
        Автомобили
      </Link>
    </h1>
  )
}

export default SearchHeader
