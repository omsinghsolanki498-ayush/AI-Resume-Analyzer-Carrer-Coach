import { useNavigate } from "react-router-dom";

function DashboardSidebar({
    mobile = false,
    onClose = () => {},
}) {

    const navigate = useNavigate();

    const goTo = (path) => {

        navigate(path);

        onClose();
    };

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");

        onClose();
    };

    return (

        <div className="h-full flex flex-col bg-white">

            {/* LOGO */}

            <div className="h-[76px] px-5 flex items-center border-b border-slate-200">

                <div className="flex items-center gap-3">

                    <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-lg">
                        R
                    </div>

                    <div>

                        <h1 className="font-bold text-[17px] text-slate-900">
                            ResumeAI
                        </h1>

                        <p className="text-[11px] text-slate-400">
                            Career Assistant
                        </p>

                    </div>

                </div>

                {mobile && (

                    <button
                        onClick={onClose}
                        className="ml-auto w-9 h-9 rounded-lg hover:bg-slate-100 text-xl text-slate-500"
                    >
                        ×
                    </button>

                )}

            </div>


            {/* NAVIGATION */}

            <div className="flex-1 px-3 py-6 overflow-y-auto">

                <p className="px-3 mb-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    Workspace
                </p>

                <div className="space-y-1">

                    <button
                        onClick={() =>
                            goTo("/dashboard")
                        }
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl bg-indigo-50 text-indigo-700 font-semibold text-sm"
                    >
                        <span className="w-5 text-center">
                            ▦
                        </span>

                        Dashboard
                    </button>


                    <button
                        onClick={() =>
                            goTo("/resume-analyzer")
                        }
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition text-sm"
                    >
                        <span className="w-5 text-center">
                            ▤
                        </span>

                        Resume Analyzer
                    </button>


                    <button
                        onClick={() =>
                            goTo("/career-coach")
                        }
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition text-sm"
                    >
                        <span className="w-5 text-center">
                            ✦
                        </span>

                        Career Coach
                    </button>


                    <button
                        onClick={() =>
                            goTo("/roadmap")
                        }
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition text-sm"
                    >
                        <span className="w-5 text-center">
                            ◈
                        </span>

                        Career Roadmap
                    </button>


                    <button
                        onClick={() =>
                            goTo("/jobs")
                        }
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition text-sm"
                    >
                        <span className="w-5 text-center">
                            ◫
                        </span>

                        Job Matches
                    </button>

                </div>

            </div>


            {/* USER */}

            <div className="p-3 border-t border-slate-200">

                <div className="flex items-center gap-3 px-3 py-3">

                    <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
                        U
                    </div>

                    <div className="min-w-0">

                        <p className="text-sm font-semibold text-slate-800">
                            Your Account
                        </p>

                        <p className="text-xs text-slate-400">
                            Personal workspace
                        </p>

                    </div>

                </div>


                <button
                    onClick={logout}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-500 hover:bg-red-50 transition text-sm"
                >
                    <span>
                        ↪
                    </span>

                    Logout
                </button>

            </div>

        </div>
    );
}

export default DashboardSidebar;