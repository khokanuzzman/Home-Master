import auth from '@react-native-firebase/auth';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { configureFonts, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import * as authAction from '../../app/store/redux-storage/auth/auth.action';
import LoaderComponent from '../components/loader.component';
import colors from '../constants/common/colors';
import { authInfo, getLoggedStatus } from '../constants/common/common_function';
import { ForgotPasswordScreen, HomeScreen, LoginScreen, RegisterScreen } from '../screens';
import DashboardScreen from '../screens/dashboard/dashboard.screen';
import LeftDrawer from './drawer/left.drawer';
export const currentUser = auth().currentUser;


const theme = {
    ...DefaultTheme,
    // fonts: configureFonts(fontConfig.android),
    fonts: configureFonts(),
    // fonts: configureFonts(fontConfig.android),
    colors: {
        ...DefaultTheme.colors,
        primary: colors.PRIMARY,
    },

};
var i = 0;
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const DrawerTest = createDrawerNavigator();

const AppNavigationContainer = () => {
    const [loggedIn, setIsLoggedIn] = useState(false);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    // if (initializing) return null;
    const user = authInfo();
    const fuser = auth().currentUser;

    if(isLoading){
        return(<LoaderComponent/>)
    }
    return (
        <PaperProvider theme={theme}>
            <NavigationContainer>
                {!user ?
                    <Stack.Navigator>
                        <Stack.Screen name='login' component={LoginScreen} options={{
                            headerShown: false,
                        }} />
                        <Stack.Screen name='dashboard' component={DashboardScreen} options={{
                            headerShown: false,
                        }} />
                        <Stack.Screen name='register' component={RegisterScreen} options={{
                            headerShown: false,
                        }} />
                        <Stack.Screen name='forgot' component={ForgotPasswordScreen} options={{
                            headerShown: false,
                        }} />
                        <Stack.Screen name='home' component={HomeScreen} options={{
                            headerShown: false,
                        }} />
                    </Stack.Navigator>
                    :
                    <Stack.Navigator>
                        <Stack.Screen
                            options={{ headerShown: false }}
                            name="leftDrawer"
                            component={LeftDrawer}
                        />
                    </Stack.Navigator>
                }
            </NavigationContainer>
        </PaperProvider>
    );
}
export default AppNavigationContainer;