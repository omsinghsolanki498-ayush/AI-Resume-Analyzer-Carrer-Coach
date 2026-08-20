import { useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardSidebar from "../Components/DashboardSidebar";
import api from "../api/axios";

function ResumeAnalyzer() {
    const navigate = useNavigate();

    // =========================================================
    // STATES
    // =========================================================

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

    // =========================================================
    // TARGET ROLES
    // =========================================================

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

    // =========================================================
    // FILE SELECT
    // =========================================================

    const handleFileChange = (e) => {
        const selectedFile = e.target.files?.[0];

        setMessage("");
        setError("");
        setAnalysis(null);
        setResume(null);

        if (!selectedFile) {
            setFile(null);
            return;
        }

        const isPdf =
            selectedFile.type === "application/pdf" ||
            selectedFile.name
                .toLowerCase()
                .endsWith(".pdf");

        if (!isPdf) {
            setFile(null);
            setError("Only PDF files are allowed.");
            return;
        }

        if (selectedFile.size > 5 * 1024 * 1024) {
            setFile(null);
            setError("File size must be less than 5 MB.");
            return;
        }

        setFile(selectedFile);
    };

    // =========================================================
    // REMOVE FILE
    // =========================================================

    const removeFile = () => {
        setFile(null);
        setResume(null);
        setAnalysis(null);
        setMessage("");
        setError("");
    };

    // =========================================================
    // UPLOAD RESUME
    // =========================================================

    const handleUpload = async () => {
        if (!file) {
            setError("Please select a resume first.");
            return;
        }

        const token = localStorage.getItem("token");

        if (!token) {
            setError("Session expired. Please login again.");

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

            formData.append("resume", file);

            const response = await api.post(
                "/resume/upload",
                formData
            );

            console.log(
                "UPLOAD RESPONSE:",
                response.data
            );

            setResume(response.data.resume);

            setMessage(
                "Resume uploaded successfully 🎉"
            );
        } catch (error) {
            console.error(
                "UPLOAD ERROR:",
                error.response?.data ||
                    error.message
            );

            if (error.response?.status === 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");

                setError(
                    "Session expired. Please login again."
                );

                setTimeout(() => {
                    navigate("/login");
                }, 1000);

                return;
            }

            setError(
                error.response?.data?.message ||
                    "Resume upload failed."
            );
        } finally {
            setLoading(false);
        }
    };

    // =========================================================
    // AI ANALYSIS
    // =========================================================

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
            setError("Resume ID not found.");
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

            if (error.response?.status === 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");

                setError(
                    "Session expired. Please login again."
                );

                setTimeout(() => {
                    navigate("/login");
                }, 1000);

                return;
            }

            setError(
                error.response?.data?.message ||
                    "AI analysis failed."
            );
        } finally {
            setAnalyzing(false);
        }
    };

    // =========================================================
    // OPEN FULL ANALYSIS
    // =========================================================

    const handleOpenFullAnalysis = () => {
        const resumeId =
            resume?.id || resume?._id;

        if (!resumeId) {
            setError("Resume ID not found.");
            return;
        }

        navigate(
            `/resume-analysis/${resumeId}`
        );
    };

    // =========================================================
    // SCORE TEXT
    // =========================================================

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

    // =========================================================
    // RESET ANALYSIS
    // =========================================================

    const handleNewAnalysis = () => {
        setAnalysis(null);
        setResume(null);
        setFile(null);
        setMessage("");
        setError("");

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    // =========================================================
    // SAFE SCORE
    // =========================================================

    const atsScore = Math.min(
        Math.max(
            Number(analysis?.atsScore) || 0,
            0
        ),
        100
    );

    const jobMatchScore = Math.min(
        Math.max(
            Number(
                analysis?.jobRoleMatch?.score
            ) || 0,
            0
        ),
        100
    );

    // =========================================================
    // JSX
    // =========================================================

    return (
        <div className="
            min-h-screen
            w-full
            overflow-x-hidden
            bg-slate-950
            text-slate-300
        ">

            <DashboardSidebar />

            <main className="w-full">

                {/* =================================================
                    HEADER
                ================================================== */}

                <section className="
                    w-full
                    px-4
                    pb-8
                    pt-6
                    sm:px-6
                    sm:pb-10
                    sm:pt-8
                    lg:px-8
                    lg:pb-12
                    lg:pt-10
                ">

                    <div className="
                        mx-auto
                        w-full
                        max-w-7xl
                    ">

                        <div className="
                            mx-auto
                            w-full
                            max-w-3xl
                            text-center
                        ">

                            {/* BACK */}

                            <div className="
                                mb-6
                                flex
                                justify-center
                                sm:mb-8
                            ">

                                <button
                                    type="button"
                                    onClick={() =>
                                        navigate(
                                            "/dashboard"
                                        )
                                    }
                                    className="
                                        inline-flex
                                        items-center
                                        justify-center
                                        gap-2
                                        rounded-md
                                        px-3
                                        py-2
                                        text-xs
                                        font-semibold
                                        text-indigo-400
                                        transition
                                        hover:bg-indigo-500/10
                                        hover:text-indigo-300
                                        sm:text-sm
                                    "
                                >
                                    <span>←</span>

                                    <span>
                                        Back to Dashboard
                                    </span>
                                </button>

                            </div>

                            {/* BADGE */}

                            <div className="flex justify-center">

                                <div className="
                                    inline-flex
                                    items-center
                                    gap-2
                                    rounded-md
                                    border
                                    border-indigo-500/20
                                    bg-indigo-500/10
                                    px-3
                                    py-1.5
                                    text-[10px]
                                    font-semibold
                                    uppercase
                                    tracking-wider
                                    text-indigo-300
                                    sm:px-4
                                    sm:py-2
                                    sm:text-xs
                                ">

                                    <span className="text-indigo-400">
                                        ✦
                                    </span>

                                    AI Powered

                                </div>

                            </div>

                            {/* TITLE */}

                            <h1 className="
                                mt-4
                                text-2xl
                                font-bold
                                leading-tight
                                tracking-tight
                                text-white
                                sm:mt-5
                                sm:text-3xl
                                md:text-4xl
                                lg:text-5xl
                            ">
                                AI Resume Analyzer
                            </h1>

                            {/* DESCRIPTION */}

                            <p className="
                                mx-auto
                                mt-3
                                w-full
                                max-w-2xl
                                px-2
                                text-xs
                                leading-5
                                text-slate-500
                                sm:mt-4
                                sm:px-0
                                sm:text-sm
                                sm:leading-6
                                md:text-base
                            ">
                                Upload your resume and get
                                AI-powered ATS scoring,
                                skill analysis and
                                personalized career
                                suggestions.
                            </p>

                        </div>

                    </div>

                </section>

                {/* =================================================
                    UPLOAD
                ================================================== */}

                <section className="
                    w-full
                    px-4
                    pb-8
                    sm:px-6
                    sm:pb-10
                    lg:px-8
                ">

                    <div className="
                        mx-auto
                        w-full
                        max-w-3xl
                    ">

                        <div className="
                            w-full
                            rounded-md
                            border
                            border-slate-800
                            bg-slate-900
                            p-4
                            shadow-xl
                            shadow-black/20
                            sm:p-6
                            md:p-8
                        ">

                            {/* CARD HEADER */}

                            <div className="text-center">

                                <div className="
                                    mx-auto
                                    flex
                                    h-14
                                    w-14
                                    items-center
                                    justify-center
                                    rounded-md
                                    bg-slate-950
                                    text-2xl
                                    ring-1
                                    ring-indigo-500/20
                                    sm:h-16
                                    sm:w-16
                                    sm:text-3xl
                                ">
                                    📄
                                </div>

                                <h2 className="
                                    mt-4
                                    text-xl
                                    font-bold
                                    text-white
                                    sm:text-2xl
                                ">
                                    Upload Your Resume
                                </h2>

                                <p className="
                                    mt-2
                                    text-xs
                                    text-slate-500
                                    sm:text-sm
                                ">
                                    PDF format only • Maximum
                                    5 MB
                                </p>

                            </div>

                            {/* DROP AREA */}

                            <label
                                htmlFor="resume"
                                className="
                                    mt-6
                                    block
                                    w-full
                                    cursor-pointer
                                    rounded-md
                                    border-2
                                    border-dashed
                                    border-slate-700
                                    bg-slate-950/60
                                    px-4
                                    py-8
                                    text-center
                                    transition
                                    hover:border-indigo-500/70
                                    hover:bg-indigo-500/5
                                    sm:px-6
                                    sm:py-10
                                    md:py-12
                                "
                            >

                                <div className="
                                    mx-auto
                                    flex
                                    h-11
                                    w-11
                                    items-center
                                    justify-center
                                    rounded-md
                                    bg-slate-900
                                    text-xl
                                    ring-1
                                    ring-slate-800
                                    sm:h-12
                                    sm:w-12
                                    sm:text-2xl
                                ">
                                    ☁️
                                </div>

                                <p className="
                                    mt-4
                                    text-sm
                                    font-semibold
                                    text-slate-200
                                    sm:text-base
                                ">
                                    Click to choose your resume
                                </p>

                                <p className="
                                    mt-2
                                    text-xs
                                    text-slate-500
                                ">
                                    Upload a PDF resume up to
                                    5 MB
                                </p>

                                <input
                                    id="resume"
                                    type="file"
                                    accept=".pdf,application/pdf"
                                    onChange={
                                        handleFileChange
                                    }
                                    className="hidden"
                                />

                            </label>

                            {/* FILE */}

                            {file && (
                                <div className="
                                    mt-4
                                    flex
                                    w-full
                                    flex-col
                                    gap-3
                                    rounded-md
                                    border
                                    border-slate-800
                                    bg-slate-950
                                    p-4
                                    sm:flex-row
                                    sm:items-center
                                    sm:justify-between
                                ">

                                    <div className="
                                        flex
                                        min-w-0
                                        items-center
                                        gap-3
                                    ">

                                        <div className="
                                            flex
                                            h-10
                                            w-10
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-md
                                            bg-red-500/10
                                        ">
                                            📄
                                        </div>

                                        <div className="min-w-0">

                                            <p className="
                                                truncate
                                                text-sm
                                                font-semibold
                                                text-slate-200
                                            ">
                                                {file.name}
                                            </p>

                                            <p className="
                                                mt-1
                                                text-xs
                                                text-slate-500
                                            ">
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
                                        type="button"
                                        onClick={removeFile}
                                        className="
                                            self-end
                                            rounded-md
                                            px-2
                                            py-1
                                            text-xs
                                            font-semibold
                                            text-red-400
                                            transition
                                            hover:bg-red-500/10
                                            hover:text-red-300
                                            sm:self-auto
                                        "
                                    >
                                        Remove
                                    </button>

                                </div>
                            )}

                            {/* TARGET ROLE */}

                            <div className="mt-5">

                                <label
                                    htmlFor="targetRole"
                                    className="
                                        mb-2
                                        block
                                        text-sm
                                        font-semibold
                                        text-slate-200
                                    "
                                >
                                    Target Job Role
                                </label>

                                <select
                                    id="targetRole"
                                    value={targetRole}
                                    onChange={(e) =>
                                        setTargetRole(
                                            e.target.value
                                        )
                                    }
                                    className="
                                        w-full
                                        rounded-md
                                        border
                                        border-slate-700
                                        bg-slate-950
                                        px-4
                                        py-3
                                        text-sm
                                        text-slate-200
                                        outline-none
                                        transition
                                        focus:border-indigo-500
                                        focus:ring-2
                                        focus:ring-indigo-500/20
                                    "
                                >

                                    {roles.map((role) => (
                                        <option
                                            key={role}
                                            value={role}
                                            className="bg-slate-900"
                                        >
                                            {role}
                                        </option>
                                    ))}

                                </select>

                                <p className="
                                    mt-2
                                    text-xs
                                    text-slate-500
                                ">
                                    AI will compare your resume
                                    with this job role.
                                </p>

                            </div>

                            {/* UPLOAD */}

                            <button
                                type="button"
                                onClick={handleUpload}
                                disabled={!file || loading}
                                className="
                                    mt-5
                                    flex
                                    w-full
                                    items-center
                                    justify-center
                                    rounded-md
                                    bg-indigo-600
                                    px-5
                                    py-3.5
                                    text-sm
                                    font-bold
                                    text-white
                                    transition
                                    hover:bg-indigo-500
                                    active:scale-[0.99]
                                    disabled:cursor-not-allowed
                                    disabled:bg-slate-700
                                    disabled:text-slate-500
                                "
                            >

                                {loading ? (
                                    <>
                                        <span className="mr-2 animate-spin">
                                            ⏳
                                        </span>

                                        Uploading Resume...
                                    </>
                                ) : (
                                    "Upload Resume"
                                )}

                            </button>

                            {/* MESSAGE */}

                            {message && (
                                <div className="
                                    mt-4
                                    rounded-md
                                    border
                                    border-emerald-500/20
                                    bg-emerald-500/10
                                    px-4
                                    py-3
                                    text-center
                                    text-xs
                                    font-medium
                                    text-emerald-400
                                ">
                                    {message}
                                </div>
                            )}

                            {/* ERROR */}

                            {error && (
                                <div className="
                                    mt-4
                                    rounded-md
                                    border
                                    border-red-500/20
                                    bg-red-500/10
                                    px-4
                                    py-3
                                    text-center
                                    text-xs
                                    font-medium
                                    text-red-400
                                ">
                                    {error}
                                </div>
                            )}

                        </div>

                    </div>

                </section>

                {/* =================================================
                    UPLOADED RESUME
                ================================================== */}

                {resume && (
                    <section className="
                        px-4
                        pb-8
                        sm:px-6
                        lg:px-8
                    ">

                        <div className="
                            mx-auto
                            w-full
                            max-w-3xl
                        ">

                            <div className="
                                rounded-md
                                border
                                border-slate-800
                                bg-slate-900
                                p-5
                                shadow-xl
                                shadow-black/20
                                sm:p-7
                                md:p-8
                            ">

                                <div className="
                                    flex
                                    flex-col
                                    gap-4
                                    sm:flex-row
                                    sm:items-center
                                    sm:justify-between
                                ">

                                    <div className="
                                        flex
                                        min-w-0
                                        items-center
                                        gap-3
                                    ">

                                        <div className="
                                            flex
                                            h-12
                                            w-12
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-md
                                            bg-emerald-500/10
                                            text-xl
                                        ">
                                            ✓
                                        </div>

                                        <div className="min-w-0">

                                            <p className="
                                                text-xs
                                                font-semibold
                                                text-emerald-400
                                            ">
                                                Resume Uploaded
                                            </p>

                                            <h2 className="
                                                mt-1
                                                truncate
                                                text-sm
                                                font-bold
                                                text-white
                                                sm:text-base
                                            ">
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
                                            className="
                                                rounded-md
                                                px-2
                                                py-2
                                                text-sm
                                                font-semibold
                                                text-indigo-400
                                                transition
                                                hover:bg-indigo-500/10
                                                hover:text-indigo-300
                                            "
                                        >
                                            View Resume →
                                        </a>
                                    )}

                                </div>

                                <button
                                    type="button"
                                    onClick={handleAnalyze}
                                    disabled={analyzing}
                                    className="
                                        mt-6
                                        flex
                                        w-full
                                        items-center
                                        justify-center
                                        rounded-md
                                        bg-white
                                        px-5
                                        py-3.5
                                        text-sm
                                        font-bold
                                        text-slate-950
                                        transition
                                        hover:bg-slate-200
                                        disabled:cursor-not-allowed
                                        disabled:bg-slate-700
                                        disabled:text-slate-500
                                    "
                                >

                                    {analyzing ? (
                                        <>
                                            <span className="mr-2 animate-spin">
                                                ⏳
                                            </span>

                                            AI is analyzing your
                                            resume...
                                        </>
                                    ) : (
                                        "✦ Analyze Resume with AI"
                                    )}

                                </button>

                                {resume.extractedText && (
                                    <details className="mt-5">

                                        <summary className="
                                            cursor-pointer
                                            rounded-md
                                            px-1
                                            py-2
                                            text-sm
                                            font-semibold
                                            text-slate-300
                                            hover:text-white
                                        ">
                                            View Extracted Resume
                                            Text
                                        </summary>

                                        <div className="
                                            mt-3
                                            max-h-80
                                            overflow-y-auto
                                            rounded-md
                                            border
                                            border-slate-800
                                            bg-slate-950
                                            p-4
                                            sm:p-5
                                        ">

                                            <p className="
                                                whitespace-pre-wrap
                                                text-sm
                                                leading-6
                                                text-slate-500
                                            ">
                                                {
                                                    resume.extractedText
                                                }
                                            </p>

                                        </div>

                                    </details>
                                )}

                            </div>

                        </div>

                    </section>
                )}

                {/* =================================================
                    AI ANALYSIS
                ================================================== */}

                {analysis && (
                    <section className="
                        px-4
                        pb-10
                        sm:px-6
                        sm:pb-12
                        lg:px-8
                    ">

                        <div className="
                            mx-auto
                            w-full
                            max-w-6xl
                        ">

                            {/* RESULTS HEADER */}

                            <div className="
                                mb-6
                                flex
                                flex-col
                                gap-4
                                sm:mb-7
                                lg:flex-row
                                lg:items-end
                                lg:justify-between
                            ">

                                <div className="min-w-0">

                                    <div className="
                                        inline-flex
                                        items-center
                                        gap-2
                                        rounded-md
                                        border
                                        border-purple-500/20
                                        bg-purple-500/10
                                        px-3
                                        py-1.5
                                        text-[10px]
                                        font-semibold
                                        text-purple-300
                                        sm:text-xs
                                    ">
                                        <span>✦</span>
                                        AI Analysis Complete
                                    </div>

                                    <h2 className="
                                        mt-3
                                        text-2xl
                                        font-bold
                                        text-white
                                        sm:text-3xl
                                    ">
                                        Your Resume Analysis
                                    </h2>

                                    <p className="
                                        mt-2
                                        text-xs
                                        text-slate-500
                                        sm:text-sm
                                    ">
                                        Here's what AI found in
                                        your resume.
                                    </p>

                                </div>

                                <button
                                    type="button"
                                    onClick={
                                        handleOpenFullAnalysis
                                    }
                                    className="
                                        w-full
                                        rounded-md
                                        bg-indigo-600
                                        px-5
                                        py-3
                                        text-sm
                                        font-bold
                                        text-white
                                        transition
                                        hover:bg-indigo-500
                                        sm:w-auto
                                    "
                                >
                                    Open Full Analysis →
                                </button>

                            </div>

                            {/* SCORES */}

                            <div className="
                                grid
                                grid-cols-1
                                gap-4
                                lg:grid-cols-2
                            ">

                                {/* ATS */}

                                <div className="
                                    rounded-md
                                    border
                                    border-slate-800
                                    bg-slate-900
                                    p-5
                                    sm:p-7
                                ">

                                    <p className="
                                        text-xs
                                        font-semibold
                                        uppercase
                                        tracking-wider
                                        text-slate-500
                                    ">
                                        ATS Score
                                    </p>

                                    <div className="
                                        mt-3
                                        flex
                                        items-end
                                        gap-2
                                    ">

                                        <span className="
                                            text-5xl
                                            font-bold
                                            text-indigo-400
                                            sm:text-6xl
                                        ">
                                            {atsScore}
                                        </span>

                                        <span className="
                                            mb-2
                                            text-sm
                                            text-slate-600
                                        ">
                                            /100
                                        </span>

                                    </div>

                                    <p className="
                                        mt-2
                                        text-sm
                                        font-semibold
                                        text-slate-300
                                    ">
                                        {getScoreText(atsScore)}
                                    </p>

                                    <div className="
                                        mt-5
                                        h-2
                                        overflow-hidden
                                        rounded-md
                                        bg-slate-800
                                    ">

                                        <div
                                            className="
                                                h-full
                                                rounded-md
                                                bg-indigo-500
                                                transition-all
                                                duration-700
                                            "
                                            style={{
                                                width: `${atsScore}%`,
                                            }}
                                        />

                                    </div>

                                </div>

                                {/* JOB MATCH */}

                                <div className="
                                    rounded-md
                                    border
                                    border-slate-800
                                    bg-slate-900
                                    p-5
                                    sm:p-7
                                ">

                                    <p className="
                                        text-xs
                                        font-semibold
                                        uppercase
                                        tracking-wider
                                        text-slate-500
                                    ">
                                        Target Role Match
                                    </p>

                                    <div className="
                                        mt-3
                                        flex
                                        items-start
                                        justify-between
                                        gap-4
                                    ">

                                        <div className="min-w-0">

                                            <h3 className="
                                                break-words
                                                text-lg
                                                font-bold
                                                text-white
                                                sm:text-xl
                                            ">
                                                {analysis
                                                    .jobRoleMatch
                                                    ?.role ||
                                                    targetRole}
                                            </h3>

                                        </div>

                                        <span className="
                                            shrink-0
                                            text-3xl
                                            font-bold
                                            text-indigo-400
                                            sm:text-4xl
                                        ">
                                            {jobMatchScore}%
                                        </span>

                                    </div>

                                    <p className="
                                        mt-5
                                        text-sm
                                        leading-6
                                        text-slate-400
                                    ">
                                        {analysis
                                            .jobRoleMatch
                                            ?.reason ||
                                            "No reason available."}
                                    </p>

                                </div>

                            </div>

                            {/* SUMMARY */}

                            <div className="
                                mt-4
                                rounded-md
                                border
                                border-slate-800
                                bg-slate-900
                                p-5
                                sm:p-7
                            ">

                                <h2 className="
                                    text-lg
                                    font-bold
                                    text-white
                                    sm:text-xl
                                ">
                                    📋 Resume Summary
                                </h2>

                                <p className="
                                    mt-4
                                    text-sm
                                    leading-7
                                    text-slate-400
                                ">
                                    {analysis.summary ||
                                        "No summary available."}
                                </p>

                            </div>

                            {/* EXPERIENCE */}

                            <div className="
                                mt-4
                                rounded-md
                                border
                                border-slate-800
                                bg-slate-900
                                p-5
                                sm:p-7
                            ">

                                <div className="
                                    flex
                                    items-center
                                    justify-between
                                    gap-4
                                ">

                                    <div className="min-w-0">

                                        <p className="
                                            text-xs
                                            font-semibold
                                            uppercase
                                            tracking-wider
                                            text-slate-500
                                        ">
                                            Detected Experience
                                            Level
                                        </p>

                                        <h2 className="
                                            mt-2
                                            break-words
                                            text-xl
                                            font-bold
                                            text-white
                                            sm:text-2xl
                                        ">
                                            {analysis
                                                .experienceLevel ||
                                                "Not detected"}
                                        </h2>

                                    </div>

                                    <div className="
                                        flex
                                        h-11
                                        w-11
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-md
                                        bg-indigo-500/10
                                        text-xl
                                    ">
                                        🎓
                                    </div>

                                </div>

                            </div>

                            {/* SKILLS */}

                            <div className="
                                mt-4
                                rounded-md
                                border
                                border-slate-800
                                bg-slate-900
                                p-5
                                sm:p-7
                            ">

                                <h2 className="
                                    text-lg
                                    font-bold
                                    text-white
                                    sm:text-xl
                                ">
                                    🛠️ Detected Skills
                                </h2>

                                <div className="
                                    mt-4
                                    flex
                                    flex-wrap
                                    gap-2
                                ">

                                    {analysis.skills?.length > 0 ? (
                                        analysis.skills.map(
                                            (
                                                skill,
                                                index
                                            ) => (
                                                <span
                                                    key={index}
                                                    className="
                                                        rounded-md
                                                        border
                                                        border-indigo-500/20
                                                        bg-indigo-500/10
                                                        px-3
                                                        py-1.5
                                                        text-xs
                                                        font-semibold
                                                        text-indigo-300
                                                    "
                                                >
                                                    {skill}
                                                </span>
                                            )
                                        )
                                    ) : (
                                        <p className="
                                            text-sm
                                            text-slate-500
                                        ">
                                            No skills detected.
                                        </p>
                                    )}

                                </div>

                            </div>

                            {/* STRENGTHS / WEAKNESSES */}

                            <div className="
                                mt-4
                                grid
                                grid-cols-1
                                gap-4
                                lg:grid-cols-2
                            ">

                                {/* STRENGTHS */}

                                <div className="
                                    rounded-md
                                    border
                                    border-slate-800
                                    bg-slate-900
                                    p-5
                                    sm:p-7
                                ">

                                    <h2 className="
                                        text-lg
                                        font-bold
                                        text-white
                                        sm:text-xl
                                    ">
                                        💪 Strengths
                                    </h2>

                                    <div className="
                                        mt-4
                                        space-y-3
                                    ">

                                        {analysis.strengths?.length >
                                        0 ? (
                                            analysis.strengths.map(
                                                (
                                                    item,
                                                    index
                                                ) => (
                                                    <div
                                                        key={index}
                                                        className="
                                                            flex
                                                            gap-3
                                                            rounded-md
                                                            border
                                                            border-emerald-500/10
                                                            bg-emerald-500/5
                                                            p-4
                                                        "
                                                    >

                                                        <span className="
                                                            font-bold
                                                            text-emerald-400
                                                        ">
                                                            ✓
                                                        </span>

                                                        <p className="
                                                            min-w-0
                                                            text-sm
                                                            leading-6
                                                            text-slate-400
                                                        ">
                                                            {item}
                                                        </p>

                                                    </div>
                                                )
                                            )
                                        ) : (
                                            <p className="
                                                text-sm
                                                text-slate-500
                                            ">
                                                No strengths detected.
                                            </p>
                                        )}

                                    </div>

                                </div>

                                {/* WEAKNESSES */}

                                <div className="
                                    rounded-md
                                    border
                                    border-slate-800
                                    bg-slate-900
                                    p-5
                                    sm:p-7
                                ">

                                    <h2 className="
                                        text-lg
                                        font-bold
                                        text-white
                                        sm:text-xl
                                    ">
                                        ⚠️ Weaknesses
                                    </h2>

                                    <div className="
                                        mt-4
                                        space-y-3
                                    ">

                                        {analysis.weaknesses?.length >
                                        0 ? (
                                            analysis.weaknesses.map(
                                                (
                                                    item,
                                                    index
                                                ) => (
                                                    <div
                                                        key={index}
                                                        className="
                                                            flex
                                                            gap-3
                                                            rounded-md
                                                            border
                                                            border-orange-500/10
                                                            bg-orange-500/5
                                                            p-4
                                                        "
                                                    >

                                                        <span className="
                                                            font-bold
                                                            text-orange-400
                                                        ">
                                                            !
                                                        </span>

                                                        <p className="
                                                            min-w-0
                                                            text-sm
                                                            leading-6
                                                            text-slate-400
                                                        ">
                                                            {item}
                                                        </p>

                                                    </div>
                                                )
                                            )
                                        ) : (
                                            <p className="
                                                text-sm
                                                text-slate-500
                                            ">
                                                No weaknesses detected.
                                            </p>
                                        )}

                                    </div>

                                </div>

                            </div>

                            {/* MISSING SKILLS */}

                            <div className="
                                mt-4
                                rounded-md
                                border
                                border-slate-800
                                bg-slate-900
                                p-5
                                sm:p-7
                            ">

                                <h2 className="
                                    text-lg
                                    font-bold
                                    text-white
                                    sm:text-xl
                                ">
                                    🎯 Missing Skills
                                </h2>

                                <p className="
                                    mt-2
                                    text-xs
                                    leading-5
                                    text-slate-500
                                    sm:text-sm
                                ">
                                    Skills that may improve your
                                    match for the selected job
                                    role.
                                </p>

                                <div className="
                                    mt-4
                                    flex
                                    flex-wrap
                                    gap-2
                                ">

                                    {analysis.missingSkills?.length >
                                    0 ? (
                                        analysis.missingSkills.map(
                                            (
                                                skill,
                                                index
                                            ) => (
                                                <span
                                                    key={index}
                                                    className="
                                                        rounded-md
                                                        border
                                                        border-red-500/20
                                                        bg-red-500/10
                                                        px-3
                                                        py-1.5
                                                        text-xs
                                                        font-semibold
                                                        text-red-400
                                                    "
                                                >
                                                    + {skill}
                                                </span>
                                            )
                                        )
                                    ) : (
                                        <p className="
                                            text-sm
                                            font-medium
                                            text-emerald-400
                                        ">
                                            Great! No major missing
                                            skills detected.
                                        </p>
                                    )}

                                </div>

                            </div>

                            {/* SUGGESTIONS */}

                            <div className="
                                mt-4
                                rounded-md
                                border
                                border-slate-800
                                bg-slate-900
                                p-5
                                sm:p-7
                            ">

                                <h2 className="
                                    text-lg
                                    font-bold
                                    text-white
                                    sm:text-xl
                                ">
                                    🚀 Improvement Suggestions
                                </h2>

                                <div className="
                                    mt-4
                                    space-y-3
                                ">

                                    {analysis.suggestions?.length >
                                    0 ? (
                                        analysis.suggestions.map(
                                            (
                                                suggestion,
                                                index
                                            ) => (
                                                <div
                                                    key={index}
                                                    className="
                                                        flex
                                                        gap-3
                                                        rounded-md
                                                        border
                                                        border-slate-800
                                                        bg-slate-950
                                                        p-4
                                                        sm:p-5
                                                    "
                                                >

                                                    <div className="
                                                        flex
                                                        h-8
                                                        w-8
                                                        shrink-0
                                                        items-center
                                                        justify-center
                                                        rounded-md
                                                        bg-indigo-600
                                                        text-xs
                                                        font-bold
                                                        text-white
                                                    ">
                                                        {index + 1}
                                                    </div>

                                                    <p className="
                                                        min-w-0
                                                        text-sm
                                                        leading-6
                                                        text-slate-400
                                                    ">
                                                        {suggestion}
                                                    </p>

                                                </div>
                                            )
                                        )
                                    ) : (
                                        <p className="
                                            text-sm
                                            text-slate-500
                                        ">
                                            No suggestions available.
                                        </p>
                                    )}

                                </div>

                            </div>

                            {/* BOTTOM ACTIONS */}

                            <div className="
                                flex
                                flex-col
                                gap-3
                                py-7
                                sm:flex-row
                                sm:justify-center
                            ">

                                <button
                                    type="button"
                                    onClick={
                                        handleOpenFullAnalysis
                                    }
                                    className="
                                        w-full
                                        rounded-md
                                        bg-indigo-600
                                        px-7
                                        py-3
                                        text-sm
                                        font-bold
                                        text-white
                                        transition
                                        hover:bg-indigo-500
                                        sm:w-auto
                                    "
                                >
                                    Open Full Analysis →
                                </button>

                                <button
                                    type="button"
                                    onClick={
                                        handleNewAnalysis
                                    }
                                    className="
                                        w-full
                                        rounded-md
                                        border
                                        border-slate-700
                                        bg-slate-900
                                        px-7
                                        py-3
                                        text-sm
                                        font-semibold
                                        text-slate-300
                                        transition
                                        hover:border-slate-600
                                        hover:bg-slate-800
                                        sm:w-auto
                                    "
                                >
                                    Analyze Another Resume
                                </button>

                            </div>

                        </div>

                    </section>
                )}

            </main>

        </div>
    );
}

export default ResumeAnalyzer;