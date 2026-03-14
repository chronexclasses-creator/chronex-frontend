// Firebase theke dorkari tool gulo import kora hocche
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// Tor Web App-er Asol Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCf4hP9aGekd6XCcD-VyUIvBYq0tYm1kvk",
  authDomain: "chronex-classes-50f48.firebaseapp.com",
  projectId: "chronex-classes-50f48",
  storageBucket: "chronex-classes-50f48.firebasestorage.app",
  messagingSenderId: "31893690357",
  appId: "1:31893690357:web:34acf3e55ff339c7a3b2bc",
  measurementId: "G-LGHHW4TB5Y"
};

// Initialize Firebase (Tor website-er sathe Firebase-ke jure deoa)
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Ei connection gulo onnya page-e use korar jonno export kora
export { auth, db };
