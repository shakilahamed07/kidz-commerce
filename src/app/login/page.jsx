"use client";

import { postUser } from "@/action/server/auth";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { FaEnvelope, FaLock, FaGoogle, FaUser } from "react-icons/fa";
import Swal from "sweetalert2";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const params = useSearchParams();
  const callbackurl = params.get("callbackUrl" || "/")

  // --- Form Submission Handlers ---

  // Login Handler
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevents page refresh
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      // redirect: false,
      callbackUrl: `${callbackurl}`
    });

    if (res?.ok) {
      Swal.fire("success", "Login Sucessfully", "success");
    } else {
      Swal.fire("error", "Email & password not matched", "error");
    }
  };

  // Register Handler
  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const result = await postUser(data);

    if (result?.insertedId) {
      alert(`${result?.insertedId}`);

      // login user
      const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      // redirect: false,
      callbackUrl: `${callbackurl}`
    });

    } else {
      alert("Sumething wrong!");
    }
  };

  // Google login
  const handelGoogle = async () => {
    const res = await signIn("google", { callbackUrl: `${callbackurl}`});
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 py-8 md:p-8">
      {/* Main Auth Card */}
      <div className="card w-full max-w-[450px] shadow-2xl bg-base-100 border border-base-300">
        <div className="card-body p-6 md:p-10">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-extrabold text-base-content mb-2">
              {isLogin ? "Welcome Back!" : "Join Us Today"}
            </h2>
            <p className="text-sm text-base-content/60">
              {isLogin
                ? "Please enter your details to login."
                : "Fill in the form to create an account."}
            </p>
          </div>

          {/* Form starts here - onSubmit triggers based on isLogin state */}
          <form
            onSubmit={isLogin ? handleLogin : handleRegister}
            className="space-y-4"
          >
            {/* Name Field (Visible in Register mode only) */}
            {!isLogin && (
              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text font-semibold">Full Name</span>
                </label>
                <div className="relative group">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 group-focus-within:text-primary transition-colors">
                    <FaUser />
                  </span>
                  <input
                    name="fullName"
                    type="text"
                    placeholder="John Doe"
                    className="input input-bordered w-full pl-10 bg-base-200/30 focus:bg-base-100"
                    required
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text font-semibold">Email Address</span>
              </label>
              <div className="relative group">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 group-focus-within:text-primary transition-colors">
                  <FaEnvelope />
                </span>
                <input
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  className="input input-bordered w-full pl-10 bg-base-200/30 focus:bg-base-100"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text font-semibold">Password</span>
              </label>
              <div className="relative group">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 group-focus-within:text-primary transition-colors">
                  <FaLock />
                </span>
                <input
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  className="input input-bordered w-full pl-10 bg-base-200/30 focus:bg-base-100"
                  required
                />
              </div>

              {isLogin && (
                <div className="flex justify-end mt-2">
                  <button
                    type="button"
                    className="text-xs link link-hover text-primary font-medium"
                  >
                    Forgot password?
                  </button>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary w-full mt-2 text-white normal-case text-lg shadow-lg"
            >
              {isLogin ? "Login" : "Create Account"}
            </button>
          </form>

          {/* Divider Section */}
          <div className="divider text-xs text-base-content/40 my-6 uppercase tracking-widest font-bold">
            OR
          </div>

          {/* Social Auth */}
          <button
            onClick={handelGoogle}
            className="btn btn-outline w-full border-base-300 gap-3 hover:bg-base-200 transition-all"
          >
            <FaGoogle className="text-red-500" />
            <span className="normal-case">Continue with Google</span>
          </button>

          {/* Switch between Login and Register */}
          <div className="text-center mt-8 pt-4 border-t border-base-200">
            <p className="text-sm">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 text-primary font-bold hover:underline"
              >
                {isLogin ? "Sign Up" : "Log In"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
