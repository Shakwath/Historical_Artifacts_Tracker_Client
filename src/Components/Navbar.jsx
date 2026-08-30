import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import loginicon from '../assets/loginicon.png';
import userIcon from "../assets/user.png";
import { AuthContext } from './Provider/AuthProvider';
import { FaSun, FaMoon, FaUser, FaPlus, FaSignOutAlt, FaFolderOpen, FaHome, FaCompass, FaHeart } from 'react-icons/fa';
import '../App.css';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  // Dark/Light mode state
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    // Apply theme to html element and DaisyUI data-theme
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.setAttribute("data-theme", "light");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleLogOut = () => {
    logOut().then(() => {
      alert("You Logged Out successfully");
    }).catch(err => {
      console.error("Logout failed:", err);
    });
  };

  const linkClass = ({ isActive }) =>
    `relative px-3.5 py-2 rounded-xl font-medium text-sm transition-all duration-300 flex items-center gap-1.5 ${
      isActive
        ? "text-amber-600 dark:text-amber-400 bg-amber-500/10 dark:bg-amber-400/10 font-semibold"
        : "text-slate-600 dark:text-slate-300 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-900"
    }`;

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300 border-b backdrop-blur-md bg-white/80 dark:bg-slate-950/80 border-slate-200/50 dark:border-slate-800/50 shadow-sm">
      <div className="navbar max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        
        {/* Left: Logo & Branding */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2.5 group transition-transform duration-300 hover:scale-102">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center p-1.5 shadow-md shadow-amber-500/20 group-hover:rotate-6 transition-all duration-300">
              <img
                src="https://i.ibb.co.com/k6zpczSK/Custom-Made-Genuine-Vinyl-Stickers-Decals-3-and-5-Tatto-Design-Sticker-Waterproof-Vinyl-Decals-for-M.png"
                alt="logo"
                className="w-full h-full object-contain filter invert dark:invert-0 brightness-110"
              />
            </div>
            <span className="font-extrabold text-lg sm:text-xl tracking-tight bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 bg-clip-text text-transparent group-hover:brightness-110 transition-all duration-300">
              Chronicle
            </span>
          </Link>
        </div>

        {/* Center: Navigation Links (hidden on mobile) */}
        <div className="hidden lg:flex items-center justify-center">
          <nav className="flex items-center gap-1">
            <NavLink to="/" className={linkClass}>
              <FaHome className="text-xs" /> Home
            </NavLink>
            <NavLink to="/allartifacts" className={linkClass}>
              <FaCompass className="text-xs" /> All Artifacts
            </NavLink>
            {user && (
              <>
                <NavLink to="/addartifacts" className={linkClass}>
                  <FaPlus className="text-xs" /> Add Artifact
                </NavLink>
                <NavLink to="/myartifacts" className={linkClass}>
                  <FaFolderOpen className="text-xs" /> My Artifacts
                </NavLink>
              </>
            )}
          </nav>
        </div>

        {/* Right: Theme Toggle + User Avatar Dropdown */}
        <div className="flex items-center gap-2 sm:gap-4">
          
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 sm:p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-800/60 bg-slate-100/50 dark:bg-slate-900/50 text-slate-700 dark:text-slate-200 hover:text-amber-500 dark:hover:text-amber-400 hover:scale-105 active:scale-95 transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
          >
            <div className="relative w-5 h-5 flex items-center justify-center overflow-hidden">
              {theme === "dark" ? (
                <FaSun className="w-5 h-5 text-amber-400 animate-[spin_8s_linear_infinite]" />
              ) : (
                <FaMoon className="w-5 h-5 text-indigo-500 animate-pulse" />
              )}
            </div>
          </button>

          {/* User Profile / Auth Area */}
          {user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar ring-2 ring-amber-500/20 hover:ring-amber-500 transition-all duration-300 cursor-pointer">
                <div className="w-9 sm:w-10 rounded-full">
                  <img src={user?.photoURL || userIcon} alt={user?.displayName || "User avatar"} title={user?.displayName || "User"} />
                </div>
              </label>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[50] p-2 shadow-2xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl w-64 transition-all duration-300">
                <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800/80 mb-2">
                  <p className="font-semibold text-slate-800 dark:text-slate-100 text-sm truncate">{user?.displayName || "Artifact Keeper"}</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500 truncate">{user?.email}</p>
                </div>
                <li>
                  <Link to="/updateprofile" className="flex items-center gap-2.5 py-2 px-3 hover:bg-slate-100 dark:hover:bg-slate-800/60 rounded-xl text-slate-700 dark:text-slate-300 transition-all duration-200">
                    <FaUser className="text-amber-500 text-sm" />
                    <span>My Profile</span>
                  </Link>
                </li>
                <li>
                  <Link to="/myartifacts" className="flex items-center gap-2.5 py-2 px-3 hover:bg-slate-100 dark:hover:bg-slate-800/60 rounded-xl text-slate-700 dark:text-slate-300 transition-all duration-200">
                    <FaFolderOpen className="text-amber-500 text-sm" />
                    <span>My Artifacts</span>
                  </Link>
                </li>
                <li>
                  <Link to="/liked-artifacts" className="flex items-center gap-2.5 py-2 px-3 hover:bg-slate-100 dark:hover:bg-slate-800/60 rounded-xl text-slate-700 dark:text-slate-300 transition-all duration-200">
                    <FaHeart className="text-amber-500 text-sm" />
                    <span>Liked Artifacts</span>
                  </Link>
                </li>
                <li>
                  <Link to="/addartifacts" className="flex items-center gap-2.5 py-2 px-3 hover:bg-slate-100 dark:hover:bg-slate-800/60 rounded-xl text-slate-700 dark:text-slate-300 transition-all duration-200">
                    <FaPlus className="text-amber-500 text-sm" />
                    <span>Add Artifact</span>
                  </Link>
                </li>
                <div className="border-t border-slate-100 dark:border-slate-800/80 mt-2 pt-2">
                  <button onClick={handleLogOut} className="w-full flex items-center gap-2.5 py-2 px-3 hover:bg-red-50 dark:hover:bg-red-950/20 text-red-600 dark:text-red-400 rounded-xl transition-all duration-200 font-medium cursor-pointer">
                    <FaSignOutAlt className="text-sm" />
                    <span>Log Out</span>
                  </button>
                </div>
              </ul>
            </div>
          ) : (
            <Link
              to="/login"
              className="btn border-none bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-md shadow-amber-500/20 rounded-xl px-4 sm:px-5 h-9 sm:h-10 min-h-[36px] sm:min-h-[40px] text-xs sm:text-sm font-semibold transition-all duration-300 hover:scale-102 flex items-center gap-1.5"
            >
              <img src={loginicon} alt="login" className="w-3.5 h-3.5 brightness-200" />
              <span>Login</span>
            </Link>
          )}

          {/* Mobile Menu Dropdown (Hamburger button) */}
          <div className="dropdown dropdown-end lg:hidden">
            <button tabIndex={0} className="btn btn-ghost btn-circle text-slate-700 dark:text-slate-200" aria-label="Open menu">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[50] p-3 shadow-2xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl w-56 gap-1">
              <li><NavLink to="/" className={linkClass}><FaHome className="text-sm" /> Home</NavLink></li>
              <li><NavLink to="/allartifacts" className={linkClass}><FaCompass className="text-sm" /> All Artifacts</NavLink></li>
              {user ? (
                <>
                  <li><NavLink to="/addartifacts" className={linkClass}><FaPlus className="text-sm" /> Add Artifact</NavLink></li>
                  <li><NavLink to="/myartifacts" className={linkClass}><FaFolderOpen className="text-sm" /> My Artifacts</NavLink></li>
                  <li><NavLink to="/liked-artifacts" className={linkClass}><FaHeart className="text-sm" /> Liked Artifacts</NavLink></li>
                  <li><NavLink to="/updateprofile" className={linkClass}><FaUser className="text-sm" /> My Profile</NavLink></li>
                </>
              ) : (
                <li><NavLink to="/login" className={linkClass}><img src={loginicon} alt="login" className="w-4 h-4 dark:brightness-100" /> Login</NavLink></li>
              )}
            </ul>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Navbar;