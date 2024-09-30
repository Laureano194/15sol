// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.key,
    authDomain: "tiziana-15.firebaseapp.com",
    projectId: "tiziana-15",
    storageBucket: "tiziana-15.appspot.com",
    messagingSenderId: "652038035833",
    appId: "1:652038035833:web:4938acb9dd7392c15e37a8"
    //   databaseURL: "xxx",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()