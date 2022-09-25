export const AUTH_INFO = 'AUTH_INFO';

export const authInfo = (info: any) => {
    return (dispatch: any) => {
        console.log("status", info);
        dispatch({ type: AUTH_INFO, info: info });
    }
}
