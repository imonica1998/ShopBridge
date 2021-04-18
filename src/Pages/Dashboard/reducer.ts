import { GET_DASHBOARD_ITEMS, GET_ITEMS_LIST, SET_DASHBOARD_ITEMS, SET_ITEMS_LIST, ERROR_GET_ITEMS_LIST, ERROR_GET_DASHBOARD_ITEMS, DELETE_ITEM, DELETE_ITEM_SUCCESS, CREATE_OR_MODIFY_ITEM_SUCCESS, CREATE_OR_MODIFY_ITEM } from './action';

const devLoginInitialState = {
    dashboardData: {},
    inventoryItems: [],
    errorGetDashboardItems: false,
    errorGetItemsList: false,
    deleteItem: "",
    deleteItemSuccess: false,
    itemCreating: false,
    createOrModifyItemSuccess: false,
}

function dashboardReducer(state = devLoginInitialState, action: any) {
    switch (action.type) {
        case GET_DASHBOARD_ITEMS:
            return { ...state, dashbordData: {}, errorGetDashboardItems: false }
        case SET_DASHBOARD_ITEMS:
            return { ...state, dashbordData: action.items, errorGetDashboardItems: false }
        case ERROR_GET_DASHBOARD_ITEMS:
            return { ...state, dashbordData: {}, errorGetDashboardItems: true }
        case GET_ITEMS_LIST:
            return { ...state, inventoryItems: [], errorGetItemsList: action.error }
        case SET_ITEMS_LIST:
            return { ...state, inventoryItems: action.items, errorGetItemsList: false }
        case ERROR_GET_ITEMS_LIST:
            return { ...state, inventoryItems: [], errorGetItemsList: action.error }
        case DELETE_ITEM:
            return { ...state, deleteItem: action.itemName }
        case DELETE_ITEM_SUCCESS:
            return { ...state, deleteItemSuccess: action.success }
        case CREATE_OR_MODIFY_ITEM:
            return { ...state, itemCreating: action.creating }
        case CREATE_OR_MODIFY_ITEM_SUCCESS:
            return { ...state, createOrModifyItemSuccess: action.success, itemCreating: false }
        default:
            return state
    }
}

export default dashboardReducer;