import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ResumeCard from "./ResumeCard";

function ResumeList({ resumes = [], onDelete }) {
    const navigate = useNavigate();
    const [deleting, setDeleting] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("newest"); // "newest", "oldest", "score"

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this resume?"
        );

        if (!confirmDelete) return;

        try {
            setDeleting(id);
            const success = await onDelete(id);

            if (!success) {
                console.log("Resume deletion failed");
            }
        } catch (error) {
            console.error("Delete error:", error);
        } finally {
            setDeleting("");
        }
    };

    // Filter & Sort Logic
    const filteredResumes = useMemo(() => {
        return resumes
            .filter((resume) => {
                const nameMatch = (resume?.originalName || "")
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase());
                const roleMatch = (resume?.jobRoleMatch?.role || "")
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase());
                return nameMatch || roleMatch;
            })
            .sort((a, b) => {
                if (sortBy === "score") {
                    const scoreA = Number(a?.atsScore || a?.score || 0);
                    const scoreB = Number(b?.atsScore || b?.score || 0);
                    return scoreB - scoreA;
                }
                if (sortBy === "oldest") {
                    return new Date(a?.createdAt || 0) - new Date(b?.createdAt || 0);
                }
                // Default: newest
                return new Date(b?.createdAt || 0) - new Date(a?.createdAt || 0);
            });
    }, [resumes, searchQuery, sortBy]);

    // Empty State: No Resumes Uploaded
    if (!resumes || resumes.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-800 bg-slate-900/40 p-8 text-center backdrop-blur-md sm:p-12">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/10 text-2xl text-indigo-400 ring-1 ring-indigo-500/20">
                    📄
                </div>
                <h3 className="mt-4 text-base sm:text-lg font-bold text-slate-100">
                    No Resumes Found
                </h3>
                <p className="mt-1 max-w-sm text-xs sm:text-sm text-slate-400">
                    Upload your first resume to generate an instant ATS analysis and unlock tailored job matches.
                </p>
                <button
                    onClick={() => navigate("/upload")}
                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-500 transition-all duration-200 active:scale-95 cursor-pointer"
                >
                    <span>Upload Resume</span>
                    <span>→</span>
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-4">

            {/* Header Controls: Count, Search, & Sort */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-xl border border-slate-800/60 bg-slate-900/50 p-3.5 backdrop-blur-md">

                {/* Count Indicator */}
                <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm font-semibold text-slate-300">
                        Uploaded Resumes
                    </span>
                    <span className="rounded-full bg-indigo-500/10 px-2.5 py-0.5 text-xs font-bold text-indigo-400 ring-1 ring-indigo-500/30">
                        {filteredResumes.length}
                    </span>
                </div>

                {/* Filter Controls */}
                <div className="flex items-center gap-2.5">
                    {/* Search Input */}
                    <div className="relative flex-1 sm:w-48 lg:w-60">
                        <input
                            type="text"
                            placeholder="Search by name or role..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:border-indigo-500/50 focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-slate-300"
                            >
                                ✕
                            </button>
                        )}
                    </div>

                    {/* Sort Dropdown */}
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="rounded-lg border border-slate-800 bg-slate-950 px-2.5 py-1.5 text-xs font-medium text-slate-300 focus:border-indigo-500/50 focus:outline-none cursor-pointer"
                    >
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                        <option value="score">Highest Score</option>
                    </select>
                </div>

            </div>

            {/* Resume Cards Container */}
            {filteredResumes.length > 0 ? (
                <div className="grid grid-cols-1 gap-3 sm:gap-4">
                    {filteredResumes.map((resume) => (
                        <ResumeCard
                            key={resume._id}
                            resume={resume}
                            onDelete={handleDelete}
                            deleting={deleting}
                        />
                    ))}
                </div>
            ) : (
                /* Search Filter Empty State */
                <div className="rounded-xl border border-slate-800/60 bg-slate-900/30 p-8 text-center">
                    <p className="text-xs sm:text-sm text-slate-400">
                        No resumes match your filter "{searchQuery}".
                    </p>
                    <button
                        onClick={() => setSearchQuery("")}
                        className="mt-2 text-xs font-semibold text-indigo-400 hover:underline"
                    >
                        Clear search filter
                    </button>
                </div>
            )}

        </div>
    );
}

export default ResumeList;