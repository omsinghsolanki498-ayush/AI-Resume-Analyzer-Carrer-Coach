import { useNavigate } from "react-router-dom";

import DashboardSidebar from "../Components/DashboardSidebar";
import Footer from "../Components/Footer";

import { useDashboard } from "../context/DashboardContext.jsx";

function Dashboard() {
    const navigate = useNavigate();

    const dashboard = useDashboard();

    const resumes = Array.isArray(dashboard?.resumes)
        ? dashboard.resumes
        : [];

    const loading = dashboard?.loading ?? false;
    const error = dashboard?.error ?? "";

    const averageScore = dashboard?.averageScore ?? 0;
    const totalSkills = dashboard?.totalSkills ?? 0;

    const experience =
        dashboard?.experience || "Not detected";

    const deleteResume = dashboard?.deleteResume;
    const refreshResumes = dashboard?.refreshResumes;

    const goToAnalyzer = () => {
        navigate("/resume-analyzer");
    };

    /* =========================================================
       LOADING STATE
    ========================================================= */

    if (loading) {
        return (
            <div className="min-h-screen w-full bg-slate-950 text-slate-300">

                {/* SIDEBAR / NAVBAR */}
                <DashboardSidebar />

                {/* LOADING CONTENT */}
                <main className="w-full">
                    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">

                        <div className="animate-pulse">

                            <div className="h-3 w-20 rounded-full bg-slate-800" />

                            <div className="mt-4 h-8 w-56 rounded-lg bg-slate-800 sm:h-10 sm:w-72" />

                            <div className="mt-3 h-4 w-full max-w-lg rounded bg-slate-800" />

                            {/* Stats */}
                            <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
                                {[1, 2, 3, 4].map((item) => (
                                    <div
                                        key={item}
                                        className="h-[120px] rounded-2xl bg-slate-800 sm:h-[130px]"
                                    />
                                ))}
                            </div>

                            {/* Resume */}
                            <div className="mt-8 h-64 rounded-2xl bg-slate-800" />

                        </div>

                    </div>
                </main>

                <Footer />

            </div>
        );
    }

    /* =========================================================
       MAIN DASHBOARD
    ========================================================= */

    return (
        <div className="min-h-screen w-full overflow-x-hidden bg-slate-950 text-slate-300">

            {/* =================================================
               SIDEBAR / NAVBAR
            ================================================= */}

            <DashboardSidebar />

            {/* =================================================
               MAIN
            ================================================= */}

            <main className="w-full">

                {/* =================================================
                   DASHBOARD INTRO
                ================================================= */}

                <section className="w-full px-4 pt-8 sm:px-6 sm:pt-10 lg:px-8">

                    <div className="mx-auto w-full max-w-6xl">

                        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

                            {/* INTRO TEXT */}

                            <div className="text-center sm:text-left">

                                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-indigo-400 sm:text-xs">
                                    Dashboard
                                </p>

                                <h1 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
                                    Welcome to your career dashboard
                                </h1>

                                <p className="mx-auto mt-2 max-w-xl text-xs leading-5 text-slate-400 sm:mx-0 sm:text-sm sm:leading-6">
                                    Analyze your resume, improve your ATS score
                                    and build a stronger career profile with AI.
                                </p>

                            </div>

                            {/* RESUME COUNT */}

                            <div className="flex justify-center sm:justify-end">

                                <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900 px-3 py-1.5 text-[10px] font-medium text-slate-400 sm:text-xs">

                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

                                    {resumes.length} resume
                                    {resumes.length === 1 ? "" : "s"} analyzed

                                </div>

                            </div>

                        </div>

                    </div>

                </section>

                {/* =================================================
                   HERO
                ================================================= */}

                <section
                    className="
                        relative
                        flex
                        min-h-[calc(100vh-56px)]
                        w-full
                        items-center
                        justify-center
                        overflow-hidden
                        sm:min-h-[calc(100vh-64px)]
                    "
                >

                    {/* BACKGROUND GLOW */}

                    <div
                        className="
                            pointer-events-none
                            absolute
                            left-1/2
                            top-0
                            h-48
                            w-48
                            -translate-x-1/2
                            rounded-full
                            bg-indigo-600/15
                            blur-[80px]
                            sm:h-64
                            sm:w-64
                            lg:h-80
                            lg:w-80
                        "
                    />

                    {/* HERO CONTENT */}

                    <div
                        className="
                            relative
                            z-10
                            mx-auto
                            flex
                            w-full
                            max-w-5xl
                            flex-col
                            items-center
                            justify-center
                            px-4
                            py-10
                            text-center
                            sm:px-6
                            sm:py-12
                            md:py-14
                            lg:px-8
                            lg:py-16
                        "
                    >

                        {/* BADGE */}

                        <div
                            className="
                                inline-flex
                                items-center
                                gap-1.5
                                rounded-full
                                bg-indigo-500/10
                                px-3
                                py-1.5
                                text-[9px]
                                font-semibold
                                uppercase
                                tracking-wider
                                text-indigo-300
                                ring-1
                                ring-indigo-500/20
                                sm:text-[10px]
                                md:text-[11px]
                            "
                        >

                            <span
                                className="
                                    h-1.5
                                    w-1.5
                                    rounded-full
                                    bg-indigo-400
                                "
                            />

                            AI-powered career toolkit

                        </div>

                        {/* HEADING */}

                        <h2
                            className="
                                mt-4
                                w-full
                                max-w-3xl
                                text-center
                                text-[27px]
                                font-bold
                                leading-[1.12]
                                tracking-tight
                                text-slate-50
                                sm:mt-5
                                sm:text-3xl
                                md:text-4xl
                                lg:text-5xl
                            "
                        >

                            Your resume,

                            <span className="block">

                                read the{" "}

                                <span
                                    className="
                                        bg-gradient-to-r
                                        from-indigo-400
                                        to-violet-400
                                        bg-clip-text
                                        text-transparent
                                    "
                                >
                                    way recruiters
                                </span>{" "}

                                read it.

                            </span>

                        </h2>

                        {/* DESCRIPTION */}

                        <p
                            className="
                                mt-3
                                w-full
                                max-w-xl
                                text-center
                                text-[11px]
                                leading-5
                                text-slate-500
                                sm:mt-4
                                sm:text-sm
                                sm:leading-6
                            "
                        >
                            ResumeAI analyzes your resume, finds improvement
                            opportunities and helps you make better career
                            decisions with AI.
                        </p>

                        {/* RESUME ANALYSIS CARD */}

                        <div
                            className="
                                mt-8
                                flex
                                w-full
                                justify-center
                                px-3
                                sm:mt-10
                                sm:px-0
                            "
                        >

                            <div
                                className="
                                    w-full
                                    max-w-[330px]
                                    rounded-2xl
                                    border
                                    border-slate-700/70
                                    bg-slate-900
                                    p-3
                                    text-left
                                    shadow-2xl
                                    shadow-black/40
                                    sm:max-w-[420px]
                                    sm:p-4
                                "
                            >

                                {/* TOP BAR */}

                                <div
                                    className="
                                        flex
                                        items-center
                                        justify-between
                                        border-b
                                        border-slate-800
                                        pb-3
                                    "
                                >

                                    <div className="flex items-center gap-2">

                                        <div
                                            className="
                                                flex
                                                h-7
                                                w-7
                                                items-center
                                                justify-center
                                                rounded-md
                                                bg-indigo-500/10
                                                text-xs
                                                font-bold
                                                text-indigo-400
                                                ring-1
                                                ring-indigo-500/20
                                            "
                                        >
                                            R
                                        </div>

                                        <div>

                                            <div className="h-2 w-20 rounded-full bg-slate-300" />

                                            <div className="mt-1.5 h-1.5 w-14 rounded-full bg-slate-700" />

                                        </div>

                                    </div>

                                    <span
                                        className="
                                            rounded-md
                                            bg-emerald-500/10
                                            px-2
                                            py-1
                                            text-[8px]
                                            font-semibold
                                            text-emerald-400
                                            ring-1
                                            ring-emerald-500/20
                                            sm:text-[9px]
                                        "
                                    >
                                        ANALYZED
                                    </span>

                                </div>

                                {/* SCORE + ANALYSIS */}

                                <div
                                    className="
                                        mt-4
                                        grid
                                        grid-cols-1
                                        gap-3
                                        sm:grid-cols-[105px_1fr]
                                    "
                                >

                                    {/* ATS SCORE */}

                                    <div
                                        className="
                                            flex
                                            flex-col
                                            items-center
                                            justify-center
                                            rounded-xl
                                            border
                                            border-slate-800
                                            bg-slate-950/70
                                            p-3
                                        "
                                    >

                                        <div
                                            className="
                                                flex
                                                h-16
                                                w-16
                                                items-center
                                                justify-center
                                                rounded-full
                                                border-[5px]
                                                border-emerald-500
                                                sm:h-[70px]
                                                sm:w-[70px]
                                            "
                                        >

                                            <span
                                                className="
                                                    text-lg
                                                    font-bold
                                                    text-emerald-400
                                                    sm:text-xl
                                                "
                                            >
                                                92
                                            </span>

                                        </div>

                                        <span
                                            className="
                                                mt-2
                                                text-[8px]
                                                font-semibold
                                                uppercase
                                                tracking-wider
                                                text-slate-500
                                            "
                                        >
                                            ATS Score
                                        </span>

                                        <span className="mt-1 text-[8px] text-emerald-400">
                                            Excellent
                                        </span>

                                    </div>

                                    {/* ANALYSIS DETAILS */}

                                    <div className="space-y-2.5">

                                        {/* KEYWORD */}

                                        <div>

                                            <div className="mb-1 flex items-center justify-between">

                                                <span className="text-[9px] font-medium text-slate-400">
                                                    Keyword Match
                                                </span>

                                                <span className="text-[9px] font-semibold text-indigo-400">
                                                    94%
                                                </span>

                                            </div>

                                            <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">

                                                <div className="h-full w-[94%] rounded-full bg-indigo-500" />

                                            </div>

                                        </div>

                                        {/* EXPERIENCE */}

                                        <div>

                                            <div className="mb-1 flex items-center justify-between">

                                                <span className="text-[9px] font-medium text-slate-400">
                                                    Experience
                                                </span>

                                                <span className="text-[9px] font-semibold text-emerald-400">
                                                    Strong
                                                </span>

                                            </div>

                                            <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">

                                                <div className="h-full w-[88%] rounded-full bg-emerald-500" />

                                            </div>

                                        </div>

                                        {/* FORMATTING */}

                                        <div>

                                            <div className="mb-1 flex items-center justify-between">

                                                <span className="text-[9px] font-medium text-slate-400">
                                                    Formatting
                                                </span>

                                                <span className="text-[9px] font-semibold text-amber-400">
                                                    Good
                                                </span>

                                            </div>

                                            <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">

                                                <div className="h-full w-[82%] rounded-full bg-amber-500" />

                                            </div>

                                        </div>

                                    </div>

                                </div>

                                {/* RESUME SECTIONS */}

                                <div className="mt-4 grid grid-cols-2 gap-2">

                                    {/* SKILLS */}

                                    <div
                                        className="
                                            rounded-lg
                                            border
                                            border-slate-800
                                            bg-slate-950/60
                                            p-2.5
                                        "
                                    >

                                        <div className="flex items-center justify-between">

                                            <span className="text-[8px] font-semibold text-slate-400">
                                                Skills
                                            </span>

                                            <span className="text-[8px] text-emerald-400">
                                                ✓
                                            </span>

                                        </div>

                                        <div className="mt-2 flex gap-1">

                                            <span className="h-1.5 w-10 rounded-full bg-slate-700" />

                                            <span className="h-1.5 w-6 rounded-full bg-slate-700" />

                                        </div>

                                    </div>

                                    {/* EXPERIENCE */}

                                    <div
                                        className="
                                            rounded-lg
                                            border
                                            border-slate-800
                                            bg-slate-950/60
                                            p-2.5
                                        "
                                    >

                                        <div className="flex items-center justify-between">

                                            <span className="text-[8px] font-semibold text-slate-400">
                                                Experience
                                            </span>

                                            <span className="text-[8px] text-emerald-400">
                                                ✓
                                            </span>

                                        </div>

                                        <div className="mt-2 flex gap-1">

                                            <span className="h-1.5 w-12 rounded-full bg-slate-700" />

                                            <span className="h-1.5 w-5 rounded-full bg-slate-700" />

                                        </div>

                                    </div>

                                </div>

                                {/* AI RECOMMENDATION */}

                                <div
                                    className="
                                        mt-3
                                        rounded-lg
                                        border
                                        border-amber-500/20
                                        bg-amber-500/5
                                        p-2.5
                                    "
                                >

                                    <div className="flex items-start gap-2">

                                        <span
                                            className="
                                                flex
                                                h-5
                                                w-5
                                                shrink-0
                                                items-center
                                                justify-center
                                                rounded
                                                bg-amber-500/10
                                                text-[9px]
                                                text-amber-400
                                            "
                                        >
                                            !
                                        </span>

                                        <div>

                                            <p
                                                className="
                                                    text-[8px]
                                                    font-semibold
                                                    text-amber-300
                                                    sm:text-[9px]
                                                "
                                            >
                                                AI Recommendation
                                            </p>

                                            <p
                                                className="
                                                    mt-0.5
                                                    text-[8px]
                                                    leading-4
                                                    text-slate-500
                                                "
                                            >
                                                Add measurable achievements
                                                to strengthen your experience
                                                section.
                                            </p>

                                        </div>

                                    </div>

                                </div>

                                {/* BOTTOM */}

                                <div
                                    className="
                                        mt-3
                                        flex
                                        items-center
                                        justify-between
                                        border-t
                                        border-slate-800
                                        pt-3
                                    "
                                >

                                    <span className="text-[8px] text-slate-600">
                                        Resume Analysis
                                    </span>

                                    <span className="text-[8px] font-medium text-indigo-400">
                                        AI Powered
                                    </span>

                                </div>

                            </div>

                        </div>

                    </div>

                </section>

                {/* =================================================
                   ERROR
                ================================================= */}

            

            </main>

            {/* =================================================
               FOOTER
            ================================================= */}

            <Footer />

        </div>
    );
}

export default Dashboard;