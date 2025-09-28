import React, { useState, useContext, useRef } from "react";
import google from "../../assets/Google.png";
import github from "../../assets/github.png";
import login from "../../assets/login-illustration.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Components/Provider/AuthProvider";
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import auth from "../../Firebase.init";
import toast from "react-hot-toast";

const Login = () => {
  const [error, setError] = useState("");
  const { signIn, loading } = useContext(AuthContext);
  const [ setUser] = useState(null);
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
    <div className="flex flex-col md:flex-row items-center md:items-start p-6 gap-6 mt-14">
      {/* Left: Image */}
      <div className="w-full md:w-1/2 flex justify-center items-center">
        <img
          src={login}
          alt="Login Illustration"
          className="w-full h-auto object-cover rounded-lg shadow-lg"
        />
      </div>

      {/* Right: Form */}
      <div className="w-full md:w-1/2 flex flex-col items-center px-4">
        <h2 className="font-semibold text-2xl text-center mb-4">
          Login to your account
        </h2>

        <form onSubmit={handleLogin} className="w-full max-w-md">
          <fieldset className="space-y-4">
            <div>
              <label className="mb-2 text-lg font-semibold block">Email</label>
              <input
                name="email"
                type="email"
                ref={emailRef}
                className="input input-bordered w-full"
                placeholder="Email"
                required
              />
            </div>

            <div>
              <label className="mb-2 text-lg font-semibold block">Password</label>
              <input
                name="password"
                type="password"
                className="input input-bordered w-full"
                placeholder="Password"
                required
              />
            </div>

            <div className="text-right">
              <button
                type="button"
                onClick={goToForget}
                className="text-cyan-700 link link-hover"
              >
                Forgot password?
              </button>
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button
              type="submit"
              className="btn btn-neutral w-full"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <p className="text-center font-semibold pt-4">
              Don’t have an account?{" "}
              <Link className="text-secondary" to="/Register">
                Register
              </Link>
            </p>
          </fieldset>

          {/* Social Login */}
          <div className="mt-6">
            <h2 className="font-semibold text-center">Login with</h2>
            <div className="flex justify-center gap-4 mt-4">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-12 h-12 flex items-center justify-center rounded-full shadow border"
              >
                <img src={google} alt="Google" className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={handleGithubSignIn}
                className="w-12 h-12 flex items-center justify-center rounded-full shadow border"
              >
                <img src={github} alt="GitHub" className="h-6 w-6" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;