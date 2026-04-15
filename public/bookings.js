// 1. Imports & 2. Firebase Config (Keep as you have them)// 1. Imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// 2. Firebase Config

export const firebaseConfig = {
    apiKey: "AIzaSyDsq5O2YF4THk92MkGDWu4FAht1E7fcTRw",
    authDomain: "travelmate-pro-46da5.firebaseapp.com",
    projectId: "travelmate-pro-46da5",
    storageBucket: "travelmate-pro-46da5.firebasestorage.app",
    messagingSenderId: "223616710108",
    appId: "1:223616710108:web:3ae3afa6ac560689638b19"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 3. Tour Validation Logic
const urlParams = new URLSearchParams(window.location.search);
const tourName = urlParams.get('tour');
const validTours = ["Dubai safari", "Maldive", "thailand tour", "South Africa"];

if (tourName && !validTours.includes(tourName)) {
    console.error("Access Denied: Invalid tour parameter.");
    window.location.href = "index.html";
}

// 4. Form Logic
const bookingForm = document.getElementById('customBookingForm');

bookingForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // --- STEP 1: COLLECT DATA ---
    const bookingData = {
        firstName: document.getElementById('firstName').value.trim(),
        lastName: document.getElementById('lastName').value.trim(),
        email: document.getElementById('userEmail').value.trim(),
        phone: document.getElementById('phonenumber').value.trim(),
        address: document.getElementById('address').value.trim(),
        postalCode: document.getElementById('postalCode').value.trim(),
        departureDate: document.getElementById('departure').value,
        adults: document.getElementById('numberofadults').value,
        paymentMethod: document.querySelector('input[name="paymentMethod"]:checked')?.value,
        specialRequests: document.getElementById('specialRequests').value.trim(),
        tour: tourName,
        submittedAt: serverTimestamp()
    };


    // List only the absolutely essential fields for a valid booking
    const required = ['firstName', 'lastName', 'email', 'phone', 'departureDate', 'paymentMethod'];
    let errors = [];

    required.forEach(field => {
        if (!bookingData[field] || bookingData[field] === "" || bookingData[field] === "Not Selected") {
            errors.push(field);
        }
    });

    if (errors.length > 0) {
        alert("Security Alert: Form submission blocked. Required data missing: " + errors.join(", "));
        return; // Kills the process before it touches Firebase
    }


    // Clean all string inputs to prevent malicious code execution
    for (let key in bookingData) {
        if (typeof bookingData[key] === 'string' && key !== 'submittedAt') {
            bookingData[key] = bookingData[key].replace(/</g, "&lt;").replace(/>/g, "&gt;");
        }
    }
    // A simple loop to clean the entire object at once
    for (let key in bookingData) {
        if (typeof bookingData[key] === 'string') {
            bookingData[key] = bookingData[key].trim();
        }
    }
    // STEP 4: SECURE WRITE TO FIREBASE
    try {
        const docRef = await addDoc(collection(db, "bookings"), bookingData);
        console.log("Transaction Secure. ID:", docRef.id);

        sessionStorage.setItem('validBookingId', docRef.id);
        window.location.href = "success.html";

    } catch (error) {
        console.error("Critical System Error:", error);
        alert("System Busy: Error Code FB-ERR-01");
    }
});