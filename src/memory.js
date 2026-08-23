// src/memory.js
import { db } from "./firebase.js";
import {
  addDoc,
  collection,
  query,
  where,
  orderBy,
  getDocs,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

export async function addMemory(userId, content) {
  if (!content.trim()) return;
  await addDoc(collection(db, "memory"), {
    userId,
    content,
    createdAt: serverTimestamp(),
  });
}

export async function loadMemory(userId) {
  const q = query(
    collection(db, "memory"),
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
