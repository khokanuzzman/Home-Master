import DateTimePicker from '@react-native-community/datetimepicker';
import database from '@react-native-firebase/database';
import React, { useEffect, useState } from 'react';
import { Button, Keyboard, Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { IconButton, Modal, Portal, Provider, TextInput, TouchableRipple } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { AuthInfo } from '../constants/auth/authDto';
import colors from '../constants/common/colors';
import common from '../constants/common/common';
import fontSize from '../constants/common/font.size';
import { TransectionDTO } from '../constants/transection/transectionDTO';
import { notificationFn } from '../core/notification/notification';
import { weekNumber, weekSum } from '../core/utils';
import { firebase } from '@react-native-firebase/auth';
import moment from 'moment';


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
    const authInfo: AuthInfo = useSelector((state:any) => state.auth.authInfo);
    const [date, setDate] = useState(new Date());
    const [year, setYear] = useState(date.getFullYear());
    const [week, setWeek] = useState<number>(0);
    const [weekTotal, setWeekTotal] = useState<number>(0);
    const [monthTotal, setMonthTotal] = useState<number>(0);
    const [yearTotal, setYearTotal] = useState<number>(0);
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
    const baseUrlUid = `home-master/${authInfo?.uid}`
    const baseUrl = `home-master`
    console.log(authInfo);

    const [itemsCategory, setItemsCategory] = useState([{}]);
    const [items, setItems] = useState([{}]);
    // console.log(month, week, year);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const addExpanses = async () => {
        let data: TransectionDTO = currentDateData;
        let index = data?.bazarItem.findIndex(x => x.item === valueItem);
        if (!data) {
            db.ref(`home-master/${authInfo?.uid}/expenses/${year}/${month}/${week}/${selectedDate.toString()}`)
                .set({ bazarCategory: valueCateroy, bazarItem: [{ item: valueItem, price: itemPrice, quantity: quantity }] })
                .then(() => {
                    notificationFn('Add Successfully submitted');
                });
            return;
        }
        if (data?.bazarItem[index]) {
            data.bazarItem[index].item = valueItem.toString();
            data.bazarItem[index].price = itemPrice.toString();
            data.bazarItem[index].quantity = quantity;
            await db
                .ref(`${baseUrlUid}/expenses/${year}/${month}/${week}/${selectedDate.toString()}`)
                .update(data)
                .then(() => {
                    console.log('Data updated.')
                });
            // setCurrentDateData({ bazarCategory: '', bazarItem: [{ item: '', price: '', quantity: '' }] })
        } else {
            data?.bazarItem.push({ item: valueItem, price: itemPrice, quantity: quantity });
            await db.ref(`${baseUrlUid}/expenses/${year}/${month}/${week}/${selectedDate.toString()}`)
                .set(data)
                .then(() => {
                    notificationFn('Bazar items Successfully updated');
                    // setCurrentDateData({ bazarCategory: '', bazarItem: [{ item: '', price: '', quantity: '' }] });
                });
        }
    }

    const sumFn = async () => {
        const sum = currentDateData?.bazarItem?.reduce((accumulator, item) => {
            return accumulator + parseInt(item?.price);
        }, 0);
        if (sum) {
            db.ref(`${baseUrlUid}/expenses/${year}/${month}/${week}/${selectedDate.toString()}/`)
                .update({ total: sum })
                .then((res) => {
                    notificationFn('total Successfully submitted');
                });
            Keyboard.dismiss()
        }
    }

    const sumFnWeekTotal =()=>{
        if (weekTotal) {
            db.ref(`${baseUrlUid}/expenses/${year}/${month}/${week}/`)
                .update({ weekTotal: weekTotal })
                .then((res) => {
                    notificationFn('weekTotal Successfully updated');
                });
        }
    }

    const sumFnMonth=()=>{
        // console.log("week sum: ",weekSum(year,month,week))
        console.log("monthTotal",monthTotal)
        if (monthTotal) {
            db.ref(`${baseUrlUid}/expenses/${year}/${month}/`)
                .update({ monthTotal: monthTotal })
                .then((res) => {
                    notificationFn('Month Total Successfully updated');
                });
        }
    }

    const sumFnYearTotal=()=>{
        if (monthTotal) {
            db.ref(`${baseUrlUid}/expenses/${year}/`)
                .update({ yearTotal: yearTotal })
                .then((res) => {
                    notificationFn('Year Total Successfully updated');
                });
        }
    }

    const addCategoris = () => {
        db.ref(`${baseUrl}/medicalItems/`)
            .set([
                { label: 'Indever 10', value: 'indever 10' },
                { label: 'Orbapin 5/20', value: 'orbapin 5/20' },
                { label: 'DDR30', value: 'ddr30' },
                { label: 'Napa 500', value: 'napa 500' },
                { label: 'Napa 1000', value: 'napa 1000' },
            ])
            .then(() => {
                notificationFn('total Successfully submitted');
            });
    }

    // addCategoris();
    const getCategoris = () => {
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
    const getCategorisItems = () => {
        let url = `${baseUrl}/categories`
        if (valueCateroy === "bazar") {
            url = `${baseUrl}/bazarItems`
        }
        if (valueCateroy === "medical") {
            url = `${baseUrl}/medicalItems`
        }
        if (valueCateroy === "house rent") {
            url = `${baseUrl}/houseRent`
        }
        if (valueCateroy === "bill") {
            url = `${baseUrl}/bill`
        }
        const onValueChange = database()
            .ref(url)
            .on('value', snapshot => {
                setItems(snapshot.val() || null);
                console.log("items data", snapshot.val());
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
            .ref(`${baseUrlUid}/expenses/${year}/${month}/${week}/${selectedDate.toString()}`)
            .on('value', snapshot => {
                setCurrentDateData(snapshot.val() || null);
                // console.log("current data:", snapshot.val());
            });

        // Stop listening for updates when no longer required
        return () => database().ref(`${baseUrlUid}/expenses/${selectedDate.toString()}`).off('value', onValueChange);
    }, [selectedDate]);

    useEffect(() => {
        const onValueChange = database()
            .ref(`${baseUrlUid}/expenses/${year}`)
            .on('value', snapshot => {
                setYearlyExpanses(snapshot.val() || null);
                // console.log("yearly expanses:", snapshot.val());
            });
        // Stop listening for updates when no longer required
        return () => database().ref(`${baseUrlUid}/expenses/${selectedDate.toString()}`).off('value', onValueChange);
    }, [selectedDate]);

    const weekSum = (year, month, week) => {
        let total = 0;
        let ref = firebase.database().ref(`${baseUrlUid}/expenses/${year}/${month}/${week}`);
        ref.once("value", (snapshot) => {
            snapshot.forEach((child) => {
                if (typeof (child.val()) === "object") {
                    total += Number(child.val().total);
                }
            });
            setWeekTotal(total);
            sumFnWeekTotal()
        });
    }

    const monthSum = (year, month) => {
        let total = 0;
        let ref = firebase.database().ref(`${baseUrlUid}/expenses/${year}/${month}`);
        let query = ref
        query.once("value", (snapshot) => {
            snapshot.forEach((child) => {
                if (typeof child.val() === "object" && !isNaN(child.val()?.["weekTotal"])) {
                    // Convert weekTotal to number and add it to total
                    total += Number(child.val()?.weekTotal);
                }
            });
            console.log(total);
            setMonthTotal(total);
            sumFnMonth();
        });
    }
    const yearSum = (year) => {
        let total = 0;
        let ref = firebase.database().ref(`${baseUrlUid}/expenses/${year}`);
        let query = ref
        query.once("value", (snapshot) => {
            snapshot.forEach((child) => {
                if (typeof child.val() === "object" && !isNaN(child.val()?.["monthTotal"])) {
                    total += Number(child.val()?.monthTotal);
                }
            });
            setYearTotal(total);
            sumFnYearTotal()
        });
    }



    useEffect(() => {
        sumFn();
    }, [currentDateData]);


    useEffect(() => {
        sumFnWeekTotal()
    }, [weekTotal]);

    useEffect(() => {
        // console.log("week sum: ",weekSum(year,month,week))
        sumFnMonth()
    }, [monthTotal]);

    useEffect(() => {
        // console.log("week sum: ",weekSum(year,month,week))
        sumFnYearTotal()
    }, [yearTotal]);


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
                        disabled={!valueCateroy}
                        searchable={true}
                        disabledStyle={{ backgroundColor: colors.ASH, borderColor: colors.ASH }}
                        zIndex={99999}
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
                        <Text style={{ fontSize: fontSize.TITLE, textAlign: 'center',color:colors.BLACK }}> Daily Report</Text>
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
                                        <Text style={{ flex: 1, textAlign: 'center',color:colors.BLACK }}>{item?.item || "0"}</Text>
                                        <Text style={{ flex: 1, textAlign: 'center',color:colors.BLACK }}>{item?.quantity || "0"}</Text>
                                        <Text style={{ flex: 1, textAlign: 'center',color:colors.BLACK }}>{item?.price || "0"} Tk</Text>
                                    </View>
                                </>
                            })}
                        </View>
                        <Text style={{ textAlign: 'right', right: 50, color: colors.RED, fontWeight: "bold" }}>Total: <Text>{currentDateData?.total}</Text> Tk</Text>
                        {weekTotal ? <Text style={{ textAlign: 'right', right: 50, color: colors.RED, fontWeight: "bold" }}>Week Total({week}): <Text>{weekTotal}</Text> Tk</Text> : null}
                        {monthTotal ? <Text style={{ textAlign: 'right', right: 50, color: colors.RED, fontWeight: "bold" }}>Month Total({moment(date).format("MMMM")}): <Text>{monthTotal}</Text> Tk</Text> : null}
                        {yearTotal ? <Text style={{ textAlign: 'right', right: 50, color: colors.RED, fontWeight: "bold" }}>Year Total({moment(date).format("YYYY")}): <Text>{yearTotal}</Text> Tk</Text> : null}
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            padding: common.TWENTEE
                        }}>
                            <TouchableRipple style={styles.expansesBtn} rippleColor={colors.VOILET} onPress={() => { yearSum(year) }}><Text style={styles.expansesText}>Year expanses</Text></TouchableRipple>
                            <TouchableRipple style={styles.expansesBtn} rippleColor={colors.VOILET} onPress={() => { monthSum(year, month) }}><Text style={styles.expansesText}>Month expanses</Text></TouchableRipple>
                            <TouchableRipple style={styles.expansesBtn} rippleColor={colors.VOILET} onPress={() => { weekSum(year, month, week) }}><Text style={styles.expansesText}>Week expanses</Text></TouchableRipple>
                        </View>
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
        fontWeight: '700',
        color:colors.BLACK
    },
    expansesBtn: {
        padding: common.TEN,
        backgroundColor: colors.VOILET,
        borderRadius: common.TEN,
        margin: common.FIVE
    },
    expansesText: {
        color: colors.WHITE,
        textTransform: 'capitalize'
    }
});

export default AddTransactionForm;
