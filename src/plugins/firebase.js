import firebase from 'firebase';
// import firestore from 'firebase/firestore';

// const settings = { timestampsInSnapshots: true }

const config = {
  apiKey: "AIzaSyB-SUTKSlbwjkitO3tn7NtHrmGNDFq0uc8",
  authDomain: "sigqueue-4a1e0.firebaseapp.com",
  databaseURL: "https://sigqueue-4a1e0.firebaseio.com",
  projectId: "sigqueue-4a1e0",
  storageBucket: "sigqueue-4a1e0.appspot.com",
  messagingSenderId: "318596839699",
  appId: "1:318596839699:web:58ec6ecb863145677002e6",
  measurementId: "G-XVTS92Y39T"
};

firebase.initializeApp(config);

// firebase.firestore().settings(settings);

export default firebase;
