import './breadcrumbs.less'

import React, { FC } from 'react'

import { Link } from 'react-router-dom'

import Route from '@/util/route-constant'

type BreadcrumbsProps = {
  routes: Route[]
}

const Breadcrumbs: FC<BreadcrumbsProps> = ({ routes }): JSX.Element => {
  return (
    <ol className="Breadcrumbs">
      {routes.map((iRoute, i) => {
        const isCurrentPage = i === routes.length - 1

        return (
          <Link key={iRoute.PATH} to={isCurrentPage ? window.location.pathname : iRoute.REDIRECT_PATH}>
            <li>{iRoute.NAME}</li>
          </Link>
        )
      })}
    </ol>
  )
}

export default Breadcrumbs
