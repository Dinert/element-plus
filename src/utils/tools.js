// 首字母大写
export const firstUpperCase = (str) => {
  str = String(str)
  return str.replace(/^\S/, s => s.toUpperCase())
}

export const filterNullStrUndefind = (formValue) => {
  let tempObj = {}
  for (const prop in formValue) {
    const value = formValue[prop]
    if (!['', null, undefined].includes(value)) {
      tempObj[prop] = formValue[prop]
    }
  }
  return tempObj
}