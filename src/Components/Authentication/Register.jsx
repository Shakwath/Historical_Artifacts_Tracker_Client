import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "../Provider/AuthProvider";
import { FaUser, FaLink, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";

const RegisterAnimation = () => {
  return (
    <div className="w-full h-96 relative flex flex-col justify-center items-center overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-amber-950 border border-slate-800/60 shadow-2xl p-8">
      {/* Background glowing particles/circles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-amber-500/5 blur-3xl animate-pulse"></div>
      
      {/* Rotating concentric rings */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute w-64 h-64 border border-dashed border-amber-500/20 rounded-full flex items-center justify-center"
      />

      {/* Orbiting particles */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute w-44 h-44 rounded-full border border-slate-800/40 flex items-center justify-between"
      >
        <div className="w-3 h-3 bg-amber-500 rounded-full shadow-[0_0_8px_#f59e0b]"></div>
        <div className="w-3 h-3 bg-orange-500 rounded-full shadow-[0_0_8px_#ea580c]"></div>
      </motion.div>

      {/* Main Registration Animation */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        <motion.div 
          className="relative w-32 h-32 flex items-center justify-center cursor-pointer"
          whileHover="hover"
        >
          {/* Main User Card */}
          <motion.div 
            className="w-24 h-24 bg-gradient-to-br from-amber-500/10 to-orange-600/10 rounded-3xl border border-amber-500/30 flex items-center justify-center backdrop-blur-sm relative"
            variants={{
              hover: { scale: 1.05 }
            }}
          >
            {/* User Icon silhouette */}
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="url(#userGradient)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-amber-500"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <defs>
              <linearGradient id="userGradient" x1="4" y1="7" x2="19" y2="21" gradientUnits="userSpaceOnUse">
                <stop stopColor="#f59e0b" />
                <stop offset="1" stopColor="#ea580c" />
              </linearGradient>
            </defs>

            {/* Orbiting "+" sign / new account creation badge */}
            <motion.div
              className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center shadow-lg border border-amber-400/40 text-white font-bold text-xs"
              variants={{
                hover: { rotate: 90, scale: 1.1 }
              }}
            >
              +
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Text */}
        <div className="text-center space-y-1">
          <h3 className="text-amber-500 font-bold uppercase tracking-widest text-xs font-mono">
            New Registry
          </h3>
          <p className="text-slate-400 text-xs font-mono animate-pulse">
            Creating Keeper Profile...
          </p>
        </div>
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