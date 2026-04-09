import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth.js";
import { User, Mail, Lock, UserPlus, AtSign } from "lucide-react";

const Register = () => {
  const { user, isLoading, handleRegister } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords match nahi ho rahe!");
      return;
    }

    try {
      await handleRegister({
        fullName: formData.fullName,
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
    } catch (err) {
      setError(err.message || "Registration fail ho gaya!");
    }
  };

  if (isLoading) {
    return (
      <main className="flex items-center justify-center min-h-screen bg-black">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500 mb-4"></div>
          <p className="text-slate-400 font-medium">Creating your account...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex items-center justify-center min-h-screen bg-black text-white font-sans p-6 overflow-y-auto">
      <div className="w-full max-w-105 py-10 space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-[22px] bg-gradient-to-tr from-indigo-500 to-blue-500 mb-4 shadow-lg shadow-blue-500/20">
            <UserPlus size={30} className="text-white" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight italic">
            Join the Vibe
          </h1>
          <p className="text-slate-500 font-medium text-sm uppercase tracking-[0.2em]">
            Create your profile
          </p>
        </div>

        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-[13px] font-medium animate-in fade-in slide-in-from-top-2 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          {/* Full Name */}
          <div className="relative group">
            <User
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors"
              size={18}
            />
            <input
              type="text"
              id="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-4 rounded-[18px] bg-[#1c1c1e] border border-[#2c2c2e] text-white placeholder-slate-600 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 transition-all outline-none"
              placeholder="Full Name"
              required
            />
          </div>

          {/* Username */}
          <div className="relative group">
            <AtSign
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors"
              size={18}
            />
            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-4 rounded-[18px] bg-[#1c1c1e] border border-[#2c2c2e] text-white placeholder-slate-600 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 transition-all outline-none"
              placeholder="Username"
              required
            />
          </div>

          {/* Email */}
          <div className="relative group">
            <Mail
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors"
              size={18}
            />
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-4 rounded-[18px] bg-[#1c1c1e] border border-[#2c2c2e] text-white placeholder-slate-600 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 transition-all outline-none"
              placeholder="Email Address"
              required
            />
          </div>

          {/* Password Group */}
          <div className="grid grid-cols-1 gap-4">
            <div className="relative group">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors"
                size={18}
              />
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-4 rounded-[18px] bg-[#1c1c1e] border border-[#2c2c2e] text-white placeholder-slate-600 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 transition-all outline-none"
                placeholder="Create Password"
                required
              />
            </div>

            <div className="relative group">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors"
                size={18}
              />
              <input
                type="password"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-4 rounded-[18px] bg-[#1c1c1e] border border-[#2c2c2e] text-white placeholder-slate-600 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 transition-all outline-none"
                placeholder="Confirm Password"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 mt-4 text-base font-bold text-white bg-[#007aff] hover:bg-[#0071e3] rounded-[18px] transition-all active:scale-[0.97] shadow-xl shadow-blue-500/10 disabled:opacity-50"
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-slate-500 text-sm font-medium">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-500 hover:text-blue-400 transition-colors font-bold"
          >
            Sign In
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
