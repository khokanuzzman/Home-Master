// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { initializeFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCkzNVORu7JtuSI5FDcnA4q6k8V3D8f2kc",
    authDomain: "sound-temple-215321.firebaseapp.com",
    databaseURL: "https://sound-temple-215321-default-rtdb.firebaseio.com",
    projectId: "sound-temple-215321",
    storageBucket: "sound-temple-215321.appspot.com",
    messagingSenderId: "97413835492",
    appId: "1:97413835492:web:f5b8df22b3c12a3c1d9af1",
    measurementId: "G-W65HQTM1CP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = initializeFirestore(app, {
    experimentalForceLongPolling: true,
});