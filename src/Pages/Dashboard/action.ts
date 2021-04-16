export const GET_ITEMS_LIST = 'GET_ITEMS_LIST'
export const SET_ITEMS_LIST = 'SET_ITEMS_LIST'
export const ERROR_GET_ITEMS_LIST = 'ERROR_GET_ITEMS_LIST'
export const GET_DASHBOARD_ITEMS = 'GET_DASHBOARD_ITEMS'
export const SET_DASHBOARD_ITEMS = 'SET_DASHBOARD_ITEMS'
export const ERROR_GET_DASHBOARD_ITEMS = 'ERROR_GET_DASHBOARD_ITEMS'

export function actionGetItemsList() {
    return { type: GET_ITEMS_LIST }
}

export function actionErrorGetItemsList(error: any) {
    return { type: ERROR_GET_ITEMS_LIST, error }
}

export function actionSetItemsList(items: any) {
    return { type: SET_ITEMS_LIST, items }
}

export function actionGetDashboardItems() {
    return { type: GET_DASHBOARD_ITEMS }
}

export function actionErrorGetDashboardItems(error: any) {
    return { type: ERROR_GET_DASHBOARD_ITEMS, error }
}

export function actionSetDasboardItems(items: any) {
    return { type: SET_DASHBOARD_ITEMS, items }
}

