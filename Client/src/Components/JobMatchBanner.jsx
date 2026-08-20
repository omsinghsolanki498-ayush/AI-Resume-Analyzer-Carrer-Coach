import { useNavigate } from "react-router-dom";
import { Briefcase, ArrowRight, Sparkles } from "lucide-react";

function JobMatchBanner() {
    const navigate = useNavigate();

    return (
        <section className="mb-8 w-full mt-10">
            <div className="relative overflow-hidden rounded-md   p-6 sm:p-8 lg:p-9 transition-all duration-300">
                {/* Banner Content Container */}
                <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div className="flex-1 space-y-3">

                        {/* Title & Description */}
                        <div>
                            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-black">
                                Find your next opportunity
                            </h2>

                            <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-xl leading-relaxed">
                                Discover job roles tailored precisely to your resume, skill set, and target career path.
                            </p>
                        </div>
                    </div>

                    {/* Action Button */}
                    <div className="shrink-0 pt-2 md:pt-0">
                        <button
                            onClick={() => navigate("/jobs")}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-md h-10 bg-red-600 hover:bg-red-600 text-slate-900 px-5 py-3.5 text-xs sm:text-sm font-semibold shadow-lg shadow-black/20 transition-all duration-200 active:scale-95 cursor-pointer group/btn"
                        >
                            <Briefcase className="w-4 h-4 text-slate-700" />
                            <span>Explore Jobs</span>
                            <ArrowRight className="w-4 h-4 text-slate-700 group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default JobMatchBanner;