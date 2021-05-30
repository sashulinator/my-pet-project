import './_user.less'

import React, { FC, useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { Link, useParams } from 'react-router-dom'

import { ROLES } from '@/constant/keyValue'
// import ROUTES from '@/constant/routes'

import KeyIcon from '@/components/svg/keyFilledIcon'

import Skl from '@/components/skelet/_skelet'

import * as userActions from '@/store/action/user'

import { RootState, UserState } from '@/type/state.d'

const Users: FC = (): JSX.Element => {
  const { id } = useParams<{ id: string }>()

  const [dealerInfo, setDealerInfo] = useState<boolean>(false)
  const [searchByClients, setSearchByClients] = useState<boolean>(false)
  const [searchByCars, setSearchByCars] = useState<boolean>(false)
  const [events, setEvents] = useState<boolean>(false)
  const [newsletters, setNewsletters] = useState<boolean>(false)
  const [feedback, setFeedback] = useState<boolean>(false)

  const dsp = useDispatch()

  const userState = useSelector((s: RootState): UserState => s.userState)

  const { entity } = userState

  useEffect(() => getUser(), [])

  useEffect(() => {
    if (entity?.permissions?.includes('PERMISSION_DEALER_DATA')) {
      setDealerInfo(entity?.permissions?.includes('PERMISSION_DEALER_DATA'))
    }
    if (entity?.permissions?.includes('PERMISSION_DEALER_CLIENTS')) {
      setSearchByClients(entity?.permissions?.includes('PERMISSION_DEALER_CLIENTS'))
    }
    if (entity?.permissions?.includes('PERMISSION_DEALER_CARS')) {
      setSearchByCars(entity?.permissions?.includes('PERMISSION_DEALER_CARS'))
    }
    if (entity?.permissions?.includes('PERMISSION_DEALER_DATA')) {
      setEvents(entity?.permissions?.includes('PERMISSION_DEALER_DATA'))
    }
    if (entity?.permissions?.includes('PERMISSION_DEALER_DATA')) {
      setNewsletters(entity?.permissions?.includes('PERMISSION_DEALER_DATA'))
    }
    if (entity?.permissions?.includes('PERMISSION_CLIENT_FEEDBACK')) {
      setFeedback(entity?.permissions?.includes('PERMISSION_CLIENT_FEEDBACK'))
    }
  }, [entity?.permissions])

  return (
    <div className="UserForm scrollableContent">
      <section className="first">
        <h1>Название дилерского центра</h1>
      </section>
      <section>
        <div className="userPermissionsWrapper f fs18">
          <div className="userInfo">
            <div className="userEditRow">
              <div className="userEditKey">Фамилия:</div>
              <div className="userEditValue">
                <Skl load={!entity}>{entity?.lastName}</Skl>
              </div>
            </div>
            <div className="userEditRow">
              <div className="userEditKey">Имя:</div>
              <div className="userEditValue">
                <Skl load={!entity}>{entity?.firstName}</Skl>
              </div>
            </div>
            <div className="userEditRow">
              <div className="userEditKey">Отчество:</div>
              <div className="userEditValue">
                <Skl load={!entity}>{entity?.middleName}</Skl>
              </div>
            </div>
            <div className="userEditRow">
              <div className="userEditKey">Email:</div>
              <div className="userEditValue underline">
                <Link to={`mailto:${entity?.email}`}>
                  <Skl load={!entity}>{entity?.email}</Skl>
                </Link>
              </div>
            </div>
            <div className="userEditRow">
              <div className="userEditKey">Роль:</div>
              <div className="userEditValue">
                {entity?.role ? ROLES[entity?.role] : <Skl load={!entity}>{entity?.role}</Skl>}
              </div>
            </div>
          </div>
          <div className="userPermissions relative">
            <KeyIcon width="16rem" height="16rem" />
            <div className="permissionTitle">Допуск:</div>
            <div className="permissionRow">
              <input
                type="checkbox"
                className="whiteBg small"
                checked={dealerInfo}
                onChange={(e) => setDealerInfo(e.target.checked)}
              />
              <div className="permissionType">Информация о диллере</div>
            </div>
            <div className="permissionRow">
              <input
                type="checkbox"
                className="whiteBg small"
                checked={searchByClients}
                onChange={(e) => setSearchByClients(e.target.checked)}
              />
              <div className="permissionType">Поиск по клиентам</div>
            </div>
            <div className="permissionRow">
              <input
                type="checkbox"
                className="whiteBg small"
                checked={searchByCars}
                onChange={(e) => setSearchByCars(e.target.checked)}
              />
              <div className="permissionType">Поиск по автомобилям</div>
            </div>
            <div className="permissionRow">
              <input
                type="checkbox"
                className="whiteBg small"
                checked={events}
                onChange={(e) => setEvents(e.target.checked)}
              />
              <div className="permissionType">События</div>
            </div>
            <div className="permissionRow">
              <input type="checkbox" className="whiteBg small" checked={newsletters} />
              <div className="permissionType">Рассылки</div>
            </div>
            <div className="permissionRow">
              <input
                type="checkbox"
                className="whiteBg small"
                checked={feedback}
                onChange={(e) => setFeedback(e.target.checked)}
              />
              <div className="permissionType">Обратная связь</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )

  function getUser() {
    if (!entity && id) {
      dsp(userActions.get(id))
    }
  }
}

export default Users
