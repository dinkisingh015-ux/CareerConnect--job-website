import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Heart,
  IndianRupee,
  MapPin,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [applying, setApplying] = useState(false);

  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  // =====================================================
  // FETCH JOB
  // =====================================================

  useEffect(() => {
    fetchJob();
  }, [id]);

  const fetchJob = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `http://localhost:5000/api/jobs/${id}`
      );

      setJob(res.data);
    } catch (error) {
      console.log(error);

      setJob(null);
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // MESSAGE
  // =====================================================

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

  // =====================================================
  // SAVE JOB
  // =====================================================

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        showMessage(
          "error",
          "Please login to save this job."
        );
        return;
      }

      setSaving(true);

      if (saved) {
        await axios.delete(
          `http://localhost:5000/api/auth/saved-jobs/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setSaved(false);

        showMessage(
          "success",
          "Job removed from saved jobs."
        );
      } else {
        await axios.post(
          `http://localhost:5000/api/auth/save-job/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setSaved(true);

        showMessage(
          "success",
          "Job saved successfully."
        );
      }
    } catch (error) {
      showMessage(
        "error",
        error.response?.data?.message ||
          "Unable to save job."
      );
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // APPLY
  // =====================================================

  const handleApply = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        showMessage(
          "error",
          "Please login to apply for this job."
        );

        setTimeout(() => {
          navigate("/login");
        }, 1200);

        return;
      }

      setApplying(true);

      const res = await axios.post(
        "http://localhost:5000/api/applications/apply",
        {
          jobId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      showMessage(
        "success",
        res.data.message ||
          "Application submitted successfully."
      );
    } catch (error) {
      showMessage(
        "error",
        error.response?.data?.message ||
          "Unable to submit application."
      );
    } finally {
      setApplying(false);
    }
  };

  // =====================================================
  // DATE
  // =====================================================

  const formatDate = (date) => {
    if (!date) return "Recently posted";

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">

        <div className="h-72 bg-slate-950 animate-pulse"></div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 -mt-24 relative">

          <div className="bg-white rounded-3xl shadow-xl p-8 animate-pulse">

            <div className="w-20 h-20 bg-slate-200 rounded-2xl"></div>

            <div className="h-8 bg-slate-200 rounded w-1/2 mt-7"></div>

            <div className="h-5 bg-slate-200 rounded w-1/3 mt-4"></div>

            <div className="grid md:grid-cols-3 gap-5 mt-8">

              <div className="h-20 bg-slate-100 rounded-2xl"></div>
              <div className="h-20 bg-slate-100 rounded-2xl"></div>
              <div className="h-20 bg-slate-100 rounded-2xl"></div>

            </div>

          </div>

        </div>

      </div>
    );
  }

  // =====================================================
  // NOT FOUND
  // =====================================================

  if (!job) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">

        <div className="bg-white border border-slate-200 rounded-3xl shadow-lg p-12 text-center max-w-lg w-full">

          <div className="w-20 h-20 mx-auto rounded-2xl bg-red-50 flex items-center justify-center">
            <BriefcaseBusiness
              size={34}
              className="text-red-500"
            />
          </div>

          <h1 className="text-3xl font-black text-slate-900 mt-6">
            Job Not Found
          </h1>

          <p className="text-slate-500 mt-3 leading-7">
            This job may have been removed or is no longer
            available.
          </p>

          <Link
            to="/jobs"
            className="inline-flex items-center gap-2 mt-7 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition"
          >
            <ArrowLeft size={17} />
            Browse Jobs
          </Link>

        </div>

      </div>
    );
  }

  // =====================================================
  // MAIN
  // =====================================================

  return (
    <div className="min-h-screen bg-slate-50">

      {/* =================================================
          NOTIFICATION
      ================================================= */}

      {message.text && (
        <div
          className={`fixed top-24 right-5 z-[70] max-w-sm flex items-center gap-3 px-5 py-4 rounded-xl shadow-2xl border ${
            message.type === "success"
              ? "bg-white border-green-200 text-green-700"
              : "bg-white border-red-200 text-red-700"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle2 size={20} />
          ) : (
            <BriefcaseBusiness size={20} />
          )}

          <p className="text-sm font-semibold">
            {message.text}
          </p>
        </div>
      )}


      {/* =================================================
          HERO
      ================================================= */}

      <section className="bg-slate-950 text-white">

        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">

          <button
            onClick={() => navigate("/jobs")}
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition text-sm font-semibold"
          >
            <ArrowLeft size={17} />
            Back to jobs
          </button>

        </div>

      </section>


      {/* =================================================
          JOB HEADER CARD
      ================================================= */}

      <section className="relative -mt-5">

        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          <div className="bg-white border border-slate-200 rounded-3xl shadow-xl overflow-hidden">

            <div className="p-7 sm:p-9 lg:p-10">

              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-7">

                {/* COMPANY */}

                <div className="flex items-start gap-5">

                  <div className="w-20 h-20 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">

                    <Building2
                      size={34}
                      className="text-blue-600"
                    />

                  </div>

                  <div>

                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wide">
                      <Sparkles size={13} />
                      Job Opportunity
                    </div>

                    <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3 leading-tight">
                      {job.title}
                    </h1>

                    <div className="flex items-center gap-2 mt-3 text-slate-500">

                      <Building2 size={18} />

                      <span className="font-semibold">
                        {job.company}
                      </span>

                    </div>

                  </div>

                </div>


                {/* SAVE */}

                <button
                  onClick={handleSave}
                  disabled={saving}
                  className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold border transition ${
                    saved
                      ? "bg-red-50 border-red-200 text-red-600"
                      : "bg-white border-slate-200 text-slate-600 hover:bg-red-50 hover:border-red-200 hover:text-red-600"
                  }`}
                >

                  <Heart
                    size={19}
                    className={
                      saved
                        ? "fill-red-500 text-red-500"
                        : ""
                    }
                  />

                  {saving
                    ? "Saving..."
                    : saved
                    ? "Saved"
                    : "Save Job"}

                </button>

              </div>


              {/* JOB META */}

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-9">

                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5">

                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center mb-3">

                    <MapPin
                      size={19}
                      className="text-blue-600"
                    />

                  </div>

                  <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide">
                    Location
                  </p>

                  <p className="font-bold text-slate-800 mt-1">
                    {job.location ||
                      "Not specified"}
                  </p>

                </div>


                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5">

                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center mb-3">

                    <IndianRupee
                      size={19}
                      className="text-green-600"
                    />

                  </div>

                  <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide">
                    Salary
                  </p>

                  <p className="font-bold text-slate-800 mt-1">
                    {job.salary ||
                      "Not disclosed"}
                  </p>

                </div>


                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5">

                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center mb-3">

                    <BriefcaseBusiness
                      size={19}
                      className="text-purple-600"
                    />

                  </div>

                  <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide">
                    Job Type
                  </p>

                  <p className="font-bold text-slate-800 mt-1">
                    {job.jobType ||
                      "Full Time"}
                  </p>

                </div>


                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5">

                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center mb-3">

                    <CalendarDays
                      size={19}
                      className="text-orange-500"
                    />

                  </div>

                  <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide">
                    Posted
                  </p>

                  <p className="font-bold text-slate-800 mt-1">
                    {formatDate(job.createdAt)}
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =================================================
          CONTENT
      ================================================= */}

      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-10">

        <div className="grid lg:grid-cols-[1fr_360px] gap-8">

          {/* =================================================
              LEFT
          ================================================= */}

          <div className="space-y-7">

            {/* DESCRIPTION */}

            <section className="bg-white border border-slate-200 rounded-3xl p-7 sm:p-9">

              <div className="flex items-center gap-3 mb-6">

                <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">

                  <BriefcaseBusiness
                    size={20}
                    className="text-blue-600"
                  />

                </div>

                <h2 className="text-2xl font-black text-slate-900">
                  Job Description
                </h2>

              </div>

              <div className="text-slate-600 leading-8 whitespace-pre-line">
                {job.description ||
                  "The recruiter has not provided a detailed job description yet."}
              </div>

            </section>


            {/* REQUIREMENTS */}

            <section className="bg-white border border-slate-200 rounded-3xl p-7 sm:p-9">

              <div className="flex items-center gap-3 mb-6">

                <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center">

                  <CheckCircle2
                    size={20}
                    className="text-green-600"
                  />

                </div>

                <h2 className="text-2xl font-black text-slate-900">
                  What You'll Need
                </h2>

              </div>

              <div className="space-y-4">

                <div className="flex gap-3">

                  <CheckCircle2
                    size={19}
                    className="text-green-500 mt-1 shrink-0"
                  />

                  <p className="text-slate-600 leading-7">
                    Relevant skills and knowledge required
                    for the position.
                  </p>

                </div>

                <div className="flex gap-3">

                  <CheckCircle2
                    size={19}
                    className="text-green-500 mt-1 shrink-0"
                  />

                  <p className="text-slate-600 leading-7">
                    Good communication and professional
                    working skills.
                  </p>

                </div>

                <div className="flex gap-3">

                  <CheckCircle2
                    size={19}
                    className="text-green-500 mt-1 shrink-0"
                  />

                  <p className="text-slate-600 leading-7">
                    Ability to work effectively with the
                    team and complete assigned responsibilities.
                  </p>

                </div>

              </div>

            </section>


            {/* COMPANY */}

            <section className="bg-white border border-slate-200 rounded-3xl p-7 sm:p-9">

              <div className="flex items-center gap-4">

                <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center">

                  <Building2
                    size={25}
                    className="text-blue-600"
                  />

                </div>

                <div>

                  <p className="text-sm text-slate-400 font-semibold">
                    Hiring Company
                  </p>

                  <h2 className="text-2xl font-black text-slate-900">
                    {job.company}
                  </h2>

                </div>

              </div>

              <div className="grid sm:grid-cols-2 gap-4 mt-7">

                <div className="flex items-center gap-3 bg-slate-50 rounded-xl p-4">

                  <MapPin
                    size={18}
                    className="text-blue-600"
                  />

                  <div>
                    <p className="text-xs text-slate-400">
                      Location
                    </p>

                    <p className="text-sm font-bold text-slate-700">
                      {job.location ||
                        "Not specified"}
                    </p>
                  </div>

                </div>


                <div className="flex items-center gap-3 bg-slate-50 rounded-xl p-4">

                  <Users
                    size={18}
                    className="text-blue-600"
                  />

                  <div>
                    <p className="text-xs text-slate-400">
                      Opportunity
                    </p>

                    <p className="text-sm font-bold text-slate-700">
                      Open Position
                    </p>
                  </div>

                </div>

              </div>

            </section>

          </div>


          {/* =================================================
              RIGHT SIDEBAR
          ================================================= */}

          <aside>

            <div className="lg:sticky lg:top-28 space-y-5">

              {/* APPLY CARD */}

              <div className="bg-white border border-slate-200 rounded-3xl shadow-lg p-6">

                <h3 className="text-xl font-black text-slate-900">
                  Interested in this role?
                </h3>

                <p className="text-sm text-slate-500 leading-6 mt-2">
                  Take the next step towards your career
                  by submitting your application.
                </p>

                <button
                  onClick={handleApply}
                  disabled={applying}
                  className="w-full mt-6 h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center justify-center gap-2 transition shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
                >

                  {applying ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
                      Applying...
                    </>
                  ) : (
                    <>
                      Apply Now
                      <ArrowRight size={18} />
                    </>
                  )}

                </button>

                <button
                  onClick={handleSave}
                  disabled={saving}
                  className={`w-full mt-3 h-12 rounded-xl font-bold flex items-center justify-center gap-2 border transition ${
                    saved
                      ? "bg-red-50 border-red-200 text-red-600"
                      : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                  }`}
                >

                  <Heart
                    size={18}
                    className={
                      saved
                        ? "fill-red-500 text-red-500"
                        : ""
                    }
                  />

                  {saved
                    ? "Saved Job"
                    : "Save for Later"}

                </button>

              </div>


              {/* TRUST CARD */}

              <div className="bg-slate-950 text-white rounded-3xl p-6">

                <div className="w-11 h-11 rounded-xl bg-blue-600/20 flex items-center justify-center">

                  <ShieldCheck
                    size={22}
                    className="text-blue-400"
                  />

                </div>

                <h3 className="text-lg font-black mt-5">
                  Apply with confidence
                </h3>

                <p className="text-sm text-slate-400 leading-6 mt-2">
                  Keep your CareerConnect profile updated
                  and make sure your resume is ready before
                  applying.
                </p>

                <div className="flex items-center gap-2 mt-5 text-sm text-slate-300">

                  <CheckCircle2
                    size={16}
                    className="text-green-400"
                  />

                  Easy application process

                </div>

                <div className="flex items-center gap-2 mt-3 text-sm text-slate-300">

                  <CheckCircle2
                    size={16}
                    className="text-green-400"
                  />

                  Manage applications easily

                </div>

              </div>


              {/* QUICK INFO */}

              <div className="bg-white border border-slate-200 rounded-3xl p-6">

                <h3 className="font-black text-slate-900">
                  Job Overview
                </h3>

                <div className="space-y-4 mt-5">

                  <div className="flex items-center justify-between gap-4">

                    <div className="flex items-center gap-2 text-slate-500">

                      <Clock3 size={17} />

                      <span className="text-sm">
                        Posted
                      </span>

                    </div>

                    <span className="text-sm font-bold text-slate-700">
                      {formatDate(job.createdAt)}
                    </span>

                  </div>


                  <div className="flex items-center justify-between gap-4">

                    <div className="flex items-center gap-2 text-slate-500">

                      <BriefcaseBusiness size={17} />

                      <span className="text-sm">
                        Type
                      </span>

                    </div>

                    <span className="text-sm font-bold text-slate-700">
                      {job.jobType ||
                        "Full Time"}
                    </span>

                  </div>


                  <div className="flex items-center justify-between gap-4">

                    <div className="flex items-center gap-2 text-slate-500">

                      <MapPin size={17} />

                      <span className="text-sm">
                        Location
                      </span>

                    </div>

                    <span className="text-sm font-bold text-slate-700 text-right">
                      {job.location ||
                        "Not specified"}
                    </span>

                  </div>

                </div>

              </div>

            </div>

          </aside>

        </div>

      </main>


      {/* =================================================
          BOTTOM CTA
      ================================================= */}

      <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-14">

        <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 sm:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">

          <div>

            <p className="text-blue-100 text-sm font-bold uppercase tracking-wider">
              Keep exploring
            </p>

            <h2 className="text-2xl sm:text-3xl font-black mt-2">
              Looking for more opportunities?
            </h2>

            <p className="text-blue-100 mt-2">
              Discover more jobs that match your career goals.
            </p>

          </div>

          <Link
            to="/jobs"
            className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 px-6 py-3 rounded-xl font-black hover:bg-blue-50 transition shrink-0"
          >
            Browse More Jobs
            <ArrowRight size={18} />
          </Link>

        </div>

      </section>

    </div>
  );
}

export default JobDetails;