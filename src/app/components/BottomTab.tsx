import { CommonActions, useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import {
  Alert, Animated, Button, Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { CurvedBottomBar } from 'react-native-curved-bottom-bar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../constants/common/colors';
import { RootStackNavigator } from '../navigation/root.stack.navigator';
import Modal from "react-native-modal"
import { IconButton, Portal, Provider } from 'react-native-paper';
import AddTransactionForm from './AddTransaction';
import common from '../constants/common/common';
import { useDispatch } from 'react-redux';
import * as commonAction from '../../app/store/redux-storage/common/common.action'
import DashboardScreen from '../screens/dashboard/dashboard.screen';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { HomeScreen } from '../screens';
import ProfileScreen from '../screens/profile/profile.screen';

const Tab = createMaterialBottomTabNavigator();

export const BottomTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor={colors.VOILET}
      inactiveColor={colors.DISABLED_COLOR}
      barStyle={{ backgroundColor: colors.WHITE }}
    >
      <Tab.Screen name="Dashboard"
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <Ionicons style={{ height: 28 }} name="home" color={color} size={26} />
          ),
        }}
        component={DashboardScreen} />
      <Tab.Screen name="Add"
        options={{
          tabBarLabel: 'Add',
          tabBarIcon: ({ color }) => (
            <Ionicons style={{ height: 28 }} name="add-circle-outline" color={color} size={26} />
          ),
        }}
        component={AddTransactionForm} />
      <Tab.Screen name="Expanses"
        options={{
          tabBarLabel: 'Expanses',
          tabBarIcon: ({ color }) => (
            <Ionicons style={{ height: 28 }}  name="wallet-outline" color={color} size={26} />
          ),
        }}
        component={ProfileScreen} />
      <Tab.Screen name="Report"
        options={{
          tabBarLabel: 'Report',
          tabBarIcon: ({ color }) => (
            <Ionicons style={{ height: 28 }}  name="stats-chart-outline" color={color} size={26} />
          ),
        }}
        component={ProfileScreen} />
        <Tab.Screen name="Profile"
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <Ionicons style={{ height: 28 }}  name="person-circle-outline" color={color} size={26} />
          ),
        }}
        component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.WHITE
  },
  button: {
    marginVertical: 5,
  },
  bottomBar: {},
  btnCircle: {
    width: 60,
    height: 60,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
    bottom: 30,
  },
  imgCircle: {
    width: 30,
    height: 30,
    tintColor: 'gray',
  },
  img: {
    width: 30,
    height: 30,
  },
});