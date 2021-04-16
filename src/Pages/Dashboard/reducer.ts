import { GET_DASHBOARD_ITEMS, GET_ITEMS_LIST, SET_DASHBOARD_ITEMS, SET_ITEMS_LIST, ERROR_GET_ITEMS_LIST, ERROR_GET_DASHBOARD_ITEMS } from './action';

const devLoginInitialState = {
    dashboardData: {},
    inventoryItems: [],
    errorGetDashboardItems: false,
    errorGetItemsList: false,
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
        default:
            return state
    }
}

export default dashboardReducer;