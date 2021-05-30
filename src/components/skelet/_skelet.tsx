import React, { FC } from 'react'

import Skeleton from 'react-loading-skeleton'

type SkeletProps = {
  load?: unknown
  row?: {
    original?: {
      skl?: true
    }
  }
}

const Skelet: FC<SkeletProps> = ({ children, load, row }): JSX.Element => {
  return <>{!load && !row?.original?.skl ? children : <Skeleton />}</>
}

export function SklList<O extends Array<unknown>>(
  arr: O,
  loading: boolean,
  name?: string,
  defaultAmount = 3,
): typeof arr {
  if (arr.length) {
    localStorage.setItem(`skl-${name}`, arr.length.toString())
    return arr
  }

  if (!loading) return arr

  const amountLocal = parseInt(localStorage.getItem(`skl-${name}`) || '', 10) || defaultAmount

  return (Array(amountLocal).fill({ skl: true }, 0, amountLocal) as unknown) as O
}

export default Skelet
