import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { collection } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Platform, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { Avatar, Divider, Text } from 'react-native-paper';
import SegmentedControlTab from "react-native-segmented-control-tab";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { db } from '../../../environments/firebaseConfig';
import TransactionItem from '../../components/TransactionItem';
import colors from '../../constants/common/colors';
import common from '../../constants/common/common';
import fontSize from '../../constants/common/font.size';
import dashboardStyle from './dashboard.style';

const DashboardScreen = (props) => {
  const reference = database().ref('/users/123');
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [userCollection, setUserCollection] = useState();
  const userRefCollection = collection(db, "users");
  const [tabIndex, setTabIndex] = useState(0);
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

  return (
    <><ScrollView style={dashboardStyle.container}>
      <View style={{ flex: 1 }}>
        <LinearGradient style={[dashboardStyle.headersSection, dashboardStyle.shadow]} colors={['#FFF6E5', '#BAA9A5']} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}>
          <TouchableOpacity onPress={() => props.navigation.openDrawer()} style={dashboardStyle.headersSectionTopBar}>
            <View>
              <Text>Monday</Text>
              <Text>November</Text>
            </View>
            <View style={dashboardStyle.headerSectionTopBarUser}>
              <View style={{
                borderWidth: 2,
                borderRadius: 50,
                padding: common.THREE,
                borderColor: colors.IMAGE_BORDER_COLOR,
                marginRight: common.THREE
              }}>
                <Avatar.Image size={50} source={require('../../../assets/user.png')} />
              </View>
              <Text style={{ textTransform: "uppercase" }}>Nusrat</Text>
            </View>
          </TouchableOpacity>
          <Divider style={{ marginTop: common.TEN }} />
          <View style={dashboardStyle.accounts}>
            <Text style={{ color: colors.LIGHT_TEXT_COLOR, textTransform: 'capitalize' }}>account balance</Text>
            <View style={dashboardStyle.balance}>
              <Text style={{ fontSize: fontSize.L_40, fontWeight: 'bold' }}>900000.0</Text>
            </View>
          </View>
          <View style={dashboardStyle.amountButtonSection}>
            <View style={dashboardStyle.amount}>
              <View style={dashboardStyle.amountIconWrapper}>
                <Ionicons
                  name={props.icon || (Platform.OS === 'android' ? 'md-add-sharp' : 'ios-add-circle-sharp')}
                  size={30} color={colors.GREEN} />
              </View>
              <View>
                <Text style={{ color: colors.WHITE }}>Income</Text>
                <Text style={{ color: colors.WHITE, fontWeight: 'bold', fontSize: fontSize.XL }}>25000</Text>
              </View>
            </View>
            <View style={[dashboardStyle.amount, { backgroundColor: colors.RED }]}>
              <View style={dashboardStyle.amountIconWrapper}><Ionicons
                name={props.icon || (Platform.OS === 'android' ? 'md-remove-sharp' : 'ios-remove-circle-sharp')}
                size={30} color={colors.GREEN} /></View>
              <View>
                <Text style={{ color: colors.WHITE }}>Expanses</Text>
                <Text style={{ color: colors.WHITE, fontWeight: 'bold', fontSize: fontSize.XL }}>25000</Text>
              </View>
            </View>
          </View>
        </LinearGradient>
        <View style={{ paddingHorizontal: 20, marginVertical: common.TWENTEE }}>
          <SegmentedControlTab
            values={["Daily", "Weekly", "Monthly", "Year"]}
            selectedIndex={tabIndex}
            borderRadius={20}
            tabsContainerStyle={{ backgroundColor: 'transparent', borderWidth: 1, borderColor: colors.WHITE, borderRadius: 20 }}
            tabStyle={{ backgroundColor: 'transparent', borderColor: colors.WHITE, borderWidth: 0, paddingVertical: 10 }}
            tabBadgeStyle={{ borderWidth: 0 }}
            tabTextStyle={{ color: colors.WHITE, fontSize: fontSize.T }}
            activeTabStyle={{ backgroundColor: colors.BLACK, borderRadius: 20 }}
            onTabPress={(index) => setTabIndex(index)}
            enabled={true} />
          <View style={dashboardStyle.recentTransition}>
            <Text>Recent Transaction</Text>
            <TouchableOpacity><Text>View All</Text></TouchableOpacity>
          </View>
          <TransactionItem amount={2500} itemType={"Income"} add={true} />
          <TransactionItem amount={500} itemType={"Expanses"} add={false} />
          <TransactionItem amount={7500} itemType={"Income"} add={true} />
        </View>
      </View>
    </ScrollView>
      {/* <BottomTab /> */}
    </>
  );
}
export default DashboardScreen;
