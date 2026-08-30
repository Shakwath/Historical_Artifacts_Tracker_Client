import React, { useState, useContext, useRef } from "react";
import google from "../../assets/Google.png";
import github from "../../assets/github.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "../../Components/Provider/AuthProvider";
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import auth from "../../Firebase.init";
import toast from "react-hot-toast";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

const LoginAnimation = () => {
  return (
    <div className="w-full h-96 relative flex flex-col justify-center items-center overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-amber-950 border border-slate-800/60 shadow-2xl p-8">
      {/* Background glowing particles/circles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-amber-500/10 blur-3xl animate-pulse"></div>
      
      {/* Rotating concentric rings */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute w-64 h-64 border border-dashed border-amber-500/20 rounded-full flex items-center justify-center"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute w-52 h-52 border border-dashed border-orange-500/30 rounded-full flex items-center justify-center"
      />

      {/* Main Lock Animation */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        <motion.div 
          className="relative w-32 h-32 flex items-center justify-center cursor-pointer"
          whileHover="hover"
        >
          {/* Padlock Body */}
          <motion.div 
            className="absolute bottom-2 w-20 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl shadow-lg border border-amber-400/30 flex items-center justify-center"
            variants={{
              hover: { scale: 1.05 }
            }}
          >
            {/* Keyhole */}
            <div className="w-4 h-6 bg-slate-950 rounded-full relative flex flex-col items-center justify-start pt-1.5 shadow-inner">
              <div className="w-1.5 h-1.5 bg-amber-400/40 rounded-full"></div>
              <div className="w-1 h-3 bg-amber-400/40 rounded-sm mt-0.5"></div>
            </div>
          </motion.div>
          
          {/* Padlock Shackle */}
          <motion.svg
            width="56"
            height="64"
            viewBox="0 0 56 64"
            fill="none"
            className="absolute -top-1 left-[38px] z-[-1]"
            variants={{
              initial: { y: 0 },
              hover: { y: -10, transition: { duration: 0.3 } }
            }}
            initial="initial"
          >
            <path
              d="M8 32V20C8 10.0589 16.9543 1.1 28 1.1C39.0457 1.1 48 10.0589 48 20V32"
              stroke="url(#shackleGradient)"
              strokeWidth="7"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="shackleGradient" x1="8" y1="1.1" x2="48" y2="32" gradientUnits="userSpaceOnUse">
                <stop stopColor="#f59e0b" />
                <stop offset="1" stopColor="#ea580c" />
              </linearGradient>
            </defs>
          </motion.svg>
        </motion.div>

        {/* Text */}
        <div className="text-center space-y-1">
          <h3 className="text-amber-500 font-bold uppercase tracking-widest text-xs font-mono">
            Secure Portal
          </h3>
          <p className="text-slate-400 text-xs font-mono animate-pulse">
            Unlocking Registry Access...
          </p>
        </div>
      </div>
    </div>
  );
};


const Login = () => {
  const [error, setError] = useState("");
  const { signIn, loading } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const emailRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const goToForget = () => {
    const email = emailRef.current?.value;
    navigate("/forgetpassword", { state: { email } });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then((result) => {
        navigate(location.state?.from?.pathname || "/");
        toast.success("Login successful!");
      })
      .catch((error) => {
        const errorMessage = error.message || "Login failed";

        if (errorMessage.includes("auth/wrong-password")) {
          toast.error("Incorrect password. Try again or use 'Forgot password'.");
        } else if (errorMessage.includes("auth/user-not-found")) {
          toast.error("No user found with this email.");
        } else {
          toast.error(errorMessage);
        }
        setError(errorMessage);
      });
  };

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        setUser(result.user);
        toast.success("Logged in with Google!");
        navigate(location.state?.from?.pathname || "/");
      })
      .catch((error) => {
        setUser(null);
        setError(error.message);
        toast.error(error.message);
      });
  };

  const handleGithubSignIn = () => {
    signInWithPopup(auth, githubProvider)
      .then((result) => {
        setUser(result.user);
        toast.success("Logged in with GitHub!");
        navigate(location.state?.from?.pathname || "/");
      })
      .catch((error) => {
        setError(error.message);
        toast.error(error.message);
      });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-16 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 min-h-[calc(100vh-250px)]">
      {/* Left: Interactive Authentication Animation */}
      <div className="w-full md:w-1/2 flex justify-center items-center group max-w-md md:max-w-none">
        <LoginAnimation />
      </div>

      {/* Right: Form Container */}
      <div className="w-full md:w-1/2 flex flex-col items-center max-w-md">
        <div className="w-full bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 shadow-xl rounded-3xl p-6 sm:p-8 flex flex-col">
          <div className="mb-6 text-center">
            <h2 className="font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white tracking-tight">
              Welcome Back
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              Sign in to your <span className="text-amber-500 font-semibold">Chronicle</span> account
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email Address */}
            <div className="space-y-1.5">
              <label className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 block">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400 dark:text-slate-500">
                  <FaEnvelope />
                </span>
                <input
                  name="email"
                  type="email"
                  ref={emailRef}
                  className="w-full pl-10 pr-4 py-2.5 sm:py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all duration-300"
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 block">
                  Password
                </label>
                <button
                  type="button"
                  onClick={goToForget}
                  className="text-xs text-amber-500 dark:text-amber-400 hover:text-amber-600 dark:hover:text-amber-300 hover:underline font-medium"
                >
                  Forgot password?
                </button>
              </div>
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
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 text-xs sm:text-sm text-red-600 dark:text-red-400">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold text-sm transition-all duration-300 hover:scale-[1.01] active:scale-98 shadow-md shadow-amber-500/10 cursor-pointer disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>

            <p className="text-center text-sm text-slate-600 dark:text-slate-400 pt-2">
              Don’t have an account?{" "}
              <Link className="text-amber-500 dark:text-amber-400 hover:underline font-semibold" to="/Register">
                Create Account
              </Link>
            </p>
          </form>

          {/* Social Separator */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-slate-900 px-3 text-slate-500 dark:text-slate-400">Or continue with</span>
            </div>
          </div>

          {/* Social Buttons */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-800/80 hover:border-amber-500 dark:hover:border-amber-500 hover:scale-[1.02] active:scale-98 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
            >
              <img src={google} alt="Google" className="h-5 w-5" />
              <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200">Google</span>
            </button>
            <button
              type="button"
              onClick={handleGithubSignIn}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-800/80 hover:border-amber-500 dark:hover:border-amber-500 hover:scale-[1.02] active:scale-98 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
            >
              <img src={github} alt="GitHub" className="h-5 w-5" />
              <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200">GitHub</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;