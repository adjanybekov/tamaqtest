import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';



var firebaseConfig = {
    apiKey: "AIzaSyCCbJwm6_Y7eyTyBZ2fPDGzXiCTP4VNwDM",
    authDomain: "tamaq-bd80c.firebaseapp.com",
    databaseURL: "https://tamaq-bd80c.firebaseio.com",
    projectId: "tamaq-bd80c",
    storageBucket: "tamaq-bd80c.appspot.com",
    messagingSenderId: "541810558402",
    appId: "1:541810558402:web:4e711646b8442b049c825b",
    measurementId: "G-S4K9V5V46C"
  };




  
  try {
    firebase.initializeApp(firebaseConfig);
  } catch (err) {
    console.log(err);
  }
  
  export const auth = firebase.auth();
  export const firestore = firebase.firestore();
  const storage = firebase.storage().ref();

  