import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function CareerCoach() {
  const navigate = useNavigate();

  const [message, setMessage] =
    useState("");

  const [messages, setMessages] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [historyLoading, setHistoryLoading] =
    useState(true);

  // ==========================================
  // LOAD CHAT HISTORY
  // ==========================================

  const fetchHistory = async () => {
    try {
      setHistoryLoading(true);

      const response =
        await api.get(
          "/career-coach/history"
        );

      console.log(
        "CHAT HISTORY:",
        response.data
      );

      const chats =
        Array.isArray(
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
        error.response?.data ||
        error.message
      );

      if (
        error.response?.status === 401
      ) {
        localStorage.removeItem(
          "token"
        );

        localStorage.removeItem(
          "user"
        );

        navigate("/Login");

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

  // ==========================================
  // USE EFFECT
  // ==========================================

  useEffect(() => {
    fetchHistory();
  }, []);

  // ==========================================
  // SEND MESSAGE
  // ==========================================

  const sendMessage = async () => {
    const question =
      message.trim();

    if (
      !question ||
      loading
    ) {
      return;
    }

    // Show user message
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
      const response =
        await api.post(
          "/career-coach/chat",
          {
            message: question,
          }
        );

      console.log(
        "AI RESPONSE:",
        response.data
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
        error.response?.data ||
        error.message
      );

      if (
        error.response?.status === 401
      ) {
        localStorage.removeItem(
          "token"
        );

        localStorage.removeItem(
          "user"
        );

        navigate("Login");

        return;
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            error.response?.data
              ?.message ||
            "Something went wrong. Please try again.",
        },
      ]);

    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // CLEAR CHAT
  // ==========================================

  const clearChat = async () => {
    const confirmed =
      window.confirm(
        "Are you sure you want to clear your chat history?"
      );

    if (!confirmed) {
      return;
    }

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
        error.response?.data ||
        error.message
      );
    }
  };

  // ==========================================
  // ENTER KEY
  // ==========================================

  const handleKeyDown = (e) => {
    if (
      e.key === "Enter" &&
      !e.shiftKey
    ) {
      e.preventDefault();

      sendMessage();
    }
  };

  // ==========================================
  // QUICK QUESTIONS
  // ==========================================

  const quickQuestions = [
    "How can I improve my resume?",
    "What skills should I learn next?",
    "How can I prepare for a Full Stack Developer interview?",
    "Give me a 30-day career roadmap.",
  ];

  const askQuickQuestion = (
    question
  ) => {
    setMessage(question);
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="min-h-screen bg-slate-50">

      {/* =====================================
          NAVBAR
      ====================================== */}

      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">

        <div className="max-w-6xl mx-auto px-4 sm:px-6">

          <div className="h-16 flex items-center justify-between">

            <button
              onClick={() =>
                navigate("/dashboard")
              }
              className="text-xl sm:text-2xl font-bold text-indigo-600"
            >
              ResumeAI
            </button>

            <div className="flex items-center gap-2">

              <button
                onClick={clearChat}
                className="hidden sm:block px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-lg"
              >
                Clear Chat
              </button>

              <button
                onClick={() =>
                  navigate("/dashboard")
                }
                className="px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 rounded-lg"
              >
                ← Dashboard
              </button>

            </div>

          </div>

        </div>

      </nav>

      {/* =====================================
          MAIN
      ====================================== */}

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6">

        {/* HEADER */}

        <div className="text-center mb-6">

          <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold">
            🤖 AI Career Coach
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-4">
            Your Personal Career Coach
          </h1>

          <p className="text-slate-500 mt-2 max-w-2xl mx-auto">
            Your AI coach understands your resume
            and helps you become job-ready.
          </p>

        </div>

        {/* CHAT */}

        <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">

          {/* CHAT HEADER */}

          <div className="bg-indigo-600 px-5 sm:px-6 py-4">

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-3">

                <div className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center text-xl">
                  🤖
                </div>

                <div>

                  <h2 className="font-bold text-white">
                    AI Career Coach
                  </h2>

                  <p className="text-indigo-100 text-xs">
                    Resume-aware career guidance
                  </p>

                </div>

              </div>

              <button
                onClick={clearChat}
                className="sm:hidden text-white text-sm"
              >
                Clear
              </button>

            </div>

          </div>

          {/* MESSAGES */}

          <div className="h-[500px] overflow-y-auto p-4 sm:p-6 space-y-5 bg-slate-50">

            {historyLoading ? (
              <div className="h-full flex items-center justify-center">

                <div className="text-center">

                  <div className="w-10 h-10 mx-auto border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />

                  <p className="text-sm text-slate-500 mt-4">
                    Loading your conversations...
                  </p>

                </div>

              </div>
            ) : (
              <>
                {messages.map(
                  (msg, index) => {

                    const isUser =
                      msg.role ===
                      "user";

                    return (
                      <div
                        key={index}
                        className={`flex ${isUser
                            ? "justify-end"
                            : "justify-start"
                          }`}
                      >

                        <div
                          className={`max-w-[88%] sm:max-w-[75%] ${isUser
                              ? "bg-indigo-600 text-white rounded-2xl rounded-br-md"
                              : "bg-white border border-slate-200 text-slate-700 rounded-2xl rounded-bl-md"
                            } px-4 py-3`}
                        >

                          <div className="text-xs font-semibold mb-1 opacity-70">
                            {isUser
                              ? "You"
                              : "AI Career Coach"}
                          </div>

                          <p className="text-sm sm:text-base leading-6 whitespace-pre-wrap">
                            {msg.content}
                          </p>

                        </div>

                      </div>
                    );
                  }
                )}

                {loading && (
                  <div className="flex justify-start">

                    <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-md px-5 py-4">

                      <div className="flex gap-1">

                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />

                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:150ms]" />

                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:300ms]" />

                      </div>

                    </div>

                  </div>
                )}
              </>
            )}

          </div>

          {/* QUICK QUESTIONS */}

          <div className="px-4 sm:px-6 pt-4">

            <p className="text-xs font-semibold text-slate-500 mb-3">
              QUICK QUESTIONS
            </p>

            <div className="flex gap-2 overflow-x-auto pb-2">

              {quickQuestions.map(
                (
                  question,
                  index
                ) => (
                  <button
                    key={index}
                    onClick={() =>
                      askQuickQuestion(
                        question
                      )
                    }
                    className="shrink-0 px-3 py-2 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-600 rounded-lg text-xs font-medium transition"
                  >
                    {question}
                  </button>
                )
              )}

            </div>

          </div>

          {/* INPUT */}

          <div className="p-4 sm:p-6">

            <div className="flex items-end gap-3 bg-slate-50 border border-slate-200 rounded-2xl p-2">

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
                rows={2}
                className="flex-1 resize-none bg-transparent outline-none px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400"
              />

              <button
                onClick={sendMessage}
                disabled={
                  !message.trim() ||
                  loading
                }
                className="px-5 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-xl font-semibold transition"
              >
                {loading
                  ? "..."
                  : "Send"}
              </button>

            </div>

            <p className="text-xs text-slate-400 mt-2 text-center">
              Enter to send • Shift + Enter
              for new line
            </p>

          </div>

        </div>

      </main>

    </div>
  );
}

export default CareerCoach;