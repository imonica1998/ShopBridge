import { GET_PROFILE, ERROR_GET_PROFILE, SET_PROFILE, UPDATE_PROFILE, ERROR_UPDATE_PROFILE } from './action';

const devLoginInitialState = {
    profile: {},
    fetchingProfile: false,
    errorFetchingProfile: false,
    errorUpdateProfile: false
}

function profileReducer(state = devLoginInitialState, action: any) {
    switch (action.type) {
        case GET_PROFILE:
            return { ...state, fetchingProfile: true, errorFetchingProfile: false }
        case ERROR_GET_PROFILE:
            return { ...state, fetchingProfile: false, errorFetchingProfile: action.error }
        case SET_PROFILE:
            return { ...state, fetchingProfile: false, errorFetchingProfile: false, profile: action.profile }
        case UPDATE_PROFILE:
            return { ...state, fetchingProfile: true, errorFetchingProfile: false }
        case ERROR_UPDATE_PROFILE:
            return { ...state, fetchingProfile: true, errorFetchingProfile: false, errorUpdateProfile: action.error }
        default:
            return state
    }
}

export default profileReducer;