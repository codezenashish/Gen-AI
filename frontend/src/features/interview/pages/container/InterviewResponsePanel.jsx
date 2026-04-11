export default function InterviewResponsePanel({
  aiResponse,
  isLoading,
  onCopy,
  onDownload,
}) {
  return (
    <div className="lg:col-span-1">
      <div className="h-full min-h-screen lg:min-h-auto lg:sticky lg:top-24">
        <div className="h-full rounded-2xl bg-white/10 dark:bg-black/30 backdrop-blur-lg border border-white/20 dark:border-white/10 shadow-2xl overflow-hidden flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-white/10 dark:border-white/5 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">AI Analysis</h2>
            <div className="flex gap-2">
              {aiResponse && (
                <>
                  <button
                    onClick={onCopy}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-all duration-300"
                    title="Copy"
                  >
                    📋
                  </button>
                  <button
                    onClick={onDownload}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-all duration-300"
                    title="Download"
                  >
                    ⬇️
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 p-6 overflow-y-auto">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="inline-block">
                    <div className="w-12 h-12 border-4 border-purple-400/30 border-t-purple-400 rounded-full animate-spin"></div>
                  </div>
                  <p className="mt-4 text-gray-400">
                    Analyzing your profile...
                  </p>
                </div>
              </div>
            ) : aiResponse ? (
              <div className="space-y-8">
                {/* Technical Questions */}
                {aiResponse.technicalQuestions &&
                  aiResponse.technicalQuestions.length > 0 && (
                    <div>
                      <h3 className="text-lg font-bold text-purple-300 mb-4">
                        📝 Technical Questions
                      </h3>
                      <div className="space-y-3">
                        {aiResponse.technicalQuestions.map((item, idx) => (
                          <div
                            key={idx}
                            className="p-3 rounded-lg bg-white/5 border border-white/10"
                          >
                            <p className="text-white font-medium text-sm">
                              Q{idx + 1}: {item.questions}
                            </p>
                            <p className="text-gray-400 text-xs mt-2">
                              Intent: {item.intention}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                {/* Skills Gap */}
                {aiResponse.skillsGap &&
                  aiResponse.skillsGap.length > 0 && (
                    <div>
                      <h3 className="text-lg font-bold text-orange-300 mb-4">
                        ⚠️ Skills Gap
                      </h3>
                      <div className="space-y-2">
                        {aiResponse.skillsGap.map((skill, idx) => (
                          <div
                            key={idx}
                            className="p-3 rounded-lg bg-white/5 border border-white/10 flex justify-between items-start"
                          >
                            <p className="text-white text-sm">
                              {skill.missingSkill}
                            </p>
                            <span className="text-xs px-2 py-1 rounded bg-orange-500/30 text-orange-200">
                              {skill.importance}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                {/* Preparation Plan */}
                {aiResponse.preparationPlan &&
                  aiResponse.preparationPlan.length > 0 && (
                    <div>
                      <h3 className="text-lg font-bold text-green-300 mb-4">
                        🎯 Preparation Plan
                      </h3>
                      <div className="space-y-3">
                        {aiResponse.preparationPlan.map((plan, idx) => (
                          <div
                            key={idx}
                            className="p-3 rounded-lg bg-white/5 border border-white/10"
                          >
                            <div className="flex gap-3">
                              <div className="flex-shrink-0">
                                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-green-500/30 text-green-300 text-xs font-bold">
                                  {plan.day}
                                </span>
                              </div>
                              <div>
                                <p className="text-white font-medium text-sm">
                                  {plan.focus}
                                </p>
                                <p className="text-gray-400 text-xs mt-1">
                                  {plan.task}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-center">
                <div>
                  <div className="text-5xl mb-4 opacity-30">✨</div>
                  <p className="text-gray-400">
                    Fill in the form and click "Generate Analysis"
                  </p>
                  <p className="text-gray-500 text-sm mt-2">
                    AI will provide detailed insights here
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}