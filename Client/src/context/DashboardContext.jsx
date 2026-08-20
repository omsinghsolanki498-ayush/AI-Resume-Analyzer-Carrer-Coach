import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import api from "../api/Axios";


const DashboardContext =
    createContext(null);


export function DashboardProvider({
    children,
}) {

    const [resumes, setResumes] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    // =========================================
    // FETCH RESUMES
    // =========================================

    const fetchResumes = async () => {

        try {

            setLoading(true);
            setError("");


            const response =
                await api.get(
                    "/resume/my-resumes"
                );


            console.log(
                "RESUME RESPONSE:",
                response.data
            );


            const resumeData =
                Array.isArray(
                    response.data?.resumes
                )
                    ? response.data.resumes
                    : [];


            setResumes(resumeData);

        } catch (error) {

            console.error(
                "FETCH RESUMES ERROR:",
                error
            );


            setError(
                error?.response?.data?.message ||
                "Failed to load resumes"
            );


            setResumes([]);

        } finally {

            setLoading(false);

        }
    };


    // =========================================
    // DELETE RESUME
    // =========================================

    const deleteResume = async (id) => {

        try {

            setError("");


            console.log(
                "DELETE:",
                id
            );


            const response =
                await api.delete(
                    `/resume/${id}`
                );


            console.log(
                "DELETE RESPONSE:",
                response.data
            );


            // Update UI after
            // successful backend delete

            setResumes((prev) =>
                prev.filter(
                    (resume) =>
                        resume._id !== id
                )
            );


            return true;

        } catch (error) {

            console.error(
                "DELETE RESUME ERROR:",
                error
            );


            setError(
                error?.response?.data?.message ||
                "Failed to delete resume"
            );


            return false;

        }
    };


    // =========================================
    // REFRESH
    // =========================================

    const refreshResumes = () => {

        fetchResumes();

    };


    // =========================================
    // INITIAL LOAD
    // =========================================

    useEffect(() => {

        fetchResumes();

    }, []);


    // =========================================
    // ATS SCORE
    // =========================================

    const analyzedResumes =
        resumes.filter((resume) => {

            const score =
                resume?.atsScore ??
                resume?.analysis?.atsScore ??
                resume?.analysis?.score;


            return (
                score !== undefined &&
                score !== null &&
                score !== ""
            );

        });


    const totalScore =
        analyzedResumes.reduce(
            (total, resume) => {

                const score =
                    Number(
                        resume?.atsScore ??
                        resume?.analysis?.atsScore ??
                        resume?.analysis?.score ??
                        0
                    );


                return total + score;

            },
            0
        );


    const averageScore =
        analyzedResumes.length > 0
            ? Math.round(
                totalScore /
                analyzedResumes.length
            )
            : 0;


    // =========================================
    // SKILLS
    // =========================================

    const allSkills = [];


    resumes.forEach((resume) => {

        const skills =
            resume?.skills ??
            resume?.analysis?.skills ??
            [];


        if (Array.isArray(skills)) {

            skills.forEach((skill) => {

                if (
                    typeof skill ===
                    "string"
                ) {

                    allSkills.push(
                        skill.trim()
                    );

                } else if (
                    skill &&
                    typeof skill ===
                    "object" &&
                    skill.name
                ) {

                    allSkills.push(
                        skill.name.trim()
                    );

                }

            });

        }

    });


    const uniqueSkills =
        [
            ...new Set(
                allSkills.filter(Boolean)
            ),
        ];


    const totalSkills =
        uniqueSkills.length;


    // =========================================
    // EXPERIENCE
    // =========================================

    let experience =
        "Not detected";


    if (resumes.length > 0) {

        const latestResume =
            resumes[0];


        experience =
            latestResume?.experienceLevel ??
            latestResume?.experience ??
            latestResume?.analysis?.experienceLevel ??
            latestResume?.analysis?.experience ??
            "Not detected";

    }


    // =========================================
    // CONTEXT
    // =========================================

    const value = {

        resumes,

        loading,

        error,

        averageScore,

        totalSkills,

        experience,

        deleteResume,

        refreshResumes,

    };


    return (

        <DashboardContext.Provider
            value={value}
        >

            {children}

        </DashboardContext.Provider>

    );
}


// =========================================
// HOOK
// =========================================

export function useDashboard() {

    const context =
        useContext(
            DashboardContext
        );


    if (!context) {

        throw new Error(
            "useDashboard must be used inside DashboardProvider"
        );

    }


    return context;
}