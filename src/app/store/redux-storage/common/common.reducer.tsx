
import {
    AMOUNT_CALCULATION_VALUE,
    TRANSECTION_MODAL_STATUS,
    WEEK_TOTAL_EXPANSES
} from './common.action';

const status: boolean = false;
const weekTotal: number = 0;

const initialState = {
    transectionStatus: status,
    weekTotal: weekTotal
    // doctorSearchQuery:doctorSearchQuery
}

export default (state = initialState, action) => {
    switch (action.type) {
        case TRANSECTION_MODAL_STATUS:
            return {
                ...state,
                transectionStatus: action.status
            };        
            case WEEK_TOTAL_EXPANSES:
            return {
                ...state,
                weekTotal: action.weekTotal
            };

        default:
            return state;
    }
};