import { initializeApp, getApps } from "@firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDPgio6gScEjuknkoB_OuwtVc-QKlUyC_U",
  authDomain: "whodeysell-8070a.firebaseapp.com",
  projectId: "whodeysell-8070a",
  storageBucket: "whodeysell-8070a.appspot.com",
  messagingSenderId: "189688969400",
  appId: "1:189688969400:web:e974b4b01cb3bc774a9c4d",
  measurementId: "G-VNGV76ZN67",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
