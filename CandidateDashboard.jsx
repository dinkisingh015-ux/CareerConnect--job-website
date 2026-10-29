import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import {
  BriefcaseBusiness,
  FileText,
  Heart,
  Upload,
  MapPin,
  IndianRupee,
  Building2,
  ArrowRight,
  CheckCircle2,
  Clock3,
  XCircle,
  UserRound,
  Search,
  Sparkles,
} from "lucide-react";

function CandidateDashboard() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const [resume, setResume] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [savedCount, setSavedCount] = useState(0);

  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchApplications();
    fetchSavedJobs();
  }, []);

  // =========================
  // FETCH APPLICATIONS
  // =========================

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      const res = await axios.get(
        "http://localhost:5000/api/applications/my",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setApplications(res.data);
    } catch (error) {
      console.log("Application fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // FETCH SAVED JOBS
  // =========================

  const fetchSavedJobs = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const res = await axios.get(
        "http://localhost:5000/api/auth/saved-jobs",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSavedCount(res.data.length);
    } catch (error) {
      console.log("Saved jobs fetch error:", error);
    }
  };

  // =========================
  // MESSAGE
  // =========================

  const showMessage = (type, text) => {
    setMessage({
      type,
      text,
    });

    setTimeout(() => {
      setMessage({
        type: "",
        text: "",
      });
    }, 3000);
  };

  // =========================
  // UPLOAD RESUME
  // =========================

  const uploadResume = async () => {
    if (!resume) {
      showMessage("error", "Please select a PDF resume.");
      return;
    }

    if (resume.type !== "application/pdf") {
      showMessage("error", "Only PDF resumes are allowed.");
      return;
    }

    try {
      setUploading(true);

      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("resume", resume);

      const res = await axios.post(
        "http://localhost:5000/api/auth/upload-resume",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      showMessage(
        "success",
        res.data.message || "Resume uploaded successfully."
      );

      setResume(null);

      // Update local user data
      const updatedUser = {
        ...user,
        resume: res.data.resume || true,
      };

      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );
    } catch (error) {
      showMessage(
        "error",
        error.response?.data?.message ||
          "Resume upload failed."
      );
    } finally {
      setUploading(false);
    }
  };

  // =========================
  // STATUS
  // =========================

  const getStatusStyle = (status) => {
    if (status === "Accepted") {
      return {
        className:
          "bg-emerald-50 text-emerald-700 border-emerald-200",
        icon: <CheckCircle2 size={15} />,
      };
    }

    if (status === "Rejected") {
      return {
        className:
          "bg-red-50 text-red-700 border-red-200",
        icon: <XCircle size={15} />,
      };
    }

    return {
      className:
        "bg-amber-50 text-amber-700 border-amber-200",
      icon: <Clock3 size={15} />,
    };
  };

  const acceptedCount = applications.filter(
    (app) => app.status === "Accepted"
  ).length;

  const pendingCount = applications.filter(
    (app) => app.status === "Pending"
  ).length;

  const rejectedCount = applications.filter(
    (app) => app.status === "Rejected"
  ).length;

  return (
    <div className="min-h-screen bg-slate-50">

      {/* =========================
          SUCCESS / ERROR MESSAGE
      ========================= */}

      {message.text && (
        <div
          className={`fixed top-24 right-5 z-[100] flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl border ${
            message.type === "success"
              ? "bg-white border-emerald-200 text-emerald-700"
              : "bg-white border-red-200 text-red-700"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle2 size={20} />
          ) : (
            <XCircle size={20} />
          )}

          <span className="text-sm font-semibold">
            {message.text}
          </span>
        </div>
      )}

      {/* =========================
          HERO
      ========================= */}

      <section className="bg-slate-950 text-white">

        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

            <div className="flex items-center gap-5">

              <div className="relative">

                <img
                  src={
                    user?.profileImage
                      ? `http://localhost:5000/uploads/${user.profileImage}`
                      : `https://ui-avatars.com/api/?background=2563eb&color=fff&name=${encodeURIComponent(
                          user?.name || "User"
                        )}`
                  }
                  alt="Profile"
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-white/20 shadow-xl"
                />

                <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-lg bg-blue-600 border-4 border-slate-950 flex items-center justify-center">
                  <UserRound size={14} />
                </div>

              </div>

              <div>

                <p className="text-blue-400 text-sm font-bold uppercase tracking-wider">
                  Candidate Dashboard
                </p>

                <h1 className="text-3xl sm:text-4xl font-black tracking-tight mt-1">
                  Welcome back, {user?.name || "Candidate"}!
                </h1>

                <p className="text-slate-400 mt-2">
                  Track your applications and manage your career profile.
                </p>

              </div>

            </div>

            <div className="flex flex-wrap gap-3">

              <Link
                to="/jobs"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl font-bold transition shadow-lg"
              >
                <Search size={18} />
                Find Jobs
              </Link>

              <Link
                to="/profile"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/10 px-5 py-3 rounded-xl font-bold transition"
              >
                <UserRound size={18} />
                My Profile
              </Link>

            </div>

          </div>

        </div>

      </section>

      {/* =========================
          MAIN
      ========================= */}

      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-10">

        {/* =========================
            STATISTICS
        ========================= */}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">

          {/* Applications */}

          <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 hover:shadow-lg hover:-translate-y-1 transition-all">

            <div className="flex items-start justify-between">

              <div>

                <p className="text-sm font-semibold text-slate-500">
                  Applications
                </p>

                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2">
                  {applications.length}
                </h2>

              </div>

              <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                <BriefcaseBusiness
                  size={21}
                  className="text-blue-600"
                />
              </div>

            </div>

            <p className="text-xs text-slate-400 mt-4">
              Jobs you've applied to
            </p>

          </div>

          {/* Pending */}

          <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 hover:shadow-lg hover:-translate-y-1 transition-all">

            <div className="flex items-start justify-between">

              <div>

                <p className="text-sm font-semibold text-slate-500">
                  Pending
                </p>

                <h2 className="text-3xl sm:text-4xl font-black text-amber-600 mt-2">
                  {pendingCount}
                </h2>

              </div>

              <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center">
                <Clock3
                  size={21}
                  className="text-amber-600"
                />
              </div>

            </div>

            <p className="text-xs text-slate-400 mt-4">
              Awaiting recruiter response
            </p>

          </div>

          {/* Accepted */}

          <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 hover:shadow-lg hover:-translate-y-1 transition-all">

            <div className="flex items-start justify-between">

              <div>

                <p className="text-sm font-semibold text-slate-500">
                  Accepted
                </p>

                <h2 className="text-3xl sm:text-4xl font-black text-emerald-600 mt-2">
                  {acceptedCount}
                </h2>

              </div>

              <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center">
                <CheckCircle2
                  size={21}
                  className="text-emerald-600"
                />
              </div>

            </div>

            <p className="text-xs text-slate-400 mt-4">
              Successful applications
            </p>

          </div>

          {/* Saved */}

          <Link
            to="/saved-jobs"
            className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 hover:shadow-lg hover:-translate-y-1 transition-all group"
          >

            <div className="flex items-start justify-between">

              <div>

                <p className="text-sm font-semibold text-slate-500">
                  Saved Jobs
                </p>

                <h2 className="text-3xl sm:text-4xl font-black text-pink-600 mt-2">
                  {savedCount}
                </h2>

              </div>

              <div className="w-11 h-11 rounded-xl bg-pink-50 flex items-center justify-center">
                <Heart
                  size={21}
                  className="text-pink-600 group-hover:fill-pink-600 transition"
                />
              </div>

            </div>

            <p className="text-xs text-slate-400 mt-4 flex items-center gap-1">
              View saved opportunities
              <ArrowRight size={13} />
            </p>

          </Link>

        </div>

        {/* =========================
            QUICK ACTIONS
        ========================= */}

        <section className="mt-8">

          <div className="flex items-center justify-between mb-5">

            <div>
              <p className="text-sm text-blue-600 font-bold uppercase tracking-wider">
                Quick actions
              </p>

              <h2 className="text-2xl font-black text-slate-900 mt-1">
                Manage your career
              </h2>
            </div>

          </div>

          <div className="grid md:grid-cols-3 gap-5">

            <Link
              to="/jobs"
              className="group bg-white border border-slate-200 rounded-2xl p-6 hover:border-blue-200 hover:shadow-xl hover:-translate-y-1 transition-all"
            >

              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-600 transition">
                <Search
                  size={22}
                  className="text-blue-600 group-hover:text-white transition"
                />
              </div>

              <h3 className="text-lg font-black text-slate-900 mt-5">
                Find New Jobs
              </h3>

              <p className="text-sm text-slate-500 mt-2 leading-6">
                Explore opportunities that match your skills and career goals.
              </p>

              <div className="flex items-center gap-2 text-blue-600 font-bold text-sm mt-5">
                Browse Jobs
                <ArrowRight size={16} className="group-hover:translate-x-1 transition" />
              </div>

            </Link>

            <Link
              to="/profile"
              className="group bg-white border border-slate-200 rounded-2xl p-6 hover:border-purple-200 hover:shadow-xl hover:-translate-y-1 transition-all"
            >

              <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center group-hover:bg-purple-600 transition">
                <UserRound
                  size={22}
                  className="text-purple-600 group-hover:text-white transition"
                />
              </div>

              <h3 className="text-lg font-black text-slate-900 mt-5">
                Update Profile
              </h3>

              <p className="text-sm text-slate-500 mt-2 leading-6">
                Keep your professional profile updated for recruiters.
              </p>

              <div className="flex items-center gap-2 text-purple-600 font-bold text-sm mt-5">
                Edit Profile
                <ArrowRight size={16} className="group-hover:translate-x-1 transition" />
              </div>

            </Link>

            <Link
              to="/saved-jobs"
              className="group bg-white border border-slate-200 rounded-2xl p-6 hover:border-pink-200 hover:shadow-xl hover:-translate-y-1 transition-all"
            >

              <div className="w-12 h-12 rounded-xl bg-pink-50 flex items-center justify-center group-hover:bg-pink-600 transition">
                <Heart
                  size={22}
                  className="text-pink-600 group-hover:text-white transition"
                />
              </div>

              <h3 className="text-lg font-black text-slate-900 mt-5">
                Saved Opportunities
              </h3>

              <p className="text-sm text-slate-500 mt-2 leading-6">
                Quickly return to jobs you've saved for later.
              </p>

              <div className="flex items-center gap-2 text-pink-600 font-bold text-sm mt-5">
                View Saved Jobs
                <ArrowRight size={16} className="group-hover:translate-x-1 transition" />
              </div>

            </Link>

          </div>

        </section>

        {/* =========================
            RESUME
        ========================= */}

        <section className="mt-8">

          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden">

            <div className="p-7 sm:p-8">

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                <div className="flex items-center gap-4">

                  <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center">
                    <FileText
                      size={25}
                      className="text-blue-600"
                    />
                  </div>

                  <div>

                    <p className="text-sm text-blue-600 font-bold">
                      Profile document
                    </p>

                    <h2 className="text-2xl font-black text-slate-900 mt-1">
                      Your Resume
                    </h2>

                    <p className="text-sm text-slate-500 mt-1">
                      {user?.resume
                        ? "Your resume is uploaded and ready to use."
                        : "Upload your resume to apply for opportunities."}
                    </p>

                  </div>

                </div>

                <div>

                  {user?.resume ? (
                    <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-sm font-bold">
                      <CheckCircle2 size={17} />
                      Resume Uploaded
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-50 text-amber-700 border border-amber-200 text-sm font-bold">
                      <Clock3 size={17} />
                      Resume Required
                    </div>
                  )}

                </div>

              </div>

              <div className="mt-7 pt-7 border-t border-slate-100">

                <label className="block text-sm font-bold text-slate-700 mb-3">
                  Select PDF Resume
                </label>

                <div className="flex flex-col sm:flex-row gap-3">

                  <label className="flex-1 cursor-pointer">

                    <div className="h-12 border border-dashed border-slate-300 rounded-xl bg-slate-50 hover:bg-blue-50 hover:border-blue-300 transition flex items-center px-4 gap-3">

                      <Upload
                        size={18}
                        className="text-slate-400"
                      />

                      <span className="text-sm text-slate-500 truncate">
                        {resume
                          ? resume.name
                          : "Choose a PDF file"}
                      </span>

                    </div>

                    <input
                      type="file"
                      accept=".pdf,application/pdf"
                      className="hidden"
                      onChange={(e) =>
                        setResume(e.target.files[0])
                      }
                    />

                  </label>

                  <button
                    onClick={uploadResume}
                    disabled={uploading}
                    className="h-12 px-7 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center justify-center gap-2 transition disabled:opacity-60 disabled:cursor-not-allowed"
                  >

                    {uploading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload size={17} />
                        Upload Resume
                      </>
                    )}

                  </button>

                </div>

                <p className="text-xs text-slate-400 mt-3">
                  Accepted format: PDF
                </p>

              </div>

            </div>

          </div>

        </section>

        {/* =========================
            APPLICATIONS
        ========================= */}

        <section className="mt-8">

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-5">

            <div>

              <p className="text-sm text-blue-600 font-bold uppercase tracking-wider">
                Application activity
              </p>

              <h2 className="text-2xl font-black text-slate-900 mt-1">
                My Applications
              </h2>

            </div>

            {!loading && applications.length > 0 && (
              <span className="text-sm text-slate-500">
                {applications.length} application
                {applications.length !== 1 ? "s" : ""}
              </span>
            )}

          </div>

          {loading ? (

            <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center">

              <div className="w-8 h-8 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mx-auto"></div>

              <p className="text-sm font-semibold text-slate-500 mt-4">
                Loading your applications...
              </p>

            </div>

          ) : applications.length === 0 ? (

            <div className="bg-white border border-slate-200 rounded-3xl p-10 sm:p-14 text-center">

              <div className="w-16 h-16 rounded-2xl bg-blue-50 mx-auto flex items-center justify-center">
                <BriefcaseBusiness
                  size={28}
                  className="text-blue-600"
                />
              </div>

              <h3 className="text-2xl font-black text-slate-900 mt-5">
                No applications yet
              </h3>

              <p className="text-slate-500 mt-2 max-w-md mx-auto leading-6">
                Start exploring jobs and submit your first application.
              </p>

              <Link
                to="/jobs"
                className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition"
              >
                Find Jobs
                <ArrowRight size={17} />
              </Link>

            </div>

          ) : (

            <div className="space-y-4">

              {applications.map((app) => {

                const status = getStatusStyle(app.status);

                return (
                  <div
                    key={app._id}
                    className="group bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 hover:border-blue-200 hover:shadow-lg transition-all"
                  >

                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

                      <div className="flex items-start gap-4">

                        <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                          <Building2
                            size={21}
                            className="text-blue-600"
                          />
                        </div>

                        <div>

                          <h3 className="text-lg sm:text-xl font-black text-slate-900 group-hover:text-blue-600 transition">
                            {app.jobId?.title || "Job Deleted"}
                          </h3>

                          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-2">

                            <span className="flex items-center gap-1.5 text-sm text-slate-500">
                              <Building2 size={15} />
                              {app.jobId?.company || "-"}
                            </span>

                            <span className="flex items-center gap-1.5 text-sm text-slate-500">
                              <MapPin size={15} />
                              {app.jobId?.location || "-"}
                            </span>

                            <span className="flex items-center gap-1.5 text-sm text-slate-500">
                              <IndianRupee size={15} />
                              {app.jobId?.salary || "Not disclosed"}
                            </span>

                          </div>

                        </div>

                      </div>

                      <div className="flex items-center justify-between lg:justify-end gap-4">

                        <span
                          className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-bold ${status.className}`}
                        >
                          {status.icon}
                          {app.status || "Pending"}
                        </span>

                        {app.jobId?._id && (
                          <Link
                            to={`/job/${app.jobId._id}`}
                            className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-500 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition"
                            title="View Job"
                          >
                            <ArrowRight size={17} />
                          </Link>
                        )}

                      </div>

                    </div>

                  </div>
                );
              })}

            </div>

          )}

        </section>

        {/* =========================
            APPLICATION SUMMARY
        ========================= */}

        {!loading && applications.length > 0 && (
          <section className="mt-8">

            <div className="bg-slate-950 rounded-3xl p-7 sm:p-8 text-white">

              <div className="flex items-center gap-3">

                <div className="w-11 h-11 rounded-xl bg-blue-600/20 flex items-center justify-center">
                  <Sparkles
                    size={21}
                    className="text-blue-400"
                  />
                </div>

                <div>

                  <p className="text-blue-400 text-sm font-bold uppercase tracking-wider">
                    Application overview
                  </p>

                  <h2 className="text-xl sm:text-2xl font-black mt-1">
                    Keep your career moving forward
                  </h2>

                </div>

              </div>

              <div className="grid grid-cols-3 gap-4 mt-7">

                <div className="bg-white/5 rounded-2xl p-4">
                  <p className="text-2xl font-black">
                    {applications.length}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Total
                  </p>
                </div>

                <div className="bg-white/5 rounded-2xl p-4">
                  <p className="text-2xl font-black text-amber-400">
                    {pendingCount}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Pending
                  </p>
                </div>

                <div className="bg-white/5 rounded-2xl p-4">
                  <p className="text-2xl font-black text-emerald-400">
                    {acceptedCount}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Accepted
                  </p>
                </div>

              </div>

              {rejectedCount > 0 && (
                <p className="text-xs text-slate-500 mt-5">
                  {rejectedCount} application
                  {rejectedCount !== 1 ? "s" : ""} marked as rejected.
                </p>
              )}

            </div>

          </section>
        )}

      </main>

    </div>
  );
}

export default CandidateDashboard;