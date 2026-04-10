# TravelMate MVP 
**A Secure, Data-Driven Tour Booking Application**

TravelMate is a lightweight web application designed to demonstrate secure cloud integration and responsive UI design. 
Built as a collaborative project,it focuses on the pillars of the CIA Triad.

## The Team
* **Kevin**: System Architect & InfoSec Lead (front-end, Infrastructure, Security, Deployment)
* **Usher Kiiru**: Lead backend Developer (JavaScript Logic, API Integration)

## Tech Stack
- **Frontend:** HTML5, CSS3 (Bootstrap 5), Vanilla JavaScript
- **Backend:** Firebase Firestore (NoSQL), Firebase Hosting
- **Security:** HTTPS/TLS, Input Sanitization, Custom Error Mapping

## Security Features (Audit Log)
- **XSS Prevention:** All dynamic URL parameters are processed via `encodeURIComponent` before being rendered.
- **Clickjacking Protection:** Configured `X-Frame-Options: DENY` in `firebase.json`.
- **Information Disclosure Mitigation:** Custom 404 routing prevents default server signature leakage.
- **Data Integrity:** Implementation of `serverTimestamp()` to prevent client-side time manipulation during booking.
## CI/CD Pipeline
This project utilizes **GitHub Actions** for automated deployment.
- **Trigger:** On push to `main` branch.
- **Process:** Automated build and deploy to Firebase Hosting.
- **Security:** Deployment credentials are managed via encrypted GitHub Secrets.
## How to Run
1. Clone the repo: `git clone [your-repo-link]`
2. Install Firebase CLI: `npm install -g firebase-tools`
3. Login and Deploy: `firebase login` then `firebase deploy`

---
*Developed as a portifolio Project, 2026.*
