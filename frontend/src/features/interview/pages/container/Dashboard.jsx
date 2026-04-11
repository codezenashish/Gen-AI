import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../../auth/hooks/useAuth";
import axiosInstance from "../../../../utils/axiosClient";
import InterviewInputPanel from "./InterviewInputPanel";
import InterviewResponsePanel from "./InterviewResponsePanel";

export default function Dashboard() {
  const { user, handleLogout } = useAuth();
  const navigate = useNavigate();
  const [selfDescription, setSelfDescription] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [aiResponse, setAiResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [recentResponses, setRecentResponses] = useState([]);

  const handleLogoutClick = async () => {
    try {
      await handleLogout();
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (
      file &&
      [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ].includes(file.type)
    ) {
      setResumeFile(file);
    } else {
      alert("Please upload a valid PDF or Word document");
    }
  };

  const handleGenerate = async () => {
    if (!selfDescription.trim() || !jobDescription.trim() || !resumeFile) {
      alert("Please fill all fields and upload a resume");
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("resume", resumeFile);
      formData.append("selfDescription", selfDescription);
      formData.append("jobDescription", jobDescription);

      const response = await axiosInstance.post("/interview", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const reportData = response.data?.data;
      if (reportData) {
        setAiResponse(reportData);
        setRecentResponses([Date.now(), ...recentResponses.slice(0, 4)]);
      }
    } catch (error) {
      console.error("Error generating response:", error);
      alert(
        error.response?.data?.message ||
          "Failed to generate analysis. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const formatResponseForCopy = () => {
    if (!aiResponse) return "";

    let text = "AI INTERVIEW ANALYSIS REPORT\n";
    text += "=".repeat(50) + "\n\n";

    if (
      aiResponse.technicalQuestions &&
      aiResponse.technicalQuestions.length > 0
    ) {
      text += "TECHNICAL QUESTIONS:\n";
      aiResponse.technicalQuestions.forEach((q, idx) => {
        text += `${idx + 1}. ${q.questions}\n   Intent: ${q.intention}\n\n`;
      });
    }

    if (aiResponse.skillsGap && aiResponse.skillsGap.length > 0) {
      text += "\nSKILLS GAP:\n";
      aiResponse.skillsGap.forEach((skill, idx) => {
        text += `${idx + 1}. ${skill.missingSkill} [${skill.importance}]\n`;
      });
    }

    if (aiResponse.preparationPlan && aiResponse.preparationPlan.length > 0) {
      text += "\nPREPARATION PLAN:\n";
      aiResponse.preparationPlan.forEach((plan) => {
        text += `Day ${plan.day}: ${plan.focus}\n   ${plan.task}\n\n`;
      });
    }

    return text;
  };

  const copyToClipboard = () => {
    const text = formatResponseForCopy();
    navigator.clipboard.writeText(text);
  };

  const downloadResponse = () => {
    const text = formatResponseForCopy();
    const element = document.createElement("a");
    const file = new Blob([text], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "ai-analysis.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-950">
        <div className="text-center">
          <h1 className="text-white text-3xl mb-4">Redirecting to login...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-slate-950 dark:via-purple-950 dark:to-slate-950 p-4 sm:p-6 lg:p-8">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative z-20 max-w-7xl mx-auto mb-8">
        <div className="flex justify-between items-center p-4 rounded-2xl bg-white/10 dark:bg-black/30 backdrop-blur-lg border border-white/20 dark:border-white/10 shadow-xl">
          <div>
            <h1 className="text-3xl font-bold text-white">GAN AI</h1>
            <p className="text-sm text-gray-400">Welcome, {user.username}!</p>
          </div>
          <button
            onClick={handleLogoutClick}
            className="px-6 py-2 bg-red-500/80 hover:bg-red-600 text-white rounded-lg font-semibold transition-all duration-300 hover:shadow-lg"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
            AI Resume Analyzer
          </h1>
          <p className="text-gray-300 text-lg">
            Optimize your resume with AI-powered insights
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Input Panel */}
          <InterviewInputPanel
            selfDescription={selfDescription}
            setSelfDescription={setSelfDescription}
            jobDescription={jobDescription}
            setJobDescription={setJobDescription}
            resumeFile={resumeFile}
            onFileUpload={handleFileUpload}
            onGenerate={handleGenerate}
            isLoading={isLoading}
          />

          {/* Response Panel */}
          <InterviewResponsePanel
            aiResponse={aiResponse}
            isLoading={isLoading}
            onCopy={copyToClipboard}
            onDownload={downloadResponse}
          />

          {/* RIGHT PANEL */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Recent Responses Card */}
              <div className="rounded-2xl bg-white/10 dark:bg-black/30 backdrop-blur-lg border border-white/20 dark:border-white/10 overflow-hidden shadow-xl">
                <div className="p-6 border-b border-white/10 dark:border-white/5">
                  <h3 className="text-lg font-bold text-white">📚 History</h3>
                </div>
                <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
                  {recentResponses.length > 0 ? (
                    recentResponses.map((timestamp, idx) => (
                      <button
                        key={timestamp}
                        className="w-full p-3 text-left rounded-lg bg-white/5 hover:bg-white/10 dark:bg-black/20 dark:hover:bg-black/40 text-gray-300 hover:text-white transition-all duration-300 text-sm truncate"
                      >
                        Analysis #{idx + 1}
                        <br />
                        <span className="text-xs text-gray-500">
                          {new Date(timestamp).toLocaleTimeString()}
                        </span>
                      </button>
                    ))
                  ) : (
                    <p className="text-center text-gray-500 text-sm py-8">
                      No analyses yet
                    </p>
                  )}
                </div>
              </div>

              {/* Feature Highlights */}
              <div className="rounded-2xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 dark:from-purple-500/5 dark:to-blue-500/5 backdrop-blur-lg border border-purple-300/20 dark:border-purple-300/10 p-6 shadow-xl">
                <h3 className="text-lg font-bold text-white mb-4">
                  🎯 Features
                </h3>
                <ul className="space-y-3 text-sm text-gray-300">
                  <li className="flex gap-3">
                    <span className="text-purple-400">›</span>
                    <span>Smart resume analysis</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-purple-400">›</span>
                    <span>Job match scoring</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-purple-400">›</span>
                    <span>Improvement suggestions</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-purple-400">›</span>
                    <span>Export results</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}
