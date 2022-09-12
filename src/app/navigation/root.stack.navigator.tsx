import { DrawerNavigationProp } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { BottomTab } from '../components/BottomTab';
import colors from '../constants/common/colors';
import common from '../constants/common/common';
import fontSize from '../constants/common/font.size';
import { ForgotPasswordScreen, HomeScreen, LoginScreen, RegisterScreen } from '../screens';
import DashboardScreen from '../screens/dashboard/dashboard.screen';
import profileForm from '../screens/profile/form/profile.form';
import ProfileScreen from '../screens/profile/profile.screen';


const Stack = createStackNavigator();

export const RootStackNavigator = (props) => {
    const dispatch = useDispatch();

    return (
        <Stack.Navigator
            initialRouteName='dashboard'
            screenOptions={{
                header: ({ navigation, route, back, options, progress }) => {
                    const title =
                        options.headerTitle !== undefined
                            ? options.headerTitle
                            : options.title !== undefined
                                ? options.title
                                : route.name;

                    return (
                        <Appbar.Header
                            style={{ backgroundColor: colors.BAKCGROUND, elevation: 0 }}>
                            {progress.previous
                                ? (<Appbar.BackAction onPress={navigation.goBack} color={colors.GREEN} />) : (
                                    <Appbar.Action icon='menu' color={colors.TOP_BAR_TEXT_COLOR} size={common.ICON_SIZE} onPress={() => {
                                        ((navigation as any) as DrawerNavigationProp<{}>).openDrawer();
                                    }} />
                                )}
                            <Appbar.Content
                                title={title.toString().toLocaleLowerCase()}
                                titleStyle={{
                                    fontSize: fontSize.M,
                                    color: colors.
                                        TOP_BAR_TEXT_COLOR,
                                    textAlign: 'center',
                                    textTransform: 'capitalize'
                                }}
                                style={{ alignItems: 'center' }}
                            />
                        </Appbar.Header>
                    );
                },
            }}>
            <Stack.Screen name='home' component={HomeScreen} options={{
                headerShown: true,
            }} />

            <Stack.Screen name='login' component={LoginScreen} options={{
                headerShown: false,
            }} />
            {/* <Stack.Screen name='dashboard' component={DashboardScreen} options={{
                            headerShown: false,
                        }} /> */}
            <Stack.Screen name='register' component={RegisterScreen} options={{
                headerShown: false,
            }} />
            <Stack.Screen name='forgot' component={ForgotPasswordScreen} options={{
                headerShown: false,
            }} />
            <Stack.Screen name='dashboard' component={DashboardScreen} options={{
                headerShown: true,
            }} />
            <Stack.Screen name='profile' component={ProfileScreen} options={{
                headerShown: true,
            }} />
            <Stack.Screen name='profileForm' component={profileForm} options={{
                headerShown: true,
            }} />
            <Stack.Screen name='bottomTab' component={BottomTab} options={{
                headerShown: true,
            }} />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    navBarRightIconStyle: {
        position: 'absolute',
        right: 10,
        borderWidth: 1,
        borderColor: colors.GREEN,
        borderRadius: 20,
        paddingHorizontal: 2,
        paddingLeft: 4,
        paddingVertical: 2,
        justifyContent: 'center',
        alignItems: 'center'
    }
})