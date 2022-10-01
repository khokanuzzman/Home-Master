import moment from "moment";
import database from '@react-native-firebase/database';
import { currentUser } from "../auth/auth.action";

export const TRANSECTION_MODAL_STATUS = 'TRANSECTION_MODAL_STATUS';
export const AMOUNT_CALCULATION_VALUE = 'AMOUNT_CALCULATION_VALUE';
let currMonthName = moment().format('MMMM');
let currentYear = moment().format('YYYY');


const db = database();
const baseUrl = `home-master/${currentUser?.uid}`
export const budgetUrl = `${baseUrl}/budget/${currentYear}/${currMonthName}/`

export const transactionModalStatus = (status:boolean) => {
    return (dispatch:any) => {
        console.log("status",status);
        dispatch({ type: TRANSECTION_MODAL_STATUS, status: status });
    }
}

export const amountCalculation = (amount:number) => {
    return (dispatch:any) => {
        dispatch({ type: AMOUNT_CALCULATION_VALUE, amount: amount });
    }
}
