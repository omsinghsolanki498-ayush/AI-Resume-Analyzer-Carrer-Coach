import React from "react";
import { useNavigate } from "react-router-dom";

import { useDashboard } from "../context/DashboardContext.jsx";
import StatCard from "../Components/StatCard";
import Footer from "../Components/Footer";

function Result() {
    const navigate = useNavigate();

    const {
        resumes = [],
        averageScore = 0,
        totalSkills = 0,
        experience = "Not detected",
    } = useDashboard();

    return (
        <div className="flex min-h-screen w-full flex-col overflow-x-hidden bg-slate-950 text-slate-100">

            {/* ==========================================
                NAVBAR
            ========================================== */}

            <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/95 backdrop-blur-md">

                <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">

                    {/* LOGO */}

                    <button
                        type="button"
                        onClick={() => navigate("/dashboard")}
                        className="
                            shrink-0
                            text-lg
                            font-black
                            tracking-tight
                            text-white
                            transition
                            hover:text-indigo-400
                            sm:text-xl
                        "
                    >
                        Resume
                        <span className="text-indigo-500">
                            AI
                        </span>
                    </button>

                    {/* DASHBOARD BUTTON */}

                    <button
                        type="button"
                        onClick={() => navigate("/dashboard")}
                        className="
                            inline-flex
                            min-h-9
                            items-center
                            justify-center
                            gap-1.5
                            rounded-md
                           
                           
                           
                            px-3
                            text-xs
                            font-semibold
                            text-slate-300
                            transition
                         
                            active:scale-[0.98]
                            sm:min-h-10
                            sm:px-4
                            sm:text-sm
                        "
                    >
                        <span>←</span>

                        <span>
                            Dashboard
                        </span>
                    </button>

                </div>

            </header>


            {/* ==========================================
                MAIN
            ========================================== */}

            <main className="flex-1">

                <div
                    className="
                        mx-auto
                        w-full
                        max-w-5xl
                        px-4
                        py-10
                        sm:px-6
                        sm:py-12
                        lg:px-8
                        lg:py-16
                    "
                >

                    {/* ==========================================
                        RESULT CONTENT
                    ========================================== */}

                    <div className="mx-auto w-full max-w-5xl">

                        {/* RESULT HEADER */}

                        <section className="mx-auto w-full text-center">

                            <p
                                className="
                                    text-[10px]
                                    font-bold
                                    uppercase
                                    tracking-[0.2em]
                                    text-indigo-400
                                    sm:text-xs
                                "
                            >
                                Resume Results
                            </p>

                            <h1
                                className="
                                    mt-2
                                    text-2xl
                                    font-bold
                                    tracking-tight
                                    text-white
                                    sm:text-3xl
                                    lg:text-4xl
                                "
                            >
                                Your Resume Results
                            </h1>

                            <p
                                className="
                                    mx-auto
                                    mt-2
                                    max-w-lg
                                    text-xs
                                    leading-5
                                    text-slate-400
                                    sm:text-sm
                                    sm:leading-6
                                "
                            >
                                Review your resume performance,
                                ATS score, skills and experience.
                            </p>

                        </section>


                        {/* ==========================================
                            RESULT CARDS
                        ========================================== */}

                        <section className="mx-auto mt-8 w-full sm:mt-10">

                            <div
                                className="
                                    mx-auto
                                    grid
                                    w-full
                                    grid-cols-1
                                    gap-4
                                    sm:grid-cols-2
                                    lg:grid-cols-4
                                "
                            >

                                {/* RESUMES */}

                                <div
                                    className="
                                        min-w-0
                                        overflow-hidden
                                        rounded-md
                                        border
                                        border-slate-800
                                        bg-slate-900
                                        p-1
                                        shadow-[0_8px_30px_rgba(0,0,0,0.18)]
                                        transition
                                        duration-200
                                        hover:-translate-y-1
                                        hover:border-indigo-500/40
                                        hover:shadow-[0_12px_35px_rgba(0,0,0,0.25)]
                                    "
                                >
                                    <StatCard
                                        icon="▤"
                                        iconClass="
                                            border-indigo-500/20
                                            bg-indigo-500/10
                                            text-indigo-400
                                        "
                                        label="RESUMES"
                                        value={resumes.length}
                                    />
                                </div>


                                {/* ATS SCORE */}

                                <div
                                    className="
                                        min-w-0
                                        overflow-hidden
                                        rounded-md
                                        border
                                        border-slate-800
                                        bg-slate-900
                                        p-1
                                        shadow-[0_8px_30px_rgba(0,0,0,0.18)]
                                        transition
                                        duration-200
                                        hover:-translate-y-1
                                        hover:border-emerald-500/40
                                        hover:shadow-[0_12px_35px_rgba(0,0,0,0.25)]
                                    "
                                >
                                    <StatCard
                                        icon="✓"
                                        iconClass="
                                            border-emerald-500/20
                                            bg-emerald-500/10
                                            text-emerald-400
                                        "
                                        label="ATS SCORE"
                                        value={`${averageScore}%`}
                                    />
                                </div>


                                {/* SKILLS */}

                                <div
                                    className="
                                        min-w-0
                                        overflow-hidden
                                        rounded-md
                                        border
                                        border-slate-800
                                        bg-slate-900
                                        p-1
                                        shadow-[0_8px_30px_rgba(0,0,0,0.18)]
                                        transition
                                        duration-200
                                        hover:-translate-y-1
                                        hover:border-violet-500/40
                                        hover:shadow-[0_12px_35px_rgba(0,0,0,0.25)]
                                    "
                                >
                                    <StatCard
                                        icon="✦"
                                        iconClass="
                                            border-violet-500/20
                                            bg-violet-500/10
                                            text-violet-400
                                        "
                                        label="SKILLS"
                                        value={
                                            totalSkills > 0
                                                ? totalSkills
                                                : "Not detected"
                                        }
                                    />
                                </div>


                                {/* EXPERIENCE */}

                                <div
                                    className="
                                        min-w-0
                                        overflow-hidden
                                        rounded-md
                                        border
                                        border-slate-800
                                        bg-slate-900
                                        p-1
                                        shadow-[0_8px_30px_rgba(0,0,0,0.18)]
                                        transition
                                        duration-200
                                        hover:-translate-y-1
                                        hover:border-amber-500/40
                                        hover:shadow-[0_12px_35px_rgba(0,0,0,0.25)]
                                    "
                                >
                                    <StatCard
                                        icon="★"
                                        iconClass="
                                            border-amber-500/20
                                            bg-amber-500/10
                                            text-amber-400
                                        "
                                        label="EXPERIENCE"
                                        value={experience}
                                    />
                                </div>

                            </div>

                        </section>

                    </div>

                </div>

            </main>


            {/* ==========================================
                FOOTER
            ========================================== */}

            <footer className="mt-auto border-t border-slate-800 bg-slate-950">

                <div
                    className="
                        mx-auto
                        w-full
                        max-w-7xl
                        px-4
                        sm:px-6
                        lg:px-8
                    "
                >
                    <Footer />
                </div>

            </footer>

        </div>
    );
}

export default Result;