// src/ 
import { db } from "./firebase.js";
import {
  addDoc,
  collection,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

export async function sendCommand(userId, type, payload) {
  await addDoc(collection(db, "commands"), {
    userId,
    type,
    payload,
    status: "pending",
    createdAt: serverTimestamp(),
  });
}
