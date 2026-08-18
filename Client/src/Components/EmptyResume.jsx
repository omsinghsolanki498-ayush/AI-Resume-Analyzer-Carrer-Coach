import { useNavigate } from "react-router-dom";

function EmptyResume() {

    const navigate = useNavigate();

    return (

        <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-8 sm:p-12 text-center">

            <div className="mx-auto w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm font-bold">
                PDF
            </div>


            <h3 className="mt-5 font-bold text-slate-900">
                No resume uploaded yet
            </h3>


            <p className="mt-2 max-w-md mx-auto text-sm text-slate-500 leading-6">
                Upload your resume to get your ATS score,
                strengths and personalized career insights.
            </p>


            <button
                onClick={() =>
                    navigate(
                        "/resume-analyzer"
                    )
                }
                className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl text-sm font-semibold transition"
            >
                Upload Resume
            </button>

        </div>
    );
}

export default EmptyResume;