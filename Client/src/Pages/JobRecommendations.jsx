import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function JobRecommendations() {

    const navigate = useNavigate();

    const [jobs, setJobs] = useState(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    // ==========================================
    // GET JOBS
    // ==========================================

    const getJobs = async () => {

        try {

            setLoading(true);
            setError("");

            const response =
                await api.get(
                    "/jobs/recommendations"
                );

            console.log(
                "JOB RECOMMENDATIONS:",
                response.data
            );

            setJobs(
                response.data?.jobs
            );

        } catch (error) {

            console.error(
                "JOB ERROR:",
                error.response?.data ||
                error.message
            );

            setError(
                error.response?.data?.message ||
                "Failed to get job recommendations."
            );

        } finally {

            setLoading(false);
        }
    };


    useEffect(() => {
        getJobs();
    }, []);


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {

        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">

                <div className="text-center">

                    <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto" />

                    <p className="mt-4 text-slate-700 font-semibold">
                        AI is finding your best job roles...
                    </p>

                    <p className="text-sm text-slate-400 mt-1">
                        Please wait
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

                <div className="bg-white border rounded-2xl p-8 text-center max-w-md w-full">

                    <div className="text-4xl">
                        ⚠️
                    </div>

                    <h2 className="text-xl font-bold text-slate-800 mt-4">
                        Something went wrong
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
                MAIN
            ====================================== */}

            <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">


                {/* HEADER */}

                <div className="text-center mb-10">

                    <span className="inline-block px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full text-sm font-semibold">
                        🤖 AI Powered
                    </span>

                    <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-4">
                        Recommended Job Roles
                    </h1>

                    <p className="text-slate-500 mt-3">
                        Jobs that match your resume and current skills.
                    </p>

                </div>


                {/* TARGET ROLE */}

                <div className="bg-indigo-600 text-white rounded-3xl p-6 sm:p-8 mb-8">

                    <p className="text-indigo-100 text-sm">
                        YOUR TARGET ROLE
                    </p>

                    <h2 className="text-2xl sm:text-3xl font-bold mt-2">
                        {jobs?.targetRole ||
                            "Full Stack Developer"}
                    </h2>

                </div>


                {/* JOB CARDS */}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {jobs?.recommendations?.map(
                        (job, index) => (

                            <div
                                key={index}
                                className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition"
                            >

                                {/* TOP */}

                                <div className="flex items-start justify-between gap-4">

                                    <div>

                                        <p className="text-sm text-indigo-600 font-semibold">
                                            JOB ROLE #{index + 1}
                                        </p>

                                        <h2 className="text-xl font-bold text-slate-900 mt-1">
                                            {job.title}
                                        </h2>

                                    </div>


                                    {/* MATCH */}

                                    <div className="shrink-0 text-center">

                                        <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">

                                            <span className="text-lg font-bold text-green-600">
                                                {job.match}%
                                            </span>

                                        </div>

                                        <p className="text-xs text-slate-400 mt-1">
                                            Match
                                        </p>

                                    </div>

                                </div>


                                {/* REASON */}

                                <div className="mt-6">

                                    <h3 className="font-semibold text-slate-800">
                                        Why this role?
                                    </h3>

                                    <p className="text-sm text-slate-500 mt-2 leading-6">
                                        {job.reason}
                                    </p>

                                </div>


                                {/* REQUIRED SKILLS */}

                                <div className="mt-6">

                                    <h3 className="font-semibold text-slate-800">
                                        Required Skills
                                    </h3>

                                    <div className="flex flex-wrap gap-2 mt-3">

                                        {job.requiredSkills?.map(
                                            (
                                                skill,
                                                skillIndex
                                            ) => (

                                                <span
                                                    key={skillIndex}
                                                    className="px-3 py-1.5 bg-green-50 text-green-700 text-xs font-medium rounded-lg"
                                                >
                                                    ✓ {skill}
                                                </span>

                                            )
                                        )}

                                    </div>

                                </div>


                                {/* MISSING SKILLS */}

                                <div className="mt-6">

                                    <h3 className="font-semibold text-slate-800">
                                        Skills To Improve
                                    </h3>

                                    <div className="flex flex-wrap gap-2 mt-3">

                                        {job.missingSkills?.length > 0 ? (

                                            job.missingSkills.map(
                                                (
                                                    skill,
                                                    skillIndex
                                                ) => (

                                                    <span
                                                        key={skillIndex}
                                                        className="px-3 py-1.5 bg-red-50 text-red-600 text-xs font-medium rounded-lg"
                                                    >
                                                        + {skill}
                                                    </span>

                                                )
                                            )

                                        ) : (

                                            <span className="text-sm text-green-600">
                                                No major skill gaps 🎉
                                            </span>

                                        )}

                                    </div>

                                </div>


                                {/* PREPARATION */}

                                <div className="mt-6 bg-slate-50 rounded-2xl p-4">

                                    <h3 className="font-semibold text-slate-800">
                                        Preparation
                                    </h3>

                                    <div className="mt-3 space-y-2">

                                        {job.preparation?.map(
                                            (
                                                item,
                                                itemIndex
                                            ) => (

                                                <div
                                                    key={itemIndex}
                                                    className="flex gap-2"
                                                >

                                                    <span className="text-indigo-600">
                                                        →
                                                    </span>

                                                    <p className="text-sm text-slate-600">
                                                        {item}
                                                    </p>

                                                </div>

                                            )
                                        )}

                                    </div>

                                </div>

                            </div>

                        )
                    )}

                </div>


                {/* BOTTOM CTA */}

                <div className="mt-10 bg-white border rounded-3xl p-6 sm:p-8 text-center">

                    <h2 className="text-xl font-bold text-slate-900">
                        Ready to prepare?
                    </h2>

                    <p className="text-slate-500 mt-2">
                        Follow your personalized roadmap and improve your job match.
                    </p>

                    <button
                        onClick={() =>
                            navigate("/roadmap")
                        }
                        className="mt-5 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold"
                    >
                        View My Roadmap →
                    </button>

                </div>

            </main>

        </div>
    );
}

export default JobRecommendations;