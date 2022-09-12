import {
  createDrawerNavigator
} from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { BottomTab } from '../../components/BottomTab';
import { DrawerLeftContent } from './content/drawer.content';


const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
const LeftDrawer = ({ }) => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerLeftContent  {...props} />}>
      <Stack.Screen name="Home" component={BottomTab} options={{
        headerShown: false,
      }} />
    </Drawer.Navigator>
  );
};
export default LeftDrawer;