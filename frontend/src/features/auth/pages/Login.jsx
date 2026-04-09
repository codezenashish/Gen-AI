import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth.js";
import { Lock, Mail, Sparkles } from "lucide-react";

const Login = () => {
  const { user, isLoading, handleLogin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
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
      await handleLogin({ email, password });
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || err.message || "Login fail ho gaya";
      setError(errorMsg);
    }
  };

  if (isLoading) {
    return (
      <main className="flex items-center justify-center min-h-screen bg-black">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500 mb-4"></div>
          <p className="text-slate-400 font-medium">Authenticating...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex items-center justify-center min-h-screen bg-black text-white font-sans p-6">
      <div className="w-full max-w-100 space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-[20px] bg-linear-to-b from-blue-500 to-blue-600 mb-4 shadow-lg shadow-blue-500/20">
            <Lock size={30} className="text-white" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Welcome Back
          </h1>
          <p className="text-slate-500 font-medium text-sm uppercase tracking-widest">
            Enter your credentials
          </p>
        </div>

        {/* Error Callout */}
        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm font-medium animate-in fade-in slide-in-from-top-2">
            ⚠️ {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <div className="relative group">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors"
                size={18}
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-[18px] bg-[#1c1c1e] border border-[#2c2c2e] text-white placeholder-slate-600 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 transition-all outline-none"
                placeholder="Email Address"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="relative group">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors"
                size={18}
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-[18px] bg-[#1c1c1e] border border-[#2c2c2e] text-white placeholder-slate-600 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 transition-all outline-none"
                placeholder="Password"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 py-4 mt-6 text-base font-bold text-white bg-[#007aff] hover:bg-[#0071e3] rounded-[18px] transition-all active:scale-[0.97] active:brightness-90 shadow-xl shadow-blue-500/10 disabled:opacity-50"
          >
            Sign In
          </button>
        </form>

        {/* Footer Link */}
        <p className="text-center text-slate-500 text-sm font-medium">
          New here?{" "}
          <Link
            to="/register"
            className="text-blue-500 hover:text-blue-400 transition-colors font-bold"
          >
            Create an Account
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
