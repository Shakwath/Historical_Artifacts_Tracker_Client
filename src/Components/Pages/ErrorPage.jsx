import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaCompass, FaHistory } from "react-icons/fa";

const ErrorPage = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300 px-6 relative overflow-hidden">
      
      {/* Ambient Radial Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.08)_0%,transparent_60%)] pointer-events-none" />
      
      {/* Decorative time graphics in background */}
      <div className="absolute opacity-[0.02] dark:opacity-[0.03] pointer-events-none scale-150 transform rotate-12">
        <FaHistory size={400} />
      </div>

      <div className="max-w-md w-full text-center relative z-10 flex flex-col items-center">
        {/* Large Glowing 404 Text */}
        <h1 className="text-8xl sm:text-9xl font-black tracking-widest bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 bg-clip-text text-transparent select-none animate-pulse">
          404
        </h1>

        {/* Theme Themed Badges */}
        <span className="mt-4 inline-block px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-500 bg-amber-500/10 border border-amber-500/20 rounded-full">
          Chronicle Not Found
        </span>

        {/* Themed Heading */}
        <h2 className="mt-6 text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Lost in the Corridors of Time
        </h2>

        {/* Description */}
        <p className="mt-3 text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed font-light">
          The page you are looking for has been buried in the sands of time or was never recorded in our chronicle registries.
        </p>

        {/* Action Controls */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3.5 w-full justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold text-sm transition-all duration-300 hover:scale-105 active:scale-98 shadow-lg shadow-amber-500/10 hover:shadow-amber-500/25 cursor-pointer"
          >
            <FaHome />
            <span>Go Back Home</span>
          </Link>
          
          <Link
            to="/allartifacts"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-sm transition-all duration-300 hover:scale-105 active:scale-98 shadow-sm cursor-pointer"
          >
            <FaCompass />
            <span>Browse Artifacts</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;