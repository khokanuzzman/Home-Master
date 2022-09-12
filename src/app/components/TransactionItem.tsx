import React from 'react';
import { Platform, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import colors from '../constants/common/colors';
import common from '../constants/common/common';
import Ionicons from 'react-native-vector-icons/Ionicons';
import fontSize from '../constants/common/font.size';


interface Props {
    add: boolean;
    amount: number;
    styles?: StyleProp<ViewStyle>;
    icon?: string;
    itemType: string;
}

const TransactionItem = (props:Props) => (
    <View style={[styles.transactionSection]}>
    <View style={[styles.transactionItem,{backgroundColor:!props.add?"#D9D9D9":"#C0B8B8"}]}>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        flex: 1,
        alignItems: 'center'
      }}>
        <Ionicons name={props.icon || (Platform.OS === 'android' ? props.add? 'md-enter-sharp':'md-log-out-sharp' : 'ios-enter-sharp')} size={40} color={props.add?colors.GREEN:colors.RED} />
        <Text style={styles.transactionItemText}>{props?.amount}</Text>
      </View>
      <Text style={{
        flex: 2.5,
        textAlign: 'right',
        paddingRight: common.TEN,
        color:colors.LIGHT_TEXT_COLOR
      }}>{props?.itemType}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
    transactionSection:{

    },
    transactionItem:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:'#D9D9D9',
        borderRadius:common.TEN,
        marginBottom:common.TWENTEE
    },
    transactionItemText:{
        fontSize:fontSize.XL
    }
});

export default TransactionItem;
