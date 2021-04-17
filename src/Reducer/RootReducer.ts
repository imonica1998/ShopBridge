import { combineReducers } from 'redux';
import loginReducer from '../Pages/Login/reducer';
import dashboardReducer from '../Pages/Dashboard/reducer';
import profileReducer from '../Pages/Profile/reducer';

const appReducer = combineReducers({
    login: loginReducer,
    dashboard: dashboardReducer,
    profileData: profileReducer,
});

const rootReducer = (state: any, action: any) => {
    console.log('===ACTION===', action.type);
    return appReducer(state, action);
};

export default rootReducer;
