// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLx0tKGu-t8eXs4pIfwbFH2yVBPifhYxw",
  authDomain: "quasar-6a0e9.firebaseapp.com",
  databaseURL: "https://quasar-6a0e9-default-rtdb.firebaseio.com",
  projectId: "quasar-6a0e9",
  storageBucket: "quasar-6a0e9.appspot.com",
  messagingSenderId: "291035610639",
  appId: "1:291035610639:web:6d15737de9e037d3c3ed7a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app)
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

console.log(auth)

export  {database , auth, googleProvider}
