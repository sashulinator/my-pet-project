import formatString from 'format-string-by-pattern'

export function numbers(s: string): string {
  return s.replace(/[^\d]/g, '')
}

export function day(s: string): string {
  const s1 = s.replace(/[^\d]\./g, '')
  const s2 = s1.replace(/^([4-9])\./g, '')
  return s2
}

export function addBefore(s: string, add: string): string {
  if (new RegExp(`^${add.replace('+', '\\+')}`, 'i').test(s)) return s
  return `${add}${s}`
}

export function phone(s: string): string {
  return formatString('+7(999)999-99-99', numbers(addBefore(s, '+7')))
}

export function date(s: string): string {
  return formatString('99.99.9999', day(s))
}
