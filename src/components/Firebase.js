import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const config = {
  apiKey: "xxxxxxxxxxxxxxxx",
  authDomain: "xxxxxxx.firebaseapp.com",
  databaseURL: "https://xxxxxxxxx.firebaseio.com",
  projectId: "fir-xxxxxx",
  storageBucket: "fir-xxxxxxxx.appspot.com",
  messagingSenderId: "xxxxxxxxxx"
};

firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;