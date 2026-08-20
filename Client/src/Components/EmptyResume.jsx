// import { useNavigate } from "react-router-dom";

// function EmptyResume() {

//     const navigate = useNavigate();

//     return (

//         <div className="bg-white border border-dashed border-slate-500 rounded-2xl p-8 sm:p-12 text-center">

//             <div className="mx-auto w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm font-bold">
//                 PDF
//             </div>


//             <h3 className="mt-5 font-bold text-slate-900">
//                 No resume uploaded yet
//             </h3>


//             <p className="mt-2 max-w-md mx-auto text-sm text-slate-500 leading-6">
//                 Upload your resume to get your ATS score,
//                 strengths and personalized career insights.
//             </p>


//             <button
//                 onClick={() =>
//                     navigate(
//                         "/resume-analyzer"
//                     )
//                 }
//                 className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl text-sm font-semibold transition"
//             >
//                 Upload Resume
//             </button>

//         </div>
//     );
// }

// export default EmptyResume;


import { useNavigate } from "react-router-dom";

function EmptyResume() {
    const navigate = useNavigate();

    return (
        <div className="relative overflow-hidden rounded-2xl border border-dashed border-slate-700/80 bg-slate-900/60 p-6 sm:p-10 md:p-12 text-center backdrop-blur-sm transition-all duration-300 hover:border-slate-600 group">
            {/* Subtle background glow effect */}
            <div className="pointer-events-none absolute -top-24 -left-24 h-48 w-48 rounded-full bg-indigo-500/10 blur-3xl group-hover:bg-indigo-500/15 transition-all duration-500" />
            <div className="pointer-events-none absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-purple-500/10 blur-3xl group-hover:bg-purple-500/15 transition-all duration-500" />

            <div className="relative z-10 flex flex-col items-center">
                {/* Visual Icon Container */}
                <div className="relative flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-500/10 via-slate-800 to-purple-500/10 ring-1 ring-slate-700/60 shadow-lg shadow-indigo-500/5 group-hover:scale-105 group-hover:ring-indigo-500/40 transition-all duration-300">
                    <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-lg sm:text-xl font-black text-transparent tracking-wider">
                        PDF
                    </span>
                    
                    {/* Floating Pulse Badge */}
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
                    </span>
                </div>

                {/* Typography */}
                <h3 className="mt-5 sm:mt-6 text-base sm:text-lg font-bold text-slate-100 tracking-tight">
                    No resume uploaded yet
                </h3>

                <p className="mt-2 max-w-sm sm:max-w-md text-xs sm:text-sm text-slate-400 leading-relaxed sm:leading-6">
                    Upload your resume to instantly unlock your <span className="text-slate-200 font-medium">ATS score</span>, 
                    identify key strengths, and access personalized career insights.
                </p>

                {/* CTA Action Button */}
                <button
                    onClick={() => navigate("/resume-analyzer")}
                    className="mt-6 sm:mt-8 w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-3 text-xs sm:text-sm font-semibold text-white shadow-md shadow-indigo-500/20 hover:from-indigo-500 hover:to-violet-500 hover:shadow-indigo-500/30 transition-all duration-200 active:scale-95 cursor-pointer"
                >
                    <span className="text-base font-bold leading-none">+</span>
                    <span>Upload Resume</span>
                </button>
            </div>
        </div>
    );
}

export default EmptyResume;