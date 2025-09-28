import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import loginicon from '../assets/loginicon.png';
import userIcon from "../assets/user.png";
import { AuthContext } from './Provider/AuthProvider';
import { FaSun, FaMoon } from 'react-icons/fa';
import '../App.css';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  // Dark/Light mode state
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    // Apply theme to html element
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleLogOut = () => {
    logOut().then(() => {
      alert("You Logged Out successfully");
    });
  };

  return (
    <div className="bg-base-100 dark:bg-gray-900 dark:text-white shadow-sm w-full transition-colors duration-300">
      <div className="navbar px-3 sm:px-4 md:px-8 flex items-center justify-between max-w-7xl mx-auto">
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <Link
            to="/"
            className="btn btn-ghost text-sm sm:text-base md:text-xl flex items-center gap-2">
            <img
              src="https://i.ibb.co.com/k6zpczSK/Custom-Made-Genuine-Vinyl-Stickers-Decals-3-and-5-Tatto-Design-Sticker-Waterproof-Vinyl-Decals-for-M.png"
              alt="logo"
              className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10"
            />
            <span className="hidden sm:inline">Historical_Artifacts</span>
          </Link>
        </div>

        {/* Center: Nav Links (hidden on mobile) */}
        <div className="hidden lg:flex justify-center">
          <ul className="menu menu-horizontal px-1 font-medium text-sm md:text-base">
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/allartifacts">All Artifacts</NavLink></li>
            <li><NavLink to="/addartifacts">Add Artifacts </NavLink></li>
            <li><NavLink to="/myartifacts">My Artifacts </NavLink></li>
            {user && <li><NavLink to="/updateprofile">My Profile</NavLink></li>}
          </ul>
        </div>

        {/* Right: Theme Toggle + User + Auth */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="px-2 sm:px-3 py-2 rounded-xl bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </button>

          {/* User Avatar */}
          <img
            className="w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full object-cover"
            src={user?.photoURL || userIcon}
            alt="User"
          />

          {/* Auth Buttons */}
          {user ? (
            <button
              onClick={handleLogOut}
              className="btn btn-primary text-xs sm:text-sm px-3 sm:px-4 py-1"
            >
              LogOut
            </button>
          ) : (
            <Link
              to="/login"
              className="btn btn-primary flex items-center gap-1 text-xs sm:text-sm px-3 py-1"
            >
              <img
                src={loginicon}
                alt="login"
                className="w-3 h-3 sm:w-4 sm:h-4"
              />
              <span>Login</span>
            </Link>
          )}

          {/* Mobile Dropdown */}
          <div className="dropdown dropdown-end lg:hidden">
            <button tabIndex={0} className="btn btn-ghost btn-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 dark:bg-gray-800 rounded-box w-48 sm:w-56 font-medium text-sm"
            >
               <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/allartifacts">All Artifacts</NavLink></li>
              <li><NavLink to="/addartifacts">Add Artifacts </NavLink></li>
              <li><NavLink to="/myartifacts">My Artifacts </NavLink></li>
              {user && <li><NavLink to="/updateprofile">My Profile</NavLink></li>}
              {!user && <li><NavLink to="/login">Login</NavLink></li>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;