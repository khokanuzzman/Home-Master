import { AuthInfo } from "../../../constants/auth/authDto";
import { firebase  } from '@react-native-firebase/auth';

export const AUTH_INFO = 'AUTH_INFO';

export const authInfo = (info: AuthInfo) => {
    return async (dispatch: any) => {
        console.log("status info", info);
        await dispatch({ type: AUTH_INFO, info: info });
    }
}
