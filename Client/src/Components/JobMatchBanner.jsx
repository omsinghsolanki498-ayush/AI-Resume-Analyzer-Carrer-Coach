import { useNavigate } from "react-router-dom";

function JobMatchBanner() {

    const navigate = useNavigate();

    return (

        <section className="mb-8">

            <div className="relative overflow-hidden bg-slate-900 rounded-2xl p-5 sm:p-7">

                <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-5">

                    <div>

                        <span className="text-[10px] font-bold tracking-widest text-indigo-300 uppercase">
                            AI Job Matching
                        </span>

                        <h2 className="mt-2 text-xl sm:text-2xl font-bold text-white">
                            Find your next opportunity
                        </h2>

                        <p className="mt-2 text-sm text-slate-400 max-w-xl leading-6">
                            Discover job roles that match your resume,
                            skills and experience.
                        </p>

                    </div>


                    <button
                        onClick={() =>
                            navigate("/jobs")
                        }
                        className="shrink-0 bg-white text-slate-900 px-5 py-3 rounded-xl text-sm font-semibold hover:bg-slate-100 transition"
                    >
                        Explore Jobs →
                    </button>

                </div>


                <div className="absolute -right-16 -top-20 w-64 h-64 bg-indigo-600/20 blur-3xl rounded-full" />

                <div className="absolute right-1/3 -bottom-28 w-60 h-60 bg-violet-600/10 blur-3xl rounded-full" />

            </div>

        </section>
    );
}

export default JobMatchBanner;