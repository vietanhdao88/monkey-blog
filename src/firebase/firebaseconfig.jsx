// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAbneJp0xHnTwNiOcwAdvkhYMVovzt0Vdc",
  authDomain: "monkey-blogging-24b7c.firebaseapp.com",
  projectId: "monkey-blogging-24b7c",
  storageBucket: "monkey-blogging-24b7c.appspot.com",
  messagingSenderId: "760139419564",
  appId: "1:760139419564:web:635e5fd9c679201fdb3409",
  measurementId: "G-K82022BHHS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
