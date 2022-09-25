import DateTimePicker from '@react-native-community/datetimepicker';
import database from '@react-native-firebase/database';
import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Button, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { IconButton, TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import colors from '../constants/common/colors';
import common from '../constants/common/common';
import fontSize from '../constants/common/font.size';
import { notificationFn } from '../core/notification/notification';


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
    price: string
}

const AddTransactionForm = (props: Props) => {
    const dispatch = useDispatch();
    const [currentDateData, setCurrentDateData] = useState<TransectionDTO>();
    const transactionStatus = useSelector((state: any) => state.common.transectionStatus);
    const authInfo = useSelector((state: any) => state.auth.authInfo);
    const [date, setDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState("");
    const [show, setShow] = useState(false);
    const [itemPrice, setItemPrice] = React.useState(currentDateData?.price || "0");
    const [openCategory, setCategory] = useState(false);
    const [valueCateroy, setValueCategory] = useState(currentDateData?.bazarCategory || "");
    const [openItem, setItem] = useState(false);
    const [valueItem, setValueItem] = useState(currentDateData?.bazarItem || "");
    const db = database();
    const baseUrl = `home-master/${authInfo.uid}`

    const [itemsCategory, setItemsCategory] = useState([
        { label: 'Bazar', value: 'bazar' },
        { label: 'Medicine', value: 'medicine' }
    ]);
    const [items, setItems] = useState([
        { label: 'Eggs', value: 'eggs' },
        { label: 'Fish', value: 'fish' }
    ]);

    const addExpanses = () => {
        db.ref(`${baseUrl}/expenses/${selectedDate.toString()}`)
            .set({
                bazarCategory: valueCateroy,
                bazarItem: [{item: valueItem, price:itemPrice }],
            })
            .then(() => {
                notificationFn('Successfully submitted');
            });
    }

      useEffect(() => {
        const onValueChange = database()
        .ref(`${baseUrl}/expenses/${selectedDate.toString()}`)
          .on('value', snapshot => {
              setCurrentDateData(snapshot.val()|| null);
              console.log(snapshot.val());
          });
    
        // Stop listening for updates when no longer required
        return () => database().ref(`${baseUrl}/expenses/${selectedDate.toString()}`).off('value', onValueChange);
      }, [selectedDate]);

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
                        value={valueCateroy || currentDateData?.bazarCategory}
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
                        value={valueItem || currentDateData?.bazarItem}
                        items={items}
                        setOpen={setItem}
                        setValue={setValueItem}
                        setItems={setItems}
                    />
                </View>
                <View style={styles.marginVertical10}>
                    <TextInput
                        label="Price"
                        value={itemPrice || currentDateData?.price}
                        mode={"outlined"}
                        // keyboardType={"numeric"}
                        onChangeText={text => setItemPrice(text)}
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
                        disabled={!currentDateData?.bazarCategory && !itemsCategory || !currentDateData?.bazarItem && !valueItem || !currentDateData?.price && !itemPrice}
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
