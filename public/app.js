// 1. Import tools (Firebase v10.8.0)
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
                            <h5 class="card-title">${tour.title || 'Adventure Tour'}</h5>
                            <p class="card-text text-muted small">${tour.description || 'Discover amazing places.'}</p>
                            <div class="row align-items-center">
                                <div class="col-6">
                                    <h4 class="mb-0">$${tour.price || '0.00'}</h4>
                                </div>
                                <div class="col-6 text-end">
                                  <a href="booking.html?tour=${encodeURIComponent(tour.title || 'Adventure')}" class="btn btn-primary btn-sm">Book Now</a>          
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
        });
    } catch (error) {
        console.error("Firebase Error:", error);
        if (tourRow) tourRow.innerHTML = `<p class="text-danger text-center">Failed to load data.</p>`;
    }
}

// 5. Execution
document.addEventListener('DOMContentLoaded', () => {
    loadTours();

    // Custom logic for the search button inside the sidebar
    const initCustomActions = () => {
        const searchToursBtn = document.getElementById('searchToursBtn'); 
        const offcanvasEl = document.getElementById('filterSidebar');

        if (searchToursBtn && offcanvasEl) {
            searchToursBtn.addEventListener('click', () => {
                // Manually hide because we want to trigger a scroll AFTER hide
                const bs = window.bootstrap;
                if (bs) {
                    const bsOffcanvas = bs.Offcanvas.getInstance(offcanvasEl) || new bs.Offcanvas(offcanvasEl);
                    bsOffcanvas.hide();
                    
                    setTimeout(() => {
                        document.getElementById('Bookings')?.scrollIntoView({ behavior: 'smooth' });
                    }, 400);
                }
            });
        }
    };

    initCustomActions();
});