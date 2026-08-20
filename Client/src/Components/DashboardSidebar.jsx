import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function DashboardSidebar() {
    const navigate = useNavigate();
    const location = useLocation();

    const [mobileOpen, setMobileOpen] = useState(false);
    const [accountOpen, setAccountOpen] = useState(false);

    const accountRef = useRef(null);

    // ==========================================
    // NAVIGATION ITEMS
    // ==========================================

    const navItems = [
        {
            label: "Dashboard",
            path: "/dashboard",
            icon: "▦",
        },
        {
            label: "Resume Analyzer",
            path: "/resume-analyzer",
            icon: "▤",
        },
        {
            label: "Career Coach",
            path: "/career-coach",
            icon: "✦",
        },
        {
            label: "Career Roadmap",
            path: "/roadmap",
            icon: "◈",
        },
        {
            label: "Job Matches",
            path: "/jobs",
            icon: "◫",
        },
        {
            label: "Results",
            path: "/result",
            icon: "✓",
        },
    ];

    // ==========================================
    // NAVIGATE
    // ==========================================

    const goTo = (path) => {
        navigate(path);
        setMobileOpen(false);
        setAccountOpen(false);
    };

    // ==========================================
    // LOGOUT
    // ==========================================

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setMobileOpen(false);
        setAccountOpen(false);

        navigate("/Login");
    };

    // ==========================================
    // CLOSE ACCOUNT DROPDOWN
    // ==========================================

    useEffect(() => {
        const handleClick = (event) => {
            if (
                accountRef.current &&
                !accountRef.current.contains(event.target)
            ) {
                setAccountOpen(false);
            }
        };

        document.addEventListener(
            "mousedown",
            handleClick
        );

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClick
            );
        };
    }, []);

    // ==========================================
    // LOCK BODY SCROLL ON MOBILE
    // ==========================================

    useEffect(() => {
        document.body.style.overflow = mobileOpen
            ? "hidden"
            : "";

        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileOpen]);

    return (
        <header
            className="
                sticky
                top-0
                z-50
                w-full
                border-b
                border-slate-800/80
                bg-slate-900/95
                text-slate-300
                backdrop-blur-sm
                select-none
            "
        >
            {/* ==========================================
                DESKTOP / TOP NAVBAR
            ========================================== */}

            <div
                className="
                    mx-auto
                    w-full
                    max-w-7xl
                    px-4
                    sm:px-6
                    lg:px-8
                "
            >
                <div
                    className="
                        flex
                        h-16
                        items-center
                        justify-between
                        gap-4
                    "
                >
                    {/* ==================================
                        BRAND
                    ================================== */}

                    <button
                        type="button"
                        onClick={() =>
                            goTo("/dashboard")
                        }
                        className="
                            flex
                            shrink-0
                            items-center
                            gap-3
                        "
                    >
                        <div
                            className="
                                flex
                                h-9
                                w-9
                                items-center
                                justify-center
                                rounded-xl
                                bg-gradient-to-tr
                                from-indigo-600
                                to-violet-500
                                text-lg
                                font-black
                                text-white
                                shadow-lg
                                shadow-indigo-500/20
                                ring-1
                                ring-white/20
                            "
                        >
                            R
                        </div>

                        <div
                            className="
                                hidden
                                leading-none
                                sm:block
                            "
                        >
                            <h1
                                className="
                                    text-[15px]
                                    font-bold
                                    tracking-tight
                                    text-slate-100
                                "
                            >
                                ResumeAI
                            </h1>

                            <p
                                className="
                                    mt-1
                                    text-[11px]
                                    font-medium
                                    text-indigo-400/90
                                "
                            >
                                Career Assistant
                            </p>
                        </div>
                    </button>

                    {/* ==================================
                        DESKTOP NAV
                    ================================== */}

                    <nav
                        className="
                            hidden
                            flex-1
                            items-center
                            justify-center
                            gap-1
                            lg:flex
                        "
                    >
                        {navItems.map((item) => {
                            const isActive =
                                location.pathname ===
                                item.path;

                            return (
                                <button
                                    key={item.path}
                                    type="button"
                                    onClick={() =>
                                        goTo(item.path)
                                    }
                                    className={`
                                        group
                                        relative
                                        flex
                                        items-center
                                        gap-2
                                        rounded-xl
                                        px-3
                                        py-2
                                        text-sm
                                        font-medium
                                        transition-all
                                        duration-200

                                        ${
                                            isActive
                                                ? "bg-indigo-600/10 font-semibold text-indigo-400"
                                                : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                                        }
                                    `}
                                >
                                    {/* ACTIVE LINE */}

                                    {isActive && (
                                        <span
                                            className="
                                                absolute
                                                bottom-0
                                                left-1/2
                                                h-0.5
                                                w-6
                                                -translate-x-1/2
                                                rounded-full
                                                bg-indigo-500
                                                shadow-[0_0_8px_rgba(99,102,241,0.6)]
                                            "
                                        />
                                    )}

                                    {/* ICON */}

                                    <span
                                        className={`
                                            text-base

                                            ${
                                                isActive
                                                    ? "text-indigo-400"
                                                    : "text-slate-500 group-hover:text-slate-300"
                                            }
                                        `}
                                    >
                                        {item.icon}
                                    </span>

                                    {/* LABEL */}

                                    <span className="whitespace-nowrap">
                                        {item.label}
                                    </span>
                                </button>
                            );
                        })}
                    </nav>

                    {/* ==================================
                        RIGHT SIDE
                    ================================== */}

                    <div
                        className="
                            flex
                            shrink-0
                            items-center
                            gap-2
                        "
                    >
                        {/* ==================================
                            ACCOUNT
                        ================================== */}

                        <div
                            ref={accountRef}
                            className="
                                relative
                                hidden
                                lg:block
                            "
                        >
                            <button
                                type="button"
                                onClick={() =>
                                    setAccountOpen(
                                        (value) =>
                                            !value
                                    )
                                }
                                className="
                                    flex
                                    items-center
                                    gap-2.5
                                    rounded-xl
                                    py-1.5
                                    pl-2
                                    pr-3
                                    transition-colors
                                    duration-150
                                    hover:bg-slate-800/50
                                "
                            >
                                <div
                                    className="
                                        flex
                                        h-8
                                        w-8
                                        items-center
                                        justify-center
                                        rounded-full
                                        bg-gradient-to-br
                                        from-indigo-500
                                        to-purple-600
                                        text-xs
                                        font-bold
                                        text-white
                                        ring-2
                                        ring-slate-800
                                    "
                                >
                                    
                                </div>

                                <div
                                    className="
                                        text-left
                                        leading-tight
                                    "
                                >
                                    <p
                                        className="
                                            text-xs
                                            font-semibold
                                            text-slate-200
                                        "
                                    >
                                        Your Account
                                    </p>

                                    <p
                                        className="
                                            text-[11px]
                                            text-slate-500
                                        "
                                    >
                                        Personal workspace
                                    </p>
                                </div>

                                <span
                                    className={`
                                        text-[10px]
                                        text-slate-500
                                        transition-transform
                                        duration-200

                                        ${
                                            accountOpen
                                                ? "rotate-180"
                                                : ""
                                        }
                                    `}
                                >
                                    ▾
                                </span>
                            </button>

                            {/* ACCOUNT DROPDOWN */}

                            {accountOpen && (
                                <div
                                    className="
                                        absolute
                                        right-0
                                        mt-2
                                        w-52
                                        overflow-hidden
                                        rounded-xl
                                        border
                                        border-slate-800
                                        bg-slate-900
                                        py-1.5
                                        shadow-xl
                                        shadow-black/40
                                    "
                                >
                                    <button
                                        type="button"
                                        onClick={logout}
                                        className="
                                            group
                                            flex
                                            w-full
                                            items-center
                                            gap-3
                                            px-3.5
                                            py-2.5
                                            text-xs
                                            font-medium
                                            text-rose-400
                                            transition-all
                                            duration-150
                                            hover:bg-rose-500/10
                                            hover:text-rose-300
                                        "
                                    >
                                        <span
                                            className="
                                                w-5
                                                text-center
                                                transition-transform
                                                group-hover:translate-x-0.5
                                            "
                                        >
                                            ↪
                                        </span>

                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* ==================================
                            MOBILE MENU BUTTON
                        ================================== */}

                        <button
                            type="button"
                            onClick={() =>
                                setMobileOpen(
                                    (value) => !value
                                )
                            }
                            className="
                                flex
                                h-9
                                w-9
                                items-center
                                justify-center
                                rounded-lg
                                text-slate-300
                                transition-colors
                                hover:bg-slate-800
                                hover:text-white
                                lg:hidden
                            "
                            aria-label={
                                mobileOpen
                                    ? "Close menu"
                                    : "Open menu"
                            }
                            aria-expanded={mobileOpen}
                        >
                            <span
                                className="
                                    relative
                                    block
                                    h-4
                                    w-5
                                "
                            >
                                <span
                                    className={`
                                        absolute
                                        left-0
                                        h-0.5
                                        w-5
                                        rounded-full
                                        bg-current
                                        transition-all
                                        duration-200

                                        ${
                                            mobileOpen
                                                ? "top-[7px] rotate-45"
                                                : "top-0"
                                        }
                                    `}
                                />

                                <span
                                    className={`
                                        absolute
                                        left-0
                                        top-[7px]
                                        h-0.5
                                        w-5
                                        rounded-full
                                        bg-current
                                        transition-opacity
                                        duration-200

                                        ${
                                            mobileOpen
                                                ? "opacity-0"
                                                : "opacity-100"
                                        }
                                    `}
                                />

                                <span
                                    className={`
                                        absolute
                                        left-0
                                        h-0.5
                                        w-5
                                        rounded-full
                                        bg-current
                                        transition-all
                                        duration-200

                                        ${
                                            mobileOpen
                                                ? "top-[7px] -rotate-45"
                                                : "top-[14px]"
                                        }
                                    `}
                                />
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            {/* ==========================================
                MOBILE MENU
            ========================================== */}

            <div
                className={`
                    overflow-hidden
                    border-t
                    border-slate-800/60
                    transition-all
                    duration-300
                    ease-in-out
                    lg:hidden

                    ${
                        mobileOpen
                            ? "max-h-[40rem] opacity-100"
                            : "max-h-0 border-t-0 opacity-0"
                    }
                `}
            >
                <nav
                    className="
                        space-y-1
                        bg-slate-900/95
                        px-3
                        py-4
                    "
                >
                    {navItems.map((item) => {
                        const isActive =
                            location.pathname ===
                            item.path;

                        return (
                            <button
                                key={item.path}
                                type="button"
                                onClick={() =>
                                    goTo(item.path)
                                }
                                className={`
                                    group
                                    relative
                                    flex
                                    w-full
                                    items-center
                                    gap-3
                                    rounded-xl
                                    px-3
                                    py-2.5
                                    text-sm
                                    font-medium
                                    transition-all
                                    duration-200

                                    ${
                                        isActive
                                            ? "bg-indigo-600/10 font-semibold text-indigo-400"
                                            : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                                    }
                                `}
                            >
                                {isActive && (
                                    <span
                                        className="
                                            absolute
                                            bottom-2
                                            left-0
                                            top-2
                                            w-1
                                            rounded-r-full
                                            bg-indigo-500
                                            shadow-[0_0_8px_rgba(99,102,241,0.6)]
                                        "
                                    />
                                )}

                                <span
                                    className={`
                                        w-5
                                        text-center
                                        text-base

                                        ${
                                            isActive
                                                ? "text-indigo-400"
                                                : "text-slate-500 group-hover:text-slate-300"
                                        }
                                    `}
                                >
                                    {item.icon}
                                </span>

                                <span className="truncate">
                                    {item.label}
                                </span>
                            </button>
                        );
                    })}

                    {/* ==================================
                        MOBILE ACCOUNT
                    ================================== */}

                    <div
                        className="
                            mt-3
                            border-t
                            border-slate-800/60
                            pt-3
                        "
                    >
                        <div
                            className="
                                flex
                                items-center
                                gap-3
                                rounded-xl
                                px-3
                                py-2.5
                            "
                        >
                            <div
                                className="
                                    flex
                                    h-8
                                    w-8
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-full
                                    bg-gradient-to-br
                                    from-indigo-500
                                    to-purple-600
                                    text-xs
                                    font-bold
                                    text-white
                                    ring-2
                                    ring-slate-800
                                "
                            >
                                U
                            </div>

                            <div className="min-w-0 flex-1">
                                <p
                                    className="
                                        truncate
                                        text-xs
                                        font-semibold
                                        text-slate-200
                                    "
                                >
                                    Your Account
                                </p>

                                <p
                                    className="
                                        truncate
                                        text-[11px]
                                        text-slate-500
                                    "
                                >
                                    Personal workspace
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={logout}
                            className="
                                group
                                mt-1
                                flex
                                w-full
                                items-center
                                gap-3
                                rounded-xl
                                px-3
                                py-2.5
                                text-xs
                                font-medium
                                text-rose-400
                                transition-all
                                duration-150
                                hover:bg-rose-500/10
                                hover:text-rose-300
                            "
                        >
                            <span
                                className="
                                    w-5
                                    text-center
                                    transition-transform
                                    group-hover:translate-x-0.5
                                "
                            >
                                ↪
                            </span>

                            Logout
                        </button>
                    </div>
                </nav>
            </div>
        </header>
    );
}

export default DashboardSidebar;