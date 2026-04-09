// Initialize Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";

// web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDsq5O2YF4THk92MkGDWu4FAht1E7fcTRw",
  authDomain: "travelmate-pro-46da5.firebaseapp.com",
  projectId: "travelmate-pro-46da5",
  storageBucket: "travelmate-pro-46da5.firebasestorage.app",
  messagingSenderId: "223616710108",
  appId: "1:223616710108:web:3ae3afa6ac560689638b19"
};


export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);