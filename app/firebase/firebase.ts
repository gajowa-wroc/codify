import { initializeApp } from 'firebase/app'
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";  //realtime db
// TODO: Replace the following with your app's Firebase project configuration

const firebaseConfig = {
  apiKey: "AIzaSyCMeiTsk4HI8YC11-kJ-SWUtxcoflXJPAA",
  authDomain: "codifydb-8f761.firebaseapp.com",

  // The value of `databaseURL` depends on the location of the database
  databaseURL: "https://DATABASE_NAME.firebaseio.com", // DODNT CHANGE
  projectId: "PROJECT_ID",
  storageBucket: "PROJECT_ID.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID",
  // For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
  measurementId: "G-MEASUREMENT_ID", // DIDNT CHANGE
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

