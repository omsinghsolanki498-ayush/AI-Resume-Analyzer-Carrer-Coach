import React from "react";
import { useNavigate } from "react-router-dom";

function Footer() {
    const navigate = useNavigate();

    return (
        <footer className="border-t border-slate-800 bg-slate-950 text-slate-300">
            <div className="mx-auto w-full max-w-[1400px] px-4 py-8 sm:px-6 sm:py-10 lg:px-8">

                {/* =========================================
                    FOOTER MAIN
                ========================================= */}

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">

                    {/* =====================================
                        BRAND
                    ===================================== */}

                    <div className="sm:col-span-2 lg:col-span-1">

                        <button
                            type="button"
                            onClick={() => navigate("/dashboard")}
                            className="text-xl font-black tracking-tight text-white transition hover:text-indigo-400"
                        >
                            Resume
                            <span className="text-indigo-500">
                                AI
                            </span>
                        </button>

                        <p className="mt-3 max-w-sm text-sm leading-6 text-slate-500">
                            Build better resumes, improve your career
                            skills, and get personalized guidance with
                            AI-powered tools.
                        </p>

                        {/* SOCIAL */}

                        <div className="mt-5 flex items-center gap-2.5">

                            {/* GitHub */}

                            <a
                                href="#"
                                aria-label="GitHub"
                                className="
                                    flex
                                    h-9
                                    w-9
                                    items-center
                                    justify-center
                                    rounded-md
                                    border
                                    border-slate-800
                                    bg-slate-900
                                    text-slate-500
                                    transition
                                    hover:border-indigo-500/40
                                    hover:bg-indigo-500/10
                                    hover:text-indigo-400
                                "
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    className="h-4 w-4"
                                    fill="currentColor"
                                >
                                    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2.1c-3.2.7-3.87-1.36-3.87-1.36-.53-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.74 2.68 1.24 3.33.95.1-.74.4-1.24.73-1.52-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.47.11-3.06 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.77.11 3.06.73.81 1.18 1.84 1.18 3.1 0 4.41-2.69 5.38-5.25 5.67.41.35.78 1.05.78 2.12v3.14c0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
                                </svg>
                            </a>

                            {/* LinkedIn */}

                            <a
                                href="#"
                                aria-label="LinkedIn"
                                className="
                                    flex
                                    h-9
                                    w-9
                                    items-center
                                    justify-center
                                    rounded-md
                                    border
                                    border-slate-800
                                    bg-slate-900
                                    text-slate-500
                                    transition
                                    hover:border-indigo-500/40
                                    hover:bg-indigo-500/10
                                    hover:text-indigo-400
                                "
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    className="h-4 w-4"
                                    fill="currentColor"
                                >
                                    <path d="M20.45 20.45h-3.56v-5.58c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.68H9.35V8.99h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.29ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM3.56 20.45h3.57V8.99H3.56v11.46Z" />
                                </svg>
                            </a>

                            {/* X */}

                            <a
                                href="#"
                                aria-label="X"
                                className="
                                    flex
                                    h-9
                                    w-9
                                    items-center
                                    justify-center
                                    rounded-md
                                    border
                                    border-slate-800
                                    bg-slate-900
                                    text-sm
                                    font-bold
                                    text-slate-500
                                    transition
                                    hover:border-indigo-500/40
                                    hover:bg-indigo-500/10
                                    hover:text-indigo-400
                                "
                            >
                                X
                            </a>

                        </div>
                    </div>

                    {/* =====================================
                        CAREER
                    ===================================== */}

                    <div>
                        <h3 className="text-sm font-bold text-white">
                            Career
                        </h3>

                        <ul className="mt-4 space-y-2.5">

                            <li>
                                <button
                                    onClick={() => navigate("/resume-analyzer")}
                                    className="text-sm text-slate-500 transition hover:text-indigo-400"
                                >
                                    Resume Analyzer
                                </button>
                            </li>

                            <li>
                                <button
                                    onClick={() => navigate("/career-coach")}
                                    className="text-sm text-slate-500 transition hover:text-indigo-400"
                                >
                                    AI Career Coach
                                </button>
                            </li>

                            <li>
                                <button
                                    onClick={() => navigate("/roadmap")}
                                    className="text-sm text-slate-500 transition hover:text-indigo-400"
                                >
                                    Career Roadmap
                                </button>
                            </li>

                            <li>
                                <button
                                    onClick={() => navigate("/dashboard")}
                                    className="text-sm text-slate-500 transition hover:text-indigo-400"
                                >
                                    Dashboard
                                </button>
                            </li>

                        </ul>
                    </div>

                    {/* =====================================
                        RESOURCES
                    ===================================== */}

                    <div>
                        <h3 className="text-sm font-bold text-white">
                            Resources
                        </h3>

                        <ul className="mt-4 space-y-2.5">

                            <li>
                                <button
                                    onClick={() => navigate("/resume-analyzer")}
                                    className="text-sm text-slate-500 transition hover:text-indigo-400"
                                >
                                    Resume Tips
                                </button>
                            </li>

                            <li>
                                <button
                                    onClick={() => navigate("/career-coach")}
                                    className="text-sm text-slate-500 transition hover:text-indigo-400"
                                >
                                    Interview Preparation
                                </button>
                            </li>

                            <li>
                                <button
                                    onClick={() => navigate("/career-coach")}
                                    className="text-sm text-slate-500 transition hover:text-indigo-400"
                                >
                                    Career Guidance
                                </button>
                            </li>

                            <li>
                                <button
                                    onClick={() => navigate("/roadmap")}
                                    className="text-sm text-slate-500 transition hover:text-indigo-400"
                                >
                                    Skill Roadmap
                                </button>
                            </li>

                        </ul>
                    </div>

                    {/* =====================================
                        PRODUCT
                    ===================================== */}

                    <div>
                        <h3 className="text-sm font-bold text-white">
                            Product
                        </h3>

                        <ul className="mt-4 space-y-2.5">

                            <li>
                                <button
                                    onClick={() => navigate("/dashboard")}
                                    className="text-sm text-slate-500 transition hover:text-indigo-400"
                                >
                                    Features
                                </button>
                            </li>

                            <li>
                                <button
                                    onClick={() => navigate("/dashboard")}
                                    className="text-sm text-slate-500 transition hover:text-indigo-400"
                                >
                                    AI Tools
                                </button>
                            </li>

                            <li>
                                <button
                                    onClick={() => navigate("/dashboard")}
                                    className="text-sm text-slate-500 transition hover:text-indigo-400"
                                >
                                    Resume Analysis
                                </button>
                            </li>

                            <li>
                                <button
                                    onClick={() => navigate("/jobs")}
                                    className="text-sm text-slate-500 transition hover:text-indigo-400"
                                >
                                    Job Matching
                                </button>
                            </li>

                        </ul>
                    </div>

                </div>

                {/* =========================================
                    BOTTOM
                ========================================= */}

                <div className="mt-8 border-t border-slate-800 pt-5">

                    <div className="flex flex-col items-center justify-between gap-2 text-center sm:flex-row sm:text-left">

                        <p className="text-xs text-slate-600">
                            © {new Date().getFullYear()} ResumeAI. All rights reserved.
                        </p>

                        <p className="text-xs text-slate-600">
                            AI-powered career assistant
                        </p>

                    </div>

                </div>

            </div>
        </footer>
    );
}

export default Footer;