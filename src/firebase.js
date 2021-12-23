import firebase from 'firebase/app';
require('firebase/firestore')
require('firebase/performance')

const firebaseConfig = {
  apiKey: '${{ secrets.FIREBASE_NABLA_7_APIKEY }}',
  authDomain: "nabla7.firebaseapp.com",
  projectId: "nabla7",
  storageBucket: "nabla7.appspot.com",
  messagingSenderId: "22669283456",
  appId: "1:22669283456:web:ebd01b9cc2653ea9e7d665",
  measurementId: "G-FQ3S1GMV92"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore()
export default db;
