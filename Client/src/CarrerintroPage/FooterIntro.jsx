import React from "react";
import { useNavigate } from "react-router-dom";

function FooterIntro() {
    const navigate = useNavigate();

    return (
        <footer className="w-full border-t border-slate-800/60 bg-slate-950">
            <div
                className="
                    mx-auto
                    flex
                    w-full
                    max-w-5xl
                    flex-col
                    items-center
                    justify-center
                    gap-5
                    px-4
                    py-7
                    text-center
                    sm:px-6
                    sm:py-8
                    md:flex-row
                    md:justify-between
                    md:text-left
                    lg:px-8
                "
            >
                {/* ================= LOGO ================= */}
                <div
                    className="
                        flex
                        flex-col
                        items-center
                        justify-center
                        md:items-start
                    "
                >
                    <button
                        type="button"
                        onClick={() => navigate("/")}
                        className="
                            flex
                            items-center
                            gap-2
                            rounded-md
                            outline-none
                        "
                    >
                        {/* Logo */}
                        <span
                            className="
                                flex
                                h-7
                                w-7
                                shrink-0
                                items-center
                                justify-center
                                rounded-md
                                bg-indigo-600
                                text-[10px]
                                font-bold
                                text-white
                                sm:h-8
                                sm:w-8
                                sm:text-xs
                            "
                        >
                            R
                        </span>

                        {/* Brand */}
                        <span
                            className="
                                text-sm
                                font-bold
                                tracking-tight
                                text-white
                                sm:text-base
                            "
                        >
                            Resume
                            <span className="text-indigo-400">
                                AI
                            </span>
                        </span>
                    </button>

                    {/* Copyright */}
                    <p
                        className="
                            mt-1.5
                            text-[9px]
                            leading-4
                            text-slate-600
                            sm:text-[10px]
                        "
                    >
                        © {new Date().getFullYear()} ResumeAI. All
                        rights reserved.
                    </p>
                </div>

                {/* ================= FOOTER LINKS ================= */}
                <nav
                    className="
                        flex
                        flex-wrap
                        items-center
                        justify-center
                        gap-x-4
                        gap-y-2
                        text-[10px]
                        text-slate-500
                        sm:gap-x-5
                        sm:text-[11px]
                        md:justify-end
                    "
                >  
                </nav>
            </div>
        </footer>
    );
}

export default FooterIntro;