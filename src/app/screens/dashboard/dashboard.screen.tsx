import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { collection } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Button, Platform, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { Avatar, Divider, Text, TouchableRipple } from 'react-native-paper';
import SegmentedControlTab from "react-native-segmented-control-tab";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { db } from '../../../environments/firebaseConfig';
import TransactionItem from '../../components/TransactionItem';
import colors from '../../constants/common/colors';
import common from '../../constants/common/common';
import fontSize from '../../constants/common/font.size';
import dashboardStyle from './dashboard.style';
import { firebase } from '@react-native-firebase/auth';
import { currentUser } from '../../store/redux-storage/auth/auth.action';
import styles from '../../constants/common/styles';
import { baseUrl, budgetUrl, currentMonthWeek, currMonthName, dayName, month, year } from '../../store/redux-storage/common/common.action';
import { BudgetDTO } from '../../constants/budget/budgetDTO';

const DashboardScreen = ({ navigation }) => {
  const reference = database().ref('/users/123');
  const [tabIndex, setTabIndex] = useState(0);
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [budgetData, setBudgetData] = useState<BudgetDTO>();
  const [user, setUser] = useState();
  const [monthTotal, setMonthTotal] = useState(0);
  const [weekTotal, setWeekTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const userRefCollection = collection(db, "users");
  // console.log(year,month);
  // Handle user state changes

  // currentUser?.updateProfile({
  //   displayName: "Khokan",
  //   photoURL: 'https://my-cdn.com/assets/user/123.png',
  // });

  React.useEffect(() => {
    // console.log("url:", budgetUrl);
    const onValueChange = database()
      .ref(budgetUrl)
      .on('value', snapshot => {
        setBudgetData(snapshot.val());
      });

    // Stop listening for updates when no longer required
    return () => database().ref(budgetUrl).off('value', onValueChange);
  }, []);  
  
  React.useEffect(() => {
    const onValueChange = database()
      .ref(`${baseUrl}/expenses/${year}/${month}/`)
      .on('value', snapshot => {
        console.log("bage url",snapshot.val().monthTotal)
        setMonthTotal(snapshot.val().monthTotal)
      });

    // Stop listening for updates when no longer required
    return () => database().ref(baseUrl).off('value', onValueChange);
  }, []);

  // React.useEffect(() => {
  //   const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  //   return subscriber; // unsubscribe on unmount
  // }, []);

  return (
    <><ScrollView style={dashboardStyle.container}>
      <View style={{ flex: 1 }}>
        <LinearGradient style={[dashboardStyle.headersSection, dashboardStyle.shadow]} colors={['#FFF6E5', '#BAA9A5']} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}>
          <TouchableOpacity onPress={() => navigation.openDrawer()} style={dashboardStyle.headersSectionTopBar}>
            <View>
              <Text>{dayName}</Text>
              <Text>{currMonthName}</Text>
            </View>
            <View style={dashboardStyle.headerSectionTopBarUser}>
              <View style={{
                borderWidth: 2,
                borderRadius: 50,
                padding: common.THREE,
                borderColor: colors.IMAGE_BORDER_COLOR,
                marginRight: common.THREE
              }}>
                {/* <Avatar.Image size={50} source={require('../../../assets/user.png')} /> */}
                <Avatar.Image
                  size={50} source={{ uri: "https://my-cdn.com/assets/user/123.png" }} />
              </View>
              <Text style={{ textTransform: "uppercase" }}>{currentUser?.displayName}</Text>
            </View>
          </TouchableOpacity>
          <Divider style={{ marginTop: common.TEN }} />
          <View style={dashboardStyle.accounts}>
            <Text style={{ color: colors.LIGHT_TEXT_COLOR, textTransform: 'capitalize' }}>account balance</Text>
            <View style={dashboardStyle.balance}>
              <Text style={{ fontSize: fontSize.L_40, fontWeight: 'bold' }}>{budgetData?.totalIncome}</Text>
            </View>
          </View>
          <View style={dashboardStyle.amountButtonSection}>
            <View style={dashboardStyle.amount}>
              <View style={dashboardStyle.amountIconWrapper}>
                <Ionicons
                  name={(Platform.OS === 'android' ? 'md-add-sharp' : 'ios-add-circle-sharp')}
                  size={30} color={colors.GREEN} />
              </View>
              <View>
                <Text style={{ color: colors.WHITE }}>Monthly Budget</Text>
                <Text style={{ color: colors.WHITE, fontWeight: 'bold', fontSize: fontSize.XL }}>{budgetData?.totalIncome}</Text>
              </View>
            </View>
            <View style={[dashboardStyle.amount, { backgroundColor: colors.RED }]}>
              <View style={dashboardStyle.amountIconWrapper}><Ionicons
                name={(Platform.OS === 'android' ? 'md-remove-sharp' : 'ios-remove-circle-sharp')}
                size={30} color={colors.GREEN} /></View>
              <View>
                <Text style={{ color: colors.WHITE }}>Monthly Expanses</Text>
                <Text style={{ color: colors.WHITE, fontWeight: 'bold', fontSize: fontSize.XL }}>25000</Text>
              </View>
            </View>
          </View>
        </LinearGradient>
        <TouchableRipple rippleColor={colors.DASHBOARD_BAKCGROUND} onPress={() => { navigation.navigate('budgetForm') }} style={styles.budgetAlert}>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            {!budgetData ? <Ionicons
              name={(Platform.OS === 'android' ? 'md-alert-circle-outline' : 'ios-alert-circle-outline')}
              size={30} color={colors.VOILET} /> :
              <Ionicons
                name={(Platform.OS === 'android' ? 'md-checkmark-done-circle-outline' : 'ios-checkmark-done-circle-outline')}
                size={30} color={colors.GREEN} />
            }
            {!budgetData ?
              <><Text style={{ color: colors.VOILET }}>Your monthly budget missing!</Text><Text style={{
                color: colors.VOILET,
                borderBottomColor: colors.VOILET,
                backgroundColor: colors.WARNING,
                padding: common.FIVE,
                borderRadius: common.FIVE,
                fontSize: fontSize.SIXTEEN,
                fontWeight: 'bold',
              }}>Press me to setup</Text></> :
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text>Budget found</Text>
                <TouchableRipple style={{
                  borderWidth: 1,
                  padding: common.TEN,
                  borderRadius: common.TEN,
                  backgroundColor: colors.DASHBOARD_BAKCGROUND,
                  marginTop:common.FIVE,
                }} rippleColor={colors.VOILET}>
                  <Text style={{color:colors.WHITE}}>Update your budget</Text>
                </TouchableRipple>
              </View>}
          </View>
        </TouchableRipple>
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
