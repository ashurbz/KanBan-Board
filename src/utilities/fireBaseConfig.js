// firebaseConfig.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD3Ia7Yil5y2nBgaqrJTofB5-3mHou9L0o",
  authDomain: "kanban-682ea.firebaseapp.com",
  projectId: "kanban-682ea",
  storageBucket: "kanban-682ea.appspot.com",
  messagingSenderId: "205121581755",
  appId: "1:205121581755:web:eac454898d71aeb08eef9e",
  measurementId: "G-V9SZ8H2Z98",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export { auth, googleProvider, facebookProvider };
