import { actionEmailErrorLogin, actionErrorLogin, actionLogin, actionPasswordErrorLogin } from './action';
import { apiCall } from "../../Utils/API/ApiCall";
import { apiEndPoints, requestMethod } from "../../Utils/API/Constants";
import { toast } from 'react-toastify';
import Utility from "../../Utils/Utility"

export function dispatchLogin(username: string, password: string, self: any) {
    return async (dispatch: any) => {
        dispatch(actionLogin);
        var reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
        let isError = false;
        if (username) {
            if (!reg.test(username)) {
                isError = true
                dispatch(actionEmailErrorLogin(
                    'Please Enter a valid Email!'
                ))
                return
            }
        }
        else {
            isError = true
            dispatch(actionEmailErrorLogin(
                'Please Enter Email Address!'
            ))
            return
        }
        if (!password) {
            isError = true
            dispatch(actionPasswordErrorLogin(
                'Please Enter Password!'
            ))
            return
        }
        if (!isError) {
            let response = await apiCall(apiEndPoints.LOGIN, requestMethod.POST, {
                usr: username,
                pwd: password,
            })
            if (response.success) {
                toast.success("Login Successful!");
                Utility.navigateToScreen("/dashboard", self, {})
            }
            else {
                dispatch(actionErrorLogin(!response.success))
            }

        }

    }
}