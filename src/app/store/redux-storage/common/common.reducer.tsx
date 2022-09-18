
import {
    TRANSECTION_MODAL_STATUS
} from './common.action';

const status: boolean = false;

const initialState = {
    transectionStatus: status
    // doctorSearchQuery:doctorSearchQuery
}

export default (state = initialState, action) => {
    console.log()
    switch (action.type) {
        case TRANSECTION_MODAL_STATUS:
            return {
                ...state,
                transectionStatus: action.status
            };

        default:
            return state;
    }
};