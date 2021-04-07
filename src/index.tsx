import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase';

const firEnv = {
    apiKey: "AIzaSyBJ2j8c-YaKqQpt5N1-rzRbvUapJu3iTuw",
    authDomain: "dizorder-2e7ca.firebaseapp.com",
    projectId: "dizorder-2e7ca",
    storageBucket: "dizorder-2e7ca.appspot.com",
    messagingSenderId: "498518848990",
    appId: "1:498518848990:web:5e5ee18299816d1fdc194f",
    measurementId: "G-QX3K9XXWX8"
};

firebase.initializeApp(firEnv);

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
