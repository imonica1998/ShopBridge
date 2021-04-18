import { actionErrorGetDashboardItems, actionErrorGetItemsList, actionGetDashboardItems, actionGetItemsList, actionSetDasboardItems, actionSetItemsList, actionDeleteItem, actionDeleteItemSuccess } from './action';
import { apiCall } from "../../Utils/API/ApiCall";
import { apiEndPoints, requestMethod } from "../../Utils/API/Constants";
import { toast } from 'react-toastify';

export function dispatchGetInventoryItemsList() {
    return async (dispatch: any) => {
        dispatch(actionGetItemsList());
        let response = await apiCall(apiEndPoints.GET_INVENTORY_ITEMS_DASHBOARD, requestMethod.GET)
        if (response.success) {
            console.log("response---", response)
            dispatch(actionSetItemsList(response?.data?.message))
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

export function dispatchDeleteItem(itemName: string) {
    return async (dispatch: any) => {
        console.log("inside dispatch")
        if (!itemName) {
            toast.error("Invalid Item Name!");
            return
        }
        dispatch(actionDeleteItem(itemName))
        let response = await apiCall(apiEndPoints.DELETE_ITEM + `?item_name=${itemName}`, requestMethod.GET)
        if (response.success) {
            console.log("response delete---", response)
            dispatch(actionDeleteItem(""))
            dispatch(actionDeleteItemSuccess(true))
        }
        else {
            dispatch(actionDeleteItemSuccess(!response.success))
        }
    }
}