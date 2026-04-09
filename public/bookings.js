import { db } from './firebase-config.js'; // Ensure your config is imported
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const bookingForm = document.getElementById('customBookingForm');

bookingForm.addEventListener('submit', async (e) => {
    e.preventDefault(); 
    // 1. Collect the data from your aligned fields
    const bookingData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('userEmail').value,
        phone: document.getElementById('phonenumber').value,
        address: document.getElementById('address').value,
        postalCode: document.getElementById('postalCode').value,
        departureDate: document.getElementById('departure').value,
        adults: document.getElementById('numberofadults').value,
        paymentMethod: document.querySelector('input[name="paymentMethod"]:checked').value,
        specialRequests: document.getElementById('specialRequests').value,
        // InfoSec Best Practice: Use Server Time, not the user's computer time
        submittedAt: serverTimestamp() 
    };
    try {
        // 2. Push to Firestore
        const docRef = await addDoc(collection(db, "bookings"), bookingData);
        // 3. Success Feedback
        alert("Booking Securely Received! Reference ID: " + docRef.id);
        bookingForm.reset(); // Clear the form
    } catch (error) {
        console.error("Error adding document: ", error);
        alert("Transaction failed. Please check your connection.");
    }
});