// 1. Imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// 2. Configuration (Paste your actual keys here)
const firebaseConfig = {
  apiKey: "AIzaSyDsq5O2YF4THk92MkGDWu4FAht1E7fcTRw",
  authDomain: "travelmate-pro-46da5.firebaseapp.com",
  projectId: "travelmate-pro-46da5",
  storageBucket: "travelmate-pro-46da5.firebasestorage.app",
  messagingSenderId: "223616710108",
  appId: "1:223616710108:web:3ae3afa6ac560689638b19"
};

// 3. Initialize
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 4. Form Logic
const bookingForm = document.getElementById('customBookingForm');

bookingForm.addEventListener('submit', async (e) => {
    e.preventDefault(); 
    
    const bookingData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('userEmail').value,
        phone: document.getElementById('phonenumber').value,
        address: document.getElementById('address').value,
        postalCode: document.getElementById('postalCode').value,
        departureDate: document.getElementById('departure').value,
        adults: document.getElementById('numberofadults').value,
        paymentMethod: document.querySelector('input[name="paymentMethod"]:checked')?.value || "Not Selected",
        specialRequests: document.getElementById('specialRequests').value,
        submittedAt: serverTimestamp() 
    };

    try {
        const docRef = await addDoc(collection(db, "bookings"), bookingData);
        alert("Booking Securely Received! ID: " + docRef.id);
        bookingForm.reset();
    } catch (error) {
        console.error("Firestore Error:", error);
        alert("Submission failed. Check Console (F12) for details.");
    }
});