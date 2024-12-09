import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";  // Importar Firestore

const firebaseConfig = {
  apiKey: "AIzaSyAfICcCVzADHqkAV6245fz0MHusbXhbWc4",
  authDomain: "quinchaoapp-a6587.firebaseapp.com",
  projectId: "quinchaoapp-a6587",
  storageBucket: "quinchaoapp-a6587.firebasestorage.app",
  messagingSenderId: "318670039331",
  appId: "1:318670039331:web:ed4e4dc54e7dd1ea17c496",
  measurementId: "G-4WT6C7SWYR"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore
const db = getFirestore(app);

export { db };
