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
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="w-full h-96 relative flex flex-col justify-center items-center overflow-hidden rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 shadow-2xl p-8 font-mono transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* HUD Crosshairs in corners */}
      <div className="absolute top-6 left-6 w-4 h-4 border-t-2 border-l-2 border-slate-300 dark:border-slate-700"></div>
      <div className="absolute top-6 right-6 w-4 h-4 border-t-2 border-r-2 border-slate-300 dark:border-slate-700"></div>
      <div className="absolute bottom-6 left-6 w-4 h-4 border-b-2 border-l-2 border-slate-300 dark:border-slate-700"></div>
      <div className="absolute bottom-6 right-6 w-4 h-4 border-b-2 border-r-2 border-slate-300 dark:border-slate-700"></div>

      {/* Monitor Grid Lines Backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(245,158,11,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(245,158,11,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(245,158,11,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(245,158,11,0.05)_1px,transparent_1px)] bg-[size:24px_24px] opacity-30 z-0"></div>
      
      {/* Blinking REC indicator */}
      <div className="absolute top-4 right-8 flex items-center gap-1.5 bg-red-500/10 dark:bg-red-950/40 border border-red-500/30 px-2.5 py-1 rounded-md text-[10px] text-red-600 dark:text-red-500 font-bold tracking-wider z-20">
        <span className="w-2 h-2 bg-red-600 rounded-full animate-ping"></span>
        <span className="w-2 h-2 bg-red-600 rounded-full absolute"></span>
        LIVE FEED
      </div>

      {/* Tech info overlay */}
      <div className="absolute top-4 left-8 text-[9px] text-slate-400 dark:text-slate-500 flex items-center gap-3 select-none">
        <div>FPS: 60</div>
        <div>SYS: ONLINE</div>
      </div>
      
      {/* Camera feed coordinates overlay */}
      <div className="absolute bottom-4 left-8 text-[9px] text-slate-400 dark:text-slate-500 flex flex-col gap-0.5 select-none text-left z-20">
        <div>LOC: CHRONICLE_SEC_01</div>
        <div>METHOD: FACE_SCAN_v2.4</div>
      </div>

      {/* Sweeping Green Laser Scanner Line */}
      <motion.div
        animate={{ y: [-130, 130, -130] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-full h-0.5 bg-green-500 z-10 shadow-[0_0_12px_#22c55e,0_0_20px_#22c55e]"
      />

      {/* Green glow sweep overlay */}
      <motion.div
        animate={{ y: [-130, 130, -130] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-full h-24 bg-gradient-to-b from-green-500/0 via-green-500/5 to-green-500/0 z-0 pointer-events-none"
      />

      {/* Holographic Face grid (shows on hover) */}
      <motion.div 
        className="absolute inset-12 border border-green-500/10 rounded-2xl z-0 pointer-events-none flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(34,197,94,0.05)_0%,transparent_70%)] flex items-center justify-center">
          {/* Target Box */}
          <div className="w-24 h-24 border border-dashed border-green-500/30 rounded-full animate-spin"></div>
        </div>
      </motion.div>

      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* Security Scanner Lens Frame */}
        <motion.div 
          className="relative w-36 h-36 border border-slate-300 dark:border-slate-800 rounded-full flex items-center justify-center bg-slate-100/50 dark:bg-slate-900/50 backdrop-blur-sm shadow-inner"
          animate={{ scale: isHovered ? 1.08 : 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Outer rotating tech ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute inset-1 border border-dashed border-amber-500/30 rounded-full"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute inset-3 border border-dotted border-slate-400 dark:border-slate-600 rounded-full"
          />

          {/* Camera Lens Housing */}
          <div className="w-20 h-20 bg-slate-200 dark:bg-slate-900 rounded-full border border-slate-300 dark:border-slate-700 flex items-center justify-center shadow-2xl relative">
            {/* Camera Eye */}
            <motion.div 
              className="w-12 h-12 bg-slate-300 dark:bg-slate-950 rounded-full border border-slate-400 dark:border-slate-800 flex items-center justify-center relative overflow-hidden"
            >
              {/* Red glowing lens indicator */}
              <motion.div 
                className="w-4 h-4 bg-red-600 rounded-full shadow-[0_0_10px_#dc2626] opacity-80"
                animate={{ scale: isHovered ? [1, 1.3, 1] : [1, 1.05, 1] }}
                transition={{ duration: isHovered ? 0.5 : 2, repeat: Infinity }}
              />
              {/* Reflection */}
              <div className="absolute top-2 left-2 w-2 h-2 bg-white rounded-full opacity-60"></div>
            </motion.div>
          </div>
        </motion.div>

        {/* Text and Interactive Hint */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <span className={`w-2 h-2 rounded-full ${isHovered ? 'bg-green-500 animate-ping' : 'bg-amber-500 animate-pulse'}`}></span>
            <h3 className="text-slate-800 dark:text-slate-100 font-bold uppercase tracking-widest text-xs">
              {isHovered ? "BIOMETRIC SCANNING" : "IDENTITY VERIFICATION"}
            </h3>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-[10px]">
            {isHovered ? "ANALYZING ACCESS CODE..." : "HOVER OR TAP TO ACTIVATE SCANNER"}
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