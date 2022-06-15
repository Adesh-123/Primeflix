// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvaCeXFlehGuj7pw2SQkA7El88_PpHX8k",
  authDomain: "netflix-frontend-1e036.firebaseapp.com",
  projectId: "netflix-frontend-1e036",
  storageBucket: "netflix-frontend-1e036.appspot.com",
  messagingSenderId: "697457099738",
  appId: "1:697457099738:web:9cf74872caa0a62aad36e3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;