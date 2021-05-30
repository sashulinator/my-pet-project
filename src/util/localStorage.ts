export function get<DefaultValue>(itemName: string, defaultValue?: DefaultValue): DefaultValue {
  const value = localStorage.getItem(itemName) || defaultValue

  return value as DefaultValue
}
