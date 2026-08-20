

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/Axios";

function CareerCoach() {
    const navigate = useNavigate();

    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [historyLoading, setHistoryLoading] = useState(true);

    const messagesEndRef = useRef(null);

    // =========================================================
    // AUTO SCROLL
    // =========================================================

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, loading]);

    // =========================================================
    // LOAD CHAT HISTORY
    // =========================================================

    const fetchHistory = async () => {
        try {
            setHistoryLoading(true);

            const response = await api.get(
                "/career-coach/history"
            );

            const chats = Array.isArray(
                response.data?.chats
            )
                ? response.data.chats
                : [];

            if (chats.length > 0) {
                setMessages(
                    chats.map((chat) => ({
                        role: chat.role,
                        content: chat.message,
                    }))
                );
            } else {
                setMessages([
                    {
                        role: "assistant",
                        content:
                            "Hi! 👋 I'm your AI Career Coach. Ask me anything about your resume, skills, interviews, career path, or job search.",
                    },
                ]);
            }
        } catch (error) {
            console.error(
                "HISTORY ERROR:",
                error.response?.data || error.message
            );

            if (error.response?.status === 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");

                navigate("/login");
                return;
            }

            setMessages([
                {
                    role: "assistant",
                    content:
                        "Hi! 👋 I'm your AI Career Coach. Ask me anything about your career.",
                },
            ]);
        } finally {
            setHistoryLoading(false);
        }
    };

    useEffect(() => {
        fetchHistory();
    }, []);

    // =========================================================
    // SEND MESSAGE
    // =========================================================

    const sendMessage = async () => {
        const question = message.trim();

        if (!question || loading) return;

        setMessages((prev) => [
            ...prev,
            {
                role: "user",
                content: question,
            },
        ]);

        setMessage("");
        setLoading(true);

        try {
            const response = await api.post(
                "/career-coach/chat",
                {
                    message: question,
                }
            );

            const reply =
                response.data?.reply ||
                "Sorry, I couldn't generate a response.";

            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: reply,
                },
            ]);
        } catch (error) {
            console.error(
                "CAREER COACH ERROR:",
                error.response?.data || error.message
            );

            if (error.response?.status === 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");

                navigate("/login");
                return;
            }

            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content:
                        error.response?.data?.message ||
                        "Something went wrong. Please try again.",
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    // =========================================================
    // CLEAR CHAT
    // =========================================================

    const clearChat = async () => {
        const confirmed = window.confirm(
            "Are you sure you want to clear your chat history?"
        );

        if (!confirmed) return;

        try {
            await api.delete(
                "/career-coach/history"
            );

            setMessages([
                {
                    role: "assistant",
                    content:
                        "Chat history cleared. 👋 How can I help you with your career?",
                },
            ]);
        } catch (error) {
            console.error(
                "CLEAR CHAT ERROR:",
                error.response?.data || error.message
            );
        }
    };

    // =========================================================
    // ENTER KEY
    // =========================================================

    const handleKeyDown = (e) => {
        if (
            e.key === "Enter" &&
            !e.shiftKey
        ) {
            e.preventDefault();
            sendMessage();
        }
    };

    // =========================================================
    // QUICK QUESTIONS
    // =========================================================

    const quickQuestions = [
        "How can I improve my resume?",
        "What skills should I learn next?",
        "How can I prepare for a Full Stack interview?",
        "Give me a 30-day career roadmap.",
    ];

    const askQuickQuestion = (question) => {
        setMessage(question);
    };

    // =========================================================
    // JSX
    // =========================================================

    return (
        <div
            className="
                min-h-screen
                w-full
                overflow-x-hidden
                bg-slate-950
                text-slate-300
            "
        >

            {/* =================================================
                TOP NAVBAR
            ================================================= */}

            <header
                className="
                    sticky
                    top-0
                    z-50
                    w-full
                    border-b
                    border-slate-800
                    bg-slate-950/95
                    backdrop-blur
                "
            >
                <div
                    className="
                        mx-auto
                        flex
                        h-16
                        w-full
                        max-w-6xl
                        items-center
                        justify-between
                        px-4
                        sm:px-6
                        lg:px-8
                    "
                >

                    {/* LOGO */}

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/dashboard")
                        }
                        className="
                            text-xl
                            font-black
                            tracking-tight
                            text-white
                            transition
                            hover:text-indigo-400
                            sm:text-2xl
                        "
                    >
                        Resume
                        <span className="text-indigo-500">
                            AI
                        </span>
                    </button>

                    {/* NAV BUTTONS */}

                    <div
                        className="
                            flex
                            items-center
                            gap-2
                            sm:gap-3
                        "
                    >

                        {/* CLEAR HISTORY */}

                        <button
                            type="button"
                            onClick={clearChat}
                            className="
                                hidden
                                rounded-md
                                px-3
                                py-2
                                text-xs
                                font-semibold
                                text-red-400
                                transition
                                hover:bg-red-500/10
                                hover:text-red-300
                                sm:inline-flex
                            "
                        >
                            Clear History
                        </button>

                        {/* DASHBOARD */}

                        <button
                            type="button"
                            onClick={() =>
                                navigate("/dashboard")
                            }
                            className="
                                inline-flex
                                items-center
                                gap-2
                                rounded-md
                                border
                                border-slate-800
                                bg-slate-900
                                px-3
                                py-2
                                text-xs
                                font-semibold
                                text-slate-300
                                transition
                                hover:border-slate-700
                                hover:bg-slate-800
                                hover:text-white
                                sm:px-4
                                sm:text-sm
                            "
                        >
                            <span>←</span>

                            <span>
                                Dashboard
                            </span>
                        </button>

                    </div>
                </div>
            </header>

            {/* =================================================
                MAIN CONTENT
            ================================================= */}

            <main
                className="
                    flex
                    w-full
                    flex-col
                    items-center
                    px-3
                    py-6
                    sm:px-6
                    sm:py-8
                    lg:px-8
                    lg:py-10
                "
            >

                {/* =================================================
                    PAGE HEADER
                ================================================= */}

                <section
                    className="
                        w-full
                        max-w-3xl
                        text-center
                    "
                >

                    {/* BACK BUTTON */}

                    <div
                        className="
                            mb-6
                            flex
                            justify-center
                            sm:mb-7
                        "
                    >
                        <button
                            type="button"
                            onClick={() =>
                                navigate("/dashboard")
                            }
                            className="
                                inline-flex
                                items-center
                                gap-2
                                rounded-md
                                px-3
                                py-2
                                text-xs
                                font-semibold
                                text-indigo-400
                                transition
                                hover:bg-indigo-500/10
                                hover:text-indigo-300
                                sm:text-sm
                            "
                        >
                            <span>←</span>

                            <span>
                                Back to Dashboard
                            </span>
                        </button>
                    </div>

                    {/* BADGE */}

                    <div className="flex justify-center">
                        <div
                            className="
                                inline-flex
                                items-center
                                gap-2
                                rounded-full
                                border
                                border-indigo-500/20
                                bg-indigo-500/10
                                px-3
                                py-1.5
                                text-[10px]
                                font-semibold
                                uppercase
                                tracking-wider
                                text-indigo-300
                                sm:px-4
                                sm:py-2
                                sm:text-xs
                            "
                        >
                            <span className="text-indigo-400">
                                ✦
                            </span>

                            AI Career Coach
                        </div>
                    </div>

                    {/* TITLE */}

                    <h1
                        className="
                            mt-4
                            text-2xl
                            font-bold
                            leading-tight
                            tracking-tight
                            text-white
                            sm:mt-5
                            sm:text-3xl
                            md:text-4xl
                            lg:text-5xl
                        "
                    >
                        Your Personal Career Coach
                    </h1>

                    {/* DESCRIPTION */}

                    <p
                        className="
                            mx-auto
                            mt-3
                            max-w-2xl
                            px-2
                            text-xs
                            leading-5
                            text-slate-500
                            sm:mt-4
                            sm:px-0
                            sm:text-sm
                            sm:leading-6
                            md:text-base
                        "
                    >
                        Get personalized interview prep,
                        skill recommendations, and
                        roadmap guidance.
                    </p>

                </section>

                {/* =================================================
                    CHAT SECTION
                ================================================= */}

                <section
                    className="
                        mt-7
                        flex
                        w-full
                        justify-center
                        sm:mt-8
                        lg:mt-10
                    "
                >

                    <div
                        className="
                            flex
                            h-[calc(100vh-260px)]
                            min-h-[520px]
                            w-full
                            max-w-4xl
                            flex-col
                            overflow-hidden
                            rounded-2xl
                            border
                            border-slate-800
                            bg-slate-900
                            shadow-2xl
                            shadow-black/30
                            sm:h-[650px]
                            sm:rounded-3xl
                            lg:h-[680px]
                        "
                    >

                        {/* =================================================
                            CHAT HEADER
                        ================================================= */}

                        <div
                            className="
                                shrink-0
                                border-b
                                border-slate-800
                                bg-slate-900
                                px-4
                                py-4
                                sm:px-6
                            "
                        >
                            <div
                                className="
                                    flex
                                    items-center
                                    justify-between
                                    gap-3
                                "
                            >

                                <div
                                    className="
                                        flex
                                        min-w-0
                                        items-center
                                        gap-3
                                    "
                                >

                                    <div
                                        className="
                                            flex
                                            h-10
                                            w-10
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-xl
                                            bg-indigo-500/10
                                            text-lg
                                            ring-1
                                            ring-indigo-500/20
                                            sm:h-11
                                            sm:w-11
                                            sm:rounded-2xl
                                        "
                                    >
                                        🤖
                                    </div>

                                    <div className="min-w-0">

                                        <h2
                                            className="
                                                truncate
                                                text-sm
                                                font-bold
                                                text-white
                                                sm:text-base
                                            "
                                        >
                                            Career Assistant
                                        </h2>

                                        <p
                                            className="
                                                mt-0.5
                                                flex
                                                items-center
                                                gap-1.5
                                                text-[10px]
                                                text-slate-500
                                                sm:text-xs
                                            "
                                        >
                                            <span
                                                className="
                                                    h-1.5
                                                    w-1.5
                                                    rounded-full
                                                    bg-emerald-400
                                                    animate-pulse
                                                "
                                            />

                                            Resume-Aware AI Active
                                        </p>

                                    </div>

                                </div>

                                {/* MOBILE CLEAR */}

                                <button
                                    type="button"
                                    onClick={clearChat}
                                    className="
                                        shrink-0
                                        rounded-md
                                        border
                                        border-slate-800
                                        bg-slate-950
                                        px-2.5
                                        py-1.5
                                        text-[10px]
                                        font-semibold
                                        text-red-400
                                        transition
                                        hover:border-red-500/30
                                        hover:bg-red-500/10
                                        sm:hidden
                                    "
                                >
                                    Clear
                                </button>

                            </div>
                        </div>

                        {/* =================================================
                            MESSAGES
                        ================================================= */}

                        <div
                            className="
                                min-h-0
                                flex-1
                                overflow-y-auto
                                bg-slate-950/40
                                p-3
                                sm:p-5
                                md:p-6
                            "
                        >

                            {historyLoading ? (

                                <div
                                    className="
                                        flex
                                        h-full
                                        items-center
                                        justify-center
                                    "
                                >
                                    <div className="text-center">

                                        <div
                                            className="
                                                mx-auto
                                                h-8
                                                w-8
                                                animate-spin
                                                rounded-full
                                                border-4
                                                border-slate-700
                                                border-t-indigo-500
                                            "
                                        />

                                        <p
                                            className="
                                                mt-3
                                                text-xs
                                                font-medium
                                                text-slate-500
                                            "
                                        >
                                            Retrieving history...
                                        </p>

                                    </div>
                                </div>

                            ) : (

                                <div className="space-y-4">

                                    {messages.map(
                                        (msg, index) => {
                                            const isUser =
                                                msg.role ===
                                                "user";

                                            return (
                                                <div
                                                    key={index}
                                                    className={`
                                                        flex
                                                        ${
                                                            isUser
                                                                ? "justify-end"
                                                                : "justify-start"
                                                        }
                                                    `}
                                                >

                                                    {/* MESSAGE BUBBLE */}

                                                    <div
                                                        className={`
                                                            w-fit
                                                            max-w-[90%]
                                                            rounded-md
                                                            px-4
                                                            py-3
                                                            shadow-lg
                                                            sm:max-w-[78%]
                                                            ${
                                                                isUser
                                                                    ? "bg-indigo-600 text-white"
                                                                    : "border border-slate-800 bg-slate-900 text-slate-300"
                                                            }
                                                        `}
                                                    >

                                                        {/* 
                                                            USER LABEL REMOVED
                                                            CAREER COACH LABEL ONLY
                                                        */}

                                                        {!isUser && (
                                                            <div
                                                                className="
                                                                    mb-1
                                                                    text-[9px]
                                                                    font-bold
                                                                    uppercase
                                                                    tracking-wider
                                                                    text-indigo-400
                                                                    sm:text-[10px]
                                                                "
                                                            >
                                                                Career Coach
                                                            </div>
                                                        )}

                                                        <p
                                                            className="
                                                                whitespace-pre-wrap
                                                                break-words
                                                                text-xs
                                                                leading-5
                                                                sm:text-sm
                                                                sm:leading-6
                                                            "
                                                        >
                                                            {
                                                                msg.content
                                                            }
                                                        </p>

                                                    </div>

                                                </div>
                                            );
                                        }
                                    )}

                                    {/* LOADING */}

                                    {loading && (
                                        <div className="flex justify-start">

                                            <div
                                                className="
                                                    rounded-md
                                                    border
                                                    border-slate-800
                                                    bg-slate-900
                                                    px-4
                                                    py-3
                                                    shadow-lg
                                                "
                                            >

                                                <div
                                                    className="
                                                        flex
                                                        h-5
                                                        items-center
                                                        gap-1.5
                                                    "
                                                >

                                                    <span
                                                        className="
                                                            h-1.5
                                                            w-1.5
                                                            animate-bounce
                                                            rounded-full
                                                            bg-indigo-400
                                                        "
                                                    />

                                                    <span
                                                        className="
                                                            h-1.5
                                                            w-1.5
                                                            animate-bounce
                                                            rounded-full
                                                            bg-indigo-500
                                                            [animation-delay:150ms]
                                                        "
                                                    />

                                                    <span
                                                        className="
                                                            h-1.5
                                                            w-1.5
                                                            animate-bounce
                                                            rounded-full
                                                            bg-indigo-600
                                                            [animation-delay:300ms]
                                                        "
                                                    />

                                                </div>

                                            </div>

                                        </div>
                                    )}

                                    <div
                                        ref={messagesEndRef}
                                    />

                                </div>
                            )}

                        </div>

                        {/* =================================================
                            QUICK QUESTIONS
                        ================================================= */}

                        <div
                            className="
                                shrink-0
                                border-t
                                border-slate-800
                                bg-slate-900
                                px-3
                                pt-3
                                sm:px-5
                            "
                        >

                            <p
                                className="
                                    mb-2
                                    text-[9px]
                                    font-bold
                                    uppercase
                                    tracking-wider
                                    text-slate-600
                                    sm:text-[10px]
                                "
                            >
                                Suggested Questions
                            </p>

                            <div
                                className="
                                    flex
                                    gap-2
                                    overflow-x-auto
                                    pb-2
                                    scrollbar-thin
                                "
                            >

                                {quickQuestions.map(
                                    (
                                        question,
                                        index
                                    ) => (
                                        <button
                                            key={index}
                                            type="button"
                                            onClick={() =>
                                                askQuickQuestion(
                                                    question
                                                )
                                            }
                                            className="
                                                shrink-0
                                                rounded-md
                                                border
                                                border-slate-800
                                                bg-slate-950
                                                px-3
                                                py-1.5
                                                text-[10px]
                                                font-medium
                                                text-slate-400
                                                transition
                                                hover:border-indigo-500/30
                                                hover:bg-indigo-500/10
                                                hover:text-indigo-300
                                                sm:text-xs
                                            "
                                        >
                                            {question}
                                        </button>
                                    )
                                )}

                            </div>

                        </div>

                        {/* =================================================
                            INPUT
                        ================================================= */}

                        <div
                            className="
                                shrink-0
                                bg-slate-900
                                p-3
                                sm:p-5
                            "
                        >

                            <div
                                className="
                                    flex
                                    items-end
                                    gap-2
                                    rounded-md
                                    border
                                    border-slate-800
                                    bg-slate-950
                                    p-2
                                    transition
                                    focus-within:border-indigo-500/60
                                    focus-within:ring-2
                                    focus-within:ring-indigo-500/10
                                "
                            >

                                <textarea
                                    value={message}
                                    onChange={(e) =>
                                        setMessage(
                                            e.target.value
                                        )
                                    }
                                    onKeyDown={
                                        handleKeyDown
                                    }
                                    placeholder="Ask anything about your career..."
                                    rows={1}
                                    className="
                                        min-h-[42px]
                                        max-h-32
                                        min-w-0
                                        flex-1
                                        resize-none
                                        rounded-md
                                        bg-transparent
                                        px-2
                                        py-2
                                        text-xs
                                        leading-5
                                        text-white
                                        outline-none
                                        placeholder:text-slate-600
                                        sm:px-3
                                        sm:text-sm
                                    "
                                />

                                {/* SEND BUTTON */}

                                <button
                                    type="button"
                                    onClick={sendMessage}
                                    disabled={
                                        !message.trim() ||
                                        loading
                                    }
                                    className="
                                        shrink-0
                                        rounded-md
                                        bg-white
                                        px-4
                                        py-2.5
                                        text-xs
                                        font-bold
                                        text-black
                                        shadow-lg
                                        shadow-indigo-600/10
                                        transition-all
                                        hover:bg-indigo-500
                                        hover:text-white
                                        active:scale-95
                                        disabled:cursor-not-allowed
                                        disabled:bg-slate-800
                                        disabled:text-slate-600
                                        sm:px-5
                                        sm:text-sm
                                    "
                                >
                                    {loading
                                        ? "..."
                                        : "Send"}
                                </button>

                            </div>

                            <div className="mt-2 text-center">

                                <span
                                    className="
                                        text-[9px]
                                        text-slate-200
                                        sm:text-[10px]
                                    "
                                >
                                    Press{" "}

                                    <kbd
                                        className="
                                            rounded-md
                                            border
                                            border-slate-800
                                            bg-slate-900
                                            px-1.5
                                            py-0.5
                                            font-mono
                                            text-[9px]
                                            text-slate-500
                                        "
                                    >
                                        Enter
                                    </kbd>{" "}

                                    to send
                                </span>

                            </div>

                        </div>

                    </div>

                </section>

            </main>
        </div>
    );
}

export default CareerCoach;