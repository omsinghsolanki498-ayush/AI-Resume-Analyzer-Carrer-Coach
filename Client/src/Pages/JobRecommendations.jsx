import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/Axios";

function JobRecommendations() {
    const navigate = useNavigate();

    const [jobs, setJobs] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // ==========================================
    // GET JOBS
    // ==========================================

    const getJobs = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get(
                "/jobs/recommendations"
            );

            console.log(
                "JOB RECOMMENDATIONS:",
                response.data
            );

            setJobs(response.data?.jobs);
        } catch (error) {
            console.error(
                "JOB ERROR:",
                error.response?.data ||
                    error.message
            );

            if (error.response?.status === 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");

                navigate("/login");
                return;
            }

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
    // FAKE APPLY
    // ==========================================

    const handleApply = (jobTitle) => {
        window.alert(
            `Application started for "${jobTitle}".\n\nApply Successfully Done.`
        );
    };

    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
                <div className="text-center">
                    <div
                        className="
                            mx-auto
                            h-11
                            w-11
                            animate-spin
                            rounded-md
                            border-4
                            border-slate-700
                            border-t-indigo-500
                            sm:h-12
                            sm:w-12
                        "
                    />

                    <p
                        className="
                            mt-4
                            text-sm
                            font-semibold
                            text-slate-300
                        "
                    >
                        AI is finding your best job roles...
                    </p>

                    <p
                        className="
                            mt-1
                            text-xs
                            text-slate-500
                        "
                    >
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
            <div
                className="
                    min-h-screen
                    bg-slate-950
                    px-4
                    flex
                    items-center
                    justify-center
                "
            >
                <div
                    className="
                        w-full
                        max-w-md
                        rounded-md
                        border
                        border-slate-800
                        bg-slate-900
                        p-6
                        text-center
                        shadow-2xl
                        sm:p-8
                    "
                >
                    <div
                        className="
                            mx-auto
                            flex
                            h-12
                            w-12
                            items-center
                            justify-center
                            rounded-md
                            bg-red-500/10
                            text-xl
                            ring-1
                            ring-red-500/20
                        "
                    >
                        ⚠️
                    </div>

                    <h2
                        className="
                            mt-4
                            text-lg
                            font-bold
                            text-white
                            sm:text-xl
                        "
                    >
                        Something went wrong
                    </h2>

                    <p
                        className="
                            mt-2
                            break-words
                            text-xs
                            leading-5
                            text-slate-500
                            sm:text-sm
                        "
                    >
                        {error}
                    </p>

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/dashboard")
                        }
                        className="
                            mt-6
                            w-full
                            rounded-md
                            bg-indigo-600
                            px-5
                            py-3
                            text-xs
                            font-bold
                            text-white
                            transition
                            hover:bg-indigo-500
                            active:scale-[0.98]
                            sm:w-auto
                            sm:text-sm
                        "
                    >
                        Back to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div
            className="
                min-h-screen
                w-full
                overflow-x-hidden
                bg-slate-950
                text-slate-300
            "
        >
            {/* ==========================================
                NAVBAR
            ========================================== */}

            <nav
                className="
                    sticky
                    top-0
                    z-50
                    w-full
                    border-b
                    border-slate-800
                    bg-slate-950/95
                    backdrop-blur
                "
            >
                <div
                    className="
                        mx-auto
                        flex
                        h-16
                        w-full
                        max-w-6xl
                        items-center
                        justify-between
                        px-4
                        sm:px-6
                        lg:px-8
                    "
                >
                    {/* LOGO */}

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/dashboard")
                        }
                        className="
                            text-xl
                            font-black
                            tracking-tight
                            text-white
                            transition
                            hover:text-indigo-400
                            sm:text-2xl
                        "
                    >
                        Resume
                        <span className="text-indigo-500">
                            AI
                        </span>
                    </button>

                    {/* DASHBOARD */}

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/dashboard")
                        }
                        className="
                            inline-flex
                            items-center
                            gap-2
                            rounded-md
                            border
                            border-slate-800
                            bg-slate-900
                            px-3
                            py-2
                            text-xs
                            font-semibold
                            text-slate-300
                            transition
                            hover:border-slate-700
                            hover:bg-slate-800
                            hover:text-white
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
            </nav>

            {/* ==========================================
                MAIN
            ========================================== */}

            <main
                className="
                    mx-auto
                    flex
                    w-full
                    max-w-6xl
                    flex-col
                    items-center
                    px-3
                    py-7
                    sm:px-6
                    sm:py-9
                    lg:px-8
                    lg:py-12
                "
            >
                {/* ==========================================
                    HEADER
                ========================================== */}

                <section
                    className="
                        w-full
                        max-w-3xl
                        text-center
                    "
                >
                    {/* BADGE */}

                    <div className="flex justify-center">
                        <div
                            className="
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
                            "
                        >
                            <span>✦</span>
                            AI Powered
                        </div>
                    </div>

                    {/* TITLE */}

                    <h1
                        className="
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
                        "
                    >
                        Recommended Job Roles
                    </h1>

                    {/* DESCRIPTION */}

                    <p
                        className="
                            mx-auto
                            mt-3
                            max-w-xl
                            text-xs
                            leading-5
                            text-slate-500
                            sm:text-sm
                            sm:leading-6
                            md:text-base
                        "
                    >
                        Jobs that match your resume,
                        skills, and current career goals.
                    </p>
                </section>

                {/* ==========================================
                    TARGET ROLE
                ========================================== */}

                <section
                    className="
                        mx-auto
                        mt-9
                        w-full
                        max-w-4xl
                        sm:mt-11
                        lg:mt-14
                    "
                >
                    <div
                        className="
                            rounded-md
                            border
                            border-indigo-500/20
                            bg-indigo-600
                            p-6
                            shadow-2xl
                            shadow-indigo-950/30
                            sm:p-8
                            lg:p-9
                        "
                    >
                        <div
                            className="
                                flex
                                flex-col
                                items-center
                                justify-center
                                gap-5
                                text-center
                                sm:flex-row
                                sm:justify-between
                                sm:text-left
                            "
                        >
                            <div className="min-w-0">
                                <p
                                    className="
                                        text-[10px]
                                        font-bold
                                        uppercase
                                        tracking-widest
                                        text-indigo-200
                                        sm:text-xs
                                    "
                                >
                                    Your Target Role
                                </p>

                                <h2
                                    className="
                                        mt-2
                                        break-words
                                        text-2xl
                                        font-bold
                                        leading-tight
                                        text-white
                                        sm:text-3xl
                                    "
                                >
                                    {jobs?.targetRole ||
                                        "Full Stack Developer"}
                                </h2>
                            </div>

                            <div
                                className="
                                    inline-flex
                                    shrink-0
                                    items-center
                                    gap-2
                                    rounded-md
                                    border
                                    border-white/10
                                    bg-white/10
                                    px-4
                                    py-2.5
                                    text-xs
                                    font-medium
                                    text-indigo-50
                                    sm:text-sm
                                "
                            >
                                <span>🎯</span>

                                <span>
                                    AI Matched
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ==========================================
                    JOB CARDS
                ========================================== */}

                <section
                    className="
                        mx-auto
                        mt-9
                        w-full
                        max-w-4xl
                        sm:mt-11
                        lg:mt-14
                    "
                >
                    <div
                        className="
                            grid
                            grid-cols-1
                            gap-6
                            md:grid-cols-2
                            md:gap-7
                        "
                    >
                        {jobs?.recommendations?.map(
                            (job, index) => (
                                <article
                                    key={index}
                                    className="
                                        flex
                                        min-w-0
                                        flex-col
                                        overflow-hidden
                                        rounded-md
                                        border
                                        border-slate-800
                                        bg-slate-900
                                        shadow-xl
                                        shadow-black/10
                                        transition
                                        duration-300
                                        hover:-translate-y-1
                                        hover:border-slate-700
                                        hover:shadow-2xl
                                    "
                                >
                                    {/* CARD TOP */}

                                    <div
                                        className="
                                            border-b
                                            border-slate-800
                                            p-5
                                            sm:p-6
                                        "
                                    >
                                        <div
                                            className="
                                                flex
                                                items-start
                                                justify-between
                                                gap-4
                                            "
                                        >
                                            <div className="min-w-0">
                                                <p
                                                    className="
                                                        text-[9px]
                                                        font-bold
                                                        uppercase
                                                        tracking-widest
                                                        text-indigo-400
                                                        sm:text-[10px]
                                                    "
                                                >
                                                    Job Role #
                                                    {index + 1}
                                                </p>

                                                <h2
                                                    className="
                                                        mt-1
                                                        break-words
                                                        text-lg
                                                        font-bold
                                                        leading-tight
                                                        text-white
                                                        sm:text-xl
                                                    "
                                                >
                                                    {job.title}
                                                </h2>
                                            </div>

                                            {/* MATCH */}

                                            <div
                                                className="
                                                    shrink-0
                                                    text-center
                                                "
                                            >
                                                <div
                                                    className="
                                                        flex
                                                        h-14
                                                        w-14
                                                        items-center
                                                        justify-center
                                                        rounded-md
                                                        border
                                                        border-emerald-500/20
                                                        bg-emerald-500/10
                                                        sm:h-16
                                                        sm:w-16
                                                    "
                                                >
                                                    <span
                                                        className="
                                                            text-sm
                                                            font-bold
                                                            text-emerald-400
                                                            sm:text-lg
                                                        "
                                                    >
                                                        {job.match}%
                                                    </span>
                                                </div>

                                                <p
                                                    className="
                                                        mt-1
                                                        text-[9px]
                                                        text-slate-600
                                                        sm:text-[10px]
                                                    "
                                                >
                                                    Match
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* CARD CONTENT */}

                                    <div
                                        className="
                                            flex
                                            flex-1
                                            flex-col
                                            p-5
                                            sm:p-6
                                        "
                                    >
                                        {/* WHY */}

                                        <div>
                                            <h3
                                                className="
                                                    text-sm
                                                    font-bold
                                                    text-white
                                                "
                                            >
                                                Why this role?
                                            </h3>

                                            <p
                                                className="
                                                    mt-2
                                                    break-words
                                                    text-xs
                                                    leading-5
                                                    text-slate-500
                                                    sm:text-sm
                                                    sm:leading-6
                                                "
                                            >
                                                {job.reason}
                                            </p>
                                        </div>

                                        {/* REQUIRED SKILLS */}

                                        <div className="mt-6">
                                            <h3
                                                className="
                                                    text-sm
                                                    font-bold
                                                    text-white
                                                "
                                            >
                                                Required Skills
                                            </h3>

                                            <div
                                                className="
                                                    mt-3
                                                    flex
                                                    flex-wrap
                                                    gap-2
                                                "
                                            >
                                                {job.requiredSkills?.map(
                                                    (
                                                        skill,
                                                        skillIndex
                                                    ) => (
                                                        <span
                                                            key={
                                                                skillIndex
                                                            }
                                                            className="
                                                                max-w-full
                                                                break-words
                                                                rounded-md
                                                                border
                                                                border-emerald-500/10
                                                                bg-emerald-500/10
                                                                px-2.5
                                                                py-1.5
                                                                text-[10px]
                                                                font-medium
                                                                text-emerald-400
                                                                sm:text-xs
                                                            "
                                                        >
                                                            ✓ {skill}
                                                        </span>
                                                    )
                                                )}
                                            </div>
                                        </div>

                                        {/* MISSING SKILLS */}

                                        <div className="mt-6">
                                            <h3
                                                className="
                                                    text-sm
                                                    font-bold
                                                    text-white
                                                "
                                            >
                                                Skills To Improve
                                            </h3>

                                            <div
                                                className="
                                                    mt-3
                                                    flex
                                                    flex-wrap
                                                    gap-2
                                                "
                                            >
                                                {job.missingSkills?.length >
                                                0 ? (
                                                    job.missingSkills.map(
                                                        (
                                                            skill,
                                                            skillIndex
                                                        ) => (
                                                            <span
                                                                key={
                                                                    skillIndex
                                                                }
                                                                className="
                                                                    max-w-full
                                                                    break-words
                                                                    rounded-md
                                                                    border
                                                                    border-red-500/10
                                                                    bg-red-500/10
                                                                    px-2.5
                                                                    py-1.5
                                                                    text-[10px]
                                                                    font-medium
                                                                    text-red-400
                                                                    sm:text-xs
                                                                "
                                                            >
                                                                + {skill}
                                                            </span>
                                                        )
                                                    )
                                                ) : (
                                                    <span
                                                        className="
                                                            text-xs
                                                            text-emerald-400
                                                        "
                                                    >
                                                        No major skill
                                                        gaps 🎉
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* PREPARATION */}

                                        <div
                                            className="
                                                mt-6
                                                rounded-md
                                                border
                                                border-slate-800
                                                bg-slate-950/60
                                                p-4
                                            "
                                        >
                                            <h3
                                                className="
                                                    text-sm
                                                    font-bold
                                                    text-white
                                                "
                                            >
                                                Preparation
                                            </h3>

                                            <div
                                                className="
                                                    mt-3
                                                    space-y-2.5
                                                "
                                            >
                                                {job.preparation?.map(
                                                    (
                                                        item,
                                                        itemIndex
                                                    ) => (
                                                        <div
                                                            key={
                                                                itemIndex
                                                            }
                                                            className="
                                                                flex
                                                                items-start
                                                                gap-2
                                                            "
                                                        >
                                                            <span
                                                                className="
                                                                    mt-0.5
                                                                    shrink-0
                                                                    text-indigo-400
                                                                "
                                                            >
                                                                →
                                                            </span>

                                                            <p
                                                                className="
                                                                    min-w-0
                                                                    break-words
                                                                    text-xs
                                                                    leading-5
                                                                    text-slate-500
                                                                    sm:text-sm
                                                                "
                                                            >
                                                                {item}
                                                            </p>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </div>

                                        {/* APPLY BUTTON */}

                                        <div className="mt-auto pt-6">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleApply(
                                                        job.title
                                                    )
                                                }
                                                className="
                                                    w-full
                                                    rounded-md
                                                    bg-indigo-600
                                                    px-5
                                                    py-3
                                                    text-xs
                                                    font-bold
                                                    text-white
                                                    shadow-lg
                                                    shadow-indigo-950/20
                                                    transition
                                                    hover:bg-indigo-500
                                                    active:scale-[0.98]
                                                    sm:text-sm
                                                "
                                            >
                                                Apply Now

                                                <span className="ml-2">
                                                    →
                                                </span>
                                            </button>

                                            <p
                                                className="
                                                    mt-2
                                                    text-center
                                                    text-[9px]
                                                    text-slate-600
                                                    sm:text-[10px]
                                                "
                                            >
                                                Demo application
                                                button
                                            </p>
                                        </div>
                                    </div>
                                </article>
                            )
                        )}
                    </div>

                    {/* NO JOBS */}

                    {(!jobs?.recommendations ||
                        jobs.recommendations.length === 0) && (
                        <div
                            className="
                                rounded-md
                                border
                                border-slate-800
                                bg-slate-900
                                p-8
                                text-center
                            "
                        >
                            <div className="text-3xl">
                                🔍
                            </div>

                            <h2
                                className="
                                    mt-3
                                    text-lg
                                    font-bold
                                    text-white
                                "
                            >
                                No recommendations found
                            </h2>

                            <p
                                className="
                                    mx-auto
                                    mt-2
                                    max-w-md
                                    text-xs
                                    leading-5
                                    text-slate-500
                                "
                            >
                                Upload or improve your resume
                                to get personalized job
                                recommendations.
                            </p>
                        </div>
                    )}
                </section>

                {/* ==========================================
                    BOTTOM CTA
                ========================================== */}

                <section
                    className="
                        mx-auto
                        mt-10
                        w-full
                        max-w-4xl
                        sm:mt-12
                        lg:mt-14
                    "
                >
                    <div
                        className="
                            rounded-md
                            border
                            border-slate-800
                            bg-slate-900
                            p-7
                            text-center
                            shadow-xl
                            shadow-black/10
                            sm:p-9
                            lg:p-10
                        "
                    >
                        <div
                            className="
                                mx-auto
                                flex
                                h-12
                                w-12
                                items-center
                                justify-center
                                rounded-md
                                bg-indigo-500/10
                                text-xl
                                ring-1
                                ring-indigo-500/20
                            "
                        >
                            🚀
                        </div>

                        <h2
                            className="
                                mt-4
                                text-lg
                                font-bold
                                text-white
                                sm:text-xl
                                md:text-2xl
                            "
                        >
                            Ready to prepare?
                        </h2>

                        <p
                            className="
                                mx-auto
                                mt-2
                                max-w-md
                                text-xs
                                leading-5
                                text-slate-500
                                sm:text-sm
                                sm:leading-6
                            "
                        >
                            Follow your personalized roadmap
                            and improve your job match.
                        </p>

                        <button
                            type="button"
                            onClick={() =>
                                navigate("/roadmap")
                            }
                            className="
                                mt-6
                                inline-flex
                                w-full
                                items-center
                                justify-center
                                rounded-md
                                bg-indigo-600
                                px-5
                                py-3
                                text-xs
                                font-bold
                                text-white
                                shadow-lg
                                shadow-indigo-950/30
                                transition
                                hover:bg-indigo-500
                                active:scale-[0.98]
                                sm:w-auto
                                sm:px-6
                                sm:text-sm
                            "
                        >
                            View My Roadmap

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

export default JobRecommendations;