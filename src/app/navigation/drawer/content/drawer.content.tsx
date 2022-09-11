import auth from '@react-native-firebase/auth';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { Colors, Divider, IconButton, Text } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import colors from '../../../constants/common/colors';
import common from '../../../constants/common/common';
import { logoutFn } from '../../../constants/common/common_function';
import fontSize from '../../../constants/common/font.size';



export const DrawerLeftContent = (props) => {
    const dispatch = useDispatch();
    const [user, setUser] = useState();
    const [initializing, setInitializing] = useState(true);

    const onAuthStateChanged = (user) => {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    return (
        <View style={{
            flex: 1,
            backgroundColor: colors.DRAWER_BACKGROUND,
        }}>
            <DrawerContentScrollView
                contentContainerStyle={{
                    backgroundColor: colors.DRAWER_BACKGROUND,
                    flex: 1,
                }}
                {...props}>
                <DrawerContentScrollView>
                    <View style={{ height: 300, justifyContent: 'center', alignItems: 'center' }}>
                        <Ionicons name={props.icon || (Platform.OS === 'android' ? 'md-person-circle-outline' : 'ios-person-circle-outline')} size={150} color={colors.GREEN} />
                        <Text style={{ color: Colors.white }}>{user?.email}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center' }}>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Ionicons name={props.icon || (Platform.OS === 'android' ? 'md-person-circle-outline' : 'ios-person-circle-outline')} size={50} color={colors.GREEN} />
                            )}
                            labelStyle={styles.itemColor}
                            label='profile'
                            style={{ flex: 1 }}
                            onPress={() => { props.navigation.navigate("profile") }}
                        />

                        <IconButton
                            icon="account-edit"
                            color={Colors.white}
                            size={20}
                            onPress={() => props.navigation.navigate('profileForm')}
                        />
                    </View>
                    <DrawerItem
                        icon={({ color, size }) => (
                            <Ionicons name={props.icon || (Platform.OS === 'android' ? 'md-person-circle-outline' : 'ios-person-circle-outline')} size={50} color={colors.GREEN} />
                        )}
                        labelStyle={styles.itemColor}
                        label='Report'
                        onPress={() => { }}

                    />
                    <DrawerItem
                        icon={({ color, size }) => (
                            <Ionicons name={props.icon || (Platform.OS === 'android' ? 'md-log-out-outline' : 'ios-log-out-outline')} size={50} color={colors.GREEN} />
                        )}
                        labelStyle={styles.itemColor}
                        label='Logout'
                        onPress={() => { logoutFn(props) }}

                    />
                </DrawerContentScrollView>
            </DrawerContentScrollView>
            <Divider />
        </View>
    );
}


const styles = StyleSheet.create({
    userInfoSection: {
        margin: common.TEN,
        height: 250,
        zIndex: 0
    },
    userWrap: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: common.TWENTEE,
    },
    drawerSection: {
        marginTop: common.FIVE,
    },
    userName: {
        fontSize: fontSize.XL,
        marginTop: 0,
        padding: 0,
        color: colors.WHITE
    },
    viewEditText: {
        fontSize: fontSize.DEFAULT,
        color: colors.GREEN,
        margin: 0,
        padding: 0,
        textDecorationLine: 'underline'
    },

    itemColor: {
        color: colors.WHITE,
    },

    optionsItemColor: {

    },
    optionLabelStyle: {
        textAlign: 'center',
        color: colors.WHITE
    },

    optionItem: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: colors.GREEN,
        width: '90%',
        padding: common.TEN,
        margin: common.FIVE,
        alignSelf: 'center'
    },
    profilePicWrapper: {
        borderWidth: 10,
        borderRadius: 100,
        borderColor: colors.GREEN,
        position: 'relative',
        width: 'auto',
        alignItems: 'center'
    },
    switchBtnStyle: {
        position: 'absolute',
        top: 37,
        borderWidth: 1,
        paddingVertical: 6,
        paddingHorizontal: 7,
        borderRadius: 100,
        borderColor: colors.GREEN,
        zIndex: 99999,
        backgroundColor: colors.WHITE
    },
    iconStyle: {
        width: 30,
    },
    ItemDescription: {
        color: colors.WHITE,
        fontSize: 10,
        position: 'absolute',
        bottom: 10,
        left: 80

    },
    itemStyle: {
        justifyContent: 'center',
        marginBottom: 10,
    }
});