import * as firebase from 'firebase/app';
require('firebase/auth');
require('firebase/database');

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAi1AqbELonPNhO92r5X1ySXfnEvS8EUqQ",
    authDomain: "blog-f5bc3.firebaseapp.com",
    databaseURL: "https://blog-f5bc3.firebaseio.com",
    projectId: "blog-f5bc3",
    storageBucket: "blog-f5bc3.appspot.com",
    messagingSenderId: "689336465073",
    appId: "1:689336465073:web:356d2b4d327477cf"
  };

  firebase.initializeApp(firebaseConfig);
  
  export default firebase;