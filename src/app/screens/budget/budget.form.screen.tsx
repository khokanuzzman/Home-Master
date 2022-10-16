import moment from 'moment';
import React, { useEffect, useLayoutEffect } from 'react';
import { Button, ScrollView, StyleSheet, View } from 'react-native';
import { Text, TextInput, Title } from 'react-native-paper';
import database from '@react-native-firebase/database';
import { notificationFn } from '../../core/notification/notification';
import colors from '../../constants/common/colors';
import { BudgetDTO } from '../../constants/budget/budgetDTO';
import { useDispatch, useSelector } from 'react-redux';
import * as commonAction from '../../store/redux-storage/common/common.action';
import { percentages } from '../../core/utils';
import { currentUser } from '../../navigation/app.navigation.container';
import LoaderComponent from '../../components/loader.component';

const BudgetFormScreen = (props: any) => {
  const amount = useSelector((state) => state.common.amount);
  const [budgetData, setBudgetData] = React.useState<BudgetDTO>();
  const [totalIncome, setTotalIncome] = React.useState<number>(0);
  const [bazarAmount, setBazarAmount] = React.useState<number>(0);
  const [houseRent, setHouseRent] = React.useState<number>(0);
  const [gaseBill, setGasBill] = React.useState<number>(0);
  const [currentBill, setCurrentBill] = React.useState<number>(0);
  const [others, setOthers] = React.useState<number>(0);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  let currMonthName = moment().format('MMMM');
  let currentYear = moment().format('YYYY');
  const dispatch = useDispatch<any>();


  const db = database();
  const baseUrl = `home-master/${currentUser?.uid}`
  const budgetUrl = `${baseUrl}/budget/${currentYear}/${currMonthName}/`

  const addBudget = async () => {
    console.log("WORKING")
    db.ref(budgetUrl)
      .set({ totalIncome: totalIncome, bazarAmount: bazarAmount, houseRent: houseRent, gaseBill: gaseBill, currentBill: currentBill, others: others })
      .then(() => {
        console.log("console working")
        notificationFn(`budget added for ${currMonthName + "," + currentYear}`);
      });
  }

  const calculateBudget = () => {
    let current = Number(bazarAmount + houseRent + currentBill + gaseBill + others);
    dispatch(commonAction.amountCalculation(current));
  }

  useEffect(() => {
    const onValueChange = database()
      .ref(budgetUrl)
      .on('value', snapshot => {
        console.log(snapshot.val());
        setTotalIncome(snapshot.val()?.totalIncome || 0);
        setBazarAmount(snapshot.val()?.bazarAmount || 0);
        setHouseRent(snapshot.val()?.houseRent || 0);
        setGasBill(snapshot.val()?.gaseBill || 0);
        setCurrentBill(snapshot.val()?.currentBill || 0);
        setOthers(snapshot.val()?.others || 0);
        setIsLoading(false);
      });

    // Stop listening for updates when no longer required
    return () => database().ref(`${baseUrl}/budget/${currMonthName}/`).off('value', onValueChange);
  }, []);

  if(isLoading){
    return(<LoaderComponent/>)
}

  return (
    <ScrollView>
      <View style={{ padding: 20 }}>
        <Title style={{ textAlign: 'center', textTransform: 'capitalize' }}>Monthly budge form({currMonthName + "," + currentYear})</Title>
        <View style={{ paddingVertical: 20 }}>
          <TextInput
            label="Total Incom"
            value={totalIncome.toString()}
            mode={'outlined'}
            keyboardType={"number-pad"}
            onChangeText={text => {
              calculateBudget(text);
              console.log(typeof(text))
              setTotalIncome(Number(text))
            }}
          />
          <Text style={styles.percentagesText}><Text style={styles.percentagesTextValue}>{percentages(totalIncome, totalIncome)}% </Text>of {totalIncome}</Text>
          <TextInput
            label="Bazar"
            value={bazarAmount.toString()}
            mode={'outlined'}
            keyboardType="number-pad"
            onChangeText={text => {
              calculateBudget(text);
              setBazarAmount(Number(text));
            }}
          />
          <View style={styles.amountStatus}>
            <Text style={styles.percentagesText}><Text style={styles.percentagesTextValue}>{percentages(bazarAmount, totalIncome)}% </Text>of {totalIncome}</Text>
            <Text style={styles.percentagesText}>{parseFloat(Number(totalIncome - (bazarAmount)))}</Text>
          </View>
          <TextInput
            label="House Rent"
            value={houseRent.toString()}
            mode={'outlined'}
            keyboardType="number-pad"
            onChangeText={text => setHouseRent(Number(text))}
          />
          <View style={styles.amountStatus}>
            <Text style={styles.percentagesText}><Text style={styles.percentagesTextValue}>{percentages(houseRent, totalIncome)}% </Text>of {totalIncome}</Text>
            <Text style={styles.percentagesText}>{`${totalIncome - (bazarAmount+houseRent)}`}</Text>
          </View>
          <TextInput
            label="Gas bill"
            value={gaseBill.toString()}
            mode={'outlined'}
            keyboardType="number-pad"
            onChangeText={text => setGasBill(Number(text))}
          />
          <View style={styles.amountStatus}>
            <Text style={styles.percentagesText}><Text style={styles.percentagesTextValue}>{percentages(gaseBill, totalIncome)}%</Text> of {totalIncome}</Text>
            <Text style={styles.percentagesText}>{`${totalIncome - (bazarAmount+houseRent+gaseBill)}`}</Text>
          </View>
          <TextInput
            label="Current Bill"
            value={currentBill.toString()}
            keyboardType="number-pad"
            mode={'outlined'}
            onChangeText={text => setCurrentBill(Number(text))}
          />
          <View style={styles.amountStatus}>
            <Text style={styles.percentagesText}><Text style={styles.percentagesTextValue}>{percentages(currentBill, totalIncome)}% </Text>of {totalIncome}</Text>
            <Text style={styles.percentagesText}>{`${totalIncome - (bazarAmount+houseRent+gaseBill+currentBill)}`}</Text>
          </View>
          <TextInput
            label="Others"
            value={others.toString()}
            mode={'outlined'}
            keyboardType="number-pad"
            onChangeText={text => setOthers(Number(text))}
          />
          <View style={styles.amountStatus}>
            <Text style={styles.percentagesText}><Text style={styles.percentagesTextValue}>{percentages(others, totalIncome)}% </Text>of {totalIncome}</Text>
            <Text style={styles.percentagesText}>{`${totalIncome - (bazarAmount+houseRent+gaseBill+currentBill+others)}`}</Text>
          </View>
        </View>
        <View>
          <Text></Text>
        </View>
        <Button disabled={!totalIncome} onPress={() => addBudget()} title='save' />
      </View>
    </ScrollView>
  );
}
export default BudgetFormScreen;

const styles = StyleSheet.create({
  percentagesText: {
    padding: 5,
    color: colors.DISABLED
  },
  percentagesTextValue: {
    color: colors.RED
  },
  amountStatus: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  }
});

