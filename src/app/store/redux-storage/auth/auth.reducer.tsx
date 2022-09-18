
import {
    AUTH_INFO
} from './auth.action';

const authInfo: any = {};

const initialState = {
    authInfo: authInfo
    // doctorSearchQuery:doctorSearchQuery
}

export default (state = initialState, action) => {
    switch (action.type) {
        case AUTH_INFO:
            return {
                ...state,
                authInfo: action.info
            };

        default:
            return state;
    }
};