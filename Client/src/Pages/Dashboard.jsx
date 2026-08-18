import { useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardSidebar from "../Components/DashboardSidebar";
import DashboardTopbar from "../Components/DashboardTopbar";
import StatCard from "../Components/StatCard";
import CareerToolCard from "../Components/CareerToolCard";
import JobMatchBanner from "../Components/JobMatchBanner";
import ResumeList from "../Components/ResumeList";
import EmptyResume from "../Components/EmptyResume";

import { useDashboard } from "../context/DashboardContext";

function Dashboard() {
    const navigate = useNavigate();

    const [mobileMenu, setMobileMenu] = useState(false);

    // =========================================
    // DASHBOARD CONTEXT
    // =========================================

    const dashboard = useDashboard();

    const resumes = Array.isArray(dashboard?.resumes)
        ? dashboard.resumes
        : [];

    const loading = dashboard?.loading ?? false;

    const error = dashboard?.error ?? "";

    const averageScore =
        dashboard?.averageScore ?? 0;

    const totalSkills =
        dashboard?.totalSkills ?? 0;

    const experience =
        dashboard?.experience ?? "Not detected";

    const deleteResume =
        dashboard?.deleteResume;

    const refreshResumes =
        dashboard?.refreshResumes;


    // =========================================
    // LOADING
    // =========================================

    if (loading) {
        return (
            <div className="min-h-screen bg-[#f7f8fc]">

                {/* Desktop Sidebar */}

                <div className="hidden lg:block fixed left-0 top-0 bottom-0 w-[240px] bg-white border-r border-slate-200">

                    <DashboardSidebar />

                </div>


                {/* Main */}

                <div className="lg:ml-[240px]">

                    <div className="h-[72px] bg-white border-b border-slate-200" />

                    <main className="p-4 sm:p-6 lg:p-8">

                        <div className="max-w-[1400px] mx-auto animate-pulse">

                            <div className="h-8 w-64 bg-slate-200 rounded mb-3" />

                            <div className="h-4 w-96 max-w-full bg-slate-200 rounded mb-8" />


                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

                                {[1, 2, 3, 4].map((item) => (
                                    <div
                                        key={item}
                                        className="h-32 bg-white rounded-2xl border border-slate-200"
                                    />
                                ))}

                            </div>

                        </div>

                    </main>

                </div>

            </div>
        );
    }


    // =========================================
    // MAIN DASHBOARD
    // =========================================

    return (
        <div className="min-h-screen bg-[#f7f8fc] overflow-x-hidden">

            {/* =================================
                DESKTOP SIDEBAR
            ================================= */}

            <aside className="hidden lg:block fixed left-0 top-0 bottom-0 w-[240px] border-r border-slate-200 z-40">

                <DashboardSidebar />

            </aside>


            {/* =================================
                MOBILE SIDEBAR
            ================================= */}

            {mobileMenu && (
                <>
                    <div
                        onClick={() => setMobileMenu(false)}
                        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 lg:hidden"
                    />

                    <aside className="fixed left-0 top-0 bottom-0 w-[280px] bg-white z-[60] shadow-2xl lg:hidden">

                        <DashboardSidebar
                            mobile={true}
                            onClose={() =>
                                setMobileMenu(false)
                            }
                        />

                    </aside>
                </>
            )}


            {/* =================================
                MAIN CONTENT
            ================================= */}

            <div className="lg:ml-[240px] min-h-screen min-w-0">

                <DashboardTopbar
                    onMenuClick={() =>
                        setMobileMenu(true)
                    }
                />


                <main className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">

                    <div className="max-w-[1400px] mx-auto min-w-0">


                        {/* =================================
                            HERO
                        ================================= */}

                        <section className="mb-8">

                            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">

                                <div>

                                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[10px] sm:text-xs font-bold tracking-wide uppercase mb-3">

                                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />

                                        AI Career Platform

                                    </div>


                                    <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-bold tracking-tight text-slate-900">
                                        Welcome back
                                    </h1>


                                    <p className="mt-2 text-sm sm:text-base text-slate-500 max-w-2xl leading-6">

                                        Analyze your resume, improve your
                                        skills, and build a clear path toward
                                        your dream career.

                                    </p>

                                </div>


                                {/* Mobile Upload */}

                                <button
                                    onClick={() =>
                                        navigate(
                                            "/resume-analyzer"
                                        )
                                    }
                                    className="sm:hidden w-full bg-indigo-600 text-white rounded-xl py-3 font-semibold"
                                >
                                    + Upload Resume
                                </button>

                            </div>

                        </section>


                        {/* =================================
                            ERROR
                        ================================= */}

                        {error && (
                            <div className="mb-6 bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                                <p className="text-sm text-red-600">
                                    {error}
                                </p>


                                <button
                                    onClick={
                                        refreshResumes
                                    }
                                    className="text-sm font-semibold text-red-700 underline"
                                >
                                    Try again
                                </button>

                            </div>
                        )}


                        {/* =================================
                            STATS
                        ================================= */}

                        <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">

                            <StatCard
                                icon="▤"
                                iconClass="bg-indigo-50 text-indigo-600"
                                label="RESUMES"
                                value={resumes.length}
                                description="Uploaded resumes"
                            />


                            <StatCard
                                icon="✓"
                                iconClass="bg-emerald-50 text-emerald-600"
                                label="ATS"
                                value={`${averageScore}%`}
                                description="Average score"
                            />


                            <StatCard
                                icon="✦"
                                iconClass="bg-violet-50 text-violet-600"
                                label="SKILLS"
                                value={totalSkills}
                                description="Skills detected"
                            />


                            <StatCard
                                icon="★"
                                iconClass="bg-amber-50 text-amber-600"
                                label="LEVEL"
                                value={experience}
                                description="Experience level"
                            />

                        </section>


                        {/* =================================
                            CAREER TOOLS
                        ================================= */}

                        <section className="mb-8">

                            <div className="mb-4">

                                <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                                    Career tools
                                </h2>

                                <p className="text-sm text-slate-500 mt-1">
                                    Everything you need to improve your career.
                                </p>

                            </div>


                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">


                                {/* Resume Analyzer */}

                                <CareerToolCard
                                    icon="CV"
                                    iconClass="bg-indigo-50 text-indigo-600"
                                    title="Resume Analyzer"
                                    description="Get your ATS score, strengths, weaknesses and improvement suggestions."
                                    onClick={() =>
                                        navigate(
                                            "/resume-analyzer"
                                        )
                                    }
                                />


                                {/* Career Coach */}

                                <CareerToolCard
                                    icon="AI"
                                    iconClass="bg-violet-50 text-violet-600"
                                    title="AI Career Coach"
                                    description="Ask questions about jobs, interviews, skills and career growth."
                                    onClick={() =>
                                        navigate(
                                            "/career-coach"
                                        )
                                    }
                                />


                                {/* Roadmap */}

                                <CareerToolCard
                                    icon="90"
                                    iconClass="bg-emerald-50 text-emerald-600"
                                    title="Career Roadmap"
                                    description="Follow a personalized roadmap based on your skills and target role."
                                    onClick={() =>
                                        navigate(
                                            "/roadmap"
                                        )
                                    }
                                />

                            </div>

                        </section>


                        {/* =================================
                            JOB MATCH
                        ================================= */}

                        <JobMatchBanner />


                        {/* =================================
                            RESUMES
                        ================================= */}

                        <section>

                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">

                                <div>

                                    <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                                        Your resumes
                                    </h2>

                                    <p className="text-sm text-slate-500 mt-1">
                                        Review your uploaded resumes and analysis.
                                    </p>

                                </div>


                                <span className="text-xs text-slate-400">

                                    {resumes.length} resume
                                    {resumes.length !== 1
                                        ? "s"
                                        : ""}

                                </span>

                            </div>


                            {resumes.length === 0 ? (

                                <EmptyResume />

                            ) : (

                                <ResumeList
                                    resumes={resumes}
                                    onDelete={
                                        deleteResume
                                    }
                                />

                            )}

                        </section>


                        {/* =================================
                            FOOTER
                        ================================= */}

                        <footer className="py-8 text-center">

                            <p className="text-xs text-slate-400">
                                ResumeAI · AI-powered career assistant
                            </p>

                        </footer>

                    </div>

                </main>

            </div>

        </div>
    );
}


// =================================================
// VERY IMPORTANT
// =================================================

export default Dashboard;