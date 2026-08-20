import { useNavigate, useLocation } from "react-router-dom";

function DashboardTopbar({ onMenuClick }) {
    const navigate = useNavigate();
    const location = useLocation();

    // Map current path to clean page titles dynamically
    const getPageTitle = (pathname) => {
        switch (pathname) {
            case "/dashboard":
                return "Dashboard";
            case "/resume-analyzer":
                return "Resume Analyzer";
            case "/career-coach":
                return "Career Coach";
            case "/roadmap":
                return "Career Roadmap";
            case "/jobs":
                return "Job Matches";
            default:
                return "Workspace";
        }
    };

    return (
        <header className="sticky top-0 z-30 h-16 w-full bg-slate-900/95 backdrop-blur-md border-b border-slate-800/80 transition-all">
            <div className="h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">

                {/* LEFT SECTION */}
                <div className="flex items-center gap-3">
                    {/* Mobile Hamburger Button */}
                    <button
                        onClick={onMenuClick}
                        aria-label="Open sidebar menu"
                        className="lg:hidden w-9 h-9 rounded-xl border border-slate-800 bg-slate-800/50 hover:bg-slate-800 hover:border-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-all duration-200 active:scale-95"
                    >
                        <span className="text-lg leading-none">☰</span>
                    </button>

                    {/* Mobile Branding (Hidden on Desktop) */}
                    <div className="flex items-center gap-2.5 lg:hidden">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-violet-500 text-white flex items-center justify-center font-black text-sm shadow-md shadow-indigo-500/20 ring-1 ring-white/20">
                            R
                        </div>
                        <div className="leading-tight">
                            <p className="font-bold text-sm text-slate-100 tracking-tight">
                                ResumeAI
                            </p>
                            <p className="text-[10px] font-medium text-indigo-400">
                                Career Assistant
                            </p>
                        </div>
                    </div>

                    {/* Desktop Breadcrumb Navigation (Hidden on Mobile) */}
                    <div className="hidden lg:flex items-center gap-2 text-xs">
                        <span className="text-slate-500 font-medium">Workspace</span>
                        <span className="text-slate-700">/</span>
                        <span className="font-semibold text-slate-200 text-sm tracking-tight">
                            {getPageTitle(location.pathname)}
                        </span>
                    </div>
                </div>

                {/* RIGHT SECTION */}
                <div className="flex items-center gap-3 sm:gap-4">
                    {/* Primary Action Button */}
                    <button
                        onClick={() => navigate("/resume-analyzer")}
                        className="relative group rounded-md justify-center w-40 h-10 overflow-hidden bg-gradient-to-r from-red-600 hover:from-red-500 hover:to-violet-500 text-white px-3.5 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all duration-200 active:scale-95 flex items-center gap-2"
                    >
                        <span className="text-base font-bold leading-none group-hover:scale-110 transition-transform duration-200">
                            
                        </span>
                        <span>Upload Resume</span>
                    </button>

                    {/* Divider */}
                    <div className="h-5 w-[1px] bg-slate-800 hidden sm:block" />

                    {/* User Profile Avatar */}
                    <button 
                        aria-label="User menu"
                        className="relative group rounded-full p-0.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                    >
                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold text-xs sm:text-sm ring-2 ring-slate-800 group-hover:ring-slate-700 transition-all shadow-inner">
                            O
                        </div>
                        {/* Status Indicator Dot */}
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-slate-900" />
                    </button>
                </div>

            </div>
        </header>
    );
}

export default DashboardTopbar;