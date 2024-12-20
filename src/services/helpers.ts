export const toBoolean = (value?: string | boolean) => {
  if (typeof value === 'boolean') {
    return value
  }
  return ['true', 'True', 'TRUE', '1'].includes(value?.trim() ?? 'FALSW')
}
