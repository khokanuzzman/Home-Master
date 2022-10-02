import auth from '@react-native-firebase/auth';
import { DrawerContent, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { Avatar, Colors, Divider, IconButton, Text } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import colors from '../../../constants/common/colors';
import common from '../../../constants/common/common';
import { logoutFn } from '../../../constants/common/common_function';
import fontSize from '../../../constants/common/font.size';
import { currentUser } from '../../../store/redux-storage/auth/auth.action';
import drawerStyle from './drawer.content.style';



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
                    <View style={drawerStyle.headerSection}>
                        <View style={{
                            borderWidth: 2,
                            borderRadius: 50,
                            padding: common.THREE,
                            borderColor: colors.IMAGE_BORDER_COLOR,
                            marginRight: common.THREE,
                            marginHorizontal:common.TEN
                        }}>
                            <Avatar.Image size={70} source={{uri:currentUser?.photoURL}} />
                        </View>
                        <View style={{ flex: 1.5 }}>
                            <Text style={{ color: colors.LIGHT_TEXT_COLOR }}>username</Text>
                            <Ionicons style={{ flex: 1, position: 'absolute', right: 15, top: -5 }}
                                onPress={() => props.navigation.navigate('profileForm', { email: currentUser?.email })}
                                name={props.icon || (Platform.OS === 'android' ? 'md-create-outline' : 'ios-person-create-outline')} size={25} color={colors.VOILET} />
                            <Text style={{ color: colors.TEXT, fontSize: fontSize.SIXTEEN, fontWeight: "bold" }}>{currentUser?.displayName}</Text>
                        </View>
                    </View>
                    <View style={drawerStyle.itemWrapper}>
                        <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center', }}>
                            <DrawerItem
                                icon={({ color, size }) => (
                                    <Ionicons style={drawerStyle.iconStyle} name={props.icon || (Platform.OS === 'android' ? 'md-wallet-outline' : 'ios-wallet-outline')} size={50} color={colors.VOILET} />
                                )}
                                labelStyle={styles.itemLabel}
                                label='Account'
                                style={{ flex: 1 }}
                                onPress={() => { props.navigation.navigate("profile", { email: currentUser?.email }) }}
                            />
                        </View>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Ionicons style={drawerStyle.iconStyle} name={props.icon || (Platform.OS === 'android' ? 'md-stats-chart-outline' : 'ios-stats-chart-outline')} size={50} color={colors.VOILET} />
                            )}
                            labelStyle={styles.itemLabel}
                            label='Report'
                            onPress={() => { }}

                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Ionicons style={drawerStyle.iconStyle} name={props.icon || (Platform.OS === 'android' ? 'md-settings-outline' : 'ios-settings-outline')} size={50} color={colors.VOILET} />
                            )}
                            labelStyle={styles.itemLabel}
                            label='Settings'
                            onPress={() => { }}

                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Ionicons style={drawerStyle.iconStyle} name={props.icon || (Platform.OS === 'android' ? 'md-log-out-outline' : 'ios-log-out-outline')} size={50} color={colors.ERROR} />
                            )}
                            labelStyle={styles.itemLabel}
                            label='Logout'
                            onPress={() => { logoutFn(props) }}

                        />
                    </View>
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

    itemLabel: {
        color: colors.DRAWER_TEXT_COLOR,
        fontSize: fontSize.SIXTEEN
    },

    iconStyle: {

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