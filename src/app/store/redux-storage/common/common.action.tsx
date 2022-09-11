
export const SET_USER_LOGGEDIN = 'SET_USER_LOGGEDIN';

export const isLoggedInFn = (status: boolean) => {
    return dispatch => {
        dispatch({ type: SET_USER_LOGGEDIN, status: status });
    }
}
