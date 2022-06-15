import firebase from 'firebase';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDu212LQPfa7RwDZFfNj7Me6P37H6r-bb4",
  authDomain: "netflix-52de1.firebaseapp.com",
  projectId: "netflix-52de1",
  storageBucket: "netflix-52de1.appspot.com",
  messagingSenderId: "285747615614",
  appId: "1:285747615614:web:842e7b38502a391724852f",
  measurementId: "G-8DL1S9XELP"
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export default storage;
