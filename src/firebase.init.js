// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDXYXieIzJ4VeEJ0XTbwXH6d6nLmfzeKm4",
  authDomain: "ema-john-route-module-59-fire.firebaseapp.com",
  projectId: "ema-john-route-module-59-fire",
  storageBucket: "ema-john-route-module-59-fire.appspot.com",
  messagingSenderId: "320820907776",
  appId: "1:320820907776:web:f7aea38fcd87b94f296de5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

export default auth;
