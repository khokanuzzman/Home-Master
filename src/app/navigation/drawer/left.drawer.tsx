import {
  createDrawerNavigator
} from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { BottomTab } from '../../components/BottomTab';
import { RootStackNavigator } from '../root.stack.navigator';
import { DrawerLeftContent } from './content/drawer.content';


const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
const LeftDrawer = ({ }) => {
  return (
    <Drawer.Navigator
    initialRouteName='tabNav'
      drawerContent={(props) => <DrawerLeftContent  {...props} />}>
         <Stack.Screen name="tabNav" component={BottomTab} options={{
        headerShown: false,
      }} />
      <Stack.Screen name="rootStack" component={RootStackNavigator} options={{
        headerShown: false,
      }} />
    </Drawer.Navigator>
  );
};
export default LeftDrawer;