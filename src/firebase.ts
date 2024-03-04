// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCl8GwlbRs7yCpVebEx1aBUrMWZ-SI8RPg",
  authDomain: "carefind3r.firebaseapp.com",
  projectId: "carefind3r",
  storageBucket: "carefind3r.appspot.com",
  messagingSenderId: "513990130760",
  appId: "1:513990130760:web:e52b0dd9620c4dd876ec7d",
  measurementId: "G-VFFR2DY57B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);