import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";

function ResumeAnalysis() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [resume, setResume] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const fetchResume = async () => {
      try {
        setLoading(true);

        const response = await api.get(
          `/resume/${id}`
        );

        setResume(
          response.data.resume
        );

      } catch (error) {
        console.error(
          "ANALYSIS FETCH ERROR:",
          error.response?.data ||
            error.message
        );

        if (
          error.response?.status === 401
        ) {
          localStorage.removeItem(
            "token"
          );

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

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">

        <div className="text-center">

          <div className="text-4xl animate-spin">
            ⏳
          </div>

          <p className="text-slate-500 mt-3">
            Loading analysis...
          </p>

        </div>

      </div>
    );
  }

  if (error || !resume) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-5">

        <div className="bg-white border rounded-2xl p-8 text-center max-w-md w-full">

          <div className="text-4xl">
            ⚠️
          </div>

          <h2 className="text-xl font-bold mt-4">
            {error ||
              "Resume not found"}
          </h2>

          <button
            onClick={() =>
              navigate("/dashboard")
            }
            className="mt-5 px-5 py-3 bg-indigo-600 text-white rounded-xl font-semibold"
          >
            Back to Dashboard
          </button>

        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* BACK */}

        <button
          onClick={() =>
            navigate("/dashboard")
          }
          className="text-indigo-600 font-semibold mb-6"
        >
          ← Back to Dashboard
        </button>

        {/* HEADER */}

        <div className="mb-8">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

            <div>

              <p className="text-sm text-indigo-600 font-semibold">
                AI Resume Analysis
              </p>

              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-1">
                {resume.originalName}
              </h1>

              <p className="text-slate-500 mt-2">
                Target Role:{" "}
                {resume.jobRoleMatch?.role ||
                  "Not specified"}
              </p>

            </div>

            {resume.cloudinaryUrl && (
              <a
                href={resume.cloudinaryUrl}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 bg-white border border-slate-300 rounded-xl font-semibold text-slate-700 hover:bg-slate-50"
              >
                View Resume
              </a>
            )}

          </div>

        </div>

        {/* =========================
            TOP STATS
        ========================== */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          {/* ATS */}

          <div className="bg-white border rounded-3xl p-6">

            <p className="text-sm text-slate-500">
              ATS Score
            </p>

            <p className="text-5xl font-bold text-indigo-600 mt-3">
              {resume.atsScore || 0}
              <span className="text-xl text-slate-400">
                /100
              </span>
            </p>

            <div className="mt-5 h-3 bg-slate-100 rounded-full overflow-hidden">

              <div
                className="h-full bg-indigo-600 rounded-full"
                style={{
                  width: `${Math.min(
                    resume.atsScore || 0,
                    100
                  )}%`,
                }}
              />

            </div>

          </div>

          {/* MATCH */}

          <div className="bg-white border rounded-3xl p-6">

            <p className="text-sm text-slate-500">
              Job Role Match
            </p>

            <p className="text-5xl font-bold text-green-600 mt-3">
              {resume
                .jobRoleMatch
                ?.score || 0}
              <span className="text-xl">
                %
              </span>
            </p>

            <p className="text-sm text-slate-500 mt-3">
              {
                resume
                  .jobRoleMatch
                  ?.role
              }
            </p>

          </div>

          {/* EXPERIENCE */}

          <div className="bg-white border rounded-3xl p-6">

            <p className="text-sm text-slate-500">
              Experience Level
            </p>

            <p className="text-3xl font-bold text-slate-900 mt-4">
              {resume.experienceLevel ||
                "Not detected"}
            </p>

            <p className="text-sm text-slate-500 mt-3">
              AI detected profile level
            </p>

          </div>

        </div>

        {/* =========================
            SUMMARY
        ========================== */}

        <div className="mt-6 bg-white border rounded-3xl p-6 sm:p-8">

          <h2 className="text-2xl font-bold">
            📋 Resume Summary
          </h2>

          <p className="mt-4 text-slate-600 leading-7">
            {resume.summary ||
              "No summary available."}
          </p>

        </div>

        {/* =========================
            SKILLS
        ========================== */}

        <div className="mt-6 bg-white border rounded-3xl p-6 sm:p-8">

          <h2 className="text-2xl font-bold">
            🛠️ Skills
          </h2>

          <div className="flex flex-wrap gap-3 mt-5">

            {resume.skills?.length > 0 ? (
              resume.skills.map(
                (skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full font-semibold text-sm"
                  >
                    {skill}
                  </span>
                )
              )
            ) : (
              <p className="text-slate-500">
                No skills detected.
              </p>
            )}

          </div>

        </div>

        {/* =========================
            STRENGTHS / WEAKNESSES
        ========================== */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">

          {/* STRENGTHS */}

          <div className="bg-white border rounded-3xl p-6 sm:p-8">

            <h2 className="text-2xl font-bold">
              💪 Strengths
            </h2>

            <div className="mt-5 space-y-3">

              {resume.strengths?.map(
                (item, index) => (
                  <div
                    key={index}
                    className="p-4 bg-green-50 border border-green-100 rounded-xl text-green-800"
                  >
                    ✓ {item}
                  </div>
                )
              )}

            </div>

          </div>

          {/* WEAKNESSES */}

          <div className="bg-white border rounded-3xl p-6 sm:p-8">

            <h2 className="text-2xl font-bold">
              ⚠️ Weaknesses
            </h2>

            <div className="mt-5 space-y-3">

              {resume.weaknesses?.map(
                (item, index) => (
                  <div
                    key={index}
                    className="p-4 bg-orange-50 border border-orange-100 rounded-xl text-orange-800"
                  >
                    ! {item}
                  </div>
                )
              )}

            </div>

          </div>

        </div>

        {/* =========================
            MISSING SKILLS
        ========================== */}

        <div className="mt-6 bg-white border rounded-3xl p-6 sm:p-8">

          <h2 className="text-2xl font-bold">
            🎯 Missing Skills
          </h2>

          <div className="flex flex-wrap gap-3 mt-5">

            {resume.missingSkills?.length >
            0 ? (
              resume.missingSkills.map(
                (skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-red-50 text-red-700 border border-red-100 rounded-full font-semibold text-sm"
                  >
                    + {skill}
                  </span>
                )
              )
            ) : (
              <p className="text-green-600 font-semibold">
                No major missing skills
                detected.
              </p>
            )}

          </div>

        </div>

        {/* =========================
            SUGGESTIONS
        ========================== */}

        <div className="mt-6 bg-white border rounded-3xl p-6 sm:p-8">

          <h2 className="text-2xl font-bold">
            🚀 Improvement Suggestions
          </h2>

          <div className="mt-5 space-y-4">

            {resume.suggestions?.map(
              (item, index) => (
                <div
                  key={index}
                  className="flex gap-4 p-4 bg-slate-50 rounded-xl"
                >

                  <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold shrink-0">
                    {index + 1}
                  </div>

                  <p className="text-slate-700 leading-6">
                    {item}
                  </p>

                </div>
              )
            )}

          </div>

        </div>

        {/* =========================
            JOB MATCH REASON
        ========================== */}

        <div className="mt-6 bg-white border rounded-3xl p-6 sm:p-8">

          <h2 className="text-2xl font-bold">
            🎯 Why This Job Match?
          </h2>

          <p className="mt-4 text-slate-600 leading-7">
            {
              resume
                .jobRoleMatch
                ?.reason
            }
          </p>

        </div>

      </main>

    </div>
  );
}

export default ResumeAnalysis;