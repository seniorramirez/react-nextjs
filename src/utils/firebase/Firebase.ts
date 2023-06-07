// Import the functions you need from the SDKs you need
import * as firebase  from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, memoryLocalCache } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
/*const firebaseConfig = {
  apiKey: "AIzaSyBZFi_s1hpLm5TyHw8HGH2ncokRGXWBgN4",
  authDomain: "pruebavecotorial.firebaseapp.com",
  projectId: "pruebavecotorial",
  storageBucket: "pruebavecotorial.appspot.com",
  messagingSenderId: "418699548779",
  appId: "1:418699548779:web:d39cb6a589f1d59ed7b92e"
};*/

const firebaseConfig = {
  apiKey: "AIzaSyBfS3DriaoDmPI9t9oehZ2xJX6tFnn-eJY",
  authDomain: "useit-f0f53.firebaseapp.com",
  databaseURL: "https://useit-f0f53.firebaseio.com",
  projectId: "useit-f0f53",
  storageBucket: "useit-f0f53.appspot.com",
  messagingSenderId: "766491356843",
  appId: "1:766491356843:web:4c968928099cf184cd11ee",
  measurementId: "G-JCZWMJL5SZ"
}

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app)
export default app;