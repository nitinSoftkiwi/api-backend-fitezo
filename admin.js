const firebase = require('firebase');
const dotenv = require('dotenv');
require('firebase/auth');

var config = {
    apiKey = process.env.apiKey,
    authDomain = process.env.appDomain,
    storageBucket = process.env.storageBucket,
    messagingSenderId = process.env.messagingSenderId
}

firebase.initializeApp(config);
