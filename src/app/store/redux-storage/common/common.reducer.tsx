
import {
    SET_USER_LOGGEDIN
} from './common.action';

const status: boolean = false;

const initialState = {
    auth_status: status
    // doctorSearchQuery:doctorSearchQuery
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_LOGGEDIN:
            return {
                ...state,
                auth_status: [...action.status]
            };

        default:
            return state;
    }
};