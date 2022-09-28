import { AuthInfo } from "../../../constants/auth/authDto";
import { firebase  } from '@react-native-firebase/auth';

export const AUTH_INFO = 'AUTH_INFO';
export const currentUser = firebase.auth().currentUser;

export const authInfo = (info: AuthInfo) => {
    return (dispatch: any) => {
        console.log("status info", info);
        dispatch({ type: AUTH_INFO, info: info });
    }
}
