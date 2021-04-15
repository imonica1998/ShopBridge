import { combineReducers } from 'redux';
import loginReducer from '../Pages/Login/reducer';

const appReducer = combineReducers({
    login: loginReducer,
});

const rootReducer = (state: any, action: any) => {
    console.log('===ACTION===', action.type);
    return appReducer(state, action);
};

export default rootReducer;
