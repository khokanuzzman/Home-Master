import database from '@react-native-firebase/database';
import { Keyboard } from "react-native";
import { baseUrl } from '../store/redux-storage/common/common.action';
import { notificationFn } from './notification/notification';
import { firebase } from '@react-native-firebase/auth';

const db = database();
export const emailValidator = (email: string) => {
  const re = /\S+@\S+\.\S+/;

  if (!email || email.length <= 0) return 'Email cannot be empty.';
  if (!re.test(email)) return 'Ooops! We need a valid email address.';

  return '';
};

export const passwordValidator = (password: string) => {
  if (!password || password.length <= 0) return 'Password cannot be empty.';

  return '';
};

export const nameValidator = (name: string) => {
  if (!name || name.length <= 0) return 'Name cannot be empty.';

  return '';
};

export const weekNumber = (selectedDate: any) => {
  const d = selectedDate;
  const date = d.getDate();
  const day = d.getDay();
  let weekOfMonth = Math.ceil((date - 1 - day) / 7);
  // If weekOfMonth is 0, set it to 1
  if (weekOfMonth === 0) {
    weekOfMonth = 1;
  }
  // Display the calculated result      
  return weekOfMonth;
};

export const percentages = (partialValue: number, totalValue: number) => {
  return Math.round((100 * partialValue) / totalValue) || 0;
}

export const sumMonthFn = async (yearlyExpanses, year, month, week) => {
  let data = await yearlyExpanses[month][week];
  // console.log("data: ",data);
  let sum = 0;
  let monthTotal = Object.entries(data).map(entry => {
    let key = entry[0];
    let value = entry[1];

    //    console.log(typeof(value));
    if (typeof (value) === 'object') {
      console.log(typeof (value) === 'object');
      // console.log(value["total"]);
      sum += parseInt(value["total"])
    }
    return sum;
  });
  if (sum) {
    db.ref(`${baseUrl}/expenses/${year}/${month}/${week}/`)
      .update({ weekTotal: sum })
      .then(() => {
        notificationFn('weekTotal successfully created');
      });
    Keyboard.dismiss();
  }
}

export var weekTotal=0;

export const weekSum =(year,month,week)=>{
  let ref = firebase.database().ref(`${baseUrl}/expenses/${year}/${month}/${week}`);
  let query = ref.orderByChild("total")
  query.once("value", (snapshot)=>{
    snapshot.forEach((child)=> {
      console.log( "child value:",child.val().total);
      weekTotal += Number(child.val().total);
    });
  });
}


