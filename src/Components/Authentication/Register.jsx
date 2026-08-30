import React, { useState, useContext } from "react";
import Registeri from '../../assets/signup.png';
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import { FaUser, FaLink, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";

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
      {/* Left Side (Image) */}
      <div className="w-full md:w-1/2 flex justify-center items-center group max-w-md md:max-w-none">
        <div className="relative overflow-hidden rounded-3xl bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 shadow-xl transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-2xl">
          <img
            src={Registeri}
            alt="Register Illustration"
            className="w-full h-auto object-cover opacity-90 dark:opacity-85 mix-blend-multiply dark:mix-blend-normal"
          />
        </div>
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