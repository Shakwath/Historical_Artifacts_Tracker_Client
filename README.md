# 🏛️ Chronicles Registry | Historical Artifacts Tracker

**Chronicles Registry** — An elegant, interactive platform to catalog, archive, and conserve historical treasures. Search the gallery, log new discoveries, upvote submissions, and manage personal collections — all in one secure dashboard. Built for history enthusiasts who want to preserve humanity's shared chronicle.

## Live Link
*   **Frontend (Firebase Hosting):** [https://historical-artifacts-shakwath.web.app](https://historical-artifacts-shakwath.web.app)
*   **Backend API:** Deployed separately (base URL configurable via `.env` / axios client)
*   *Note: Replace the local base URL in `src/api/axiosSecure.js` for production use.*

---

## Technologies Used

| Layer | Technology |
| --- | --- |
| **Frontend** | React 19, Vite 7, JavaScript (JSX) |
| **Styling** | Tailwind CSS v4, DaisyUI v5 (Dev branch) |
| **Animations** | Framer Motion, CSS transitions |
| **Data & API** | Axios (with token request interceptors) |
| **Auth** | Firebase Authentication (email/password, Google) |
| **Backend** | Node.js / Express REST API (separate repo) |
| **Hosting** | Firebase Hosting (client) |
| **Notifications** | React Hot Toast, SweetAlert2 |

---

## Dependencies

### Key dependencies (package.json):
```json
{
  "axios": "^1.20.0",
  "firebase": "^12.3.0",
  "framer-motion": "^13.1.1",
  "localforage": "^1.10.0",
  "match-sorter": "^8.1.0",
  "react": "^19.1.1",
  "react-dom": "^19.1.1",
  "react-hot-toast": "^2.6.0",
  "react-icons": "^5.5.0",
  "react-router-dom": "^7.9.3",
  "sort-by": "^1.2.0",
  "sweetalert2": "^11.26.25"
}
```

### Dev dependencies:
Vite 7, @vitejs/plugin-react, Tailwind CSS v4, DaisyUI v5, ESLint 9, PostCSS, Autoprefixer.

---

## Folder Structure

```text
Historical_Artifacts_Tracker_Client/
├── public/                 # Static assets (favicons, manifest)
├── src/
│   ├── api/
│   │   └── axiosSecure.js  # Authenticated Axios instance with JWT interceptor
│   ├── Components/
│   │   ├── Authentication/
│   │   │   ├── Login.jsx   # Login page component (Firebase + email/google)
│   │   │   └── Register.jsx # Register page component with avatar validation
│   │   ├── MainLayout/
│   │   │   └── MainLayout.jsx # Core layout wrapper
│   │   ├── Pages/
│   │   │   ├── AddArtifact.jsx      # Add new historical artifact form page
│   │   │   ├── AllArtifacts.jsx     # Browse and search cataloged database
│   │   │   ├── ArtifactDetails.jsx  # Interactive details viewer & like toggle
│   │   │   ├── ErrorPage.jsx        # 404 handler with modern layout
│   │   │   ├── Home.jsx             # Home page (featured artifacts, slider, stats)
│   │   │   ├── LikedArtifacts.jsx   # Personalized liked items dashboard
│   │   │   ├── MyArtifacts.jsx      # User's added entries editor dashboard
│   │   │   ├── MyProfile.jsx        # Profile management page
│   │   │   └── UpdateArtifact.jsx   # Edit artifact page
│   │   ├── Provider/
│   │   │   └── AuthProvider.jsx     # Context provider managing auth state & JWT token
│   │   ├── router/
│   │   │   └── router.jsx  # Router routes configuration & PrivateRoute wrapper
│   │   ├── Banner.jsx      # Carousel image slider
│   │   ├── Footer.jsx      # Bottom footer section
│   │   └── Navbar.jsx      # Navigation bar with user avatar triggers
│   ├── assets/             # Images & local media assets
│   ├── App.css
│   ├── App.jsx             # Top level component
│   ├── index.css           # Tailwind directives & CSS config
│   └── main.jsx            # React root renderer
├── .env                    # Environment keys (ignored)
├── .gitignore              # Files to ignore in git
├── eslint.config.js        # ESLint flat config
├── index.html              # Core HTML structure template
├── package.json            # Scripts & dependencies definition
└── vite.config.js          # Vite config
```

---

## Key Features

*   **⚡ Interactive Featured Catalog:** Display the top 6 highest-voted treasures sorted dynamically by upvote/like count on the homepage.
*   **🔍 Real-time Search Filter:** Instant client-server name-based searching on the gallery repository page.
*   **🛠️ Flexible CRUD System:** Add artifacts with image URL, classification type, historical era, finder info, and location. Edit or delete your entries at any time.
*   **❤️ Secure Upvote System:** Double-toggle prevention ensuring logged-in users only vote once per artifact. Upvote status updates dynamically.
*   **📋 Private Personal Portfolios:**
    *   *My Artifacts Dashboard:* View, edit, or delete items added by you.
    *   *Liked Artifacts Dashboard:* Keep track of historical items you upvoted.
*   **🔒 Firebase Authentication:** Integrated Google Social Auth & email/password registration with interactive field validations.
*   **🔑 JWT Cookie Sessions:** Automatic token request on user state transition, verifying API requests securely.
*   **✨ Modern Animated UI:** Polished glassmorphic card patterns, hover scale-up, and layout transitions via Framer Motion.

---

## Installation & Local Setup

### Prerequisites
*   Node.js ≥ 18 and npm
*   A Firebase project (for Auth/Hosting config)
*   The backend API running locally or deployed

### Steps
1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Shakwath/Historical_Artifacts_Tracker_Client.git
    cd Historical_Artifacts_Tracker_Client
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the project root:
    ```env
    VITE_FIREBASE_API_KEY=your_firebase_api_key
    VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
    VITE_FIREBASE_PROJECT_ID=your_project
    VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
    VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
    VITE_FIREBASE_APP_ID=your_app_id
    ```

4.  **Configure the API base URL:**
    Default setup points to `http://localhost:5000` in `src/api/axiosSecure.js`. Update this if your backend runs on a different port.

5.  **Run the development server:**
    ```bash
    npm run dev
    ```

6.  **Build for production:**
    ```bash
    npm run build
    ```

### Useful scripts
*   `npm run dev` - Start Vite dev server
*   `npm run build` - Build for production
*   `npm run preview` - Preview the production build locally
*   `npm run lint` - Run ESLint checks

---

## Project Highlights

*   **Role & Route Protection:** Route protection with custom authentication loaders and private routes.
*   **Secure API Requests:** Secure API request pipelines with JWT authorization headers.
*   **Fully Responsive:** Layouts adapting dynamically to mobile, tablet, and widescreen.
*   **Interactive UI feedback:** Beautiful toast messages and modal dialogs for high-fidelity interactive feedback.

---

## Future Improvements

*   📍 Integrate Google Maps API to visualize artifact discovery coordinates.
*   📜 Implement interactive timeline visualization spanning centuries.
*   📄 Enable PDF generation of detailed artifact reports.
*   🌐 Add multi-language support (English/Bengali) for local heritage tracking.
*   ☁️ Build image upload option to Firebase Storage instead of external URLs.

---

## Author

**Shakwath Hossain** — Full Stack Developer
*   **GitHub:** [https://github.com/Shakwath](https://github.com/Shakwath)
*   **LinkedIn:** [https://www.linkedin.com/in/shakawath-hossain-3a3561300/](https://www.linkedin.com/in/shakawath-hossain-3a3561300/)

---

## License

This project is intended for educational and portfolio demonstration purposes.
