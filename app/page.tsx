return (
    <main className="min-h-screen p-8 bg-white text-black">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold mb-2 text-blue-600">AI Resume Optimizer</h1>
          <p className="text-gray-500 italic">Tailor your resume for ATS and global job standards.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col">
            <label className="font-bold mb-3 text-lg">📝 Your Resume (Text):</label>
            <textarea 
              className="flex-1 min-h-[300px] p-4 border-2 border-gray-200 rounded-2xl focus:border-blue-500 outline-none transition-all shadow-sm"
              placeholder="Paste your current resume text here..."
              value={resume}
              onChange={(e) => setResume(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="font-bold mb-3 text-lg">💼 Job Description (JD):</label>
            <textarea 
              className="flex-1 min-h-[300px] p-4 border-2 border-gray-200 rounded-2xl focus:border-blue-500 outline-none transition-all shadow-sm"
              placeholder="Paste the target job description here..."
              value={jd}
              onChange={(e) => setJd(e.target.value)}
            />
          </div>
        </div>

        <button 
          onClick={handleOptimize}
          disabled={loading}
          className="w-full mt-10 bg-blue-600 text-white py-5 rounded-2xl font-bold text-xl hover:bg-blue-700 active:scale-[0.98] transition-all disabled:bg-gray-300 shadow-lg shadow-blue-200"
        >
          {loading ? "⏳ Analyzing..." : "Optimize My Resume ✨"}
        </button>

        {result && (
          <div className="mt-12 p-8 bg-blue-50 border-2 border-blue-100 rounded-3xl animate-in fade-in duration-700">
            <h2 className="text-2xl font-bold mb-6 text-blue-800 flex items-center">
              💡 AI Optimization Suggestions:
            </h2>
            <div className="whitespace-pre-wrap leading-relaxed text-gray-700 text-lg">
              {result}
            </div>
          </div>
        )}

        <footer className="mt-20 text-center text-gray-400 text-sm">
          Built with ❤️ by Iftinan Suwarno | Powered by Next.js & Gemini AI
        </footer>
      </div>
    </main>
  );