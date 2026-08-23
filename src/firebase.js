// src/firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCSJyZuwaDPG1OWBz-0iELv5gu49O5KRgY",
  authDomain: "new-jarvis-ea708.firebaseapp.com",
  projectId: "new-jarvis-ea708",
  storageBucket: "new-jarvis-ea708.firebasestorage.app",
  messagingSenderId: "1025592757489",
  appId: "1:1025592757489:web:53d0f05fbdbb220aac6d50",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
