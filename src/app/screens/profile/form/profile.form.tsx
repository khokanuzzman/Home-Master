import { collection, doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { db } from '../../../../environments/firebaseConfig';
import { authInfo } from '../../../constants/common/common_function';

const profileForm = (props: any) => {
    const {email} = props.route.params ? props.route.params: [];
    const user = authInfo();
    const [name, setName] = React.useState("");
    const [emailInput, setEmailInput] = React.useState(email? email:"");
    const [phone, setPhone] = React.useState("");
    const [initializing, setInitializing] = useState(true);
    const userRefCollection = collection(db, "users");
    


    const create = () => {
        console.log("cliked");
        // data.name = name;
        // data.email = email;
        // data.phone = phone;
        // for create setDoc, for update updateDoc

        updateDoc(doc(db, "users", email), {
            email: email,
            name: name,
            phone: phone
        })
            .then(docRef => {
                console.log("data is created");
            }).catch(error => {
                console.log(error);
            });
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text>Update Profile</Text>
            <TextInput
                label="Name"
                value={name}
                mode="outlined"
                onChangeText={text => setName(text)}
            />
            <TextInput
                label="email"
                value={emailInput}
                mode="outlined"
                onChangeText={text => setEmailInput(text)}
            />
            <TextInput
                label="phone"
                value={phone}
                mode="outlined"
                onChangeText={text => setPhone(text)}
            />
            <View style={{ height: 20 }}></View>
            <Button mode="contained" onPress={() => create()}> update </Button>
        </View>
    );
}
export default profileForm;
