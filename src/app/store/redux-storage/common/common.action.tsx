export const TRANSECTION_MODAL_STATUS = 'TRANSECTION_MODAL_STATUS';

export const transactionModalStatus = (status:boolean) => {
    return (dispatch:any) => {
        console.log("status",status);
        dispatch({ type: TRANSECTION_MODAL_STATUS, status: status });
    }
}
