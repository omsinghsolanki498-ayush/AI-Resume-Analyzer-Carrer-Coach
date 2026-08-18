import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function ResumeAnalyzer() {
    const navigate = useNavigate();

    // =========================
    // STATES
    // =========================

    const [file, setFile] = useState(null);
    const [resume, setResume] = useState(null);

    const [targetRole, setTargetRole] = useState(
        "Full Stack Developer"
    );

    const [analysis, setAnalysis] = useState(null);

    const [loading, setLoading] = useState(false);
    const [analyzing, setAnalyzing] = useState(false);

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    // =========================
    // TARGET ROLES
    // =========================

    const roles = [
        "Full Stack Developer",
        "MERN Stack Developer",
        "Frontend Developer",
        "Backend Developer",
        "React Developer",
        "Node.js Developer",
        "Java Developer",
        "Software Engineer",
        "Data Analyst",
        "DevOps Engineer",
    ];

    // =========================
    // FILE SELECT
    // =========================

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];

        setMessage("");
        setError("");
        setAnalysis(null);
        setResume(null);

        if (!selectedFile) {
            setFile(null);
            return;
        }

        // PDF validation
        if (
            selectedFile.type !== "application/pdf" &&
            !selectedFile.name
                .toLowerCase()
                .endsWith(".pdf")
        ) {
            setFile(null);

            setError(
                "Only PDF files are allowed."
            );

            return;
        }

        // 5 MB validation
        if (selectedFile.size > 5 * 1024 * 1024) {
            setFile(null);

            setError(
                "File size must be less than 5 MB."
            );

            return;
        }

        setFile(selectedFile);
    };

    // =========================
    // REMOVE FILE
    // =========================

    const removeFile = () => {
        setFile(null);
        setResume(null);
        setAnalysis(null);
        setMessage("");
        setError("");
    };

    // =========================
    // UPLOAD RESUME
    // =========================

    const handleUpload = async () => {
        if (!file) {
            setError(
                "Please select a resume first."
            );
            return;
        }

        const token =
            localStorage.getItem("token");

        if (!token) {
            setError(
                "Session expired. Please login again."
            );

            setTimeout(() => {
                navigate("/login");
            }, 1000);

            return;
        }

        try {
            setLoading(true);
            setMessage("");
            setError("");
            setResume(null);
            setAnalysis(null);

            const formData = new FormData();

            formData.append(
                "resume",
                file
            );

            const response = await api.post(
                "/resume/upload",
                formData
            );

            console.log(
                "UPLOAD RESPONSE:",
                response.data
            );

            setResume(
                response.data.resume
            );

            setMessage(
                "Resume uploaded successfully 🎉"
            );

        } catch (error) {
            console.error(
                "UPLOAD ERROR:",
                error.response?.data ||
                error.message
            );

            // 401
            if (
                error.response?.status === 401
            ) {
                localStorage.removeItem(
                    "token"
                );

                localStorage.removeItem(
                    "user"
                );

                setError(
                    "Session expired. Please login again."
                );

                setTimeout(() => {
                    navigate("/login");
                }, 1000);

                return;
            }

            setError(
                error.response?.data
                    ?.message ||
                "Resume upload failed."
            );

        } finally {
            setLoading(false);
        }
    };

    // =========================
    // AI ANALYSIS
    // =========================

    const handleAnalyze = async () => {
        if (!resume) {
            setError(
                "Please upload your resume first."
            );
            return;
        }

        const resumeId =
            resume.id || resume._id;

        if (!resumeId) {
            setError(
                "Resume ID not found."
            );
            return;
        }

        try {
            setAnalyzing(true);
            setMessage("");
            setError("");

            const response = await api.post(
                "/ai/analyze",
                {
                    resumeId,
                    targetRole,
                }
            );

            console.log(
                "AI ANALYSIS:",
                response.data
            );

            // =========================
            // SAVE AI RESULT IN STATE
            // =========================

            setAnalysis(
                response.data.analysis
            );

            setMessage(
                "AI analysis completed successfully 🎉"
            );

        } catch (error) {
            console.error(
                "AI ANALYSIS ERROR:",
                error.response?.data ||
                error.message
            );

            // 401
            if (
                error.response?.status === 401
            ) {
                localStorage.removeItem(
                    "token"
                );

                localStorage.removeItem(
                    "user"
                );

                setError(
                    "Session expired. Please login again."
                );

                setTimeout(() => {
                    navigate("/login");
                }, 1000);

                return;
            }

            setError(
                error.response?.data
                    ?.message ||
                "AI analysis failed."
            );

        } finally {
            setAnalyzing(false);
        }
    };

    // =========================
    // OPEN FULL ANALYSIS
    // =========================

    const handleOpenFullAnalysis = () => {
        const resumeId =
            resume?.id || resume?._id;

        if (!resumeId) {
            setError(
                "Resume ID not found."
            );
            return;
        }

        navigate(
            `/resume-analysis/${resumeId}`
        );
    };

    // =========================
    // ATS SCORE LABEL
    // =========================

    const getScoreText = (score) => {
        if (score >= 80) {
            return "Excellent";
        }

        if (score >= 60) {
            return "Good";
        }

        if (score >= 40) {
            return "Average";
        }

        return "Needs Improvement";
    };

    // =========================
    // JSX
    // =========================

    return (
        <div className="min-h-screen bg-slate-50">

            {/* =========================
          MAIN CONTAINER
      ========================== */}

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* =========================
            BACK BUTTON
        ========================== */}

                <button
                    onClick={() =>
                        navigate("/dashboard")
                    }
                    className="mb-6 inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-semibold transition"
                >
                    ← Back to Dashboard
                </button>

                {/* =========================
            HEADER
        ========================== */}

                <div className="mb-8">

                    <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                        ✨ AI Powered
                    </div>

                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
                        AI Resume Analyzer
                    </h1>

                    <p className="text-slate-500 mt-3 text-base sm:text-lg max-w-2xl">
                        Upload your resume and get AI-powered
                        ATS scoring, skill analysis and
                        personalized career suggestions.
                    </p>

                </div>

                {/* =========================
            UPLOAD CARD
        ========================== */}

                <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-5 sm:p-8 lg:p-10">

                    {/* TOP */}

                    <div className="text-center">

                        <div className="mx-auto w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-indigo-50 flex items-center justify-center text-4xl sm:text-5xl">
                            📄
                        </div>

                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-6">
                            Upload Your Resume
                        </h2>

                        <p className="text-slate-500 mt-2">
                            PDF format only • Maximum 5 MB
                        </p>

                    </div>

                    {/* =========================
              DROP AREA
          ========================== */}

                    <label
                        htmlFor="resume"
                        className="mt-8 block border-2 border-dashed border-slate-300 rounded-2xl p-8 sm:p-12 text-center cursor-pointer hover:border-indigo-500 hover:bg-indigo-50/30 transition"
                    >

                        <div className="text-4xl sm:text-5xl mb-4">
                            ☁️
                        </div>

                        <p className="font-bold text-slate-800 text-lg">
                            Click to choose your resume
                        </p>

                        <p className="text-sm text-slate-500 mt-2">
                            Upload a PDF resume up to 5 MB
                        </p>

                        <input
                            id="resume"
                            type="file"
                            accept=".pdf,application/pdf"
                            onChange={handleFileChange}
                            className="hidden"
                        />

                    </label>

                    {/* =========================
              SELECTED FILE
          ========================== */}

                    {file && (
                        <div className="mt-5 bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                            <div className="flex items-center gap-3 min-w-0">

                                <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-xl shrink-0">
                                    📄
                                </div>

                                <div className="min-w-0">

                                    <p className="font-semibold text-slate-800 truncate">
                                        {file.name}
                                    </p>

                                    <p className="text-xs text-slate-500 mt-1">
                                        {(
                                            file.size /
                                            1024 /
                                            1024
                                        ).toFixed(2)}{" "}
                                        MB
                                    </p>

                                </div>

                            </div>

                            <button
                                onClick={removeFile}
                                className="text-red-500 hover:text-red-700 font-semibold text-sm self-end sm:self-auto"
                            >
                                Remove
                            </button>

                        </div>
                    )}

                    {/* =========================
              TARGET ROLE
          ========================== */}

                    <div className="mt-7">

                        <label className="block font-semibold text-slate-800 mb-2">
                            Target Job Role
                        </label>

                        <select
                            value={targetRole}
                            onChange={(e) =>
                                setTargetRole(
                                    e.target.value
                                )
                            }
                            className="w-full border border-slate-300 rounded-xl px-4 py-3.5 bg-white outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                        >

                            {roles.map(
                                (role) => (
                                    <option
                                        key={role}
                                        value={role}
                                    >
                                        {role}
                                    </option>
                                )
                            )}

                        </select>

                        <p className="text-xs text-slate-500 mt-2">
                            AI will compare your resume with
                            this job role.
                        </p>

                    </div>

                    {/* =========================
              UPLOAD BUTTON
          ========================== */}

                    <button
                        onClick={handleUpload}
                        disabled={!file || loading}
                        className="w-full mt-6 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold transition"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <span className="animate-spin">
                                    ⏳
                                </span>

                                Uploading Resume...
                            </span>
                        ) : (
                            "Upload Resume"
                        )}
                    </button>

                    {/* =========================
              SUCCESS MESSAGE
          ========================== */}

                    {message && (
                        <div className="mt-4 p-4 rounded-xl bg-green-50 border border-green-200 text-green-700 text-center text-sm font-medium">
                            {message}
                        </div>
                    )}

                    {/* =========================
              ERROR MESSAGE
          ========================== */}

                    {error && (
                        <div className="mt-4 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-center text-sm font-medium">
                            {error}
                        </div>
                    )}

                </div>

                {/* =========================
            UPLOADED RESUME
        ========================== */}

                {resume && (
                    <div className="mt-8 bg-white border border-slate-200 rounded-3xl shadow-sm p-5 sm:p-8">

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

                            <div className="flex items-center gap-4 min-w-0">

                                <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center text-2xl shrink-0">
                                    ✅
                                </div>

                                <div className="min-w-0">

                                    <p className="text-sm text-green-600 font-semibold">
                                        Resume Uploaded
                                    </p>

                                    <h2 className="text-lg sm:text-xl font-bold text-slate-900 truncate">
                                        {resume.originalName ||
                                            file?.name}
                                    </h2>

                                </div>

                            </div>

                            {resume.cloudinaryUrl && (
                                <a
                                    href={
                                        resume.cloudinaryUrl
                                    }
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-indigo-600 hover:text-indigo-800 font-semibold"
                                >
                                    View Resume →
                                </a>
                            )}

                        </div>

                        {/* =========================
                ANALYZE BUTTON
            ========================== */}

                        <button
                            onClick={handleAnalyze}
                            disabled={analyzing}
                            className="w-full mt-7 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold transition"
                        >
                            {analyzing ? (
                                <span className="flex items-center justify-center gap-2">

                                    <span className="animate-spin">
                                        ⏳
                                    </span>

                                    AI is analyzing your resume...

                                </span>
                            ) : (
                                "✨ Analyze Resume with AI"
                            )}
                        </button>

                        {/* =========================
                EXTRACTED TEXT
            ========================== */}

                        {resume.extractedText && (
                            <details className="mt-6">

                                <summary className="cursor-pointer font-semibold text-slate-700">
                                    View Extracted Resume Text
                                </summary>

                                <div className="mt-4 bg-slate-50 border border-slate-200 rounded-2xl p-5 max-h-80 overflow-y-auto">

                                    <p className="text-sm text-slate-600 whitespace-pre-wrap leading-6">
                                        {resume.extractedText}
                                    </p>

                                </div>

                            </details>
                        )}

                    </div>
                )}

                {/* =========================
            AI ANALYSIS RESULTS
        ========================== */}

                {analysis && (
                    <div className="mt-8 space-y-6">

                        {/* =========================
                RESULTS HEADER
            ========================== */}

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                            <div>

                                <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold">
                                    🤖 AI Analysis Complete
                                </div>

                                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-3">
                                    Your Resume Analysis
                                </h2>

                            </div>

                            {/* =========================
                  NEW STEP 8 BUTTON
              ========================== */}

                            <button
                                onClick={
                                    handleOpenFullAnalysis
                                }
                                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition shadow-sm"
                            >
                                Open Full Analysis →
                            </button>

                        </div>

                        {/* =========================
                ATS SCORE + JOB MATCH
            ========================== */}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* ATS SCORE */}

                            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8">

                                <p className="text-sm font-semibold text-slate-500">
                                    ATS Score
                                </p>

                                <div className="flex items-end gap-2 mt-3">

                                    <span className="text-5xl sm:text-6xl font-bold text-indigo-600">
                                        {analysis.atsScore ||
                                            0}
                                    </span>

                                    <span className="text-slate-400 mb-2">
                                        /100
                                    </span>

                                </div>

                                <p className="mt-2 font-semibold text-slate-700">
                                    {getScoreText(
                                        analysis.atsScore ||
                                        0
                                    )}
                                </p>

                                <div className="mt-6 h-3 bg-slate-100 rounded-full overflow-hidden">

                                    <div
                                        className="h-full bg-indigo-600 rounded-full transition-all duration-700"
                                        style={{
                                            width: `${Math.min(
                                                Math.max(
                                                    analysis.atsScore ||
                                                    0,
                                                    0
                                                ),
                                                100
                                            )}%`,
                                        }}
                                    />

                                </div>

                            </div>

                            {/* JOB MATCH */}

                            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8">

                                <p className="text-sm font-semibold text-slate-500">
                                    Target Role Match
                                </p>

                                <div className="flex items-center justify-between gap-4 mt-3">

                                    <div>

                                        <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                                            {analysis
                                                .jobRoleMatch
                                                ?.role ||
                                                targetRole}
                                        </h3>

                                    </div>

                                    <div className="text-right">

                                        <span className="text-4xl sm:text-5xl font-bold text-indigo-600">
                                            {analysis
                                                .jobRoleMatch
                                                ?.score ||
                                                0}
                                            %
                                        </span>

                                    </div>

                                </div>

                                <p className="mt-5 text-slate-600 leading-6">
                                    {analysis
                                        .jobRoleMatch
                                        ?.reason ||
                                        "No reason available."}
                                </p>

                            </div>

                        </div>

                        {/* =========================
                SUMMARY
            ========================== */}

                        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8">

                            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                                📋 Resume Summary
                            </h2>

                            <p className="mt-4 text-slate-600 leading-7">
                                {analysis.summary ||
                                    "No summary available."}
                            </p>

                        </div>

                        {/* =========================
                EXPERIENCE LEVEL
            ========================== */}

                        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8">

                            <div className="flex items-center justify-between gap-4">

                                <div>

                                    <p className="text-sm text-slate-500">
                                        Detected Experience Level
                                    </p>

                                    <h2 className="text-2xl font-bold text-slate-900 mt-1">
                                        {analysis
                                            .experienceLevel ||
                                            "Not detected"}
                                    </h2>

                                </div>

                                <div className="text-3xl">
                                    🎓
                                </div>

                            </div>

                        </div>

                        {/* =========================
                SKILLS
            ========================== */}

                        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8">

                            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                                🛠️ Detected Skills
                            </h2>

                            <div className="flex flex-wrap gap-3 mt-5">

                                {analysis.skills?.length >
                                    0 ? (
                                    analysis.skills.map(
                                        (skill, index) => (
                                            <span
                                                key={index}
                                                className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-semibold"
                                            >
                                                {skill}
                                            </span>
                                        )
                                    )
                                ) : (
                                    <p className="text-slate-500">
                                        No skills detected.
                                    </p>
                                )}

                            </div>

                        </div>

                        {/* =========================
                STRENGTHS + WEAKNESSES
            ========================== */}

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                            {/* STRENGTHS */}

                            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8">

                                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                                    💪 Strengths
                                </h2>

                                <div className="mt-5 space-y-3">

                                    {analysis.strengths?.length >
                                        0 ? (
                                        analysis.strengths.map(
                                            (
                                                item,
                                                index
                                            ) => (
                                                <div
                                                    key={index}
                                                    className="flex gap-3 p-4 bg-green-50 border border-green-100 rounded-xl"
                                                >

                                                    <span className="text-green-600 font-bold">
                                                        ✓
                                                    </span>

                                                    <p className="text-green-800 text-sm sm:text-base">
                                                        {item}
                                                    </p>

                                                </div>
                                            )
                                        )
                                    ) : (
                                        <p className="text-slate-500">
                                            No strengths detected.
                                        </p>
                                    )}

                                </div>

                            </div>

                            {/* WEAKNESSES */}

                            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8">

                                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                                    ⚠️ Weaknesses
                                </h2>

                                <div className="mt-5 space-y-3">

                                    {analysis.weaknesses?.length >
                                        0 ? (
                                        analysis.weaknesses.map(
                                            (
                                                item,
                                                index
                                            ) => (
                                                <div
                                                    key={index}
                                                    className="flex gap-3 p-4 bg-orange-50 border border-orange-100 rounded-xl"
                                                >

                                                    <span className="text-orange-600 font-bold">
                                                        !
                                                    </span>

                                                    <p className="text-orange-800 text-sm sm:text-base">
                                                        {item}
                                                    </p>

                                                </div>
                                            )
                                        )
                                    ) : (
                                        <p className="text-slate-500">
                                            No weaknesses detected.
                                        </p>
                                    )}

                                </div>

                            </div>

                        </div>

                        {/* =========================
                MISSING SKILLS
            ========================== */}

                        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8">

                            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                                🎯 Missing Skills
                            </h2>

                            <p className="text-sm text-slate-500 mt-2">
                                Skills that may improve your
                                match for the selected job role.
                            </p>

                            <div className="flex flex-wrap gap-3 mt-5">

                                {analysis.missingSkills?.length >
                                    0 ? (
                                    analysis.missingSkills.map(
                                        (
                                            skill,
                                            index
                                        ) => (
                                            <span
                                                key={index}
                                                className="px-4 py-2 bg-red-50 text-red-700 border border-red-100 rounded-full text-sm font-semibold"
                                            >
                                                + {skill}
                                            </span>
                                        )
                                    )
                                ) : (
                                    <p className="text-green-600 font-medium">
                                        Great! No major missing
                                        skills detected.
                                    </p>
                                )}

                            </div>

                        </div>

                        {/* =========================
                SUGGESTIONS
            ========================== */}

                        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8">

                            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                                🚀 Improvement Suggestions
                            </h2>

                            <div className="mt-5 space-y-4">

                                {analysis.suggestions?.length >
                                    0 ? (
                                    analysis.suggestions.map(
                                        (
                                            suggestion,
                                            index
                                        ) => (
                                            <div
                                                key={index}
                                                className="flex gap-4 p-4 sm:p-5 bg-slate-50 border border-slate-100 rounded-2xl"
                                            >

                                                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold shrink-0">
                                                    {index + 1}
                                                </div>

                                                <p className="text-slate-700 leading-6">
                                                    {suggestion}
                                                </p>

                                            </div>
                                        )
                                    )
                                ) : (
                                    <p className="text-slate-500">
                                        No suggestions available.
                                    </p>
                                )}

                            </div>

                        </div>

                        {/* =========================
                FULL ANALYSIS BUTTON
            ========================== */}

                        <div className="flex flex-col sm:flex-row justify-center gap-4 py-6">

                            <button
                                onClick={
                                    handleOpenFullAnalysis
                                }
                                className="px-7 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition"
                            >
                                Open Full Analysis →
                            </button>

                            <button
                                onClick={() => {
                                    setAnalysis(null);
                                    setResume(null);
                                    setFile(null);
                                    setMessage("");
                                    setError("");

                                    window.scrollTo({
                                        top: 0,
                                        behavior: "smooth",
                                    });
                                }}
                                className="px-7 py-3 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold transition"
                            >
                                Analyze Another Resume
                            </button>

                        </div>

                    </div>
                )}

            </div>
        </div>
    );
}

export default ResumeAnalyzer;