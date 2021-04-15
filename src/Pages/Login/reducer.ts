import { LOGIN, PASSWORD_ERROR_LOGIN, EMAIL_ERROR_LOGIN, ERROR_LOGIN } from './action';

const devLoginInitialState = {
    devLoginProcessing: false,
    errordevLoginProcessing: false,
    emailError: false,
    passwordError: false,
}

function devLoginReducer(state = devLoginInitialState, action: any) {
    switch (action.type) {
        case LOGIN:
            return { ...state, devLoginProcessing: true, errordevLoginProcessing: false }
        case ERROR_LOGIN:
            return { ...state, devLoginProcessing: false, errordevLoginProcessing: true }
        case EMAIL_ERROR_LOGIN:
            return { ...state, devLoginProcessing: false, emailError: action.error, errordevLoginProcessing: true }
        case PASSWORD_ERROR_LOGIN:
            return { ...state, devLoginProcessing: false, passwordError: action.error, errordevLoginProcessing: true }
        default:
            return state
    }
}

export default devLoginReducer;