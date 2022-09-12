import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import { Text } from 'react-native-paper';
import { db } from '../../../environments/firebaseConfig';
import { authInfo } from '../../constants/common/common_function';

const ProfileScreen = (props: any) => {
    const user = authInfo();
    const { email } = props?.route?.params ? props?.route?.params : [];
    const [userInfo, setUserInfo] = useState(null);

    const readData = async () => {
        const myDoc = doc(db, "users", email);
        getDoc(myDoc).then(async (snapshot) => {
            if (snapshot.exists()) {
                const data = await snapshot.data();
                setUserInfo(data);
            }
            else {
                Alert.alert("No doc found");
            }
        }).catch((error) => { Alert.alert(error) })
    }

    useEffect(() => {
        readData();
    }, []);

    console.log("userinfo:", userInfo);


    return (
        <View>
            <Text>{userInfo?.email}</Text>
            <Text>ProfileScreen</Text>
            <Text>ProfileScreen</Text>
        </View>);

}

export default ProfileScreen;
