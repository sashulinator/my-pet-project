import React, { FC, useEffect, useState } from 'react'
import Collapse from 'rc-collapse'
import { useDispatch } from 'react-redux'
import { Field, Form } from 'react-final-form'
import { Link } from 'react-router-dom'
import c from 'clsx'
import Skelet from 'react-loading-skeleton'

import ROUTES from '@/constant/routes'

import Button from '@/components/button'
import CheckboxButton from '@/components/checkboxButton'
import Input from '@/components/input'
import SaveIcon from '@/components/svg/saveOutlinedIcon'

import motion from '@/helper/animation'

import minibusSrc from '@/img/minibus.jpg'

import * as clientActions from '@/store/action/customers'

import FilterHeader from '@/template/collapseHeader/_collapseHeader'

import { ClientModel } from '@/type/model'
import { ClientState } from '@/type/state'

import { buildCarTitle } from '../util'

const { Panel } = Collapse

type ClientListItemProps = {
  clientState: ClientState
  Client: ClientModel
  className: string
}

const ClientListItem: FC<ClientListItemProps> = ({ className, Client, clientState }): JSX.Element => {
  const dsp = useDispatch()

  const [isExpanded, setIsExpanded] = useState(false)

  const [isLoading, setIsLoading] = useState(false)

  useEffect(getCars, [isExpanded])

  return (
    <div className={c(className, 'ClientListWrapper relative')}>
      <CheckboxButton
        checked={Boolean(clientState.checkList.find((ic) => String(ic.id) === String(Client.id)))}
        className="selectClientCheckbox absolute"
        onChange={checkClient}
      />
      <Collapse className="ClientListItem" openMotion={motion} onChange={onCollapse}>
        <Panel header={<FilterHeader title={Client.legalEntity} className="fs30" />} key="1">
          <div className="cardContent fc margin-right-l">
            <div className="description margin-bottom-s">
              {[
                { label: 'UUID клиента', value: Client.id },
                { label: 'Тариф', value: Client.tariff || '—' },
                { label: 'Дата подключения', value: Client.connectionDate },
              ].map((item) => (
                <div key={item.value} className="margin-bottom-s">
                  <div className="fs16 colorDim margin-bottom-xs">{`${item.label}:`}</div>
                  <div className="fs20">{item.value}</div>
                </div>
              ))}
              <Form
                onSubmit={onSubmit}
                initialValues={Client}
                render={({ handleSubmit }) => (
                  <form onSubmit={handleSubmit} className="margin-bottom-s">
                    <Field name="contractNumber">
                      {({ input, meta }) => (
                        <>
                          <div className="fs16 colorDim">Номер договора:</div>
                          <div className="fs20 f">
                            <Input chameleon {...input} style={{ width: 'calc(var(--carImageWidth) * 1rem)' }} />
                            {!meta.pristine && (
                              <Button type="submit" className="margin-left-s" icon loading={isLoading}>
                                <SaveIcon />
                              </Button>
                            )}
                          </div>
                        </>
                      )}
                    </Field>
                  </form>
                )}
              />
            </div>

            <div className="carList f fs18">
              {!clientState.CarList[Client.id] &&
                clientState.loading.getCarList &&
                Array(Client.carCount)
                  .fill(0)
                  .map(() => (
                    <div className="black margin-right">
                      <Skelet className="carImage" />
                      <Skelet />
                    </div>
                  ))}
              {clientState.CarList?.[Client.id]?.map((iCar) => {
                return (
                  <Link
                    className="black margin-right"
                    to={ROUTES.SEARCH_CLIENT_CAR.PATH.replace(':uuid', iCar.uuid)}
                    key={iCar.uuid}
                  >
                    <img src={minibusSrc} alt="авто" className="carImage" />
                    <p>{buildCarTitle(iCar)}</p>
                  </Link>
                )
              })}
            </div>
          </div>
        </Panel>
      </Collapse>
    </div>
  )

  function onCollapse(v: string | number | React.ReactText[]) {
    setIsExpanded(!!(v as [])?.length)
  }

  function getCars() {
    if (isExpanded) {
      dsp(clientActions.getCarList(Client.id))
    }
  }

  function onSubmit(v: Record<string, string>): void {
    setIsLoading(true)
    const onEnd = () => setIsLoading(false)
    dsp(clientActions.update({ ...Client, ...v }, { onFail: onEnd, onSuccess: onEnd }))
  }

  function checkClient(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.checked) {
      dsp(clientActions.set({ checkList: [...clientState.checkList, Client] }))
    } else {
      dsp(clientActions.set({ checkList: clientState.checkList.filter((ic) => String(ic.id) !== String(Client.id)) }))
    }
  }
}

export default ClientListItem
