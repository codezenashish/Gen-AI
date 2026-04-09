import React, { useState } from "react";
import {
  Upload,
  Sparkles,
  FileText,
  Briefcase,
  Plus,
  ChevronDown,
  ChevronUp,
  Copy,
  Share,
} from "lucide-react";

const Home = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [isInputExpanded, setIsInputExpanded] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState("");

  const handleGenerate = () => {
    setIsGenerating(true);

    setTimeout(() => {
      setResult(
        "### Optimized Summary\nHighly motivated developer with expertise in React and Node.js...\n\n### Keywords Added\nScalability, Cloud Architecture, CI/CD...",
      );
      setIsGenerating(false);
      setIsInputExpanded(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black text-[#f2f2f7] p-4 md:p-12 font-sans selection:bg-blue-500/30">
      <div className="max-w-3xl mx-auto">
        {/* iOS Style Header */}
        <header className="mb-8 text-center">
          <div className="inline-flex items-center justify-center p-3 mb-4 rounded-2xl bg-linear-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/20">
            <Sparkles size={24} className="text-white" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
            Resume Tailor
          </h1>
        </header>

        <div className="bg-[#1c1c1e] rounded-4xl border border-[#2c2c2e] overflow-hidden transition-all duration-500 shadow-2xl">
          <button
            onClick={() => setIsInputExpanded(!isInputExpanded)}
            className="w-full flex items-center justify-between p-5 text-slate-400 hover:text-white transition-colors"
          >
            <span className="text-xs font-bold uppercase tracking-widest">
              Input Details
            </span>
            {isInputExpanded ? (
              <ChevronUp size={20} />
            ) : (
              <ChevronDown size={20} />
            )}
          </button>

          <div
            className={`px-5 pb-6 space-y-6 ${isInputExpanded ? "block" : "hidden"}`}
          >
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-[11px] uppercase tracking-wider font-bold text-blue-500 ml-1">
                <Briefcase size={14} /> Target Job
              </label>
              <textarea
                className="w-full h-32 p-4 rounded-2xl bg-[#2c2c2e] border border-transparent focus:border-blue-500/50 text-sm transition-all outline-none resize-none"
                placeholder="Paste job requirements..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
            </div>

            <div className="space-y-3">
              <label className="flex items-center gap-2 text-[11px] uppercase tracking-wider font-bold text-indigo-400 ml-1">
                <FileText size={14} /> Your Profile
              </label>
              <textarea
                className="w-full h-32 p-4 rounded-2xl bg-[#2c2c2e] border border-transparent focus:border-indigo-500/50 text-sm transition-all outline-none resize-none"
                placeholder="Describe your skills..."
                value={selfDescription}
                onChange={(e) => setSelfDescription(e.target.value)}
              />
            </div>

            <div className="flex gap-3">
              <div className="relative flex-1">
                <input
                  type="file"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#3a3a3c] text-sm font-semibold hover:bg-[#48484a]">
                  <Plus size={18} /> Resume
                </button>
              </div>
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="flex-2 flex items-center justify-center gap-2 py-3 bg-[#007aff] hover:bg-[#0071e3] rounded-xl font-bold transition-transform active:scale-95 disabled:opacity-50"
              >
                {isGenerating ? "Processing..." : "Generate Magic"}
              </button>
            </div>
          </div>
        </div>

        {/* Output Section - The "Further Response" area */}
        {result && (
          <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center justify-between mb-4 px-2">
              <h2 className="text-lg font-bold">Tailored Result</h2>
              <div className="flex gap-4">
                <button className="text-blue-400 p-2 hover:bg-blue-500/10 rounded-full transition-colors">
                  <Copy size={20} />
                </button>
                <button className="text-blue-400 p-2 hover:bg-blue-500/10 rounded-full transition-colors">
                  <Share size={20} />
                </button>
              </div>
            </div>

            <div className="p-6 rounded-4xl bg-linear-to-b from-[#1c1c1e] to-black border border-[#2c2c2e] min-h-75 shadow-inner">
              <div className="prose prose-invert max-w-none">
                {/* Simulated Output Content */}
                <p className="text-slate-300 leading-relaxed">{result}</p>
              </div>
            </div>
          </div>
        )}

        <footer className="mt-12 text-center pb-10">
          <p className="text-slate-600 text-[10px] uppercase tracking-[0.2em] font-medium">
            AI Engine Active • v1.0
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Home;
