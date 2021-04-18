export const USER_KEY = ''

export const apiEndPoints = {
    LOGIN: '/api/method/login',
    GET_INVENTORY_ITEMS_DASHBOARD: "/api/method/velocityduos.api.mobile_utils.get_items_dashboard",
    GET_DASHBOARD_DATA: "/api/method/velocityduos.api.mobile_utils.get_dashboard_data",
    DELETE_ITEM: "/api/method/velocityduos.api.mobile_utils.delete_inventory_item",
    UPDATE_PROFILE: "/api/method/velocityduos.api.mobile_utils.update_user_profile",
    GET_PROFILE: "/api/method/velocityduos.api.mobile_utils.get_user_profile",
    CREATE_MODIFY_ITEM: "/api/method/velocityduos.api.mobile_utils.create_or_modify_item",
}

export const requestMethod = {
    GET: 'GET',
    DELETE: 'DELETE',
    HEAD: 'HEAD',
    OPTIONS: 'OPTIONS',
    POST: 'POST',
    PUT: 'PUT',
    PATCH: 'PATCH',
}

export const TIME_OUT = 1000 * 30;