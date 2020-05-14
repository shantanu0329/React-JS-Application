importScripts('https://www.gstatic.com/firebasejs/7.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.10.0/firebase-messaging.js');
importScripts('https://www.gstatic.com/firebasejs/7.10.0/firebase-analytics.js');

let firebaseConfig = {
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
const initMessaging = firebase.messaging();

initMessaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
//   let obj = JSON.parse(payload);
//   console.warn(obj);
//     let order_id = obj.order_id;
//     let title = obj.title;
    // window.location.href="/orderDetail/4448";

});