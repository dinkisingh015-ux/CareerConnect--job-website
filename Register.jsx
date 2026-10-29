import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import {
  BriefcaseBusiness,
  UserRound,
  Building2,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  LoaderCircle,
  UserPlus,
} from "lucide-react";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "candidate",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));

    setErrorMessage("");
  };

  const getPasswordStrength = () => {
    const password = formData.password;

    if (!password) {
      return {
        label: "",
        width: "0%",
      };
    }

    if (password.length < 6) {
      return {
        label: "Weak password",
        width: "30%",
      };
    }

    if (
      password.length >= 6 &&
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password)
    ) {
      return {
        label: "Strong password",
        width: "100%",
      };
    }

    return {
      label: "Medium password",
      width: "65%",
    };
  };

  const passwordStrength = getPasswordStrength();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage("");

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.password
    ) {
      setErrorMessage("Please complete all required fields.");
      return;
    }

    if (formData.password.length < 6) {
      setErrorMessage(
        "Password must contain at least 6 characters."
      );
      return;
    }

    if (formData.password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    if (!agree) {
      setErrorMessage(
        "Please agree to the terms before creating your account."
      );
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          ...formData,
          name: formData.name.trim(),
          email: formData.email.trim(),
        }
      );

      alert("Account created successfully. Please login.");
      navigate("/login");
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
          "Unable to create your account."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* LEFT BRAND PANEL */}
      <div className="hidden lg:flex lg:w-[42%] relative overflow-hidden bg-blue-600 text-white">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-white/10" />

        <div className="absolute top-1/2 -right-32 w-96 h-96 rounded-full bg-indigo-500/30 blur-3xl" />

        <div className="absolute -bottom-40 left-1/4 w-96 h-96 rounded-full bg-blue-800/30 blur-3xl" />

        <div className="relative z-10 p-12 xl:p-16 flex flex-col justify-between w-full">
          {/* LOGO */}
          <Link
            to="/"
            className="flex items-center gap-3 w-fit"
          >
            <div className="w-12 h-12 rounded-2xl bg-white text-blue-600 flex items-center justify-center shadow-lg">
              <BriefcaseBusiness size={25} />
            </div>

            <div>
              <h1 className="text-2xl font-black">
                CareerConnect
              </h1>

              <p className="text-[9px] uppercase tracking-[0.2em] text-blue-100 font-bold">
                Build Your Future
              </p>
            </div>
          </Link>

          {/* BRAND CONTENT */}
          <div className="max-w-lg">
            <div className="w-16 h-16 rounded-2xl bg-white/15 flex items-center justify-center">
              <UserPlus size={31} />
            </div>

            <h2 className="text-5xl xl:text-6xl font-black leading-[1.05] mt-8">
              Start building
              <span className="block text-blue-200 mt-2">
                your future.
              </span>
            </h2>

            <p className="text-blue-100 text-lg leading-8 mt-6">
              Join CareerConnect and get access to opportunities,
              recruiters and tools designed to help you move
              forward in your career.
            </p>

            {/* BENEFITS */}
            <div className="mt-9 space-y-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 size={20} />

                <span className="text-blue-50">
                  Create your professional profile
                </span>
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle2 size={20} />

                <span className="text-blue-50">
                  Upload and manage your resume
                </span>
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle2 size={20} />

                <span className="text-blue-50">
                  Apply to relevant opportunities
                </span>
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle2 size={20} />

                <span className="text-blue-50">
                  Connect with recruiters
                </span>
              </div>
            </div>
          </div>

          {/* COPYRIGHT */}
          <div className="text-sm text-blue-200">
            © {new Date().getFullYear()} CareerConnect
          </div>
        </div>
      </div>

      {/* RIGHT REGISTER PANEL */}
      <div className="flex-1 flex items-center justify-center px-5 py-10 sm:px-8">
        <div className="w-full max-w-xl">
          {/* MOBILE LOGO */}
          <Link
            to="/"
            className="lg:hidden flex items-center justify-center gap-3 mb-9"
          >
            <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center">
              <BriefcaseBusiness size={23} />
            </div>

            <div>
              <h1 className="text-2xl font-black text-slate-900">
                Career
                <span className="text-blue-600">
                  Connect
                </span>
              </h1>

              <p className="text-[9px] uppercase tracking-[0.18em] text-slate-400 font-bold">
                Build Your Future
              </p>
            </div>
          </Link>

          {/* HEADING */}
          <div className="mb-7">
            <p className="text-sm font-bold text-blue-600 uppercase tracking-wider">
              Get started
            </p>

            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 mt-2">
              Create your account
            </h2>

            <p className="text-slate-500 mt-3">
              Choose how you want to use CareerConnect.
            </p>
          </div>

          {/* ROLE SELECTION */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {/* JOB SEEKER */}
            <button
              type="button"
              onClick={() =>
                setFormData((previous) => ({
                  ...previous,
                  role: "candidate",
                }))
              }
              className={`text-left p-4 rounded-2xl border-2 transition-all ${
                formData.role === "candidate"
                  ? "border-blue-600 bg-blue-50"
                  : "border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  formData.role === "candidate"
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                <UserRound size={20} />
              </div>

              <p className="font-bold text-slate-900 mt-3">
                Job Seeker
              </p>

              <p className="text-xs text-slate-500 mt-1">
                Find and apply for jobs
              </p>
            </button>

            {/* RECRUITER */}
            <button
              type="button"
              onClick={() =>
                setFormData((previous) => ({
                  ...previous,
                  role: "recruiter",
                }))
              }
              className={`text-left p-4 rounded-2xl border-2 transition-all ${
                formData.role === "recruiter"
                  ? "border-blue-600 bg-blue-50"
                  : "border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  formData.role === "recruiter"
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                <Building2 size={20} />
              </div>

              <p className="font-bold text-slate-900 mt-3">
                Recruiter
              </p>

              <p className="text-xs text-slate-500 mt-1">
                Find and hire talent
              </p>
            </button>
          </div>

          {/* ERROR MESSAGE */}
          {errorMessage && (
            <div className="mb-5 p-4 rounded-xl bg-red-50 border border-red-100 text-red-700 text-sm">
              {errorMessage}
            </div>
          )}

          {/* REGISTER FORM */}
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            {/* FULL NAME */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-bold text-slate-700 mb-2"
              >
                Full name
              </label>

              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                autoComplete="name"
                className="block w-full h-14 px-4 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
              />
            </div>

            {/* EMAIL — NO LEFT ICON */}
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

            {/* PASSWORD — NO LEFT ICON */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-bold text-slate-700 mb-2"
              >
                Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  autoComplete="new-password"
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
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>
              </div>

              {/* PASSWORD STRENGTH */}
              {formData.password && (
                <div className="mt-2">
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full transition-all duration-300"
                      style={{
                        width: passwordStrength.width,
                      }}
                    />
                  </div>

                  <p className="text-xs text-slate-500 mt-1">
                    {passwordStrength.label}
                  </p>
                </div>
              )}
            </div>

            {/* CONFIRM PASSWORD — NO LEFT ICON */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-bold text-slate-700 mb-2"
              >
                Confirm password
              </label>

              <div className="relative">
                <input
                  id="confirmPassword"
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setErrorMessage("");
                  }}
                  placeholder="Re-enter your password"
                  autoComplete="new-password"
                  className="block w-full h-14 px-4 pr-12 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      (previous) => !previous
                    )
                  }
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors z-10"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>
              </div>
            </div>

            {/* TERMS AND CONDITIONS */}
            <label className="flex items-start gap-3 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => {
                  setAgree(e.target.checked);
                  setErrorMessage("");
                }}
                className="w-4 h-4 mt-1 accent-blue-600 cursor-pointer shrink-0"
              />

              <span className="text-sm text-slate-500 leading-6">
                I agree to the CareerConnect terms and
                understand that my account information will
                be used to provide the platform services.
              </span>
            </label>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 mt-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-100 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <LoaderCircle
                    size={20}
                    className="animate-spin"
                  />
                  Creating account...
                </>
              ) : (
                <>
                  Create account
                  <ArrowRight size={19} />
                </>
              )}
            </button>
          </form>

          {/* LOGIN LINK */}
          <div className="mt-7 text-center">
            <p className="text-sm text-slate-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-bold text-blue-600 hover:text-blue-700 transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>

          {/* SECURITY NOTE */}
          <div className="mt-7 pt-5 border-t border-slate-200">
            <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
              <ShieldCheck size={15} />
              Your account information is protected
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;