import React from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../features/auth/hooks/useAuth";

const Dashboard = () => {
  const { user, handleLogout } = useAuth();
  const navigate = useNavigate();

  const handleLogoutClick = async () => {
    try {
      await handleLogout();
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="text-center">
          <h1 className="text-white text-3xl mb-4">Redirecting to login...</h1>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-900 text-white">
      <nav className="bg-slate-800 shadow-lg p-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-400">GAN AI</h1>
          <div className="flex items-center gap-6">
            <span className="text-slate-300">Welcome, {user.username}!</span>
            <button
              onClick={handleLogoutClick}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto p-8">
        <div className="bg-slate-800 rounded-lg p-8 border border-slate-700">
          <h2 className="text-3xl font-bold mb-6 text-blue-400">Dashboard</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-700 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">User Information</h3>
              <div className="space-y-3 text-slate-300">
                <p>
                  <strong>Full Name:</strong> {user.fullName}
                </p>
                <p>
                  <strong>Username:</strong> {user.username}
                </p>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Account Created:</strong>{" "}
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="bg-slate-700 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Stats</h3>
              <div className="space-y-3 text-slate-300">
                <p>
                  <strong>Status:</strong>{" "}
                  <span className="text-green-400">Active</span>
                </p>
                <p>
                  <strong>Member Since:</strong> {user.username}
                </p>
                <p>
                  <strong>Last Login:</strong> Just now
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;