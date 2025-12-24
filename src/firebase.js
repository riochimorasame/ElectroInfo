// On utilise les liens directs vers Google (CDN) pour éviter l'erreur dans la console
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

// Tes clés personnelles
const firebaseConfig = {
  apiKey: "AIzaSyC7YgTteN2TTneXoDw-bhuopWRJ68HkzYM",
  authDomain: "electroinfo-db.firebaseapp.com",
  projectId: "electroinfo-db",
  storageBucket: "electroinfo-db.firebasestorage.app",
  messagingSenderId: "1063124497868",
  appId: "1:1063124497868:web:88268910e57163140fd969",
  measurementId: "G-1TJYWEFSHT"
};

// Initialisation
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);