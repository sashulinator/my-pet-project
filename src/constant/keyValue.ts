import { Role, Permission, Mailing } from '@/type/model.d'

export const ROLES: Record<Role, string> = {
  PORTAL_ADMIN: 'Администратор портала',
  DEALER_ADMIN: 'Администратор дилера',
  OPERATOR: 'оператор дилера',
  CLIENT: 'Клиент',
  CLIENT_DRIVER: 'Водитель',
  NOT_SET: 'Не установлен',
  ROLE_DEALER_OPERATOR: 'Оператор дилера',
}

export const PERMISSIONS: Record<Permission, string> = {
  PERMISSION_DEALER_DATA: 'Информация о диллере',
  PERMISSION_DEALER_CLIENTS: 'Поиск по клиентам',
  PERMISSION_DEALER_CARS: 'Поиск по автомобилям',
  PERMISSION_MANAGEMENT: 'Управление доступом',
  PERMISSION_MAILINGS: 'Рассылка',
  PERMISSION_SERVICE_STATION_SCHEDULE: 'Сервис',
  PERMISSION_CLIENT_FEEDBACK: 'Обратная связь',
  PERMISSION_PARAMS_CONFIG: 'События',
}

export const MAILING_TYPE: Record<Mailing, string> = {
  AUTOMATIC: 'Автоматическое',
  MANUAL: 'Вручную',
}

export const MIN_ISSUE_YEAR = 2017

export const ISSUE_YEAR = Array(new Date().getFullYear() - MIN_ISSUE_YEAR + 1)
  .fill(1)
  .map((y, i) => {
    return (MIN_ISSUE_YEAR + i).toString()
  })
