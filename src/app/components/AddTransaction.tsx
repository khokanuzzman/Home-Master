import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { Button, Platform, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import colors from '../constants/common/colors';
import common from '../constants/common/common';
import Ionicons from 'react-native-vector-icons/Ionicons';
import fontSize from '../constants/common/font.size';
import DropDownPicker from 'react-native-dropdown-picker';
import { IconButton, TextInput } from 'react-native-paper';
import database from '@react-native-firebase/database';
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { notificationFn } from '../core/notification/notification';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';


interface Props {
    add?: boolean;
    amount?: number;
    styles?: StyleProp<ViewStyle>;
    icon?: string;
    itemType?: string;
}

interface TransectionDTO {
    bazarCategory: string
    bazarItem: string
    price: number
}

const AddTransactionForm = (props: Props) => {
    const [currentDateData, setCurrentDateData] = useState<TransectionDTO>();
    const transactionStatus = useSelector((state: any) => state.common.transectionStatus);
    const [date, setDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState("");
    const [show, setShow] = useState(false);
    const [itemPrice, setItemPrice] = React.useState(currentDateData?.price || "0");
    const [openCategory, setCategory] = useState(false);
    const [valueCateroy, setValueCategory] = useState(currentDateData?.bazarCategory || "");
    const [openItem, setItem] = useState(false);
    const [valueItem, setValueItem] = useState(currentDateData?.bazarItem || "");
    const db = database();
    const baseUrl = "home-master"

    const [itemsCategory, setItemsCategory] = useState([
        { label: 'Bazar', value: 'bazar' },
        { label: 'Medicine', value: 'medicine' }
    ]);
    const [items, setItems] = useState([
        { label: 'Eggs', value: 'eggs' },
        { label: 'Fish', value: 'fish' }
    ]);

    useEffect(()=>{

    },[])

    const addExpanses = () => {
        db.ref(`${baseUrl}/expenses/${selectedDate.toString()}`)
            .set({
                bazarCategory: valueCateroy,
                bazarItem: valueItem,
                price: itemPrice.toString(),
            })
            .then(() => {
                setValueCategory("null");
                setValueItem("");
                setItemPrice(0);
                notificationFn('Successfully submitted');
                // readData(selectedDate);
            });
    }

    useFocusEffect(
        React.useCallback(() => {
        //   readData(selectedDate);
        }, [selectedDate])
      );

      useEffect(() => {
        const onValueChange = database()
        .ref(`${baseUrl}/expenses/${selectedDate.toString()}`)
          .on('value', snapshot => {
            console.log('User data: ', snapshot.val());
          });
    
        // Stop listening for updates when no longer required
        return () => database().ref(`${baseUrl}/expenses/${selectedDate.toString()}`).off('value', onValueChange);
      }, [selectedDate]);

    // const readData = (sdate) => {
    //     console.log(sdate);
    //     console.log(`${baseUrl}/expenses/${sdate.toString()}`);
    //     database()
    //         .ref(`${baseUrl}/expenses/${sdate.toString()}`)
    //         .once('value')
    //         .then((snapshot) => {
    //             console.log(sdate);
    //                 setCurrentDateData(snapshot.val());
    //                 console.log(currentDateData);

    //         });
    // }

    return (
        <View style={styles.transactionSectionWrapper}>
            <Text style={{ fontSize: fontSize.XL, textAlign: 'center', color: colors.TEXT, fontWeight: 'bold', marginBottom: common.TEN }}>
                Add transaction
            </Text>
            <View style={[styles.transactionSection]}>
                <View style={[styles.marginVertical10, { position: 'relative' }]}>
                    <TextInput
                        label="select a date"
                        value={selectedDate.toLocaleString()}
                        mode={"outlined"}
                        editable={false}
                        keyboardType={"numeric"}
                        onFocus={() => { setShow(true) }}
                    />
                    <View style={styles.calendarBtn}>
                        <IconButton
                            icon="calendar-month"
                            size={50}
                            color={colors.VOILET}
                            onPress={() => setShow(true)}
                        />
                    </View>
                </View>
                <View style={styles.marginVertical10}>
                    <DropDownPicker
                        open={openCategory}
                        value={currentDateData?.bazarCategory || valueCateroy}
                        items={itemsCategory}
                        setOpen={setCategory}
                        setValue={setValueCategory}
                        setItems={setItemsCategory}
                        zIndex={999999}
                    />
                </View>
                <View style={styles.marginVertical10}>
                    <DropDownPicker
                        open={openItem}
                        value={currentDateData?.bazarItem || valueItem}
                        items={items}
                        setOpen={setItem}
                        setValue={setValueItem}
                        setItems={setItems}
                    />
                </View>
                <View style={styles.marginVertical10}>
                    <TextInput
                        label="Price"
                        value={currentDateData?.price || itemPrice}
                        mode={"outlined"}
                        keyboardType={"numeric"}
                        onChangeText={text => setItemPrice(parseInt(text))}
                    />
                </View>
                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        is24Hour={true}
                        mode={"date"}
                        onChange={(event, selected)=>{
                            setShow(false);
                            setDate(selected);
                            let currentDate;
                            currentDate = selected.getDate() + "-" + (selected.getMonth() + 1) + "-" + selected.getFullYear();
                            setSelectedDate(currentDate);
                            // readData(currentDate);
                        }}
                    />
                )}
                {/* <Button onPress={() => setShow(true)} title="Show date picker!" /> */}
                <View style={styles.marginVertical10}>
                    <Button
                        disabled={!valueCateroy || !itemsCategory || !itemPrice}
                        title='Submit'
                        onPress={() => addExpanses()}
                        color={colors.VOILET} />
                </View>
            </View>
        </View>
    )
};
const styles = StyleSheet.create({
    transactionSectionWrapper: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: colors.BAKCGROUND
    },
    transactionSection: {
        padding: common.TWENTEE,
        justifyContent: 'center',
        borderRadius: common.TWENTEE,
        backgroundColor: colors.WHITE
    },
    transactionItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#D9D9D9',
        borderRadius: common.TEN,
        marginBottom: common.TWENTEE
    },
    transactionItemText: {
        fontSize: fontSize.XL
    },
    marginVertical10: {
        marginVertical: common.TEN
    },
    calendarBtn: {
        position: 'absolute',
        right: -15,
        bottom: -15,
        zIndex: 999999
    }
});

export default AddTransactionForm;
