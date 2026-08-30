import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";

const Mainlayout = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    let title = "Chronicle - Historical Artifacts Tracker";

    if (path === "/") {
      title = "Home | Chronicle";
    } else if (path === "/allartifacts") {
      title = "All Artifacts | Chronicle";
    } else if (path === "/addartifacts") {
      title = "Add Artifact | Chronicle";
    } else if (path === "/myartifacts") {
      title = "My Artifacts | Chronicle";
    } else if (path === "/liked-artifacts") {
      title = "Liked Artifacts | Chronicle";
    } else if (path.startsWith("/artifacts/")) {
      title = "Artifact Details | Chronicle";
    } else if (path === "/login") {
      title = "Login | Chronicle";
    } else if (path === "/Register") {
      title = "Register | Chronicle";
    } else if (path === "/updateprofile") {
      title = "My Profile | Chronicle";
    } else if (path.startsWith("/update-artifact/")) {
      title = "Update Artifact | Chronicle";
    } else {
      title = "404 Not Found | Chronicle";
    }

    document.title = title;
  }, [location]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300 flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Page content */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Outlet /> {/* Nested routes render here */}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Mainlayout;