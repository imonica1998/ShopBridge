import { actionErrorGetDashboardItems, actionErrorGetItemsList, actionGetDashboardItems, actionGetItemsList, actionSetDasboardItems, actionSetItemsList } from './action';
import { apiCall } from "../../Utils/API/ApiCall";
import { apiEndPoints, requestMethod } from "../../Utils/API/Constants";
import { toast } from 'react-toastify';

export function dispatchGetInventoryItemsList() {
    return async (dispatch: any) => {
        dispatch(actionGetItemsList());
        let response = await apiCall(apiEndPoints.GET_INVENTORY_ITEMS_DASHBOARD, requestMethod.GET)
        if (response.success) {
            console.log("response---", response)
        }
        else {
            dispatch(actionErrorGetItemsList(!response.success))
        }
    }
}

export function dispatchGetDashboardItems() {
    return async (dispatch: any) => {
        dispatch(actionGetDashboardItems());
        let response = await apiCall(apiEndPoints.GET_INVENTORY_ITEMS_DASHBOARD, requestMethod.GET)
        if (response.success) {
            console.log("response---", response)
        }
        else {
            dispatch(actionErrorGetDashboardItems(!response.success))
        }
    }
}