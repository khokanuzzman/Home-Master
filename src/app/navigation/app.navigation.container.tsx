import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { configureFonts, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import colors from '../constants/common/colors';
import { authInfo, getLoggedStatus } from '../constants/common/common_function';
import { ForgotPasswordScreen, HomeScreen, LoginScreen, RegisterScreen } from '../screens';
import LeftDrawer from './drawer/left.drawer';



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
    // if (initializing) return null;
    const user = authInfo();
    console.log(user);

    useEffect(() => {
        getLoggedStatus().then(res => { setIsLoggedIn(Boolean(res)) });
    }, [])

    return (
        <PaperProvider theme={theme}>
            <NavigationContainer>
                {!user ?
                    <Stack.Navigator>
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