// import { useNavigate } from "react-router-dom";

// function ResumeCard({
//     resume,
//     onDelete,
//     deleting,
// }) {

//     const navigate = useNavigate();

//     const score = Number(
//         resume.atsScore ||
//         resume.score ||
//         0
//     );

//     const role =
//         resume.jobRoleMatch?.role ||
//         "Not specified";

//     const date = resume.createdAt
//         ? new Date(
//               resume.createdAt
//           ).toLocaleDateString(
//               "en-IN",
//               {
//                   day: "numeric",
//                   month: "short",
//                   year: "numeric",
//               }
//           )
//         : "Recently uploaded";

//     return (

//         <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition">

//             <div className="flex flex-col lg:flex-row lg:items-center gap-4">

//                 {/* RESUME INFO */}

//                 <div className="flex items-center gap-3 flex-1 min-w-0">

//                     <div className="w-11 h-11 shrink-0 rounded-xl bg-red-50 text-red-600 flex items-center justify-center text-[10px] font-bold">
//                         PDF
//                     </div>

//                     <div className="min-w-0">

//                         <p className="font-semibold text-sm sm:text-base text-slate-900 truncate">
//                             {resume.originalName ||
//                                 "Resume.pdf"}
//                         </p>

//                         <p className="text-xs text-slate-400 mt-1">
//                             {date}
//                         </p>

//                     </div>

//                 </div>


//                 {/* ATS */}

//                 <div className="flex items-center gap-3 lg:w-[150px]">

//                     <div className="w-11 h-11 shrink-0 rounded-full bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-sm">
//                         {score}
//                     </div>

//                     <div>

//                         <p className="text-xs font-semibold text-slate-700">
//                             ATS Score
//                         </p>

//                         <p className="text-xs text-slate-400">
//                             out of 100
//                         </p>

//                     </div>

//                 </div>


//                 {/* ROLE */}

//                 <div className="lg:w-[210px]">

//                     <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
//                         Target role
//                     </p>

//                     <p className="text-sm font-semibold text-slate-700 mt-1 truncate">
//                         {role}
//                     </p>

//                 </div>


//                 {/* ACTIONS */}

//                 <div className="flex gap-2 w-full lg:w-auto">

//                     <button
//                         onClick={() =>
//                             navigate(
//                                 `/resume-analysis/${resume._id}`
//                             )
//                         }
//                         className="flex-1 lg:flex-none px-4 py-2.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-xl text-sm font-semibold transition"
//                     >
//                         View Analysis
//                     </button>


//                     <button
//                         disabled={
//                             deleting ===
//                             resume._id
//                         }
//                         onClick={() =>
//                             onDelete(
//                                 resume._id
//                             )
//                         }
//                         className="px-4 py-2.5 text-red-500 hover:bg-red-50 rounded-xl text-sm font-semibold transition disabled:opacity-50"
//                     >
//                         {deleting ===
//                         resume._id
//                             ? "..."
//                             : "Delete"}
//                     </button>

//                 </div>

//             </div>

//         </div>
//     );
// }

// export default ResumeCard;

import { useNavigate } from "react-router-dom";

function ResumeCard({ resume, onDelete, deleting }) {
    const navigate = useNavigate();

    const score = Number(resume?.atsScore || resume?.score || 0);
    const isDeleting = deleting === resume?._id;

    const role = resume?.jobRoleMatch?.role || "Not specified";

    const date = resume?.createdAt
        ? new Date(resume.createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
          })
        : "Recently uploaded";

    // Dynamic color coding based on ATS Score ranges
    const getScoreStyles = (val) => {
        if (val >= 80) {
            return {
                bg: "bg-emerald-500/10",
                text: "text-emerald-400",
                ring: "ring-emerald-500/30",
            };
        }
        if (val >= 60) {
            return {
                bg: "bg-amber-500/10",
                text: "text-amber-400",
                ring: "ring-amber-500/30",
            };
        }
        return {
            bg: "bg-rose-500/10",
            text: "text-rose-400",
            ring: "ring-rose-500/30",
        };
    };

    const scoreStyle = getScoreStyles(score);

    return (
        <div className="group relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/80 p-4 sm:p-5 backdrop-blur-md transition-all duration-300 hover:border-slate-700 hover:bg-slate-900 hover:shadow-xl hover:shadow-indigo-500/5">
            
            {/* Main Layout Container */}
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                {/* 1. RESUME FILE INFO */}
                <div className="flex items-center gap-3.5 min-w-0 flex-1">
                    {/* PDF Badge Icon */}
                    <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-rose-500/10 to-rose-600/20 ring-1 ring-rose-500/30 group-hover:scale-105 transition-transform duration-200">
                        <span className="text-xs font-black text-rose-400 tracking-wider">
                            PDF
                        </span>
                    </div>

                    {/* File details */}
                    <div className="min-w-0 flex-1">
                        <h4 className="font-semibold text-sm sm:text-base text-slate-100 truncate group-hover:text-indigo-300 transition-colors">
                            {resume?.originalName || "Resume.pdf"}
                        </h4>
                        <div className="mt-0.5 flex items-center gap-2 text-xs text-slate-400">
                            <span>{date}</span>
                            <span className="text-slate-600">•</span>
                            <span className="text-slate-500 truncate">
                                {resume?.fileSize ? `${(resume.fileSize / 1024 / 1024).toFixed(1)} MB` : "Document"}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Divider for mobile screens */}
                <div className="h-[1px] w-full bg-slate-800/80 lg:hidden" />

                {/* Middle Group (ATS Score & Target Role) */}
                <div className="grid grid-cols-2 gap-4 sm:flex sm:items-center sm:gap-6 lg:w-auto">
                    
                    {/* 2. ATS SCORE BADGE */}
                    <div className="flex items-center gap-3 lg:w-[140px]">
                        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${scoreStyle.bg} ${scoreStyle.text} ring-1 ${scoreStyle.ring} font-black text-sm sm:text-base shadow-sm`}>
                            {score}
                        </div>
                        <div>
                            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                ATS Score
                            </p>
                            <p className="text-xs text-slate-500">out of 100</p>
                        </div>
                    </div>

                    {/* 3. TARGET ROLE */}
                    <div className="lg:w-[180px] xl:w-[200px]">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                            Target Role
                        </p>
                        <p className="mt-0.5 text-xs sm:text-sm font-semibold text-slate-200 truncate">
                            {role}
                        </p>
                    </div>

                </div>

                {/* 4. ACTIONS GROUP */}
                <div className="flex items-center gap-2.5 pt-2 lg:pt-0 w-full sm:w-auto border-t border-slate-800/80 lg:border-t-0">
                    
                    {/* Primary Button: View Analysis */}
                    <button
                        onClick={() => navigate(`/resume-analysis/${resume?._id}`)}
                        className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600/10 hover:bg-indigo-600/20 px-4 py-2.5 text-xs sm:text-sm font-semibold text-indigo-400 hover:text-indigo-300 ring-1 ring-indigo-500/30 transition-all duration-200 active:scale-95 cursor-pointer"
                    >
                        <span>View Analysis</span>
                        <span className="text-base leading-none">→</span>
                    </button>

                    {/* Secondary Button: Delete */}
                    <button
                        disabled={isDeleting}
                        onClick={() => onDelete(resume?._id)}
                        className="inline-flex items-center justify-center rounded-xl bg-rose-500/10 hover:bg-rose-500/20 px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-rose-400 hover:text-rose-300 ring-1 ring-rose-500/20 transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        title="Delete Resume"
                    >
                        {isDeleting ? (
                            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-rose-400 border-t-transparent" />
                        ) : (
                            <span>Delete</span>
                        )}
                    </button>

                </div>

            </div>
        </div>
    );
}

export default ResumeCard;