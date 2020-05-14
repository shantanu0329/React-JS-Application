import React, { Component } from 'react';
import Router from './Components/Router';
import firebase from './Components/firebase';
import './App.css';

class App extends Component {

  async componentDidMount(){
    const messaging = firebase.messaging()
    messaging.requestPermission().then(async()=>{
      return messaging.getToken()
    }).then(token=>{
      console.log('Token = ',token)
      localStorage.setItem('fcmToken',token);
    }).catch((e)=>{
      console.log(e);
    });

    messaging.onMessage((payload) => {
      console.log('Message received. ', payload);
      alert(payload.data.title)
      // let order_id = obj.order_id;
      // let title = obj.title;
    });

  }

  render(){
    return (
      <Router />   
    );
  }
  
}

export default App;
