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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setMessage("Please fill all fields");
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
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      setMessage(response.data.message || "Registration successful");

      setTimeout(() => {
        navigate("/Login");
      }, 1000);
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#090909] text-white flex items-center justify-center px-5 py-10 sm:px-8">

      <div className="w-full max-w-6xl grid lg:grid-cols-[0.9fr_1.1fr] gap-16 xl:gap-24">

        {/* ================= LEFT ================= */}
        <div className="hidden lg:flex flex-col justify-center">

          {/* Logo */}
          <div className="flex items-center mb-16">

            <div>
              <h2 className="text-xl font-semibold text-white tracking-tight">
                Precision AI
              </h2>

              <p className="text-xs text-[#737373] mt-1">
                Career Intelligence
              </p>
            </div>

          </div>

          {/* Hero */}
          <div className="max-w-md">

            <p className="text-xs font-medium tracking-[0.18em] text-[#737373] mb-5">
              AI POWERED CAREER PLATFORM
            </p>

            <h1 className="text-5xl xl:text-6xl font-bold tracking-tight leading-[1.08]">
              Build your

              <span className="block text-[#a3a3a3] mt-2">
                career smarter.
              </span>
            </h1>

            <p className="text-[#737373] leading-7 mt-7 text-[15px] max-w-sm">
              Analyze your resume, discover your strengths,
              improve your skills and prepare for your next
              career opportunity with AI.
            </p>

          </div>

        </div>

        {/* ================= RIGHT ================= */}
        <div className="w-full max-w-xl mx-auto lg:mx-0 lg:ml-auto">

          {/* Mobile Logo */}
          <div className="lg:hidden mb-12">

            <h2 className="text-xl font-semibold text-white">
              Precision AI
            </h2>

            <p className="text-xs text-[#737373] mt-1">
              Career Intelligence
            </p>

          </div>

          {/* Heading */}
          <div className="mb-11">

            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Create an account
            </h1>

            <p className="text-[15px] text-[#737373] mt-4">
              Start your AI-powered career journey.
            </p>

          </div>

          {/* ================= FORM ================= */}
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* Full Name */}
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              autoComplete="name"
              className="w-full h-14 px-5 rounded-xl bg-[#141414] border border-[#262626] text-white text-sm placeholder:text-[#5f5f5f] outline-none transition-all duration-200 hover:border-[#3a3a3a] focus:border-[#666666] focus:bg-[#171717] focus:ring-2 focus:ring-white/5"
            />

            {/* Email */}
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              autoComplete="email"
              className="w-full h-14 px-5 rounded-xl bg-[#141414] border border-[#262626] text-white text-sm placeholder:text-[#5f5f5f] outline-none transition-all duration-200 hover:border-[#3a3a3a] focus:border-[#666666] focus:bg-[#171717] focus:ring-2 focus:ring-white/5"
            />

            {/* Password */}
            <div className="relative">

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                autoComplete="new-password"
                className="w-full h-14 px-5 pr-20 rounded-xl bg-[#141414] border border-[#262626] text-white text-sm placeholder:text-[#5f5f5f] outline-none transition-all duration-200 hover:border-[#3a3a3a] focus:border-[#666666] focus:bg-[#171717] focus:ring-2 focus:ring-white/5"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-5 top-1/2 -translate-y-1/2 text-xs font-medium text-[#737373] hover:text-white transition-colors duration-200"
              >
                {showPassword ? "Hide" : "Show"}
              </button>

            </div>

            {/* Confirm Password */}
            <div className="relative">

              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                autoComplete="new-password"
                className="w-full h-14 px-5 pr-20 rounded-xl bg-[#141414] border border-[#262626] text-white text-sm placeholder:text-[#5f5f5f] outline-none transition-all duration-200 hover:border-[#3a3a3a] focus:border-[#666666] focus:bg-[#171717] focus:ring-2 focus:ring-white/5"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                className="absolute right-5 top-1/2 -translate-y-1/2 text-xs font-medium text-[#737373] hover:text-white transition-colors duration-200"
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>

            </div>

            {/* Message */}
            {message && (
              <div
                className={`px-5 py-3.5 rounded-xl text-sm ${
                  message.toLowerCase().includes("success")
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "bg-red-500/10 text-red-400"
                }`}
              >
                {message}
              </div>
            )}

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 rounded-xl bg-white text-black font-semibold text-base transition-all duration-200 hover:bg-blue-700 hover:text-white hover:-translate-y-[1px] active:translate-y-0 disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:bg-white disabled:hover:text-black"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>

          </form>

          {/* Login */}
          <div className="text-center mt-10">

            <p className="text-sm text-[#737373]">

              Already have an account?{" "}

              <Link
                to="/login"
                className="text-[#d4d4d4] font-medium ml-1 hover:text-white hover:underline underline-offset-4 transition-colors duration-200"
              >
                Sign in
              </Link>

            </p>

          </div>

          {/* Mobile Features */}
          <div className="lg:hidden grid grid-cols-3 mt-14 pt-7 border-t border-[#1f1f1f]">

            <div className="text-center">
              <p className="text-xs text-[#737373] hover:text-white transition-colors">
                Resume AI
              </p>
            </div>

            <div className="text-center border-x border-[#1f1f1f]">
              <p className="text-xs text-[#737373] hover:text-white transition-colors">
                Career AI
              </p>
            </div>

            <div className="text-center">
              <p className="text-xs text-[#737373] hover:text-white transition-colors">
                Interview AI
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;