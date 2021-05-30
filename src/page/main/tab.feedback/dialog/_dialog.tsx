import './_dialog.less'

import React, { FC } from 'react'

// import { useDispatch, useSelector } from 'react-redux'

// import { useParams } from 'react-router-dom'
import cx from 'clsx'

// import { ROLES } from '@/constant/keyValue'
// // import ROUTES from '@/constant/routes'

// import KeyIcon from '@/components/svg/keyFilledIcon'

// import Skeleton from '@/components/skeleton/_skeleton'

// import * as userActions from '@/store/action/user'

// import { RootState, UserState } from '@/type/state.d'

import Bottom from './block.bottom'

type FeedbackDialogProps = {
  isCurrent: boolean
}

const FeedbackDialog: FC<FeedbackDialogProps> = ({ isCurrent }): JSX.Element => {
  // const { id } = useParams<{ id: string }>()

  return (
    <div className={cx('FeedbackDialog absolute wrap scrollableContent', !isCurrent && 'hidden')}>
      <div className="horizontalBlock dialogTopBlock">
        <section className="first">
          <h1>Тикет №000 Информация о стоимости ремонта </h1>
          {/* <h2>Информация о стоимости ремонта </h2> */}
        </section>
      </div>
      <div className="dialogBlock f-center">
        <div className="dialogLine">
          <p>строка</p>
          <p>строка</p>
          <p>строка</p>
          <p>строка</p>
          <p>строка</p>
          <p>строка</p>
          <p>строка</p>
          <p>строка</p>
          <p>строка</p>
          <p>строка</p>
          <p>строка</p>
        </div>
      </div>
      <Bottom />
    </div>
  )
}

export default FeedbackDialog
