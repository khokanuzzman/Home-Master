import { useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import {
  Alert, Animated, Platform,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import { CurvedBottomBar } from 'react-native-curved-bottom-bar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../constants/common/colors';
import { RootStackNavigator } from '../navigation/root.stack.navigator';


export const BottomTab = (props) => {
  const navigation = useNavigation();
  const ref = useRef<any>(null);
  const [type, setType] = useState<'DOWN' | 'UP'>('DOWN');

  const RenderScreen = () => {
    return (
      <View
        style={{
          backgroundColor: '#BFEFFF',
          flex: 1,
        }}
      />
    );
  };

  const onClickButton = () => {
    if (type === 'UP') {
      setType('DOWN');
      Alert.alert('Change type curve down');
    } else {
      setType('UP');
      Alert.alert('Change type curve up');
    }
  };
  const _renderIcon = (routeName: string, selectedTab: string) => {
    let icon = '';

    switch (routeName) {
      case 'home':
        icon = 'home-outline';
        break;
      case 'expenses':
        icon = 'wallet-outline';
        break;
      case 'title2':
        icon = 'stats-chart-outline';
        break;
      case 'profile':
        icon = 'person-circle-outline';
        break;
    }
    console.log("icon:", icon);
    return (
      // <Ionicons
      //   name={icon}
      //   size={25}
      //   color={routeName === selectedTab ? 'black' : 'gray'}
      // />
      // console.log(icon);
      <Ionicons name={props.icon || (Platform.OS === 'android' ? 'md-' + icon : 'ios-' + icon)} size={40} color={routeName === selectedTab ? colors.VOILET : 'gray'} />
    );
  };
  const renderTabBar = ({ routeName, selectedTab, navigate }: any) => {
    console.log("navigate:", routeName, selectedTab, navigate);
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate(routeName)}
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {_renderIcon(routeName, selectedTab)}
      </TouchableOpacity>
    );
  };

  return (
    <CurvedBottomBar.Navigator
      ref={ref}
      type={type}
      style={styles.bottomBar}
      strokeWidth={0.5}
      height={55}
      circleWidth={55}
      bgColor="white"
      initialRouteName="profile"
      borderTopLeftRight
      renderCircle={({ selectedTab, navigate }) => (
        <Animated.View style={styles.btnCircle}>
          <TouchableOpacity
            style={{
              flex: 1,
              justifyContent: 'center',
            }}
            onPress={() => Alert.alert('Click Action')}>
            <Ionicons name={'apps-sharp'} color="gray" size={25} />
          </TouchableOpacity>
        </Animated.View>
      )}
      tabBar={renderTabBar}
    >
      <CurvedBottomBar.Screen
        name="home"
        position="LEFT"
        component={RootStackNavigator}
      />
      <CurvedBottomBar.Screen
        name="expenses"
        position="LEFT"
        component={RenderScreen}
      />
      <CurvedBottomBar.Screen
        name="title2"
        component={RenderScreen}
        position="RIGHT"
      />

      <CurvedBottomBar.Screen
        name="profile"
        component={RenderScreen}
        position="RIGHT"
      />
    </CurvedBottomBar.Navigator>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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