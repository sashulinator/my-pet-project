import './_tab.about.less'

import React, { FC, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { YMaps, Map, Placemark } from 'react-yandex-maps'

import Skeleton from 'react-loading-skeleton'

import cx from 'clsx'

import Skl from '@/components/skelet/_skelet'

import * as dealerActions from '@/store/action/dealer'

import { RootState } from '@/type/state'

const AboutTab: FC = (): JSX.Element => {
  const dsp = useDispatch()

  const mapHeight = '40rem'

  const { dealerState } = useSelector((s: RootState): RootState => s)
  const { entity } = dealerState

  useEffect(getCurrentDealer, [])

  const geolocation = useMemo(buildGeolocation, [entity])

  return (
    <div className="AboutTab scrollableContent">
      <section className="first">
        <h1>О дилере</h1>
      </section>
      <section className="relative">
        {/* <div className="operationModeCard  absolute-top-right bgPrimary white">
          <div className="wrap relative fs18">
            <ClockIcon width="16rem" height="16rem" />
            <p className="operationMode">Режим работы:</p>
            <p>ПН-ПТ с 9:00 до 20:00</p>
            <p>СБ-ВС с 10:00 до 16:00</p>
          </div>
        </div> */}
        <h2>Информация</h2>
        <div className={cx('info', !entity && 'loading')}>
          <p>
            <Skl load={!entity}>
              <span className="bold">Название:</span>
              &nbsp;
              {entity?.name || '—'}
            </Skl>
          </p>
          <p>
            <Skl load={!entity}>
              <span className="bold">Адрес:</span>
              &nbsp;
              {entity?.address || '—'}
            </Skl>
          </p>
          <p>
            <Skl load={!entity}>
              <span className="bold">Телефон:</span>
              &nbsp;
              {entity?.phones?.join('') || '—'}
            </Skl>
          </p>
          <p>
            <Skl load={!entity}>
              <span className="bold">Email:</span>
              &nbsp;
              {entity?.mail || '—'}
            </Skl>
          </p>
          {/* <p>
            <Skl load={!entity}>
              <span className="bold">Сайт:</span>
              &nbsp;
              {entity?.siteAddress || '—'}
            </Skl>
          </p> */}
        </div>
      </section>
      {entity?.geolocation && (
        <section className="last">
          <h2>Схема проезда</h2>
          <div
            className="YMapsWrapper relative"
            style={{ marginBottom: '8rem', height: mapHeight, overflow: 'hidden' }}
          >
            {/* <img src={mapSrc} alt="map" className="fitCover" style={{ width: '100%', height }} /> */}
            <Skeleton width="100%" height={mapHeight} className="fitCover" />
            <YMaps>
              <Map
                defaultState={{ center: geolocation, zoom: 9 }}
                style={{ width: 'calc(100% + 16rem)', height: mapHeight }}
              >
                <Placemark geometry={geolocation} />
              </Map>
            </YMaps>
          </div>
        </section>
      )}
    </div>
  )

  function getCurrentDealer() {
    dsp(dealerActions.getCurrent())
  }

  function buildGeolocation(): number[] {
    if (entity?.geolocation) {
      const [lo, la] = entity?.geolocation.split(',') as string[]

      return [parseFloat(lo), parseFloat(la)]
    }

    return [0, 0]
  }
}

export default AboutTab
