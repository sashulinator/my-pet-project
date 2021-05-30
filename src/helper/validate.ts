export function required(s: string): void | string {
  const msg = 'Обязательно'
  // if (Array.isArray(s) && s.length === 0) return msg
  if (!s) return msg
}

export function length(n: number) {
  return (string: string): void | string => {
    if (string?.length !== n) return 'Неправильное количество символов'
  }
}

export function validateEmail(emailList: string[]): string[] | void {
  if (!emailList?.length) return

  const currentEmailIndex = emailList.length - 1
  const currentEmail = emailList[currentEmailIndex]

  if (!/.+@.+\..+/.test(currentEmail)) return ['Неверный формат email']
  if (emailList?.slice(0, currentEmailIndex).includes(currentEmail)) return ['Данный email уже добавлен']
}
