export const GET_ITEMS_LIST = 'GET_ITEMS_LIST'
export const SET_ITEMS_LIST = 'SET_ITEMS_LIST'
export const ERROR_GET_ITEMS_LIST = 'ERROR_GET_ITEMS_LIST'
export const SET_DASHBOARD_ITEMS = 'SET_DASHBOARD_ITEMS'
export const DELETE_ITEM = 'DELETE_ITEM'
export const DELETE_ITEM_SUCCESS = 'DELETE_ITEM_SUCCESS'
export const CREATE_OR_MODIFY_ITEM = 'CREATE_OR_MODIFY_ITEM'
export const CREATE_OR_MODIFY_ITEM_SUCCESS = 'CREATE_OR_MODIFY_ITEM_SUCCESS'

export function actionGetItemsList() {
    return { type: GET_ITEMS_LIST }
}

export function actionErrorGetItemsList(error: any) {
    return { type: ERROR_GET_ITEMS_LIST, error }
}

export function actionSetItemsList(items: any) {
    return { type: SET_ITEMS_LIST, items }
}

export function actionSetDasboardItems(items: any) {
    return { type: SET_DASHBOARD_ITEMS, items }
}

export function actionDeleteItem(itemName: string) {
    return { type: DELETE_ITEM, itemName }
}

export function actionDeleteItemSuccess(success: boolean) {
    return { type: DELETE_ITEM_SUCCESS, success }
}

export function actionCreateOrModifyItem(creating:boolean) {
    return { type: CREATE_OR_MODIFY_ITEM ,creating}
}
export function actionCreateOrModifyItemSuccess(success: boolean) {
    return { type: CREATE_OR_MODIFY_ITEM_SUCCESS, success }
}

