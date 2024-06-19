export const isEmailValid = (email) => {
  return email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g)
}

export const validateInputEmail = (email) => {
  if (isEmailValid(email)) return true

  return 'Email é inválido'
}

export const isPasswordValid = (pw) => {
  return pw.match(
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!])(?!.*\s).{12,}$/g
  )
}

export const validateInputPassword = (pw) => {
  if (isPasswordValid(pw)) return true

  return (
    'Senha deve ter pelo menos:\n' +
    '- 1 letra minúscula\n' +
    '- 1 letra maiúscula\n' +
    '- 1 dos seguintes caracteres especiais: @#$%^&+=!\n' +
    '- 12 caracteres\n' +
    '- Sem espaços em branco'
  )
}

export const validateMinLength = (text, min) => {
  if (text.length >= min) {
    return true
  }

  return `Campo deve ter pelo menos ${min} caracteres`
}

export const validateMaxLength = (text, max) => {
  if (text.length <= max) {
    return true
  }

  return `Campo deve ter no máximo ${max} caracteres`
}

export const validateDateAfter = (date1, date2, text) => {
  const d1 = new Date(date1).getTime()
  const d2 = new Date(date2).getTime()
  if (d1 > d2) {
    return true
  }

  return text
}
