# 🏛️ Chronicles Registry | Historical Artifacts Tracker

[![React](https://img.shields.io/badge/React-19-blue.svg?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF.svg?logo=vite)](https://vite.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-06B6D4.svg?logo=tailwindcss)](https://tailwindcss.com/)
[![DaisyUI](https://img.shields.io/badge/DaisyUI-v5-5A0EF8.svg?logo=daisyui)](https://daisyui.com/)
[![Firebase](https://img.shields.io/badge/Firebase-Auth-FFCA28.svg?logo=firebase)](https://firebase.google.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

An elegant, fully-featured web application designed to archive, track, and conserve historical treasures. Users can register to explore humanity's shared chronicles, log new discoveries, upvote/like artifacts, and manage their personal collections through interactive, responsive dashboards.

---

## ✨ Features

*   **🔒 Secure Firebase Authentication**
    *   Social Login (Google Authentication) & Email/Password registrations.
    *   Private routes protecting administrative archives and dashboards.
*   **📂 Historical Classification Registry**
    *   Add new artifacts with rich specifications: Name, Image URL, Type (Tools, Weapons, Documents, Writings), Historical Context, Discovered At (Era), Discovered By, and Present Location.
    *   Dynamic update forms pre-filled with existing data.
    *   Interactive deletions with confirmation prompts and automated page redirects.
*   **❤️ Interactive Social Features**
    *   Real-time upvote/like toggles for individual artifacts.
    *   Personalized **Liked Artifacts** collection tracking.
*   **🔍 Search & Discover Portal**
    *   Server-side search filtering by artifact names.
    *   Time-travel classification explore cards filtering entries by category on click.
*   **📊 Global Registry Insights Dashboard**
    *   Beautiful statistics cards tracking cataloged items, conservation index, continent mappings, and historical depth.
*   **🎨 Premium Dark/Light Responsive UI**
    *   Crafted with **Tailwind CSS v4** and **DaisyUI v5**.
    *   Smooth micro-interactions powered by **Framer Motion**.
    *   Elegant toast alerts (via `react-hot-toast`) and modal alerts (via `sweetalert2`).

---

## 🛠️ Technology Stack

### Frontend Architecture
*   **Core Library:** React 19 (Functional Components, Custom Hooks)
*   **Build Tool:** Vite 7
*   **Routing:** React Router v7
*   **Styling & Components:** Tailwind CSS v4 + DaisyUI v5 (Dev branch)
*   **State & Database Connections:** Axios (HTTP client with interceptor framework)
*   **Animations:** Framer Motion (page transitions, hover movements, and skeleton loaders)
*   **Alerts & Notifications:** SweetAlert2 & React Hot Toast

### Backend (Reference)
*   **Server Engine:** Node.js + Express.js
*   **Database:** MongoDB Atlas (NoSQL)
*   **Security:** JSON Web Tokens (JWT) for secure requests

---

## 🚀 Getting Started

### 📋 Prerequisites
Ensure you have the following installed:
*   [Node.js](https://nodejs.org/) (v18 or higher recommended)
*   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### 🔧 Installation Steps

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/Shakwath/Historical_Artifacts_Tracker_Client.git
    cd Historical_Artifacts_Tracker_Client
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env` file in the root directory and add your Firebase credentials:
    ```env
    VITE_FIREBASE_API_KEY=your_api_key_here
    VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
    VITE_FIREBASE_PROJECT_ID=your_project_id_here
    VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
    VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
    VITE_FIREBASE_APP_ID=your_app_id_here
    VITE_API_URL=your_backend_api_url_here
    ```

4.  **Run Development Server:**
    ```bash
    npm run dev
    ```
    Your application will be live at `http://localhost:5173`.

5.  **Build for Production:**
    ```bash
    npm run build
    ```

---

## 📁 Directory Structure

```text
├── public/                 # Static assets
└── src/
    ├── api/                # Axios instances & API interceptor config
    ├── Components/
    │   ├── Pages/          # Core pages (Home, AllArtifacts, AddArtifact, etc.)
    │   ├── Provider/       # Context Providers (AuthContext)
    │   ├── Banner.jsx      # Home slider component
    │   ├── Navbar.jsx      # Navigation header
    │   └── Footer.jsx      # Premium footer component
    ├── Firebase.init.js    # Firebase credentials setup
    ├── App.jsx             # Main application layout wrapper
    ├── index.css           # Global stylesheet overrides
    └── main.jsx            # Application entrypoint
```

---

## 🛡️ License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🤝 Contact & Contributing

Designed & Developed by **Shakwath**. Feel free to fork, open pull requests, or file issues!
