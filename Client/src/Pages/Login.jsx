import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage("Please enter email and password");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const response = await api.post("/auth/login", {
        email,
        password,
      });

      console.log("login response =>", response);

      localStorage.setItem("token", response.data.token);

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      navigate("/dashboard");
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-slate-950 text-white">

      {/* ================= PAGE WRAPPER ================= */}
      <div className="mx-auto flex min-h-screen w-full max-w-7xl items-center justify-center px-4 py-8 sm:px-6 sm:py-10 lg:px-8">

        {/* ================= MAIN CARD ================= */}
        <div className="grid w-full max-w-6xl grid-cols-1 overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl shadow-black/30 lg:grid-cols-2">

          {/* ================================================= */}
          {/* LEFT SIDE */}
          {/* ================================================= */}
          <div className="hidden min-h-[650px] flex-col justify-between border-r border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950/20 p-10 lg:flex xl:p-14">

            {/* LOGO */}
            <button
              type="button"
              onClick={() => navigate("/")}
              className="flex w-fit items-center gap-2.5"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-sm font-bold text-white shadow-lg shadow-indigo-600/20">
                R
              </span>

              <span className="text-lg font-bold tracking-tight text-white">
                Resume
                <span className="text-indigo-400">
                  AI
                </span>
              </span>
            </button>

            {/* HERO CONTENT */}
            <div className="max-w-md">

              <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-indigo-400">
                AI-Powered Career Platform
              </p>

              <h1 className="text-4xl font-bold leading-[1.08] tracking-tight text-white xl:text-5xl">
                Build a stronger
                <span className="block mt-2 bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                  career with AI.
                </span>
              </h1>

              <p className="mt-6 max-w-sm text-sm leading-6 text-slate-500">
                Analyze your resume, discover skill gaps,
                improve your profile and prepare for your
                next career opportunity.
              </p>

              {/* SMALL FEATURES */}
              <div className="mt-8 space-y-3">

                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-xs text-indigo-400 ring-1 ring-indigo-500/20">
                    ✓
                  </span>

                  <span className="text-sm text-slate-400">
                    AI Resume Analysis
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/10 text-xs text-violet-400 ring-1 ring-violet-500/20">
                    ✦
                  </span>

                  <span className="text-sm text-slate-400">
                    Personalized Career Coach
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-xs text-emerald-400 ring-1 ring-emerald-500/20">
                    ↑
                  </span>

                  <span className="text-sm text-slate-400">
                    Improve Your Career Profile
                  </span>
                </div>

              </div>
            </div>

            {/* BOTTOM */}
            <p className="text-[11px] text-slate-600">
              ResumeAI · Career Intelligence
            </p>

          </div>

          {/* ================================================= */}
          {/* RIGHT SIDE */}
          {/* ================================================= */}
          <div className="flex w-full items-center justify-center p-5 sm:p-8 md:p-10 lg:min-h-[650px] lg:p-12 xl:p-14">

            <div className="w-full max-w-md">

              {/* ================= MOBILE LOGO ================= */}
              <div className="mb-9 lg:hidden">

                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="flex items-center gap-2.5"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-sm font-bold text-white">
                    R
                  </span>

                  <span className="text-lg font-bold text-white">
                    Resume
                    <span className="text-indigo-400">
                      AI
                    </span>
                  </span>
                </button>

              </div>

              {/* ================= HEADING ================= */}
              <div className="mb-8 text-center sm:mb-9 lg:text-left">

                <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  Welcome back
                </h1>

                <p className="mt-2.5 text-xs leading-5 text-slate-500 sm:text-sm sm:leading-6">
                  Sign in to continue your AI-powered
                  career journey.
                </p>

              </div>

              {/* ================= FORM ================= */}
              <form
                onSubmit={handleSubmit}
                className="w-full space-y-5"
              >

                {/* EMAIL */}
                <div className="w-full">



                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    placeholder="Enter your email"
                    autoComplete="email"
                    className="
                                            h-12
                                            w-full
                                            rounded-xl
                                            border
                                            border-slate-800
                                            bg-slate-900/70
                                            px-4
                                            text-sm
                                            text-white
                                            outline-none
                                            placeholder:text-slate-600
                                            transition
                                            duration-200
                                            hover:border-slate-700
                                            focus:border-indigo-500/60
                                            focus:bg-slate-900
                                            focus:ring-2
                                            focus:ring-indigo-500/10
                                            sm:h-13
                                        "
                  />

                </div>

                {/* PASSWORD */}
                <div className="w-full">

                  <div className="mb-2 flex items-center justify-between">

                  </div>

                  <div className="relative">

                    <input
                      id="password"
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      value={password}
                      onChange={(e) =>
                        setPassword(
                          e.target.value
                        )
                      }
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      className="
                                                h-12
                                                w-full
                                                rounded-xl
                                                border
                                                border-slate-800
                                                bg-slate-900/70
                                                px-4
                                                pr-16
                                                text-sm
                                                text-white
                                                outline-none
                                                placeholder:text-slate-600
                                                transition
                                                duration-200
                                                hover:border-slate-700
                                                focus:border-indigo-500/60
                                                focus:bg-slate-900
                                                focus:ring-2
                                                focus:ring-indigo-500/10
                                                sm:h-13
                                            "
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          !showPassword
                        )
                      }
                      className="
                                                absolute
                                                right-4
                                                top-1/2
                                                -translate-y-1/2
                                                text-[11px]
                                                font-medium
                                                text-slate-500
                                                transition
                                                hover:text-indigo-400
                                                sm:text-xs
                                            "
                    >
                      {showPassword
                        ? "Hide"
                        : "Show"}
                    </button>

                  </div>

                </div>

                {/* ERROR */}
                {message && (
                  <div className="rounded-xl border border-red-500/10 bg-red-500/10 px-4 py-3 text-xs leading-5 text-red-400 sm:text-sm">
                    {message}
                  </div>
                )}

                {/* LOGIN BUTTON */}
                <button
                  type="submit"
                  disabled={loading}
                  className="
                                        mt-2
                                        h-12
                                        w-full
                                        rounded-xl
                                        bg-indigo-600
                                        px-5
                                        text-sm
                                        font-semibold
                                        text-white
                                        shadow-lg
                                        shadow-indigo-600/10
                                        transition
                                        duration-200
                                        hover:bg-indigo-500
                                        hover:shadow-indigo-600/20
                                        active:scale-[0.99]
                                        disabled:cursor-not-allowed
                                        disabled:opacity-50
                                        sm:h-13
                                    "
                >
                  {loading
                    ? "Signing in..."
                    : "Sign in to account"}
                </button>

              </form>

              {/* ================= REGISTER ================= */}
              <p className="mt-7 text-center text-xs text-slate-500 sm:mt-8 sm:text-sm">

                Don't have an account?

                <Link
                  to="/register"
                  className="ml-1 mt-4 font-medium text-slate-300 transition hover:text-indigo-400"
                >
                  Create an account
                </Link>

              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Login;