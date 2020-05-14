import firebase from 'firebase/app';
import '@firebase/messaging'

const firebaseConfig = {
    apiKey: "AIzaSyBiL5rXZYx_xppzJWXl6eogwqaqubLi0k4",
    authDomain: "orderingdirect-8f365.firebaseapp.com",
    databaseURL: "https://orderingdirect-8f365.firebaseio.com",
    projectId: "orderingdirect-8f365",
    storageBucket: "orderingdirect-8f365.appspot.com",
    messagingSenderId: "184480344137",
    appId: "1:184480344137:web:30d3742a98c4e6140eb798",
    measurementId: "G-2CHWZXQVF2"
  };

  
firebase.initializeApp(firebaseConfig);


export default firebase;