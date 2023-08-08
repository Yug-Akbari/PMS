export const errorCode = {
  WEEK_PASSWORD: 'auth/weak-password',
  ACCOUNT_EXISTS: 'auth/email-already-in-use',
  INVALID_PASSWORD: 'auth/wrong-password',
  USER_NOT_EXIST: 'auth/user-not-found',
}

export const errorMessage = {
  [errorCode.WEEK_PASSWORD]: 'Password should be at least 6 characters?',
  [errorCode.ACCOUNT_EXISTS]: 'An account with this email is already exists!',
  [errorCode.INVALID_PASSWORD]: 'Password is incorrect!',
  [errorCode.USER_NOT_EXIST]: 'Email or password is incorrect!',
}
