import moment from "moment";
import database from '@react-native-firebase/database';
import { weekNumber } from "../../../core/utils";
import { currentUser } from "../../../navigation/app.navigation.container";

export const TRANSECTION_MODAL_STATUS = 'TRANSECTION_MODAL_STATUS';
export const AMOUNT_CALCULATION_VALUE = 'AMOUNT_CALCULATION_VALUE';
export const currMonthName = moment().format('MMMM');
export const currentYear = moment().format('YYYY');
export const dayName = moment().format('dddd');
export const day = moment().format('d');
export const currentDate = moment().format('D-M-YYYY');;
export const year = moment().format('yyyy');
export const month = moment().format('M');
export const currentMonthWeek = weekNumber(new Date());



const db = database();
export const baseUrlUid = `home-master/${currentUser?.uid}`
export const budgetUrl = `${baseUrlUid}/budget/${currentYear}/${currMonthName}/`

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