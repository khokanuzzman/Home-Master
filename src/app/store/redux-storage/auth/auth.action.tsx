import { AuthInfo } from "../../../constants/auth/authDto";

export const AUTH_INFO = 'AUTH_INFO';

export const authInfo = (info: AuthInfo) => {
    return (dispatch: any) => {
        console.log("status info", info);
        dispatch({ type: AUTH_INFO, info: info });
    }
}
