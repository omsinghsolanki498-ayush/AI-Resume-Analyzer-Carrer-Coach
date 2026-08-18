// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import api from "../api/axios";

// function Login() {
//   const navigate = useNavigate();

//   const [showPassword, setShowPassword] = useState(false);

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!email || !password) {
//       setMessage("Please enter email and password");
//       return;
//     }

//     try {
//       setLoading(true);
//       setMessage("");

//       const response = await api.post("/auth/login", {
//         email,
//         password,
//       });

//       // Save JWT
//       localStorage.setItem("token", response.data.token);

//       // Save user
//       localStorage.setItem(
//         "user",
//         JSON.stringify(response.data.user)
//       );

//       // Redirect
//       navigate("/dashboard");
//     } catch (error) {
//       setMessage(
//         error.response?.data?.message || "Login failed"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen w-full bg-white flex flex-col lg:flex-row">

//       {/* ================= LEFT SECTION ================= */}
//       <div className="hidden lg:flex lg:w-1/2 min-h-screen bg-[#f1f8f6] px-8 xl:px-14 items-center">
//         <div className="max-w-xl">

//           <h1 className="text-5xl xl:text-[52px] leading-[1.08] font-medium tracking-[-2px] text-[#101828]">
//             Precision intelligence
//             <br />
//             for the modern career.
//           </h1>

//           <p className="mt-6 max-w-[360px] text-sm leading-5 text-[#344054]">
//             Leverage neural analysis to identify high-impact
//             keywords and structural gaps in your professional
//             narrative.
//           </p>

//         </div>
//       </div>

//       {/* ================= RIGHT SECTION ================= */}
//       <div className="w-full lg:w-1/2 min-h-screen flex items-center justify-center px-5 py-10 sm:px-8">

//         <div className="w-full max-w-[390px]">

//           {/* ================= MOBILE BRAND ================= */}
//           <div className="lg:hidden mb-10">
//             <h2 className="text-2xl font-semibold text-[#101828]">
//               Precision AI
//             </h2>

//             <p className="text-sm text-gray-500 mt-1">
//               Intelligence for your modern career.
//             </p>
//           </div>

//           {/* ================= HEADING ================= */}
//           <div className="mb-7">
//             <h2 className="text-[20px] font-semibold text-[#101828]">
//               Welcome back
//             </h2>

//             <p className="mt-1.5 text-[11px] sm:text-xs text-[#667085]">
//               Enter your credentials to access your analysis dashboard.
//             </p>
//           </div>

//           {/* ================= GOOGLE BUTTON ================= */}
//           <button
//             type="button"
//             className="w-full h-[42px] border border-[#e4e4e4]
//             rounded-[7px] bg-white
//             text-xs font-medium text-[#101828]
//             hover:bg-gray-50 transition
//             flex items-center justify-center gap-3"
//           >
//             <span className="text-[11px] font-bold text-[#4285F4]">
//               G
//             </span>

//             Continue with Google
//           </button>

//           {/* ================= DIVIDER ================= */}
//           <div className="flex items-center gap-3 my-5">
//             <div className="h-px bg-[#eeeeee] flex-1"></div>

//             <span className="text-[10px] text-[#98A2B3]">
//               OR
//             </span>

//             <div className="h-px bg-[#eeeeee] flex-1"></div>
//           </div>

//           {/* ================= FORM ================= */}
//           <form
//             onSubmit={handleSubmit}
//             className="space-y-4"
//           >

//             {/* ================= EMAIL ================= */}
//             <div>
//               <label
//                 htmlFor="email"
//                 className="block text-[10px] font-medium text-[#344054] mb-1.5"
//               >
//                 Email address
//               </label>

//               <input
//                 id="email"
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="name@company.com"
//                 autoComplete="email"
//                 className="w-full h-[42px] px-3 rounded-[7px]
//                 border border-[#dddddd]
//                 text-xs text-[#101828]
//                 placeholder:text-[#98A2B3]
//                 outline-none
//                 focus:border-[#101828]
//                 focus:ring-1 focus:ring-[#101828]/10
//                 transition"
//               />
//             </div>

//             {/* ================= PASSWORD ================= */}
//             <div>

//               <div className="flex items-center justify-between mb-1.5">

//                 <label
//                   htmlFor="password"
//                   className="text-[10px] font-medium text-[#344054]"
//                 >
//                   Password
//                 </label>

//                 <Link
//                   to="/forgot-password"
//                   className="text-[10px] text-[#007f83] hover:underline"
//                 >
//                   Forgot password?
//                 </Link>

//               </div>

//               <div className="relative">

//                 <input
//                   id="password"
//                   type={showPassword ? "text" : "password"}
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   placeholder="••••••••"
//                   autoComplete="current-password"
//                   className="w-full h-[42px] px-3 pr-14 rounded-[7px]
//                   border border-[#dddddd]
//                   text-xs text-[#101828]
//                   placeholder:text-[#98A2B3]
//                   outline-none
//                   focus:border-[#101828]
//                   focus:ring-1 focus:ring-[#101828]/10
//                   transition"
//                 />

//                 <button
//                   type="button"
//                   onClick={() =>
//                     setShowPassword(!showPassword)
//                   }
//                   className="absolute right-3 top-1/2
//                   -translate-y-1/2
//                   text-[10px] text-gray-400
//                   hover:text-gray-700"
//                 >
//                   {showPassword ? "Hide" : "Show"}
//                 </button>

//               </div>
//             </div>

//             {/* ================= ERROR MESSAGE ================= */}
//             {message && (
//               <div className="rounded-md bg-red-50 border border-red-100 px-3 py-2">
//                 <p className="text-[11px] text-red-600">
//                   {message}
//                 </p>
//               </div>
//             )}

//             {/* ================= LOGIN BUTTON ================= */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full h-[42px] rounded-[7px]
//               bg-[#18181b] text-white
//               text-xs font-semibold
//               hover:bg-black
//               disabled:opacity-60
//               disabled:cursor-not-allowed
//               active:scale-[0.99]
//               transition"
//             >
//               {loading ? "Signing in..." : "Sign in to account"}
//             </button>

//           </form>

//           {/* ================= REGISTER ================= */}
//           <p className="text-center text-[10px] sm:text-xs text-[#667085] mt-5">

//             Don't have an account?{" "}

//             <Link
//               to="/register"
//               className="text-[#101828] font-medium hover:underline"
//             >
//               Create an account
//             </Link>

//           </p>

//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;




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

      console.log("login response => ",response);

      // Save JWT
      localStorage.setItem("token", response.data.token);

      // Save user
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      // Redirect
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
    <div className="min-h-screen bg-[#090909] text-white flex items-center justify-center px-5 py-10 sm:px-8">

      <div className="w-full max-w-6xl grid lg:grid-cols-[0.9fr_1.1fr] gap-16 xl:gap-24">

        {/* ================= LEFT SECTION ================= */}
        <div className="hidden lg:flex flex-col justify-center">

          {/* Logo */}
          <div className="mb-16">

            <h2 className="text-xl font-semibold text-white tracking-tight">
              Precision AI
            </h2>

            <p className="text-xs text-[#737373] mt-1">
              Career Intelligence
            </p>

          </div>

          {/* Hero */}
          <div className="max-w-md">

            <p className="text-xs font-medium tracking-[0.18em] text-[#737373] mb-5">
              AI POWERED CAREER PLATFORM
            </p>

            <h1 className="text-5xl xl:text-6xl font-bold tracking-tight leading-[1.08]">
              Precision intelligence

              <span className="block text-[#a3a3a3] mt-2">
                for your career.
              </span>
            </h1>

            <p className="text-[#737373] leading-7 mt-7 text-[15px] max-w-sm">
              Analyze your resume, discover your strengths,
              improve your skills and prepare for your next
              career opportunity with AI.
            </p>

          </div>

        </div>

        {/* ================= RIGHT SECTION ================= */}
        <div className="w-full max-w-xl mx-auto lg:mx-0 lg:ml-auto">

          {/* ================= MOBILE BRAND ================= */}
          <div className="lg:hidden mb-12">

            <h2 className="text-xl font-semibold text-white">
              Precision AI
            </h2>

            <p className="text-xs text-[#737373] mt-1">
              Career Intelligence
            </p>

          </div>

          {/* ================= HEADING ================= */}
          <div className="mb-11">

            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Welcome back
            </h1>

            <p className="text-[15px] text-[#737373] mt-4">
              Sign in to continue your AI-powered career journey.
            </p>

          </div>

          {/* ================= FORM ================= */}
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* ================= EMAIL ================= */}
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              autoComplete="email"
              className="w-full h-14 px-5 rounded-xl bg-[#141414] border border-[#262626] text-white text-sm placeholder:text-[#5f5f5f] outline-none transition-all duration-200 hover:border-[#3a3a3a] focus:border-[#666666] focus:bg-[#171717] focus:ring-2 focus:ring-white/5"
            />

            {/* ================= PASSWORD ================= */}
            <div className="relative">

              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
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

            {/* ================= FORGOT PASSWORD ================= */}
            <div className="flex justify-end -mt-2">

              <Link
                to="/forgot-password"
                className="text-xs text-[#737373] hover:text-blue-500 transition-colors duration-200"
              >
                Forgot password?
              </Link>

            </div>

            {/* ================= ERROR MESSAGE ================= */}
            {message && (
              <div className="px-5 py-3.5 rounded-xl bg-red-500/10 text-red-400 text-sm">
                {message}
              </div>
            )}

            {/* ================= LOGIN BUTTON ================= */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 rounded-xl bg-white text-black font-semibold text-base transition-all duration-200 hover:bg-blue-700 hover:text-white hover:-translate-y-[1px] active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-black disabled:hover:translate-y-0"
            >
              {loading ? "Signing in..." : "Sign in to account"}
            </button>

          </form>

          {/* ================= REGISTER ================= */}
          <p className="text-center text-sm text-[#737373] mt-10">

            Don't have an account?{" "}

            <Link
              to="/register"
              className="text-[#d4d4d4] font-medium ml-1 hover:text-white hover:underline underline-offset-4 transition-colors duration-200"
            >
              Create an account
            </Link>

          </p>

          {/* ================= MOBILE FEATURES ================= */}
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

export default Login;