export const GET_PROFILE = 'GET_PROFILE'
export const SET_PROFILE = 'SET_PROFILE'
export const ERROR_GET_PROFILE = 'ERROR_GET_PROFILE'
export const UPDATE_PROFILE = "UPDATE_PROFILE"
export const ERROR_UPDATE_PROFILE = "ERROR_UPDATE_PROFILE"
export const PROFILE_UPDATE_SUCCESS = "PROFILE_UPDATE_SUCCESS"

export function actionGetProfile() {
    return { type: GET_PROFILE }
}

export function actionSetProfile(profile: any) {
    return { type: SET_PROFILE, profile }
}

export function actionErrorGetProfile(error: any) {
    return { type: ERROR_GET_PROFILE, error }
}

export function actionUpdateProfile() {
    return { type: UPDATE_PROFILE }
}

export function actionErrorUpdateProfile(error: any) {
    return { type: ERROR_UPDATE_PROFILE, error }
}

export function actionProfileUpdateSuccess(success: boolean) {
    return { type: PROFILE_UPDATE_SUCCESS, success }
}

