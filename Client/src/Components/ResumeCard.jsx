import { useNavigate } from "react-router-dom";

function ResumeCard({
    resume,
    onDelete,
    deleting,
}) {

    const navigate = useNavigate();

    const score = Number(
        resume.atsScore ||
        resume.score ||
        0
    );

    const role =
        resume.jobRoleMatch?.role ||
        "Not specified";

    const date = resume.createdAt
        ? new Date(
              resume.createdAt
          ).toLocaleDateString(
              "en-IN",
              {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
              }
          )
        : "Recently uploaded";

    return (

        <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition">

            <div className="flex flex-col lg:flex-row lg:items-center gap-4">

                {/* RESUME INFO */}

                <div className="flex items-center gap-3 flex-1 min-w-0">

                    <div className="w-11 h-11 shrink-0 rounded-xl bg-red-50 text-red-600 flex items-center justify-center text-[10px] font-bold">
                        PDF
                    </div>

                    <div className="min-w-0">

                        <p className="font-semibold text-sm sm:text-base text-slate-900 truncate">
                            {resume.originalName ||
                                "Resume.pdf"}
                        </p>

                        <p className="text-xs text-slate-400 mt-1">
                            {date}
                        </p>

                    </div>

                </div>


                {/* ATS */}

                <div className="flex items-center gap-3 lg:w-[150px]">

                    <div className="w-11 h-11 shrink-0 rounded-full bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-sm">
                        {score}
                    </div>

                    <div>

                        <p className="text-xs font-semibold text-slate-700">
                            ATS Score
                        </p>

                        <p className="text-xs text-slate-400">
                            out of 100
                        </p>

                    </div>

                </div>


                {/* ROLE */}

                <div className="lg:w-[210px]">

                    <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                        Target role
                    </p>

                    <p className="text-sm font-semibold text-slate-700 mt-1 truncate">
                        {role}
                    </p>

                </div>


                {/* ACTIONS */}

                <div className="flex gap-2 w-full lg:w-auto">

                    <button
                        onClick={() =>
                            navigate(
                                `/resume-analysis/${resume._id}`
                            )
                        }
                        className="flex-1 lg:flex-none px-4 py-2.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-xl text-sm font-semibold transition"
                    >
                        View Analysis
                    </button>


                    <button
                        disabled={
                            deleting ===
                            resume._id
                        }
                        onClick={() =>
                            onDelete(
                                resume._id
                            )
                        }
                        className="px-4 py-2.5 text-red-500 hover:bg-red-50 rounded-xl text-sm font-semibold transition disabled:opacity-50"
                    >
                        {deleting ===
                        resume._id
                            ? "..."
                            : "Delete"}
                    </button>

                </div>

            </div>

        </div>
    );
}

export default ResumeCard;