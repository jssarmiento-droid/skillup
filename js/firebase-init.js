// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/setup#config-object
const firebaseConfig = {
  apiKey: "AIzaSyAajVCjD8I2bpBNNGx0yARc40-mW0PQCZ4",
  authDomain: "skillup-cbaa1.firebaseapp.com",
  projectId: "skillup-cbaa1",
  storageBucket: "skillup-cbaa1.firebasestorage.app",
  messagingSenderId: "697629189498",
  appId: "1:697629189498:web:fcbc4ddeda8e94e84f62c3",
  measurementId: "G-QK5LHLZWHB"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
