// Import the functions you need from the SDKs you need
import * as firebase  from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZFi_s1hpLm5TyHw8HGH2ncokRGXWBgN4",
  authDomain: "pruebavecotorial.firebaseapp.com",
  projectId: "pruebavecotorial",
  storageBucket: "pruebavecotorial.appspot.com",
  messagingSenderId: "418699548779",
  appId: "1:418699548779:web:d39cb6a589f1d59ed7b92e"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;