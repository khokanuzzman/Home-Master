import auth from '@react-native-firebase/auth';
import { collection } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Text } from 'react-native-paper';
import { db } from '../../../environments/firebaseConfig';

const DashboardScreen = (props) => {

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [userCollection, setUserCollection] = useState();
  const userRefCollection = collection(db, "users");
  // Handle user state changes
  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;
  console.log('userCollection', userCollection);

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Text>Total</Text>
      </View>
    </ScrollView>
  );
}
export default DashboardScreen;
