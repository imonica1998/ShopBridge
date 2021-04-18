import { actionGetProfile, actionErrorGetProfile, actionErrorUpdateProfile, actionSetProfile, actionUpdateProfile, actionProfileUpdateSuccess } from './action';
import { apiCall } from "../../Utils/API/ApiCall";
import { apiEndPoints, requestMethod } from "../../Utils/API/Constants";


export function dispatchGetProfile() {
    return async (dispatch: any) => {
        console.log("get Profile--")
        dispatch(actionGetProfile())
        let response = await apiCall(apiEndPoints.GET_PROFILE, requestMethod.GET)
        if (response.success) {
            dispatch(actionSetProfile(response.data.message))
        } else {
            dispatch(actionErrorGetProfile(!response.success))
        }
    }
}

export function dispatchUpdateProfile(updatedProfile: any) {
    return async (dispatch: any) => {
        dispatch(actionUpdateProfile())
        let response = await apiCall(apiEndPoints.UPDATE_PROFILE, requestMethod.POST, updatedProfile)
        if (response.success) {
            console.log("success update!")
            dispatch(actionProfileUpdateSuccess(true))
        } else {
            dispatch(actionErrorUpdateProfile(!response.success))
        }
    }
}
