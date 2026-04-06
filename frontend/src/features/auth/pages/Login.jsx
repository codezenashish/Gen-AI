import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const { user, isLoading, handleLogin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Redirect after successful login
  useEffect(() => {
    if (user) {
      console.log("✅ Login Successful! User:", user);
      alert(`Welcome ${user.username || user.email}!`);
      navigate("/dashboard"); // ye page baad mein create karenge
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email aur Password dono zaroori hai!");
      return;
    }

    try {
      console.log("📤 Sending login request...");
      await handleLogin({ email, password });
      console.log("✅ handleLogin completed, waiting for user state update...");
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || err.message || "Login fail ho gaya";
      console.error("❌ Login Error:", err);
      setError(errorMsg);
    }
  };

  if (isLoading) {
    return (
      <main className="flex items-center justify-center min-h-screen bg-slate-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <h1 className="text-white text-xl">Loading... Please Wait</h1>
        </div>
      </main>
    );
  }

  return (
    <main className="flex items-center justify-center min-h-screen bg-slate-900 text-white font-sans">
      <div className="w-full max-w-md p-8 space-y-6 bg-slate-800 rounded-2xl shadow-2xl border border-slate-700">
        <h1 className="text-3xl font-bold text-center text-blue-400">Login</h1>

        {error && (
          <div className="p-3 bg-red-900 border border-red-700 rounded-lg text-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 mt-4 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 active:scale-95 transition-all duration-200 shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Logging in..." : "Sign In"}
          </button>
        </form>

        <p className="text-sm text-center text-slate-400">
          Account nahi hai?{" "}
          <Link
            to="/register"
            className="text-blue-400 hover:underline font-medium"
          >
            Register Karo
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
