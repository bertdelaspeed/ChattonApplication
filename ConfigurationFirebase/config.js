// Import the functions you need from the SDKs you need
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDio8xAQzVDTtR5PouKpRY95FoJ2U5BFXE",
  authDomain: "chattons-4614d.firebaseapp.com",
  projectId: "chattons-4614d",
  storageBucket: "chattons-4614d.appspot.com",
  messagingSenderId: "62399314890",
  appId: "1:62399314890:web:a7b5a71b97810c6549ad33",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = initializeFirestore(app, {
  experimentationForceLongPolling: true,
});
