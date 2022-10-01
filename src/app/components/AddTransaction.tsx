import DateTimePicker from '@react-native-community/datetimepicker';
import database from '@react-native-firebase/database';
import React, { useEffect, useState } from 'react';
import { Button, Keyboard, Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { IconButton, Modal, Portal, Provider, TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { AuthInfo } from '../constants/auth/authDto';
import colors from '../constants/common/colors';
import common from '../constants/common/common';
import fontSize from '../constants/common/font.size';
import { TransectionDTO } from '../constants/transection/transectionDTO';
import { notificationFn } from '../core/notification/notification';
import { weekNumber } from '../core/utils';


interface Props {
    add?: boolean;
    amount?: number;
    styles?: StyleProp<ViewStyle>;
    icon?: string;
    itemType?: string;
}

const AddTransactionForm = (props: Props) => {
    const dispatch = useDispatch();
    const [currentDateData, setCurrentDateData] = useState<TransectionDTO>({ bazarCategory: '', bazarItem: [{ item: '', price: '', quantity: '' }] });
    const [yearlyExpanses, setYearlyExpanses] = useState({});
    const [monthExpanses, setMonthExpanses] = useState({});
    const transactionStatus = useSelector((state: any) => state.common.transectionStatus);
    const authInfo: AuthInfo = useSelector((state) => state.auth.authInfo);
    const [date, setDate] = useState(new Date());
    const [year, setYear] = useState(date.getFullYear());
    const [week, setWeek] = useState<number>(0);
    const [month, setMonth] = useState(date.getMonth());
    const [selectedDate, setSelectedDate] = useState("");
    const [show, setShow] = useState(false);
    const [itemPrice, setItemPrice] = React.useState("0");
    const [quantity, setQuantity] = React.useState();
    const [openCategory, setCategory] = useState(false);
    const [valueCateroy, setValueCategory] = useState("");
    const [openItem, setItem] = useState(false);
    const [valueItem, setValueItem] = useState("");
    const [visible, setVisible] = React.useState(false);

    const db = database();
    const baseUrl = `home-master/${authInfo.uid}`

    const [itemsCategory, setItemsCategory] = useState([{}]);
    const [items, setItems] = useState([
        { label: 'Eggs', value: 'eggs' },
        { label: 'Fish', value: 'fish' }
    ]);
    // console.log(month, week, year);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const addExpanses = async () => {
        let data: TransectionDTO = currentDateData;
        let index = data?.bazarItem.findIndex(x => x.item === valueItem);
        if (!data) {
            db.ref(`${baseUrl}/expenses/${year}/${month}/${week}/${selectedDate.toString()}`)
                .set({ bazarCategory: valueCateroy, bazarItem: [{ item: valueItem, price: itemPrice, quantity: quantity }] })
                .then(() => {
                    sumFn();
                    notificationFn('Add Successfully submitted');
                });
            return;
        }
        if (data?.bazarItem[index]) {
            data.bazarItem[index].item = valueItem.toString();
            data.bazarItem[index].price = itemPrice.toString();
            data.bazarItem[index].quantity = quantity;
            await db
                .ref(`${baseUrl}/expenses/${year}/${month}/${week}/${selectedDate.toString()}`)
                .update(data)
                .then(() => {
                    sumFn()
                    console.log('Data updated.')
                });
            setCurrentDateData({ bazarCategory: '', bazarItem: [{ item: '', price: '', quantity: '' }] })
        } else {
            data?.bazarItem.push({ item: valueItem, price: itemPrice, quantity: quantity });
            await db.ref(`${baseUrl}/expenses/${year}/${month}/${week}/${selectedDate.toString()}`)
                .set(data)
                .then(() => {
                    sumFn()
                    notificationFn('push Successfully submitted');
                    setCurrentDateData({ bazarCategory: '', bazarItem: [{ item: '', price: '', quantity: '' }] })
                });
        }
    }

    const sumFn = async () => {
        const sum = currentDateData?.bazarItem?.reduce((accumulator, item) => {
            return accumulator + parseInt(item?.price);
        }, 0);
        if (sum) {
            db.ref(`${baseUrl}/expenses/${year}/${month}/${week}/${selectedDate.toString()}/`)
                .update({ total: sum })
                .then(() => {
                    notificationFn('total Successfully submitted');
                });
            Keyboard.dismiss()
        }
    }

    const addCategoris = () => {
        db.ref(`${baseUrl}/bill/`)
            .set([
                { label: 'Gas bill', value: 'gas bill' },
                { label: 'Current bill', value: 'current bill' },
                { label: 'Internet', value: 'internet bill' },
            ])
            .then(() => {
                notificationFn('total Successfully submitted');
            });
    }

    // addCategoris();
    const getCategoris = ()=>{
        const onValueChange = database()
            .ref(`${baseUrl}/categories`)
            .on('value', snapshot => {
                setItemsCategory(snapshot.val() || null);
                // console.log("current data:", snapshot.val());
            });

        // Stop listening for updates when no longer required
        return () => database().ref(`${baseUrl}/categories`).off('value', onValueChange);
    }    
    // addCategoris();
    const getCategorisItems = ()=>{
        let url = `${baseUrl}/categories`
        if(valueCateroy === "bazar"){
            url = `${baseUrl}/bazarItems`
        }
        if(valueCateroy === "medicine"){
            url = `${baseUrl}/medicalItems`
        }
        if(valueCateroy === "house rent"){
            url = `${baseUrl}/houseRent`
        }
        if(valueCateroy === "bill"){
            url = `${baseUrl}/bill`
        }
        const onValueChange = database()
            .ref(url)
            .on('value', snapshot => {
                setItems(snapshot.val() || null);
                // console.log("items data", snapshot.val());
            });

        // Stop listening for updates when no longer required
        return () => database().ref(`${baseUrl}/categories`).off('value', onValueChange);
    }

    useEffect(() => {
        getCategoris();
    }, []);

    useEffect(() => {
        getCategorisItems();
    }, [valueCateroy]);


    useEffect(() => {
        const onValueChange = database()
            .ref(`${baseUrl}/expenses/${year}/${month}/${week}/${selectedDate.toString()}`)
            .on('value', snapshot => {
                setCurrentDateData(snapshot.val() || null);
                console.log("current data:", snapshot.val());
            });

        // Stop listening for updates when no longer required
        return () => database().ref(`${baseUrl}/expenses/${selectedDate.toString()}`).off('value', onValueChange);
    }, [selectedDate]);

    useEffect(() => {
        const onValueChange = database()
            .ref(`${baseUrl}/expenses/${year}`)
            .on('value', snapshot => {
                setYearlyExpanses(snapshot.val() || null);
                // console.log("yearly expanses:", snapshot.val());
            });
        // Stop listening for updates when no longer required
        return () => database().ref(`${baseUrl}/expenses/${selectedDate.toString()}`).off('value', onValueChange);
    }, [selectedDate]);



    useEffect(() => {
        sumFn();
    }, [currentDateData]);

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
                        value={valueCateroy}
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
                        value={valueItem}
                        items={items}
                        setOpen={setItem}
                        setValue={setValueItem}
                        setItems={setItems}
                    />
                </View>
                <View style={styles.marginVertical10}>
                    <TextInput
                        label="Quantity"
                        value={quantity}
                        mode={"outlined"}
                        // keyboardType={"numeric"}
                        onChangeText={text => setQuantity(text)}
                    />
                </View>
                <View style={styles.marginVertical10}>
                    <TextInput
                        label="Price"
                        value={itemPrice}
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
                        onChange={(event, selected) => {
                            setShow(false);
                            setWeek(weekNumber(selected));
                            setDate(selected);
                            let currentDate;
                            currentDate = selected.getDate() + "-" + (selected.getMonth() + 1) + "-" + selected.getFullYear();
                            setMonth(1 + selected.getMonth());
                            setYear(selected.getFullYear());
                            setSelectedDate(currentDate);
                            // readData(currentDate);
                        }}
                    />
                )}

                <View style={styles.marginVertical10}>
                    <Button
                        disabled={!itemsCategory || !valueItem || !itemPrice}
                        title='Submit'
                        onPress={() => addExpanses()}
                        color={colors.VOILET} />
                </View>
            </View>
            <View style={styles.totalWrapper}>
                <Text>Total : {selectedDate}</Text>
                <Text style={styles.totalText}>{currentDateData?.total || "0"}</Text>
                {currentDateData ? <Pressable disabled={!currentDateData} style={styles.details} onPress={() => { setVisible(true) }}>
                    <Text style={{ color: colors.WHITE }}>Details</Text>
                </Pressable> : null}
            </View>

            <Provider>
                <Portal>
                    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modalStyle}>
                        <Text style={{ fontSize: fontSize.TITLE, textAlign: 'center' }}> Daily Report</Text>
                        <View style={styles.itemWrapper}>
                            <View style={styles.detailsHeader}>
                                <Text>{"Category: "}{currentDateData?.bazarCategory}</Text>
                                <Text>{"Date: "}{selectedDate}</Text>
                            </View>
                            <View style={[styles.detailsHeader, { borderBottomWidth: 1 }]}>
                                <Text style={{ flex: 0.1 }}>{" "}</Text>
                                <Text style={styles.flex1}>Item</Text>
                                <Text style={styles.flex1}>Quantity</Text>
                                <Text style={styles.flex1}>Price</Text>
                            </View>
                            {currentDateData?.bazarItem?.map((item, i) => {
                                return <>
                                    <View style={[styles.detailsExpenses, { borderBottomWidth: currentDateData.bazarItem.length === i + 1 ? 0 : 1 }]}>
                                        <Text style={{ flex: 0.1 }}>{i + 1}</Text>
                                        <Text style={{ flex: 1, textAlign: 'center' }}>{item?.item || "0"}</Text>
                                        <Text style={{ flex: 1, textAlign: 'center' }}>{item?.quantity || "0"}</Text>
                                        <Text style={{ flex: 1, textAlign: 'center' }}>{item?.price || "0"} Tk</Text>
                                    </View>
                                </>
                            })}
                        </View>
                        <Text style={{ textAlign: 'right', right: 50, color: colors.RED, fontWeight: "bold" }}>Total: <Text>{currentDateData?.total}</Text></Text>
                    </Modal>
                </Portal>
            </Provider>
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
    },
    totalText: {
        fontSize: fontSize.L_40,
        fontWeight: "bold"
    },
    totalWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: common.TWENTEE,
    },
    details: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: colors.VOILET,
    },
    modalStyle: {
        width: "90%",
        height: '70%',
        alignSelf: 'center',
        backgroundColor: colors.WHITE,
        justifyContent: 'center'
    },
    detailsExpenses: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: common.FIVE,
        borderBottomWidth: 1
    },
    itemWrapper: {
        borderWidth: 1,
        borderRadius: common.TEN,
        padding: common.TEN,
        margin: common.TWENTEE
    },
    detailsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    flex1: {
        flex: 1,
        textAlign: 'center',
        fontWeight: '700'
    }
});

export default AddTransactionForm;
