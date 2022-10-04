import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import {
    UIActivityIndicator
} from 'react-native-indicators';
import colors from '../constants/common/colors';

interface Props { }

const LoaderComponent = (props: Props) => {
    const [showText, setShowText] = useState(true);
    var myText = "অনুগ্রহ করে অপেক্ষা করুন ..."

    useEffect(() => {
        // Change the state every second or the time given by User.
        const interval = setInterval(() => {
            setShowText((showText) => !showText);
        }, 1000);
        return () => {
            clearInterval(interval);
        }
    }, []);
    return (
        <>
            <View style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor:colors.WHITE
        }}>
            {/* <ActivityIndicator style={{flex:1}} animating={true} size='large' color={colors.GREEN} /> */}
            {/* <BallIndicator color={colors.GREEN} /> */}
            {/* <BarIndicator count={3} size={50} color={colors.GREEN} /> */}
            
            <UIActivityIndicator size={80} count={9} color={colors.VOILET} />
            
            {/* <DotIndicator color={colors.GREEN} />
            <MaterialIndicator color={colors.GREEN} />
            <PacmanIndicator color={colors.GREEN} />
            <PulseIndicator color={colors.GREEN} />
            <SkypeIndicator color={colors.GREEN} />
            <UIActivityIndicator color={colors.GREEN} />
            <WaveIndicator color={colors.GREEN} /> */}
            {/* <View style={{ alignItems: 'center',flex:1 }}>
        <Text style={[
            {
                textAlign: 'center',
                fontSize:20
            },
            { display: showText ? 'none' : 'flex' },
            { color: showText ? colors.GREEN : colors.GREEN }
        ]}>
            {myText}
        </Text>
    </View> */}
        </View></>
    );
}

export default LoaderComponent;