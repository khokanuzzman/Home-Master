import React, { useState } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { AuthInfo } from '../../constants/auth/authDto';

const ProfileScreen = (props: any) => {
    const { email } = props?.route?.params ? props?.route?.params : [];
    const [userInfo, setUserInfo] = useState(null);
    const authInfo: AuthInfo = useSelector((state) => state.auth.authInfo);
    return (
        <View>
            <Text>{authInfo?.email}</Text>
            <Text>ProfileScreen</Text>
            <Text>ProfileScreen</Text>
        </View>);

}

export default ProfileScreen;
