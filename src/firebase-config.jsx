import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyA4WAkbuOIfm0yPi96PaBpoZgm1GoLar1U",
  authDomain: "cs4-proto1.firebaseapp.com",
  databaseURL: "https://cs4-proto1-default-rtdb.firebaseio.com",
  projectId: "cs4-proto1",
  storageBucket: "cs4-proto1.appspot.com",
  messagingSenderId: "993133075187",
  appId: "1:993133075187:web:eb895b5475a0f7f7d6b586",
  measurementId: "G-T0VGC5KV3S"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
