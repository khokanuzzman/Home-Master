import React, { useEffect, useState } from 'react';
import { Alert, Button, Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import { PanGestureHandler, TapGestureHandler } from 'react-native-gesture-handler';
import { Divider, Text } from 'react-native-paper';
import Animated, { cancelAnimation, Easing, runOnUI, SensorType, useAnimatedGestureHandler, useAnimatedScrollHandler, useAnimatedSensor, useAnimatedStyle, useSharedValue, withDecay, withDelay, withRepeat, withSequence, withSpring, withTiming } from 'react-native-reanimated';
import { useSelector } from 'react-redux';
import { AuthInfo } from '../../constants/auth/authDto';
import colors from '../../constants/common/colors';

const ProfileScreen = (props: any) => {
    const SIZE = 130;
    const progress = useSharedValue(0.5);
    const scale = useSharedValue(2);
    const animateStyle = useAnimatedStyle(()=>{
      return {
        opacity: progress.value,
        borderRadius: progress.value * SIZE/2,
        transform: [{scale: scale.value},{rotate:`${progress.value * 2 * Math.PI}rad`}]
      }
    })

    useEffect(()=>{
      progress.value =withRepeat(withTiming(1,{duration:4000}), 6,true);
      scale.value = withRepeat(withTiming(1,{duration:4000}),6,true);
    },[])
    console.log(progress.value*2*Math.PI);
    return (
        <View style={styles.container}>
          <Animated.View style={[{height:SIZE, width:SIZE,backgroundColor:colors.RED},animateStyle]}></Animated.View>
        </View>
    )

}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:colors.DASHBOARD_BAKCGROUND,
    justifyContent:'center',
    alignItems:'center'
  }
})

export default ProfileScreen;
