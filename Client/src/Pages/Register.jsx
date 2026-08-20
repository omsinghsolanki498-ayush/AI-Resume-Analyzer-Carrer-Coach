import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // ================= HANDLE INPUT =================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (message) {
      setMessage("");
    }
  };

  // ================= SUBMIT =================

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = formData.name.trim();
    const email = formData.email.trim();

    if (
      !name ||
      !email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setMessage("Please fill all fields");
      return;
    }

    if (formData.password.length < 6) {
      setMessage("Password must be at least 6 characters");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const response = await api.post("/auth/register", {
        name,
        email,
        password: formData.password,
      });

      setMessage(
        response.data?.message || "Registration successful"
      );

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#090909] text-white">

      {/* ================= PAGE WRAPPER ================= */}

      <div className="mx-auto flex min-h-screen w-full max-w-[1400px] items-center justify-center px-4 py-8 sm:px-6 sm:py-10 lg:px-8 xl:px-12">

        {/* ================= MAIN GRID ================= */}

        <div
          className="
            grid
            w-full
            max-w-6xl
            items-center
            gap-10
            lg:grid-cols-2
            lg:gap-16
            xl:gap-24
          "
        >

          {/* ==================================================
              LEFT SIDE - DESKTOP
          ================================================== */}

          <section className="hidden lg:flex lg:flex-col lg:justify-center">

            {/* Brand */}

            <button
              type="button"
              onClick={() => navigate("/")}
              className="mb-14 flex w-fit items-center gap-3 text-left"
            >

              <div>
                <span className="mt-0.5 block text-xs text-[#737373]">
                  Career Intelligence
                </span>
              </div>

            </button>

            {/* Small Label */}

            <p
              className="
                mb-5
                text-[11px]
                font-semibold
                uppercase
                tracking-[0.2em]
                text-[#737373]
              "
            >
              AI Powered Career Platform
            </p>

            {/* Heading */}

            <h1
              className="
                max-w-xl
                text-4xl
                font-bold
                leading-[1.08]
                tracking-tight
                text-white
                xl:text-5xl
                2xl:text-6xl
              "
            >
              Build your

              <span className="mt-2 block text-[#a3a3a3]">
                career smarter.
              </span>
            </h1>

            {/* Description */}

            <p
              className="
                mt-7
                max-w-md
                text-sm
                leading-7
                text-[#737373]
                xl:text-[15px]
              "
            >
              Analyze your resume, discover your strengths,
              improve your skills and prepare for your next
              career opportunity with AI.
            </p>

            {/* Simple Benefits */}

            <div className="mt-9 space-y-3">

              <div className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-500/10 text-xs text-indigo-400">
                  ✓
                </span>

                <span className="text-sm text-[#8a8a8a]">
                  AI-powered resume analysis
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-500/10 text-xs text-indigo-400">
                  ✓
                </span>

                <span className="text-sm text-[#8a8a8a]">
                  Personalized career guidance
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-500/10 text-xs text-indigo-400">
                  ✓
                </span>

                <span className="text-sm text-[#8a8a8a]">
                  Improve your job readiness
                </span>
              </div>

            </div>
          </section>

          {/* ==================================================
              RIGHT SIDE
          ================================================== */}

          <section className="w-full">

            <div className="mx-auto w-full max-w-[500px] lg:ml-auto">

              {/* ================= MOBILE BRAND ================= */}

              <div className="mb-8 sm:mb-10 lg:hidden">

                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="flex items-center gap-3"
                >

                  <span className="text-left">
                    <span className="block text-base font-semibold text-white">
                    </span>

                    <span className="block text-[10px] text-[#737373]">
                      Career Intelligence
                    </span>
                  </span>

                </button>

              </div>

              {/* ================= FORM CARD ================= */}

              <div
                className="
                  w-full
                  rounded-2xl
                  border
                  border-[#1d1d1d]
                  bg-[#0d0d0d]
                  p-5
                  shadow-2xl
                  shadow-black/20
                  sm:rounded-3xl
                  sm:p-7
                  md:p-8
                  lg:border-[#181818]
                  lg:bg-transparent
                  lg:p-0
                  lg:shadow-none
                "
              >

                {/* ================= HEADING ================= */}

                <div className="mb-7 sm:mb-8">



                  <h2
                    className="
                      text-2xl
                      font-bold
                      tracking-tight
                      text-white
                      sm:text-3xl
                    "
                  >
                    Create an account
                  </h2>

                  <p className="mt-2.5 text-xs leading-5 text-[#737373] sm:text-sm sm:leading-6">
                    Start your AI-powered career journey.
                  </p>

                </div>

                {/* ================= FORM ================= */}
                <form
                  onSubmit={handleSubmit}
                  className="w-full space-y-6 sm:space-y-7 lg:space-y-8"
                >
                  {/* NAME */}
                  <div className="w-full">
                    <label
                      htmlFor="name"
                      className="mb-2 block text-xs font-medium text-[#b5b5b5] sm:text-sm"
                    >
                      Full Name
                    </label>

                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      autoComplete="name"
                      disabled={loading}
                      className="
        h-12
        w-full
        rounded-lg
        border
        border-[#292929]
        bg-[#141414]
        px-4
        text-sm
        text-white
        outline-none
        placeholder:text-[#555]
        transition-all
        duration-200
        hover:border-[#3a3a3a]
        focus:border-indigo-500/60
        focus:bg-[#171717]
        focus:ring-2
        focus:ring-indigo-500/10
        disabled:cursor-not-allowed
        disabled:opacity-60
        sm:h-13
        sm:px-5
        lg:h-14
      "
                    />
                  </div>

                  {/* EMAIL */}
                  <div className="w-full">
                    <label
                      htmlFor="email"
                      className="mb-2 block text-xs font-medium text-[#b5b5b5] sm:text-sm"
                    >
                      Email Address
                    </label>

                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      autoComplete="email"
                      disabled={loading}
                      className="
        h-12
        w-full
        rounded-lg
        border
        border-[#292929]
        bg-[#141414]
        px-4
        text-sm
        text-white
        outline-none
        placeholder:text-[#555]
        transition-all
        duration-200
        hover:border-[#3a3a3a]
        focus:border-indigo-500/60
        focus:bg-[#171717]
        focus:ring-2
        focus:ring-indigo-500/10
        disabled:cursor-not-allowed
        disabled:opacity-60
        sm:h-13
        sm:px-5
        lg:h-14
      "
                    />
                  </div>

                  {/* PASSWORD */}
                  <div className="w-full">
                    <label
                      htmlFor="password"
                      className="mb-2 block text-xs font-medium text-[#b5b5b5] sm:text-sm"
                    >
                      Password
                    </label>

                    <div className="relative w-full">
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Create a password"
                        autoComplete="new-password"
                        disabled={loading}
                        className="
          h-12
          w-full
          rounded-lg
          border
          border-[#292929]
          bg-[#141414]
          px-4
          pr-16
          text-sm
          text-white
          outline-none
          placeholder:text-[#555]
          transition-all
          duration-200
          hover:border-[#3a3a3a]
          focus:border-indigo-500/60
          focus:bg-[#171717]
          focus:ring-2
          focus:ring-indigo-500/10
          disabled:cursor-not-allowed
          disabled:opacity-60
          sm:h-13
          sm:px-5
          sm:pr-20
          lg:h-14
        "
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        disabled={loading}
                        className="
          absolute
          right-4
          top-1/2
          -translate-y-1/2
          text-xs
          font-medium
          text-[#737373]
          transition-colors
          hover:text-white
          disabled:opacity-50
          sm:right-5
        "
                      >
                        {showPassword ? "Hide" : "Show"}
                      </button>
                    </div>
                  </div>

                  {/* CONFIRM PASSWORD */}
                  <div className="w-full">
                    <label
                      htmlFor="confirmPassword"
                      className="mb-2 block text-xs font-medium text-[#b5b5b5] sm:text-sm"
                    >
                     confirm password
                    </label>


                    <div className="relative w-full">
                      <input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm password"
                        autoComplete="new-password"
                        disabled={loading}
                        className="
          h-12
          w-full
          rounded-lg
          border
          border-[#292929]
          bg-[#141414]
          px-4
          pr-16
          text-sm
          text-white
          outline-none
          placeholder:text-[#555]
          transition-all
          duration-200
          hover:border-[#3a3a3a]
          focus:border-indigo-500/60
          focus:bg-[#171717]
          focus:ring-2
          focus:ring-indigo-500/10
          disabled:cursor-not-allowed
          disabled:opacity-60
          sm:h-13
          sm:px-5
          sm:pr-20
          lg:h-14
        "
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword((prev) => !prev)
                        }
                        disabled={loading}
                        className="
          absolute
          right-4
          top-1/2
          -translate-y-1/2
          text-xs
          font-medium
          text-[#737373]
          transition-colors
          hover:text-white
          disabled:opacity-50
          sm:right-5
        "
                      >
                        {showConfirmPassword ? "Hide" : "Show"}
                      </button>
                    </div>
                  </div>

                  {/* MESSAGE */}
                  {message && (
                    <div
                      className={`
        w-full
        rounded-lg
        px-4
        py-3
        text-xs
        leading-5
        sm:text-sm
        ${message.toLowerCase().includes("success")
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-red-500/10 text-red-400"
                        }
      `}
                    >
                      {message}
                    </div>
                  )}

                  {/* REGISTER BUTTON */}
                  <div className="pt-1 sm:pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="
        h-12
        w-full
        rounded-lg
        bg-red-600
        px-5
        text-sm
        font-semibold
        text-white
        shadow-lg
        shadow-red-600/10
        transition-all
        duration-200
        hover:-translate-y-0.5
        hover:bg-red-500
        active:translate-y-0
        disabled:cursor-not-allowed
        disabled:opacity-50
        disabled:hover:translate-y-0
        disabled:hover:bg-red-600
        sm:h-13
        sm:text-base
        lg:h-14
      "
                    >
                      {loading ? "Creating account..." : "Create Account"}
                    </button>
                  </div>
                </form>

                {/* ================= LOGIN ================= */}

                <p className="mt-7 text-center text-xs text-[#737373] sm:mt-8 sm:text-sm">
                  Already have an account?

                  <Link
                    to="/login"
                    className="
                      ml-1
                      font-medium
                      text-[#d4d4d4]
                      transition-colors
                      hover:text-white
                      hover:underline
                      hover:underline-offset-4
                    "
                  >
                    Sign in
                  </Link>
                </p>

              </div>

              {/* ================= MOBILE FEATURES ================= */}

              <div
                className="
                  mt-8
                  grid
                  grid-cols-3
                  border-t
                  border-[#1f1f1f]
                  pt-6
                  lg:hidden
                "
              >

              </div>

              {/* ================= SECURITY TEXT ================= */}

              <p className="mt-6 text-center text-[10px] leading-4 text-[#454545] sm:text-xs">
                By creating an account, you agree to use
                Precision AI responsibly.
              </p>

            </div>

          </section>

        </div>
      </div>
    </div>
  );
}

export default Register;