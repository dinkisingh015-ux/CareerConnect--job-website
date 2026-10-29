import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import {
  BriefcaseBusiness,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Search,
  Users,
  CheckCircle2,
  LoaderCircle,
} from "lucide-react";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: localStorage.getItem("rememberedEmail") || "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(
    Boolean(localStorage.getItem("rememberedEmail"))
  );
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));

    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage("");

    if (!formData.email.trim() || !formData.password) {
      setErrorMessage("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email: formData.email.trim(),
          password: formData.password,
        }
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      if (rememberMe) {
        localStorage.setItem(
          "rememberedEmail",
          formData.email.trim()
        );
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      const userRole = response.data.user.role;

      if (userRole === "candidate") {
        navigate("/candidate");
      } else if (userRole === "recruiter") {
        navigate("/recruiter");
      } else {
        navigate("/admin");
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
          "Unable to login. Please check your details."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* LEFT BRAND PANEL */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-950 relative overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col justify-between w-full p-12 xl:p-16 text-white">
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3 w-fit">
            <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20">
              <BriefcaseBusiness size={23} strokeWidth={2.3} />
            </div>

            <div>
              <p className="text-xl font-extrabold tracking-tight">
                Career<span className="text-blue-400">Connect</span>
              </p>

              <p className="text-xs text-slate-400 mt-0.5">
                Your career. Your future.
              </p>
            </div>
          </Link>

          {/* BRAND CONTENT */}
          <div className="max-w-lg">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-blue-300 text-xs font-semibold mb-7">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              Connecting talent with opportunity
            </div>

            <h1 className="text-4xl xl:text-5xl font-extrabold leading-[1.12] tracking-tight">
              Your next opportunity
              <span className="block text-blue-400">
                starts here.
              </span>
            </h1>

            <p className="text-slate-400 text-base leading-7 mt-6 max-w-md">
              Discover meaningful opportunities, connect with
              leading companies, and take the next step in your
              professional journey.
            </p>

            {/* FEATURES */}
            <div className="mt-9 space-y-4">
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <CheckCircle2
                  size={18}
                  className="text-blue-400 shrink-0"
                />
                Find opportunities matched to your skills
              </div>

              <div className="flex items-center gap-3 text-sm text-slate-300">
                <CheckCircle2
                  size={18}
                  className="text-blue-400 shrink-0"
                />
                Connect with trusted employers
              </div>

              <div className="flex items-center gap-3 text-sm text-slate-300">
                <CheckCircle2
                  size={18}
                  className="text-blue-400 shrink-0"
                />
                Build a stronger professional future
              </div>
            </div>
          </div>

          {/* BOTTOM STATS */}
          <div className="flex items-center gap-8 pt-8 border-t border-white/10">
            <div className="flex items-center gap-2.5">
              <Search size={18} className="text-blue-400" />

              <div>
                <p className="text-sm font-bold">Explore</p>
                <p className="text-xs text-slate-500">
                  Career opportunities
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Users size={18} className="text-blue-400" />

              <div>
                <p className="text-sm font-bold">Connect</p>
                <p className="text-xs text-slate-500">
                  With great teams
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT LOGIN PANEL */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-5 py-10 sm:px-8">
        <div className="w-full max-w-md">
          {/* MOBILE LOGO */}
          <Link
            to="/"
            className="flex lg:hidden items-center justify-center gap-3 mb-10"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center">
              <BriefcaseBusiness size={21} />
            </div>

            <p className="text-xl font-extrabold text-slate-900 tracking-tight">
              Career<span className="text-blue-600">Connect</span>
            </p>
          </Link>

          {/* HEADING */}
          <div className="mb-8">
            <p className="text-sm font-bold uppercase tracking-wider text-blue-600 mb-3">
              Sign in
            </p>

            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-950">
              Welcome back
            </h2>

            <p className="text-slate-500 mt-3 text-base">
              Enter your details to access your account.
            </p>
          </div>

          {/* ERROR MESSAGE */}
          {errorMessage && (
            <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              {errorMessage}
            </div>
          )}

          {/* LOGIN FORM */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* EMAIL FIELD - CLEAN, WITHOUT ICON */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-bold text-slate-700 mb-2"
              >
                Email address
              </label>

              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                autoComplete="email"
                className="block w-full h-14 px-4 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
              />
            </div>

            {/* PASSWORD FIELD - ONLY EYE ICON ON RIGHT */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-bold text-slate-700"
                >
                  Password
                </label>

                <button
                  type="button"
                  className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Forgot password?
                </button>
              </div>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="block w-full h-14 px-4 pr-12 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((previous) => !previous)
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors z-10"
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* REMEMBER ME */}
            <div className="flex items-center gap-3">
              <input
                id="rememberMe"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) =>
                  setRememberMe(e.target.checked)
                }
                className="w-5 h-5 accent-blue-600 cursor-pointer"
              />

              <label
                htmlFor="rememberMe"
                className="text-sm text-slate-600 cursor-pointer select-none"
              >
                Remember my email
              </label>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold text-base flex items-center justify-center gap-3 shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 transition-all active:scale-[0.99]"
            >
              {loading ? (
                <>
                  <LoaderCircle
                    size={20}
                    className="animate-spin"
                  />
                  Signing in...
                </>
              ) : (
                <>
                  Sign in
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          {/* REGISTER LINK */}
          <p className="text-center text-sm text-slate-500 mt-7">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-bold text-blue-600 hover:text-blue-700 transition-colors"
            >
              Create one
            </Link>
          </p>

          {/* SECURITY NOTE */}
          <div className="flex items-center justify-center gap-2 mt-5 pt-4 border-t border-slate-200">
            <ShieldCheck
              size={17}
              className="text-slate-400"
            />

            <p className="text-xs text-slate-400">
              Secure account access powered by CareerConnect
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;