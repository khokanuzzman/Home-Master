import AsyncStorage from "@react-native-async-storage/async-storage";
import auth from '@react-native-firebase/auth';
import { useEffect, useState } from "react";

// export const [loggedIn, setIsLoggedIn] = useState(false);
// Set an initializing state whilst Firebase connects


export const setLoggedInStatusFn = async (isLogged: string) => {
    try {
        return await AsyncStorage.setItem('loggedIn', isLogged);
    } catch (e) {
        // saving error
    }
}

export const logoutFn = (props) => {
    auth()
        .signOut()
        .then(() => props.navigation.navigate("login"));
}

export const authInfo = () => {
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
    // Handle user state changes


    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);
    
    const onAuthStateChanged = (user) => {
        setUser(user);
        if (initializing) setInitializing(false);
    }
    return user;
}
