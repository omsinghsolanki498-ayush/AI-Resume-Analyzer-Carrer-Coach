import { useNavigate } from "react-router-dom";

function DashboardTopbar({
    onMenuClick,
}) {

    const navigate = useNavigate();

    return (

        <header className="h-[72px] bg-white border-b border-slate-200">

            <div className="h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">

                {/* MOBILE */}

                <div className="flex items-center gap-3 lg:hidden">

                    <button
                        onClick={onMenuClick}
                        className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center hover:bg-slate-50"
                    >
                        ☰
                    </button>

                    <div>

                        <p className="font-bold text-slate-900">
                            ResumeAI
                        </p>

                        <p className="text-[10px] text-slate-400">
                            Career Assistant
                        </p>

                    </div>

                </div>


                {/* DESKTOP */}

                <div className="hidden lg:block">

                    <p className="text-xs text-slate-400">
                        Workspace
                    </p>

                    <p className="font-semibold text-slate-800">
                        Dashboard
                    </p>

                </div>


                {/* RIGHT */}

                <div className="flex items-center gap-3">

                    <button
                        onClick={() =>
                            navigate(
                                "/resume-analyzer"
                            )
                        }
                        className="hidden sm:flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition"
                    >
                        <span className="text-lg">
                            +
                        </span>

                        Upload Resume
                    </button>


                    <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
                        O
                    </div>

                </div>

            </div>

        </header>
    );
}

export default DashboardTopbar;