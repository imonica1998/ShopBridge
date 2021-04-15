export const LOGIN = 'LOGIN'
export const ERROR_LOGIN = 'ERROR_LOGIN'
export const EMAIL_ERROR_LOGIN = 'EMAIL_ERROR_LOGIN'
export const PASSWORD_ERROR_LOGIN = 'PASSWORD_ERROR_LOGIN'

export function actionLogin() {
    return { type: LOGIN }
}

export function actionErrorLogin(error: boolean) {
    return { type: ERROR_LOGIN, error }
}

export function actionEmailErrorLogin(error: any) {
    return { type: EMAIL_ERROR_LOGIN, error }
}

export function actionPasswordErrorLogin(error: any) {
    return { type: PASSWORD_ERROR_LOGIN, error }
}