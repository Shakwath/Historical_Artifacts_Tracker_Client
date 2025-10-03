import React, { useState, useContext } from "react";
import Registeri from '../../assets/signup.png';
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const Register = () => {
  const { createUser, setUser, updateUser } = useContext(AuthContext);
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
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
      return;
    } else {
      setNameError("");
    }

    // Password validation
    const pwdError = validatePassword(password);
    if (pwdError) {
      setPasswordError(pwdError);
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
            navigate("/");
          })
          .catch(() => {
            // Even if updateProfile fails, navigate
            setUser(user);
            navigate("/");
          });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start p-6 gap-4 mt-14">
      {/* Left Side (Image) */}
      <div className="w-full md:w-1/2 flex justify-center items-center">
        <img
          src={Registeri}
          alt="Register Illustration"
          className="w-full h-auto object-cover rounded-lg shadow-lg"
        />
      </div>

      {/* Right Form */}
      <div className="w-full md:w-1/2 flex flex-col items-center px-4">
        <h2 className="font-semibold text-2xl text-center mb-4">
          Register your account
        </h2>
        <form onSubmit={handleRegister} className="w-full max-w-md">
          <fieldset className="space-y-4">
            {/* Name */}
            <div>
              <label className="block mb-1 text-lg font-semibold">Name</label>
              <input
                name="name"
                type="text"
                className="input input-bordered w-full"
                placeholder="Name"
                required
              />
              {nameError && (
                <p className="text-xs text-error mt-1">{nameError}</p>
              )}
            </div>

            {/* Photo URL */}
            <div>
              <label className="block mb-1 text-lg font-semibold">Photo URL</label>
              <input
                name="photo"
                type="url"
                className="input input-bordered w-full"
                placeholder="https://example.com/photo.jpg"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 text-lg font-semibold">Email</label>
              <input
                name="email"
                type="email"
                className="input input-bordered w-full"
                placeholder="Email"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block mb-1 text-lg font-semibold">Password</label>
              <input
                name="password"
                type="password"
                className="input input-bordered w-full"
                placeholder="Password"
                required
              />
              {passwordError && (
                <p className="text-xs text-error mt-1">{passwordError}</p>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-neutral w-full mt-2"
            >
              Register
            </button>

            <p className="font-semibold text-center pt-5">
              Already have an account?{" "}
              <Link className="text-secondary" to="/login">
                Login
              </Link>
            </p>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Register;