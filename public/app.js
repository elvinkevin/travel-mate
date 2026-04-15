// 1. Imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// 2. Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDsq5O2YF4THk92MkGDWu4FAht1E7fcTRw",
    authDomain: "travelmate-pro-46da5.firebaseapp.com",
    projectId: "travelmate-pro-46da5",
    storageBucket: "travelmate-pro-46da5.firebasestorage.app",
    messagingSenderId: "223616710108",
    appId: "1:223616710108:web:3ae3afa6ac560689638b19"
};

// 3. Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
console.log("Firebase initialized successfully using Modular SDK.");

// 4. Custom Logic
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded and parsed.");
    
    const bookingBtn = document.getElementById('book-now-btn');
    if (bookingBtn) {
        bookingBtn.addEventListener('click', () => {
            alert("Processing your booking...");
        });
    }
});

// 5. Bootstrap Initialization
// Wrap in a check to ensure bootstrap is loaded from the CDN first
if (typeof bootstrap !== 'undefined') {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
}