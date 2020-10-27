import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBbDjKpYxTIoVrhSepP3Ntg7EtQL7p3RDw",
  authDomain: "nurselink-bddde.firebaseapp.com",
  databaseURL: "https://nurselink-bddde.firebaseio.com",
  projectId: "nurselink-bddde",
  storageBucket: "nurselink-bddde.appspot.com",
  messagingSenderId: "173507261590",
  appId: "1:173507261590:web:d9ea3218247627d07e3eb7",
  measurementId: "G-FM6TW4VEBZ"
};

export const nlProApp = firebase.initializeApp(firebaseConfig);
export const firestore = firebase.firestore(nlProApp);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
