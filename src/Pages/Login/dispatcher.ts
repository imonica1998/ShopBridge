import { actionEmailErrorLogin, actionErrorLogin, actionLogin, actionPasswordErrorLogin } from './action';
import { apiCall } from "../../Utils/API/ApiCall";
import { apiEndPoints, requestMethod } from "../../Utils/API/Constants";
import { toast } from 'react-toastify';

export function dispatchLogin(username: string, password: string) {
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
        if(!isError){
            let response = await apiCall(apiEndPoints.DEV_LOGIN, requestMethod.POST, {
                usr: username,
                pwd: password,
            })
            if (response.success) {
                toast.success("Login Successful!")
            }
            else{
                dispatch(actionErrorLogin(!response.success))
            }
            
        }

    }
}