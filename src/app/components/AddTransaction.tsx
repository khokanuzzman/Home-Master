import DateTimePicker from '@react-native-community/datetimepicker';
import database from '@react-native-firebase/database';
import moment from 'moment';
import React, { useState } from 'react';
import { Button, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { IconButton, TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import * as commonAction from '../../app/store/redux-storage/common/common.action';
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
    const [selectedDate, setSelectedDate] = useState(moment().format('DD-MM-YYYY'));
    const [show, setShow] = useState(false);
    const [itemPrice, setItemPrice] = React.useState<string>(currentDateData?.price || "");
    const [openCategory, setCategory] = useState(false);
    const [valueCateroy, setValueCategory] = useState("");
    const [openItem, setItem] = useState(false);
    const [valueItem, setValueItem] = useState("");
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


    const onChange = async (event, selected = new Date()) => {
        console.log("calling");
        setShow(false);
        setDate(selected);
        let currentDate = await moment(selected).format('DD-MM-YYYY');
        setSelectedDate(currentDate);
        readData(selected)
    };
    // console.log("date: ", date);
    console.log("selectedDate", selectedDate);
    React.useEffect(() => {
        onChange(new Date());
        readData(selectedDate);
    }, [setShow])

    const addExpanses = () => {
        db.ref(`${baseUrl}/expenses/${selectedDate.toString()}`)
            .set({
                bazarCategory: valueCateroy,
                bazarItem: valueItem,
                price: itemPrice,
            })
            .then(() => {
                notificationFn('Successfully submitted');
                dispatch(commonAction.transactionModalStatus(false));
            });
    }

    const readData = (selected) => {
        const date = moment(selected ? selected : selectedDate).format("DD-MM-YYYY");
        console.log("date from: ", date)
        database()
            .ref(`${baseUrl}/expenses/${date ? date : selectedDate}`)
            .once('value')
            .then(snapshot => {
                console.log("snapshot val", snapshot.val())
                console.log("snapshot", snapshot);
                setCurrentDateData(snapshot.val());
                console.log(currentDateData);
                if (!snapshot.val()) {
                    setValueCategory("");
                    setValueItem("");
                    setItemPrice("");
                } else {
                    setValueCategory(currentDateData?.bazarCategory || "");
                    setValueItem(currentDateData?.bazarItem || "");
                    setItemPrice(currentDateData?.price || "");
                }
            });
    }
    console.log("valueCateroy", valueCateroy);
    console.log("valueItem", valueItem);
    console.log("itemPrice", itemPrice);
    return (
        <View style={styles.transactionSectionWrapper}>
            <Text style={{ fontSize: fontSize.XL, textAlign: 'center', color: colors.TEXT, fontWeight: 'bold', marginBottom: common.TEN }}>
                Add transaction
            </Text>
            <View style={[styles.transactionSection]}>
                <View style={[styles.marginVertical10, { position: 'relative' }]}>
                    <TextInput
                        label="Price"
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
                        onChange={onChange}
                    />
                )}
                {/* <Button onPress={() => setShow(true)} title="Show date picker!" /> */}
                <View style={styles.marginVertical10}>
                    <Button
                        disabled={!currentDateData}
                        title={currentDateData ? "Update" : "Submit"}
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
