import { actionErrorGetItemsList, actionGetItemsList, actionSetDasboardItems, actionSetItemsList, actionDeleteItem, actionDeleteItemSuccess, actionCreateOrModifyItem, actionCreateOrModifyItemSuccess } from './action';
import { apiCall } from "../../Utils/API/ApiCall";
import { apiEndPoints, requestMethod } from "../../Utils/API/Constants";
import { toast } from 'react-toastify';

export function dispatchGetInventoryItemsList() {
    return async (dispatch: any) => {
        dispatch(actionGetItemsList());
        let response = await apiCall(apiEndPoints.GET_INVENTORY_ITEMS_DASHBOARD, requestMethod.GET)
        if (response.success) {
            dispatch(actionSetItemsList(response?.data?.message))
            dispatch(dispatchGetDashboardItems(response?.data?.message))
        }
        else {
            dispatch(actionErrorGetItemsList(!response.success))
        }
    }
}

export function dispatchGetDashboardItems(items: any) {
    return async (dispatch: any) => {
        var newItems = 0, modifiedItems = 0, totalItems = 0, availableItems = 0, deletedItems = 0;
        for (const i in items) {
            if (items[i]["status"] === "New") {
                newItems += 1;
            }
            else if (items[i]["status"] === "Modified") {
                modifiedItems += 1;
            }
            else if (items[i]["status"] === "Deleted") {
                deletedItems += 1;
            }
            if (items[i]["status"] !== "Deleted") {
                totalItems += 1;
                if (items[i]["available_quantity"] > 0) {
                    availableItems += 1;
                }
            }
        }
        dispatch(actionSetDasboardItems({ "newItems": newItems, "modifiedItems": modifiedItems, "totalItems": totalItems, "availableItems": availableItems, "deletedItems": deletedItems }))
    }
}

export function dispatchDeleteItem(itemName: string) {
    return async (dispatch: any) => {
        if (!itemName) {
            toast.error("Invalid Item Name!");
            return
        }
        dispatch(actionDeleteItem(itemName))
        let response = await apiCall(apiEndPoints.DELETE_ITEM + `?item_name=${itemName}`, requestMethod.GET)
        if (response.success) {
            dispatch(actionDeleteItem(""))
            dispatch(actionDeleteItemSuccess(true))
        }
        else {
            dispatch(actionDeleteItemSuccess(!response.success))
        }
    }
}

export function dispatchCreateOrModifyItem(item: any, isNew: boolean) {
    return async (dispatch: any) => {
        console.log("createOrmodify-", item)
        dispatch(actionCreateOrModifyItem(true))
        let response = await apiCall(apiEndPoints.CREATE_MODIFY_ITEM, requestMethod.POST, { "payload": JSON.stringify(item), "is_new": isNew })
        console.log("response--", response)
        if (response.success && response.data?.message) {
            dispatch(actionCreateOrModifyItemSuccess(true))
        }
        else {
            dispatch(actionCreateOrModifyItemSuccess(!response.success))
        }
    }
}