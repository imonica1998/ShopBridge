import { actionGetProfile, actionErrorGetProfile, actionErrorUpdateProfile, actionSetProfile, actionUpdateProfile } from './action';
import { apiCall } from "../../Utils/API/ApiCall";
import { apiEndPoints, requestMethod } from "../../Utils/API/Constants";

export function dispatchGetProfile() {
    return async (dispatch: any) => {
        dispatch(actionGetProfile())
        let response = await apiCall(apiEndPoints.GET_PROFILE, requestMethod.GET)
        if (response.success) {
            dispatch(actionSetProfile(response.data.message))
        } else {
            dispatch(actionErrorGetProfile(!response.success))
        }
    }
}

export function dispatchUpdateProfile() {
    return async (dispatch: any) => {
    }
}
