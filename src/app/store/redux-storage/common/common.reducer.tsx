
import {
    AMOUNT_CALCULATION_VALUE,
    TRANSECTION_MODAL_STATUS
} from './common.action';

const status: boolean = false;
const amountNumber: number = 0;

const initialState = {
    transectionStatus: status,
    amount: amountNumber
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
            case AMOUNT_CALCULATION_VALUE:
            return {
                ...state,
                amount: action.amount
            };

        default:
            return state;
    }
};