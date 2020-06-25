import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from './serviceWorker';
import App from './App';
import * as firebase from 'firebase/app'




const firebaseConfig = {
    apiKey: "AIzaSyCCBMbolm_c5RV4mpZApMKVd2jv--6Gx7M",
    authDomain: "svelty-control.firebaseapp.com",
    databaseURL: "https://svelty-control.firebaseio.com",
    projectId: "svelty-control",
    storageBucket: "svelty-control.appspot.com",
    messagingSenderId: "330604001762",
    appId: "1:330604001762:web:3c4d29b6e2d63e710961bb",
    measurementId: "G-SXCXXM7Z52"
}



firebase.initializeApp(firebaseConfig)



ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
