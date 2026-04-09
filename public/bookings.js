// 1. Imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// 2. Firebase Config
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
const urlParams = new URLSearchParams(window.location.search);
const tourName = urlParams.get('tour');

// Simple validation logic
const validTours = ["Dubai safari", "Maldive", "thailand tour", "South Africa"]; 

if (tourName && !validTours.includes(tourName)) {
    console.error("Invalid tour detected!");
    window.location.href = "404.html"; 
}
// 4. Form Logic
const bookingForm = document.getElementById('customBookingForm');

bookingForm.addEventListener('submit', async (e) => {
    e.preventDefault(); 
    
    const bookingData = {
        firstName: document.getElementById('firstName').value.trim(),
        lastName: document.getElementById('lastName').value.trim(),
        email: document.getElementById('userEmail').value.trim(),
        phone: document.getElementById('phonenumber').value.trim(),
        address: document.getElementById('address').value.trim(),
        postalCode: document.getElementById('postalCode').value.trim(),
        departureDate: document.getElementById('departure').value,
        adults: document.getElementById('numberofadults').value,
        paymentMethod: document.querySelector('input[name="paymentMethod"]:checked')?.value || "Not Selected",
        specialRequests: document.getElementById('specialRequests').value.trim(),
        submittedAt: serverTimestamp() 
    };

    try {
        const docRef = await addDoc(collection(db, "bookings"), bookingData);
       window.location.href = "success.html";
    } catch (error) {
        console.error("Firestore Error:", error);
        alert("Submission failed. Check Console (F12) for details.");
    }
});