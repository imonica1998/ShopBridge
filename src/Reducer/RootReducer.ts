import { combineReducers } from 'redux';
import loginReducer from '../Pages/Login/reducer';
import dashboardReducer from '../Pages/Dashboard/reducer';

const appReducer = combineReducers({
    login: loginReducer,
    dashboard: dashboardReducer
});

const rootReducer = (state: any, action: any) => {
    console.log('===ACTION===', action.type);
    return appReducer(state, action);
};

export default rootReducer;
