export const isEmailValid = (email) => {
  return email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g)
}

export const validateInputEmail = (email) => {
  if (isEmailValid(email)) return true

  return 'Email is invalid'
}

export const isPasswordValid = (pw) => {
  return pw.match(
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!])(?!.*\s).{12,}$/g
  )
}

export const validateInputPassword = (pw) => {
  if (isPasswordValid(pw)) return true

  return (
    'Password must have at least:\n' +
    '- 1 lower letter\n' +
    '- 1 upper letter\n' +
    '- 1 of the following special characters: @#$%^&+=!\n' +
    '- 12 characters\n' +
    '- no whitespaces'
  )
}
