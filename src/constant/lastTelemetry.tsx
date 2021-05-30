import React from 'react'

import Key from '@/components/svg/keyOutlinedIcon'
import Accumulator from '@/components/svg/accumulatorOutlinedIcon'
import Airbag from '@/components/svg/airbagOutlinedIcon'
import Coolant from '@/components/svg/coolantOutlinedIcon'
import Generator from '@/components/svg/generatorOutlinedIcon'
import BrakeFluid from '@/components/svg/brakeFluidOutlinedIcon'

export const MALFUNCTIONS = {
  ignitionStatus: {
    label: 'Зажигание (клемма +15)',
    short: 'Зажигание (клемма +15)',
    icon: (props: React.PropsWithChildren<{ className?: string }>): JSX.Element => <Key {...props} />,
  },
  attentionStatus: {
    label: 'Внимание',
    short: 'Внимание',
    icon: (props: React.PropsWithChildren<{ className?: string }>): JSX.Element => <Key {...props} />,
  },
  mil: {
    label: 'MIL',
    short: 'MIL',
    icon: (props: React.PropsWithChildren<{ className?: string }>): JSX.Element => <Key {...props} />,
  },
  criticalFault: {
    label: 'Критическая неисправность',
    short: 'Критическая неисправность',
    icon: (props: React.PropsWithChildren<{ className?: string }>): JSX.Element => <Key {...props} />,
  },
  powerStatus: {
    label: 'Питание (клемма +30)',
    short: 'Питание (клемма +30)',
    icon: (props: React.PropsWithChildren<{ className?: string }>): JSX.Element => <Accumulator {...props} />,
  },
  airbagFired: {
    label: 'Сигнализатор о срабатывании подушки безопасности (CAN)',
    short: 'Cрабатала подушка безопасности',
    icon: (props: React.PropsWithChildren<{ className?: string }>): JSX.Element => <Airbag {...props} />,
  },
  coolantLevelLow: {
    label: 'Статус сигнализатора «Низкий уровень охлаждающей жидкости» (CAN)',
    short: 'Низкий уровень охлаждающей жидкости',
    icon: (props: React.PropsWithChildren<{ className?: string }>): JSX.Element => <Coolant {...props} />,
  },
  generatorMalfunction: {
    label: 'Статус сигнализатора «Неисправность генератора» (CAN)',
    short: 'Неисправность генератора',
    icon: (props: React.PropsWithChildren<{ className?: string }>): JSX.Element => <Generator {...props} />,
  },
  breakFluidLowLevel: {
    label: 'Сигнализатор «Низкий уровень тормозной жидкости»',
    short: 'Низкий уровень тормозной жидкости',
    icon: (props: React.PropsWithChildren<{ className?: string }>): JSX.Element => <BrakeFluid {...props} />,
  },
}

export const PERIODS = {
  odometer: {
    label: 'Пробег, км',
  },
  onboardPowerVoltage: {
    label: 'Напряжение сети',
  },
  remainingMileage: {
    label: 'Остаток пробега до очередного ТО, км',
  },
  fuelConsumption: {
    label: 'Расход топлива',
  },
  speedGps: {
    label: 'Скорость по GPS, км/ч',
  },
  speedCan: {
    label: 'Скорость автомобиля, км/ч (CAN)',
  },
  fuelLevel: {
    label: 'Уровень топлива, л (CAN)',
  },
  coolantTemp: {
    label: 'Температура охлаждающей жидкости, °С (CAN)',
  },
  engineOilPressure: {
    label: 'Давление масла в двигателе',
  },
}

export const CLIENT_PARAMS = {
  carCount: {
    label: 'Количество авто',
  },
  connectionDate: {
    label: 'Дата подключения',
  },
  contractNumber: {
    label: 'Номер контракта',
  },
  email: {
    label: 'Email',
  },
  firstName: {
    label: 'Имя',
  },
  fullNameOfLegalEntity: {
    label: 'Полное имя',
  },
  id: {
    label: 'ID',
  },
  lastName: {
    label: 'Фамилия',
  },
  legalEntityName: {
    label: 'Полное имя',
  },
  phone: {
    label: 'телефон',
  },
  supplementaryAgreementNumber: {
    label: 'Дополнительный номер соглашения',
  },
  tariffName: {
    label: 'тариф',
  },
}

export const CAR_PARAMETER = {
  issueYear: {
    label: 'Год выпуска',
  },
  color: {
    label: 'Количество авто',
  },
  engineModification: {
    label: 'Модификация двигателя',
  },
  fuelSystemType: {
    label: 'Тип топливной системы',
  },
  fuelSystemTypeExternal: {
    label: 'Внешний тип топливной системы',
  },
  fuelTankVolume: {
    label: 'Обьем топливного бака',
  },
  gasTankVolume: {
    label: 'Обьем бака газа',
  },
  modelModification: {
    label: 'Модификация модели',
  },
  name: {
    label: 'Имя',
  },
  stateNumber: {
    label: 'Гос. номер',
  },
}

export const CAR_PARAMS = {
  brand: {
    label: 'Бренд',
  },
  model: {
    label: 'Имя',
  },
  regionId: {
    label: 'Регион',
  },
  vehiclePassport: {
    label: 'Паспорт ТО',
  },
  vin: {
    label: 'VIN',
  },
}

export default { ...MALFUNCTIONS, ...PERIODS }
