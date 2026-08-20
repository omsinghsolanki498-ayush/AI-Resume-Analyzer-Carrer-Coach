import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Roadmap() {
    const navigate = useNavigate();

    const [roadmap, setRoadmap] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // =========================================================
    // GET ROADMAP
    // =========================================================

    const getRoadmap = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get("/roadmap/generate");

            console.log("ROADMAP:", response.data);

            setRoadmap(response.data?.roadmap || null);
        } catch (error) {
            console.error(
                "ROADMAP ERROR:",
                error.response?.data || error.message
            );

            if (error.response?.status === 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");

                navigate("/login");
                return;
            }

            setError(
                error.response?.data?.message ||
                    "Failed to generate roadmap."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getRoadmap();
    }, []);

    // =========================================================
    // LOADING
    // =========================================================

    if (loading) {
        return (
            <div className="min-h-screen w-full bg-slate-950 text-slate-300 flex items-center justify-center px-4">
                <div className="text-center">
                    <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-slate-700 border-t-indigo-500" />

                    <p className="mt-4 text-sm font-medium text-slate-300">
                        AI is creating your roadmap...
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                        This may take a few seconds
                    </p>
                </div>
            </div>
        );
    }

    // =========================================================
    // ERROR
    // =========================================================

    if (error) {
        return (
            <div className="min-h-screen w-full bg-slate-950 px-4 flex items-center justify-center">
                <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-7 text-center shadow-2xl">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 text-2xl ring-1 ring-red-500/20">
                        ⚠️
                    </div>

                    <h2 className="mt-5 text-xl font-bold text-white">
                        Unable to create roadmap
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                        {error}
                    </p>

                    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                        <button
                            type="button"
                            onClick={getRoadmap}
                            className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-indigo-500"
                        >
                            Try Again
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate("/dashboard")}
                            className="rounded-xl border border-slate-800 bg-slate-950 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:bg-slate-800 hover:text-white"
                        >
                            Dashboard
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // =========================================================
    // MAIN UI
    // =========================================================

    return (
        <div className="min-h-screen w-full overflow-x-hidden bg-slate-950 text-slate-300">
            {/* =================================================
                NAVBAR
            ================================================= */}

            <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/95 backdrop-blur">
                <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    {/* LOGO */}

                    <button
                        type="button"
                        onClick={() => navigate("/dashboard")}
                        className="text-xl font-black tracking-tight text-white transition hover:text-indigo-400 sm:text-2xl"
                    >
                        Resume
                        <span className="text-indigo-500">
                            AI
                        </span>
                    </button>

                    {/* DASHBOARD */}

                    <button
                        type="button"
                        onClick={() => navigate("/dashboard")}
                        className="inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-xs font-semibold text-slate-300 transition hover:border-slate-700 hover:bg-slate-800 hover:text-white sm:px-4 sm:text-sm"
                    >
                        <span>←</span>

                        <span>Dashboard</span>
                    </button>
                </div>
            </header>

            {/* =================================================
                MAIN
            ================================================= */}

            <main className="mx-auto flex w-full max-w-6xl flex-col items-center px-4 py-7 sm:px-6 sm:py-9 lg:px-8 lg:py-12">
                {/* =================================================
                    PAGE HEADER
                ================================================= */}

                <section className="mx-auto w-full max-w-3xl text-center">
                    {/* BADGE */}

                    <div className="flex justify-center">
                        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-indigo-300 sm:px-4 sm:py-2 sm:text-xs">
                            <span className="text-indigo-400">
                                ✦
                            </span>

                            AI Powered
                        </div>
                    </div>

                    {/* TITLE */}

                    <h1 className="mt-4 text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
                        Your 90-Day Career Roadmap
                    </h1>

                    {/* DESCRIPTION */}

                    <p className="mx-auto mt-3 max-w-xl text-xs leading-5 text-slate-500 sm:text-sm sm:leading-6 md:text-base">
                        A personalized learning plan based on
                        your resume and career goals.
                    </p>
                </section>

                {/* =================================================
                    TARGET ROLE
                ================================================= */}

                <section className="mx-auto mt-9 flex w-full max-w-4xl justify-center sm:mt-11 lg:mt-14">
                    <div className="w-full rounded-3xl border border-indigo-500/20 bg-indigo-600 p-6 text-center shadow-2xl shadow-indigo-950/30 sm:p-8 lg:p-10">
                        <div className="flex flex-col items-center justify-center gap-5 sm:flex-row sm:justify-between">
                            {/* TARGET ROLE */}

                            <div className="min-w-0 text-center sm:text-left">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-200 sm:text-xs">
                                    Target Role
                                </p>

                                <h2 className="mt-2 break-words text-2xl font-bold leading-tight text-white sm:text-3xl">
                                    {roadmap?.targetRole ||
                                        "Full Stack Developer"}
                                </h2>
                            </div>

                            {/* DURATION */}

                            <div className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-2.5 text-xs font-medium text-indigo-50 sm:text-sm">
                                <span>🗓️</span>

                                <span>
                                    {roadmap?.duration ||
                                        "90 Days"}
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* =================================================
                    PHASES
                ================================================= */}

                <section className="mx-auto mt-9 flex w-full max-w-4xl flex-col gap-8 sm:mt-11 sm:gap-10 lg:mt-14 lg:gap-12">
                    {roadmap?.phases?.map(
                        (phase, index) => (
                            <article
                                key={index}
                                className="w-full overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-xl shadow-black/10"
                            >
                                {/* PHASE HEADER */}

                                <div className="border-b border-slate-800 px-5 py-6 sm:px-7 sm:py-8 lg:px-9 lg:py-9">
                                    <div className="flex items-start gap-3 sm:gap-4">
                                        {/* NUMBER */}

                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-sm font-bold text-indigo-400 ring-1 ring-indigo-500/20 sm:h-12 sm:w-12 sm:text-base">
                                            {index + 1}
                                        </div>

                                        {/* TITLE */}

                                        <div className="min-w-0 text-left">
                                            <p className="text-[9px] font-bold uppercase tracking-widest text-indigo-400 sm:text-[10px]">
                                                Phase {index + 1}
                                            </p>

                                            <h2 className="mt-1 break-words text-lg font-bold leading-tight text-white sm:text-xl md:text-2xl">
                                                {phase.title}
                                            </h2>
                                        </div>
                                    </div>
                                </div>

                                {/* WEEKS */}

                                <div className="space-y-5 px-4 py-5 sm:space-y-6 sm:px-7 sm:py-7 lg:px-9 lg:py-9">
                                    {phase.weeks?.map(
                                        (
                                            week,
                                            weekIndex
                                        ) => (
                                            <div
                                                key={
                                                    weekIndex
                                                }
                                                className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5 transition hover:border-slate-700 sm:p-6"
                                            >
                                                {/* WEEK HEADER */}

                                                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                                    <h3 className="break-words text-sm font-bold text-white sm:text-base">
                                                        {
                                                            week.week
                                                        }
                                                    </h3>

                                                    <span className="w-fit max-w-full break-words rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-[10px] font-medium text-slate-400 sm:text-xs">
                                                        {
                                                            week.focus
                                                        }
                                                    </span>
                                                </div>

                                                {/* TASKS */}

                                                <div className="mt-5 space-y-4">
                                                    {week.tasks?.map(
                                                        (
                                                            task,
                                                            taskIndex
                                                        ) => (
                                                            <div
                                                                key={
                                                                    taskIndex
                                                                }
                                                                className="flex items-start gap-3"
                                                            >
                                                                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-[10px] font-bold text-emerald-400 ring-1 ring-emerald-500/20">
                                                                    ✓
                                                                </div>

                                                                <p className="min-w-0 break-words text-xs leading-5 text-slate-400 sm:text-sm sm:leading-6">
                                                                    {
                                                                        task
                                                                    }
                                                                </p>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        )
                                    )}

                                    {/* PHASE GOAL */}

                                    <div className="rounded-2xl border border-indigo-500/10 bg-indigo-500/5 p-5 sm:p-6">
                                        <p className="text-[9px] font-bold uppercase tracking-widest text-indigo-400 sm:text-[10px]">
                                            Phase Goal
                                        </p>

                                        <p className="mt-2 break-words text-xs leading-5 text-slate-400 sm:text-sm sm:leading-6">
                                            {phase.goal}
                                        </p>
                                    </div>
                                </div>
                            </article>
                        )
                    )}
                </section>

                {/* =================================================
                    NO PHASE DATA
                ================================================= */}

                {!roadmap?.phases?.length && (
                    <section className="mx-auto mt-10 w-full max-w-4xl rounded-3xl border border-slate-800 bg-slate-900 p-8 text-center">
                        <p className="text-sm text-slate-500">
                            No roadmap phases were generated.
                        </p>

                        <button
                            type="button"
                            onClick={getRoadmap}
                            className="mt-5 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-indigo-500"
                        >
                            Generate Again
                        </button>
                    </section>
                )}

                {/* =================================================
                    CAREER COACH
                ================================================= */}

                <section className="mx-auto mt-9 flex w-full max-w-4xl justify-center sm:mt-11 lg:mt-14">
                    <div className="w-full rounded-3xl border border-slate-800 bg-slate-900 p-7 text-center shadow-xl shadow-black/10 sm:p-9 lg:p-10">
                        {/* ICON */}

                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-xl ring-1 ring-indigo-500/20">
                            🤖
                        </div>

                        {/* TITLE */}

                        <h2 className="mt-4 text-lg font-bold text-white sm:text-xl md:text-2xl">
                            Need help with your roadmap?
                        </h2>

                        {/* DESCRIPTION */}

                        <p className="mx-auto mt-2 max-w-md text-xs leading-5 text-slate-500 sm:text-sm sm:leading-6">
                            Ask your AI Career Coach for
                            personalized guidance and
                            career advice.
                        </p>

                        {/* BUTTON */}

                        <button
                            type="button"
                            onClick={() =>
                                navigate("/career-coach")
                            }
                            className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-indigo-600 px-5 py-3 text-xs font-bold text-white shadow-lg shadow-indigo-950/30 transition hover:bg-indigo-500 active:scale-[0.98] sm:w-auto sm:px-6 sm:text-sm"
                        >
                            Ask AI Career Coach

                            <span className="ml-2">
                                →
                            </span>
                        </button>
                    </div>
                </section>

                {/* BOTTOM SPACE */}

                <div className="h-8 sm:h-12" />
            </main>
        </div>
    );
}

export default Roadmap;