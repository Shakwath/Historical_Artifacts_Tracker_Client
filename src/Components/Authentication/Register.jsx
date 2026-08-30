import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "../Provider/AuthProvider";
import { FaUser, FaLink, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";

const RegisterAnimation = () => {
  return (
    <div className="w-full h-96 relative flex flex-col justify-center items-center overflow-hidden rounded-3xl bg-slate-950 border border-slate-800/80 shadow-2xl p-8 font-mono">
      {/* Background Golden Light/Portal (Revealed on hover) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 blur-3xl opacity-10 pointer-events-none"></div>
      
      {/* Glowing center portal light */}
      <motion.div 
        className="absolute w-40 h-40 rounded-full bg-amber-500/20 shadow-[0_0_50px_#f59e0b,0_0_80px_#ea580c] z-0"
        initial={{ scale: 0.8, opacity: 0 }}
        variants={{
          hover: { scale: 1.1, opacity: 1, transition: { duration: 0.5 } }
        }}
      />

      <div className="absolute inset-x-8 top-10 bottom-24 flex items-center justify-center z-10">
        {/* Stone Gate Frame */}
        <motion.div 
          className="relative w-72 h-60 border-4 border-slate-850 bg-slate-900/10 rounded-2xl flex overflow-hidden shadow-inner group transition-colors duration-500 cursor-pointer"
          whileHover="hover"
        >
          {/* Left Door Panel */}
          <motion.div
            variants={{
              initial: { x: 0 },
              hover: { x: "-95%", transition: { duration: 0.6, ease: "easeInOut" } }
            }}
            initial="initial"
            className="w-1/2 h-full bg-slate-800 border-r border-slate-950 shadow-lg flex flex-col items-end justify-center pr-2 relative z-10"
          >
            {/* Door handle left half */}
            <div className="w-8 h-16 border-2 border-amber-500/40 rounded-l-full bg-slate-900 flex items-center justify-end pr-1.5 shadow-[inset_-2px_0_5px_rgba(0,0,0,0.5)]">
              <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
            </div>
            {/* Ancient patterns on stone */}
            <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-slate-700"></div>
            <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-slate-700"></div>
          </motion.div>

          {/* Right Door Panel */}
          <motion.div
            variants={{
              initial: { x: 0 },
              hover: { x: "95%", transition: { duration: 0.6, ease: "easeInOut" } }
            }}
            initial="initial"
            className="w-1/2 h-full bg-slate-800 border-l border-slate-950 shadow-lg flex flex-col items-start justify-center pl-2 relative z-10"
          >
            {/* Door handle right half */}
            <div className="w-8 h-16 border-2 border-amber-500/40 rounded-r-full bg-slate-900 flex items-center justify-start pl-1.5 shadow-[inset_2px_0_5px_rgba(0,0,0,0.5)]">
              <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
            </div>
            {/* Ancient patterns on stone */}
            <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-slate-700"></div>
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-slate-700"></div>
          </motion.div>

          {/* Golden Keeper Symbol inside (visible when doors open) */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none"
            initial={{ scale: 0.5, opacity: 0 }}
            variants={{
              hover: { scale: 1, opacity: 1, transition: { delay: 0.2, duration: 0.4 } }
            }}
          >
            <svg
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="filter drop-shadow-[0_0_8px_#f59e0b]"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3z" />
            </svg>
          </motion.div>
        </motion.div>
      </div>

      {/* Text */}
      <div className="absolute bottom-6 text-center space-y-1">
        <h3 className="text-amber-500 font-bold uppercase tracking-widest text-xs">
          ARCHIVE CHAMBER
        </h3>
        <p className="text-slate-400 text-[10px] animate-pulse">
          HOVER GATE TO UNLOCK DISCOVERIES...
        </p>
      </div>
    </div>
  );
};


const Register = () => {
  const { createUser, setUser, updateUser } = useContext(AuthContext);
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validatePassword = (password) => {
    if (password.length < 6) {
      return "Password must be at least 6 characters.";
    }
    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter.";
    }
    if (!/[a-z]/.test(password)) {
      return "Password must contain at least one lowercase letter.";
    }
    return "";
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const photo = form.photo.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;

    // Name validation
    if (name.length < 5) {
      setNameError("Name should be more than 5 characters.");
      toast.error("Name should be more than 5 characters.");
      return;
    } else {
      setNameError("");
    }

    // Password validation
    const pwdError = validatePassword(password);
    if (pwdError) {
      setPasswordError(pwdError);
      toast.error(pwdError);
      return;
    } else {
      setPasswordError("");
    }

    // Create user
    createUser(email, password)
      .then((result) => {
        const user = result.user;
        // Update profile
        updateUser({ displayName: name, photoURL: photo })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL: photo });
            toast.success("Account created successfully!");
            navigate("/");
          })
          .catch(() => {
            // Even if updateProfile fails, navigate
            setUser(user);
            toast.success("Account created successfully!");
            navigate("/");
          });
      })
      .catch((error) => {
        toast.error(error.message || "Registration failed");
      });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-16 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 min-h-[calc(100vh-250px)]">
      {/* Left Side: Interactive Registration Animation */}
      <div className="w-full md:w-1/2 flex justify-center items-center group max-w-md md:max-w-none">
        <RegisterAnimation />
      </div>

      {/* Right Form */}
      <div className="w-full md:w-1/2 flex flex-col items-center max-w-md">
        <div className="w-full bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 shadow-xl rounded-3xl p-6 sm:p-8 flex flex-col">
          <div className="mb-6 text-center">
            <h2 className="font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white tracking-tight">
              Create Account
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              Join <span className="text-amber-500 font-semibold">Chronicle</span> to track historical artifacts
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            {/* Name */}
            <div className="space-y-1.5">
              <label className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 block">Name</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400 dark:text-slate-500">
                  <FaUser />
                </span>
                <input
                  name="name"
                  type="text"
                  className="w-full pl-10 pr-4 py-2.5 sm:py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all duration-300"
                  placeholder="Your Name"
                  required
                />
              </div>
              {nameError && (
                <p className="text-xs text-red-500 dark:text-red-400 mt-1">{nameError}</p>
              )}
            </div>

            {/* Photo URL */}
            <div className="space-y-1.5">
              <label className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 block">Photo URL</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400 dark:text-slate-500">
                  <FaLink />
                </span>
                <input
                  name="photo"
                  type="url"
                  className="w-full pl-10 pr-4 py-2.5 sm:py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all duration-300"
                  placeholder="https://example.com/photo.jpg"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 block">Email</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400 dark:text-slate-500">
                  <FaEnvelope />
                </span>
                <input
                  name="email"
                  type="email"
                  className="w-full pl-10 pr-4 py-2.5 sm:py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all duration-300"
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 block">Password</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400 dark:text-slate-500">
                  <FaLock />
                </span>
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-10 pr-11 py-2.5 sm:py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all duration-300"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {passwordError && (
                <p className="text-xs text-red-500 dark:text-red-400 mt-1">{passwordError}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full mt-3 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold text-sm transition-all duration-300 hover:scale-[1.01] active:scale-98 shadow-md shadow-amber-500/10 cursor-pointer"
            >
              Create Account
            </button>

            <p className="text-center text-sm text-slate-600 dark:text-slate-400 pt-2 font-medium">
              Already have an account?{" "}
              <Link className="text-amber-500 dark:text-amber-400 hover:underline font-semibold" to="/login">
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;