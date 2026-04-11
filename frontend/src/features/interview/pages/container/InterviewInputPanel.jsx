import { useRef } from 'react';

export default function InterviewInputPanel({
  selfDescription,
  setSelfDescription,
  jobDescription,
  setJobDescription,
  resumeFile,
  onFileUpload,
  onGenerate,
  isLoading,
}) {
  const fileInputRef = useRef(null);

  return (
    <div className="lg:col-span-1">
      <div className="sticky top-24 space-y-6">
        {/* Self Description Input */}
        <div className="group">
          <label className="block text-sm font-semibold text-gray-200 mb-3">
            💬 Self Description
          </label>
          <textarea
            value={selfDescription}
            onChange={(e) => setSelfDescription(e.target.value)}
            placeholder="Tell us about yourself, your skills, and experience..."
            className="w-full h-32 p-4 rounded-xl bg-white/10 dark:bg-black/30 backdrop-blur-lg border border-white/20 dark:border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 resize-none hover:bg-white/15 dark:hover:bg-black/40"
          />
        </div>

        {/* Job Description Input */}
        <div className="group">
          <label className="block text-sm font-semibold text-gray-200 mb-3">
            🎯 Job Description
          </label>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the job description you're interested in..."
            className="w-full h-32 p-4 rounded-xl bg-white/10 dark:bg-black/30 backdrop-blur-lg border border-white/20 dark:border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 resize-none hover:bg-white/15 dark:hover:bg-black/40"
          />
        </div>

        {/* File Upload */}
        <div className="group">
          <label className="block text-sm font-semibold text-gray-200 mb-3">
            📄 Upload Resume
          </label>
          <div
            onClick={() => fileInputRef.current?.click()}
            className="relative p-4 rounded-xl bg-white/10 dark:bg-black/30 backdrop-blur-lg border-2 border-dashed border-white/20 dark:border-white/10 cursor-pointer transition-all duration-300 hover:bg-white/15 dark:hover:bg-black/40 hover:border-purple-400/50 group"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={onFileUpload}
              className="hidden"
            />
            <div className="text-center">
              <div className="text-3xl mb-2 text-purple-400/80 group-hover:text-purple-400 transition-colors">
                📋
              </div>
              <p className="text-sm text-gray-300">
                {resumeFile ? resumeFile.name : 'Click to upload'}
              </p>
              <p className="text-xs text-gray-400 mt-1">PDF, DOC, DOCX</p>
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={onGenerate}
          disabled={isLoading}
          className="w-full py-3 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
        >
          <span>⚡</span>
          {isLoading ? 'Analyzing...' : 'Generate Analysis'}
        </button>

        {/* Tips Section */}
        <div className="p-4 rounded-xl bg-white/5 dark:bg-black/20 backdrop-blur-lg border border-white/10 dark:border-white/5">
          <h3 className="text-sm font-semibold text-purple-300 mb-3">
            💡 Tips
          </h3>
          <ul className="text-xs text-gray-400 space-y-2">
            <li>• Be detailed in your description</li>
            <li>• Include the complete job description</li>
            <li>• Ensure resume is in supported format</li>
          </ul>
        </div>
      </div>
    </div>
  );
}