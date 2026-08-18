import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Roadmap() {

    const navigate = useNavigate();

    const [roadmap, setRoadmap] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    // ==========================================
    // GET ROADMAP
    // ==========================================

    const getRoadmap = async () => {

        try {

            setLoading(true);
            setError("");

            const response =
                await api.get(
                    "/roadmap/generate"
                );

            console.log(
                "ROADMAP:",
                response.data
            );

            setRoadmap(
                response.data?.roadmap
            );

        } catch (error) {

            console.error(
                "ROADMAP ERROR:",
                error.response?.data ||
                error.message
            );

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


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {

        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">

                <div className="text-center">

                    <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto" />

                    <p className="mt-4 text-slate-600 font-medium">
                        AI is creating your roadmap...
                    </p>

                    <p className="text-sm text-slate-400 mt-1">
                        This may take a few seconds
                    </p>

                </div>

            </div>
        );
    }


    // ==========================================
    // ERROR
    // ==========================================

    if (error) {

        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">

                <div className="bg-white rounded-2xl shadow-sm border p-8 max-w-md w-full text-center">

                    <div className="text-4xl">
                        ⚠️
                    </div>

                    <h2 className="text-xl font-bold text-slate-800 mt-4">
                        Unable to create roadmap
                    </h2>

                    <p className="text-slate-500 mt-2">
                        {error}
                    </p>

                    <button
                        onClick={() =>
                            navigate("/dashboard")
                        }
                        className="mt-6 px-5 py-3 bg-indigo-600 text-white rounded-xl font-semibold"
                    >
                        Back to Dashboard
                    </button>

                </div>

            </div>
        );
    }


    return (

        <div className="min-h-screen bg-slate-50">

            {/* =====================================
                NAVBAR
            ====================================== */}

            <nav className="bg-white border-b">

                <div className="max-w-6xl mx-auto px-4 sm:px-6">

                    <div className="h-16 flex items-center justify-between">

                        <button
                            onClick={() =>
                                navigate("/dashboard")
                            }
                            className="text-xl sm:text-2xl font-bold text-indigo-600"
                        >
                            ResumeAI
                        </button>

                        <button
                            onClick={() =>
                                navigate("/dashboard")
                            }
                            className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                        >
                            ← Dashboard
                        </button>

                    </div>

                </div>

            </nav>


            {/* =====================================
                HEADER
            ====================================== */}

            <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">

                <div className="text-center mb-10">

                    <span className="inline-block px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full text-sm font-semibold">
                        🤖 AI Powered
                    </span>

                    <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-4">
                        Your 90-Day Career Roadmap
                    </h1>

                    <p className="text-slate-500 mt-3">
                        A personalized learning plan based on your resume.
                    </p>

                </div>


                {/* =====================================
                    TARGET ROLE
                ====================================== */}

                <div className="bg-indigo-600 text-white rounded-3xl p-6 sm:p-8 mb-8">

                    <p className="text-indigo-100 text-sm">
                        TARGET ROLE
                    </p>

                    <h2 className="text-2xl sm:text-3xl font-bold mt-2">
                        {roadmap?.targetRole ||
                            "Full Stack Developer"}
                    </h2>

                    <div className="mt-5 inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                        🗓️ {roadmap?.duration || "90 Days"}
                    </div>

                </div>


                {/* =====================================
                    PHASES
                ====================================== */}

                <div className="space-y-8">

                    {roadmap?.phases?.map(
                        (phase, index) => (

                            <div
                                key={index}
                                className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-8 shadow-sm"
                            >

                                {/* PHASE HEADER */}

                                <div className="flex items-start gap-4 mb-7">

                                    <div className="w-12 h-12 shrink-0 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-bold text-lg">
                                        {index + 1}
                                    </div>

                                    <div>

                                        <p className="text-sm text-indigo-600 font-semibold">
                                            PHASE {index + 1}
                                        </p>

                                        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                                            {phase.title}
                                        </h2>

                                    </div>

                                </div>


                                {/* WEEKS */}

                                <div className="space-y-5">

                                    {phase.weeks?.map(
                                        (week, weekIndex) => (

                                            <div
                                                key={weekIndex}
                                                className="border border-slate-200 rounded-2xl p-5"
                                            >

                                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">

                                                    <h3 className="font-bold text-slate-900">
                                                        {week.week}
                                                    </h3>

                                                    <span className="text-sm px-3 py-1 bg-slate-100 text-slate-600 rounded-full">
                                                        {week.focus}
                                                    </span>

                                                </div>


                                                {/* TASKS */}

                                                <div className="mt-4 space-y-3">

                                                    {week.tasks?.map(
                                                        (
                                                            task,
                                                            taskIndex
                                                        ) => (

                                                            <div
                                                                key={taskIndex}
                                                                className="flex gap-3"
                                                            >

                                                                <div className="w-5 h-5 shrink-0 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs mt-0.5">
                                                                    ✓
                                                                </div>

                                                                <p className="text-sm text-slate-600">
                                                                    {task}
                                                                </p>

                                                            </div>

                                                        )
                                                    )}

                                                </div>

                                            </div>

                                        )
                                    )}

                                </div>


                                {/* GOAL */}

                                <div className="mt-6 bg-indigo-50 rounded-2xl p-5">

                                    <p className="text-xs font-bold text-indigo-600 uppercase">
                                        Phase Goal
                                    </p>

                                    <p className="text-sm text-slate-700 mt-2">
                                        {phase.goal}
                                    </p>

                                </div>

                            </div>

                        )
                    )}

                </div>


                {/* =====================================
                    CAREER COACH
                ====================================== */}

                <div className="mt-10 bg-white border rounded-3xl p-6 sm:p-8 text-center">

                    <div className="text-3xl">
                        🤖
                    </div>

                    <h2 className="text-xl font-bold text-slate-900 mt-3">
                        Need help with your roadmap?
                    </h2>

                    <p className="text-slate-500 mt-2">
                        Ask your AI Career Coach for guidance.
                    </p>

                    <button
                        onClick={() =>
                            navigate("/career-coach")
                        }
                        className="mt-5 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold"
                    >
                        Ask AI Career Coach →
                    </button>

                </div>

            </main>

        </div>
    );
}

export default Roadmap;