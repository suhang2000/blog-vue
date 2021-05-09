export function validatePhone (rule, value, callback) {
  const reg = /^[1][3-9][0-9]{9}$/
  if (value === '' || value === undefined || value === null) {
    callback(new Error('电话号码不得为空'))
  } else if ((!reg.test(value)) && value !== '') {
    callback(new Error('电话号码不符规范'))
  } else {
    callback()
  }
}

export function validateEmail (rule, value, callback) {
  const reg = /^([a-zA-Z0-9]+[-_\.]?)+@[a-zA-Z0-9]+\.[a-z]+$/
  if (value === '' || value === undefined || value === null) {
    callback()
  } else if (!reg.test(value)) {
    callback(new Error('请输入正确的邮箱'))
  } else {
    callback()
  }
}

export function validateBanknum (rule, value, callback) {
  const reg = /^([1-9]{1})(\d{14}|\d{18})$/
  if (value === '' || value === undefined || value === null) {
    callback(new Error('银行卡号不得为空'))
  } else if (!reg.test(value)) {
    callback(new Error('银行卡号不符规范'))
  } else {
    callback()
  }
}

export function validateAdminOldPwd (rule, value, callback) {
  if (value === '' || value === undefined || value === null) {
    callback(new Error('初始密码未填写'))
  } else if (value !== 'rootpassword') {
    callback(new Error('须得填写初始密码'))
  } else {
    callback()
  }
}
