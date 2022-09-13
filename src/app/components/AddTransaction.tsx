import React, { useState } from 'react';
import { Button, Platform, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import colors from '../constants/common/colors';
import common from '../constants/common/common';
import Ionicons from 'react-native-vector-icons/Ionicons';
import fontSize from '../constants/common/font.size';
import DropDownPicker from 'react-native-dropdown-picker';
import { TextInput } from 'react-native-paper';


interface Props {
    add?: boolean;
    amount?: number;
    styles?: StyleProp<ViewStyle>;
    icon?: string;
    itemType?: string;
}

const AddTransactionForm = (props: Props) => {
    const [text, setText] = React.useState("");

    const [openCategory, setCategory] = useState(false);
    const [valueCateroy, setValueCategory] = useState(null);
    const [openItem, setItem] = useState(false);
    const [valueItem, setValueItem] = useState(null);

    const [itemsCategory, setItemsCategory] = useState([
        { label: 'Bazar', value: 'bazar' },
        { label: 'Medicine', value: 'medicine' }
    ]);
    const [items, setItems] = useState([
        { label: 'Eggs', value: 'eggs' },
        { label: 'Fish', value: 'fish' }
    ]);
    return (
        <View style={styles.transactionSectionWrapper}>
            <Text style={{fontSize:fontSize.XL,textAlign:'center',color:colors.TEXT,fontWeight:'bold',marginBottom:common.TEN}}>
                    Add transaction
            </Text>
            <View style={[styles.transactionSection]}>
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
                        label="Price"
                        value={text}
                        mode={"outlined"}
                        onChangeText={text => setText(text)}
                    />
                </View>
                <View style={styles.marginVertical10}>
                    <Button title='Continue' onPress={()=> console.log("clicked")} color={colors.VOILET} />
                </View>
            </View>
        </View>
    )
};
const styles = StyleSheet.create({
    transactionSectionWrapper: {
        flex:1,
        justifyContent:'center',
        backgroundColor:colors.BAKCGROUND
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
    }
});

export default AddTransactionForm;
