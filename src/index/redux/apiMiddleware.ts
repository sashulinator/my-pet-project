import { toast, ToastOptions } from 'react-toastify'

import APIMiddleware from '@savchenko91/rc-redux-api-mw'

import { TOKEN } from '@/constant/localStorage'

const ERRORS_RU = {
  'Internal Server Error': 'Ошибка сервера: обратитесь к администрации портала, если ошибка не исчезнет',
  'Not Found': 'Ошибка: Обратитесь к администрации портала',
  'TypeError: Failed to fetch': 'Ошибка: Не удалось сделать запрос. Проверьте интернет соединение',
}

const props: ToastOptions = {
  type: 'error',
}

let messages: string[] = []

const api = new APIMiddleware({
  headers: () => {
    return new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem(TOKEN)}`,
    })
  },
  async onFail({ body, response, error }) {
    const err =
      (body as Record<'errorDescription' | 'error', string>)?.errorDescription ||
      (body as Record<'errorDescription' | 'error', string>)?.error ||
      ERRORS_RU[(error || response?.statusText) as keyof typeof ERRORS_RU] ||
      error ||
      response?.statusText

    if (!err) return

    if (!messages.includes(err)) {
      toast(err, props)
    }

    messages.push(err)

    setTimeout(() => {
      messages = []
    }, 1000)
  },
})

export default api
