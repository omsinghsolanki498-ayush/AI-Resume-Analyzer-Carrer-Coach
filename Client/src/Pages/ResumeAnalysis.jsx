import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";

function ResumeAnalysis() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResume = async () => {
      try {
        setLoading(true);

        const response = await api.get(`/resume/${id}`);

        setResume(response.data.resume);
      } catch (error) {
        console.error(
          "ANALYSIS FETCH ERROR:",
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
            "Failed to load analysis"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, [id, navigate]);

  /* =========================
      LOADING
  ========================== */

  if (loading) {
    return (
      <div className="min-h-screen bg-[#09090b] px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-[#27272a] border-t-indigo-500" />

          <p className="mt-4 text-sm text-zinc-500">
            Loading analysis...
          </p>
        </div>
      </div>
    );
  }

  /* =========================
      ERROR
  ========================== */

  if (error || !resume) {
    return (
      <div className="min-h-screen bg-[#09090b] px-4 flex items-center justify-center">
        <div className="w-full max-w-md rounded-2xl border border-[#27272a] bg-[#111113] p-6 text-center shadow-2xl sm:p-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10 text-2xl">
            ⚠️
          </div>

          <h2 className="mt-5 text-lg font-semibold text-white sm:text-xl">
            {error || "Resume not found"}
          </h2>

          <p className="mt-2 text-sm leading-6 text-zinc-500">
            We couldn't load the requested resume analysis.
          </p>

          <button
            onClick={() => navigate("/dashboard")}
            className="
              mt-6
              w-full
              rounded-xl
              bg-indigo-600
              px-5
              py-3
              text-sm
              font-semibold
              text-white
              transition
              hover:bg-indigo-500
              sm:w-auto
            "
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-white">
      <main className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 sm:py-8 lg:px-8 lg:py-10">

        {/* =========================
            BACK BUTTON
        ========================== */}

        <button
          onClick={() => navigate("/dashboard")}
          className="
            mb-6
            inline-flex
            items-center
            gap-2
            rounded-lg
            border
            border-transparent
            px-1
            py-1
            text-sm
            font-medium
            text-zinc-400
            transition
            hover:text-white
            sm:mb-8
          "
        >
          <span className="text-lg">←</span>
          Back to Dashboard
        </button>

        {/* =========================
            HEADER
        ========================== */}

        <header className="mb-7 sm:mb-9">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

            <div className="min-w-0">
              <div className="mb-3 inline-flex rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1">
                <span className="text-xs font-semibold text-indigo-400">
                  AI Resume Analysis
                </span>
              </div>

              <h1 className="
                break-words
                text-2xl
                font-bold
                tracking-tight
                text-white
                sm:text-3xl
                lg:text-4xl
              ">
                {resume.originalName}
              </h1>

              <p className="mt-2 text-sm text-zinc-500 sm:text-base">
                Target Role:{" "}
                <span className="font-medium text-zinc-300">
                  {resume.jobRoleMatch?.role ||
                    "Not specified"}
                </span>
              </p>
            </div>

            {resume.cloudinaryUrl && (
              <a
                href={resume.cloudinaryUrl}
                target="_blank"
                rel="noreferrer"
                className="
                  inline-flex
                  w-full
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-[#2a2a2d]
                  bg-[#141416]
                  px-5
                  py-3
                  text-sm
                  font-semibold
                  text-zinc-200
                  transition
                  hover:border-[#3a3a3d]
                  hover:bg-[#18181b]
                  sm:w-auto
                "
              >
                View Resume
                <span className="ml-2">↗</span>
              </a>
            )}
          </div>
        </header>

        {/* =========================
            TOP STATS
        ========================== */}

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">

          {/* ATS */}

          <div className="
            rounded-2xl
            border
            border-[#27272a]
            bg-[#111113]
            p-5
            sm:p-6
          ">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-zinc-500">
                ATS Score
              </p>

              <span className="rounded-lg bg-indigo-500/10 px-2.5 py-1 text-xs font-semibold text-indigo-400">
                ATS
              </span>
            </div>

            <p className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              {resume.atsScore || 0}
              <span className="ml-1 text-base font-medium text-zinc-600 sm:text-lg">
                /100
              </span>
            </p>

            <div className="mt-5 h-2 overflow-hidden rounded-full bg-[#27272a]">
              <div
                className="h-full rounded-full bg-indigo-500 transition-all duration-700"
                style={{
                  width: `${Math.min(
                    resume.atsScore || 0,
                    100
                  )}%`,
                }}
              />
            </div>
          </div>

          {/* JOB MATCH */}

          <div className="
            rounded-2xl
            border
            border-[#27272a]
            bg-[#111113]
            p-5
            sm:p-6
          ">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-zinc-500">
                Job Role Match
              </p>

              <span className="rounded-lg bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-400">
                MATCH
              </span>
            </div>

            <p className="mt-4 text-4xl font-bold tracking-tight text-emerald-400 sm:text-5xl">
              {resume.jobRoleMatch?.score || 0}
              <span className="ml-1 text-base font-medium text-zinc-600 sm:text-lg">
                %
              </span>
            </p>

            <p className="mt-3 truncate text-sm text-zinc-500">
              {resume.jobRoleMatch?.role ||
                "No role detected"}
            </p>
          </div>

          {/* EXPERIENCE */}

          <div className="
            rounded-2xl
            border
            border-[#27272a]
            bg-[#111113]
            p-5
            sm:col-span-2
            sm:p-6
            lg:col-span-1
          ">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-zinc-500">
                Experience Level
              </p>

              <span className="rounded-lg bg-purple-500/10 px-2.5 py-1 text-xs font-semibold text-purple-400">
                PROFILE
              </span>
            </div>

            <p className="
              mt-4
              break-words
              text-2xl
              font-bold
              text-white
              sm:text-3xl
            ">
              {resume.experienceLevel ||
                "Not detected"}
            </p>

            <p className="mt-3 text-sm text-zinc-500">
              AI detected profile level
            </p>
          </div>
        </section>

        {/* =========================
            SUMMARY
        ========================== */}

        <section className="
          mt-5
          rounded-2xl
          border
          border-[#27272a]
          bg-[#111113]
          p-5
          sm:mt-6
          sm:p-7
          lg:p-8
        ">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
              📋
            </div>

            <h2 className="text-lg font-bold text-white sm:text-xl">
              Resume Summary
            </h2>
          </div>

          <p className="
            mt-5
            text-sm
            leading-7
            text-zinc-400
            sm:text-base
          ">
            {resume.summary ||
              "No summary available."}
          </p>
        </section>

        {/* =========================
            SKILLS
        ========================== */}

        <section className="
          mt-5
          rounded-2xl
          border
          border-[#27272a]
          bg-[#111113]
          p-5
          sm:mt-6
          sm:p-7
          lg:p-8
        ">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400">
              🛠️
            </div>

            <div>
              <h2 className="text-lg font-bold text-white sm:text-xl">
                Skills
              </h2>

              <p className="mt-0.5 text-xs text-zinc-600">
                Detected from your resume
              </p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2.5">
            {resume.skills?.length > 0 ? (
              resume.skills.map((skill, index) => (
                <span
                  key={index}
                  className="
                    rounded-lg
                    border
                    border-indigo-500/20
                    bg-indigo-500/10
                    px-3
                    py-2
                    text-xs
                    font-semibold
                    text-indigo-300
                    sm:text-sm
                  "
                >
                  {skill}
                </span>
              ))
            ) : (
              <p className="text-sm text-zinc-500">
                No skills detected.
              </p>
            )}
          </div>
        </section>

        {/* =========================
            STRENGTHS / WEAKNESSES
        ========================== */}

        <section className="
          mt-5
          grid
          grid-cols-1
          gap-5
          lg:mt-6
          lg:grid-cols-2
        ">

          {/* STRENGTHS */}

          <div className="
            rounded-2xl
            border
            border-[#27272a]
            bg-[#111113]
            p-5
            sm:p-7
            lg:p-8
          ">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10">
                💪
              </div>

              <h2 className="text-lg font-bold text-white sm:text-xl">
                Strengths
              </h2>
            </div>

            <div className="mt-5 space-y-3">
              {resume.strengths?.length > 0 ? (
                resume.strengths.map((item, index) => (
                  <div
                    key={index}
                    className="
                      rounded-xl
                      border
                      border-emerald-500/10
                      bg-emerald-500/5
                      p-4
                      text-sm
                      leading-6
                      text-zinc-300
                    "
                  >
                    <span className="mr-2 font-bold text-emerald-400">
                      ✓
                    </span>
                    {item}
                  </div>
                ))
              ) : (
                <p className="text-sm text-zinc-500">
                  No strengths detected.
                </p>
              )}
            </div>
          </div>

          {/* WEAKNESSES */}

          <div className="
            rounded-2xl
            border
            border-[#27272a]
            bg-[#111113]
            p-5
            sm:p-7
            lg:p-8
          ">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500/10">
                ⚠️
              </div>

              <h2 className="text-lg font-bold text-white sm:text-xl">
                Weaknesses
              </h2>
            </div>

            <div className="mt-5 space-y-3">
              {resume.weaknesses?.length > 0 ? (
                resume.weaknesses.map((item, index) => (
                  <div
                    key={index}
                    className="
                      rounded-xl
                      border
                      border-orange-500/10
                      bg-orange-500/5
                      p-4
                      text-sm
                      leading-6
                      text-zinc-300
                    "
                  >
                    <span className="mr-2 font-bold text-orange-400">
                      !
                    </span>
                    {item}
                  </div>
                ))
              ) : (
                <p className="text-sm text-zinc-500">
                  No weaknesses detected.
                </p>
              )}
            </div>
          </div>
        </section>

        {/* =========================
            MISSING SKILLS
        ========================== */}

        <section className="
          mt-5
          rounded-2xl
          border
          border-[#27272a]
          bg-[#111113]
          p-5
          sm:mt-6
          sm:p-7
          lg:p-8
        ">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-500/10">
              🎯
            </div>

            <div>
              <h2 className="text-lg font-bold text-white sm:text-xl">
                Missing Skills
              </h2>

              <p className="mt-0.5 text-xs text-zinc-600">
                Skills that could improve your match
              </p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2.5">
            {resume.missingSkills?.length > 0 ? (
              resume.missingSkills.map((skill, index) => (
                <span
                  key={index}
                  className="
                    rounded-lg
                    border
                    border-red-500/20
                    bg-red-500/10
                    px-3
                    py-2
                    text-xs
                    font-semibold
                    text-red-300
                    sm:text-sm
                  "
                >
                  + {skill}
                </span>
              ))
            ) : (
              <p className="text-sm font-medium text-emerald-400">
                No major missing skills detected.
              </p>
            )}
          </div>
        </section>

        {/* =========================
            SUGGESTIONS
        ========================== */}

        <section className="
          mt-5
          rounded-2xl
          border
          border-[#27272a]
          bg-[#111113]
          p-5
          sm:mt-6
          sm:p-7
          lg:p-8
        ">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500/10">
              🚀
            </div>

            <h2 className="text-lg font-bold text-white sm:text-xl">
              Improvement Suggestions
            </h2>
          </div>

          <div className="mt-5 space-y-3">
            {resume.suggestions?.length > 0 ? (
              resume.suggestions.map((item, index) => (
                <div
                  key={index}
                  className="
                    flex
                    items-start
                    gap-3
                    rounded-xl
                    border
                    border-[#252527]
                    bg-[#151517]
                    p-4
                    sm:gap-4
                  "
                >
                  <div className="
                    flex
                    h-7
                    w-7
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    bg-indigo-600
                    text-xs
                    font-bold
                    text-white
                    sm:h-8
                    sm:w-8
                  ">
                    {index + 1}
                  </div>

                  <p className="
                    min-w-0
                    text-sm
                    leading-6
                    text-zinc-400
                  ">
                    {item}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-zinc-500">
                No suggestions available.
              </p>
            )}
          </div>
        </section>

        {/* =========================
            JOB MATCH REASON
        ========================== */}

        <section className="
          mt-5
          rounded-2xl
          border
          border-[#27272a]
          bg-[#111113]
          p-5
          sm:mt-6
          sm:p-7
          lg:p-8
        ">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-500/10">
              🎯
            </div>

            <h2 className="text-lg font-bold text-white sm:text-xl">
              Why This Job Match?
            </h2>
          </div>

          <p className="
            mt-5
            text-sm
            leading-7
            text-zinc-400
            sm:text-base
          ">
            {resume.jobRoleMatch?.reason ||
              "No job match explanation available."}
          </p>
        </section>

        {/* BOTTOM SPACE */}

        <div className="h-8 sm:h-10" />
      </main>
    </div>
  );
}

export default ResumeAnalysis;