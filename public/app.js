// 1. Import tools (Must be at the top)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// 2. Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDsq5O2YF4THk92MkGDWu4FAht1E7fcTRw",
    authDomain: "travelmate-pro.firebaseapp.com",
    projectId: "travelmate-pro-46da5",
    storageBucket: "travelmate-pro-46da5.firebasestorage.app",
    messagingSenderId: "223616710108",
    appId: "1:223616710108:web:3ae3afa6ac560689638b19"
};

// 3. Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 4. Load Function
async function loadTours() {
    const tourRow = document.getElementById('tour-row');
    if (!tourRow) return;

    try {
        const querySnapshot = await getDocs(collection(db, "tour"));
        tourRow.innerHTML = "";

        querySnapshot.forEach((doc) => {
            const tour = doc.data();
            tourRow.innerHTML += `
                <div class="col-sm-12 col-md-6 col-lg-3">
                    <div class="card h-100 shadow-sm border-0">
                        <img src="${tour.imageUrl || tour.imageurl}" class="card-img-top" alt="${tour.title}" style="height: 200px; object-fit: cover;">
                        <div class="card-body">
                            <h5 class="card-title">${tour.title || 'Dubai Safari'}</h5>
                            <p class="card-text text-muted small">${tour.description || 'Enjoy luxury shopping and desert safaris.'}</p>
                            <div class="row align-items-center">
                                <div class="col-6">
                                    <h4 class="mb-0">$${tour.price || '0.00'}</h4>
                                </div>
                                <div class="col-6 text-end">
                                  <a href="booking.html?tour=${encodeURIComponent(tour.title || 'Dubai Safari')}" class="btn btn-primary btn-sm">Book Now</a>          
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
        });
    } catch (error) {
        console.error("Firebase Error:", error);
        tourRow.innerHTML = `<p class="text-danger text-center">Failed to load data. Please check your Firestore collection name.</p>`;
    }
}

// 5. Execution & Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Run the tour loader
    loadTours();

    // Search Tours Button Handler
    const searchBtn = document.getElementById('searchToursBtn');
    if (searchBtn) {
        searchBtn.addEventListener('click', function () {
            // Accessing bootstrap via window to ensure compatibility with modules
            const offcanvasElement = document.querySelector('.offcanvas');
            const bsOffcanvas = window.bootstrap.Offcanvas.getInstance(offcanvasElement);

            if (bsOffcanvas) {
                bsOffcanvas.hide();
            }

            setTimeout(() => {
                const bookingsSection = document.getElementById('Bookings');
                if (bookingsSection) {
                    bookingsSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }, 400);
        });
    }
});