import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import {
  BriefcaseBusiness,
  Building2,
  MapPin,
  IndianRupee,
  Users,
  Pencil,
  Trash2,
  Plus,
  ArrowRight,
  Search,
  CheckCircle2,
  XCircle,
} from "lucide-react";

function RecruiterDashboard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  // =========================
  // FETCH RECRUITER JOBS
  // =========================
  const fetchJobs = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/jobs/my",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setJobs(
        Array.isArray(response.data)
          ? response.data
          : []
      );
    } catch (error) {
      console.error("Fetch jobs error:", error);

      showMessage(
        "error",
        error.response?.data?.message ||
          "Unable to load your jobs."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // SHOW MESSAGE
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
  // DELETE JOB
  // =========================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      const response = await axios.delete(
        `http://localhost:5000/api/jobs/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setJobs((previousJobs) =>
        previousJobs.filter((job) => job._id !== id)
      );

      showMessage(
        "success",
        response.data.message ||
          "Job deleted successfully."
      );
    } catch (error) {
      showMessage(
        "error",
        error.response?.data?.message ||
          "Delete failed."
      );
    }
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#f7f9fc]">
      {/* =========================
          TOAST
      ========================= */}
      {message.text && (
        <div
          className={`fixed top-24 right-5 z-50 flex max-w-[calc(100vw-40px)] items-center gap-3 rounded-xl border bg-white px-5 py-4 shadow-xl ${
            message.type === "success"
              ? "border-emerald-200 text-emerald-700"
              : "border-red-200 text-red-700"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle2
              size={19}
              className="shrink-0"
            />
          ) : (
            <XCircle
              size={19}
              className="shrink-0"
            />
          )}

          <span className="text-sm font-medium">
            {message.text}
          </span>
        </div>
      )}

      {/* =========================
          PAGE HEADER
      ========================= */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 sm:py-12 lg:px-10">
          <div className="flex flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Recruiter Dashboard
              </h1>

              <p className="mt-3 max-w-xl text-base leading-7 text-slate-500">
                Manage your job listings and review candidates
                from one place.
              </p>
            </div>

            <Link
              to="/post-job"
              className="inline-flex w-fit items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              <Plus size={18} />
              Post New Job
            </Link>
          </div>
        </div>
      </section>

      {/* =========================
          MAIN CONTENT
      ========================= */}
      <main className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14">
        {/* =========================
            STATS
        ========================= */}
        <section>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {/* JOBS POSTED */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Jobs Posted
                  </p>

                  <h2 className="mt-3 text-3xl font-bold text-slate-900">
                    {jobs.length}
                  </h2>
                </div>

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                  <BriefcaseBusiness
                    size={21}
                    className="text-blue-600"
                  />
                </div>
              </div>

              <p className="mt-5 text-xs text-slate-400">
                Total job listings
              </p>
            </div>

            {/* ACTIVE JOBS */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Active Jobs
                  </p>

                  <h2 className="mt-3 text-3xl font-bold text-emerald-600">
                    {jobs.length}
                  </h2>
                </div>

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50">
                  <CheckCircle2
                    size={21}
                    className="text-emerald-600"
                  />
                </div>
              </div>

              <p className="mt-5 text-xs text-slate-400">
                Currently available
              </p>
            </div>

            {/* APPLICANTS */}
            <Link
              to="/applicants"
              className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-purple-200 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Applicants
                  </p>

                  <h2 className="mt-3 text-3xl font-bold text-purple-600">
                    —
                  </h2>
                </div>

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-50">
                  <Users
                    size={21}
                    className="text-purple-600"
                  />
                </div>
              </div>

              <p className="mt-5 flex items-center gap-1 text-xs text-slate-400">
                View applicants
                <ArrowRight
                  size={13}
                  className="transition group-hover:translate-x-1"
                />
              </p>
            </Link>

            {/* RECRUITMENT STATUS */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Recruitment
                  </p>

                  <h2 className="mt-3 text-2xl font-bold text-slate-900">
                    Active
                  </h2>
                </div>

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50">
                  <Users
                    size={21}
                    className="text-orange-500"
                  />
                </div>
              </div>

              <p className="mt-5 text-xs text-slate-400">
                Your hiring workspace
              </p>
            </div>
          </div>
        </section>

        {/* =========================
            QUICK ACTIONS
        ========================= */}
        <section className="mt-16">
          <div className="mb-7">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Quick actions
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Complete your recruitment tasks quickly.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {/* POST JOB */}
            <Link
              to="/post-job"
              className="group rounded-2xl border border-slate-200 bg-white p-7 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                <Plus
                  size={23}
                  className="text-blue-600"
                />
              </div>

              <h3 className="mt-6 text-lg font-bold text-slate-900">
                Post a New Job
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Create a job listing and reach qualified
                candidates.
              </p>

              <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-blue-600">
                Create Listing
                <ArrowRight
                  size={16}
                  className="transition group-hover:translate-x-1"
                />
              </div>
            </Link>

            {/* APPLICANTS */}
            <Link
              to="/applicants"
              className="group rounded-2xl border border-slate-200 bg-white p-7 transition hover:-translate-y-1 hover:border-purple-200 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50">
                <Users
                  size={22}
                  className="text-purple-600"
                />
              </div>

              <h3 className="mt-6 text-lg font-bold text-slate-900">
                Review Applicants
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Review applications and manage your hiring
                decisions.
              </p>

              <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-purple-600">
                View Applicants
                <ArrowRight
                  size={16}
                  className="transition group-hover:translate-x-1"
                />
              </div>
            </Link>

            {/* BROWSE JOBS */}
            <Link
              to="/jobs"
              className="group rounded-2xl border border-slate-200 bg-white p-7 transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50">
                <Search
                  size={22}
                  className="text-emerald-600"
                />
              </div>

              <h3 className="mt-6 text-lg font-bold text-slate-900">
                Browse Job Market
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Explore current opportunities and understand
                the job market.
              </p>

              <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-emerald-600">
                Browse Jobs
                <ArrowRight
                  size={16}
                  className="transition group-hover:translate-x-1"
                />
              </div>
            </Link>
          </div>
        </section>

        {/* =========================
            JOB LISTINGS
        ========================= */}
        <section className="mt-16">
          <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Your Job Listings
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                {loading
                  ? "Loading your listings..."
                  : `${jobs.length} listing${
                      jobs.length !== 1 ? "s" : ""
                    } available`}
              </p>
            </div>

            <Link
              to="/post-job"
              className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
            >
              <Plus size={17} />
              Post another job
            </Link>
          </div>

          {/* LOADING */}
          {loading ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-slate-200 bg-white p-6 animate-pulse"
                >
                  <div className="flex justify-between">
                    <div className="h-12 w-12 rounded-xl bg-slate-200" />
                    <div className="h-6 w-16 rounded-lg bg-slate-200" />
                  </div>

                  <div className="mt-7 h-6 w-4/5 rounded bg-slate-200" />
                  <div className="mt-3 h-4 w-1/2 rounded bg-slate-200" />

                  <div className="mt-7 space-y-4">
                    <div className="h-4 w-3/4 rounded bg-slate-200" />
                    <div className="h-4 w-2/3 rounded bg-slate-200" />
                    <div className="h-4 w-1/2 rounded bg-slate-200" />
                  </div>

                  <div className="mt-7 h-12 rounded bg-slate-200" />
                  <div className="mt-7 h-10 rounded bg-slate-200" />
                </div>
              ))}
            </div>
          ) : jobs.length === 0 ? (
            /* EMPTY STATE */
            <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center sm:px-10">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50">
                <BriefcaseBusiness
                  size={30}
                  className="text-blue-600"
                />
              </div>

              <h3 className="mt-6 text-xl font-bold text-slate-900">
                No jobs posted yet
              </h3>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
                Create your first job listing to start
                connecting with potential candidates.
              </p>

              <Link
                to="/post-job"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                <Plus size={18} />
                Post Your First Job
              </Link>
            </div>
          ) : (
            /* JOB CARDS */
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {jobs.map((job) => (
                <article
                  key={job._id}
                  className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
                >
                  {/* CARD BODY */}
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                        <BriefcaseBusiness
                          size={22}
                          className="text-blue-600"
                        />
                      </div>

                      <span className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-emerald-50 px-2.5 py-1.5 text-xs font-semibold text-emerald-700">
                        <CheckCircle2 size={13} />
                        Active
                      </span>
                    </div>

                    <h3 className="mt-6 line-clamp-2 text-xl font-bold leading-snug text-slate-900">
                      {job.title}
                    </h3>

                    <div className="mt-3 flex min-w-0 items-center gap-2 text-sm text-slate-500">
                      <Building2
                        size={16}
                        className="shrink-0"
                      />

                      <span className="truncate">
                        {job.company || "Company"}
                      </span>
                    </div>

                    <div className="mt-6 space-y-4">
                      <div className="flex min-w-0 items-center gap-2 text-sm text-slate-500">
                        <MapPin
                          size={17}
                          className="shrink-0 text-slate-400"
                        />

                        <span className="truncate">
                          {job.location ||
                            "Location not specified"}
                        </span>
                      </div>

                      <div className="flex min-w-0 items-center gap-2 text-sm text-slate-500">
                        <IndianRupee
                          size={17}
                          className="shrink-0 text-slate-400"
                        />

                        <span className="truncate">
                          {job.salary ||
                            "Salary not disclosed"}
                        </span>
                      </div>

                      <div className="flex min-w-0 items-center gap-2 text-sm text-slate-500">
                        <BriefcaseBusiness
                          size={17}
                          className="shrink-0 text-slate-400"
                        />

                        <span className="truncate">
                          {job.jobType || "Full Time"}
                        </span>
                      </div>
                    </div>

                    <p className="mt-6 line-clamp-3 text-sm leading-6 text-slate-500">
                      {job.description ||
                        "No job description has been provided."}
                    </p>
                  </div>

                  {/* CARD ACTIONS */}
                  <div className="border-t border-slate-100 p-5">
                    <div className="grid grid-cols-3 gap-2">
                      <Link
                        to={`/edit-job/${job._id}`}
                        className="flex h-10 min-w-0 items-center justify-center gap-1 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 transition hover:border-amber-200 hover:bg-amber-50 hover:text-amber-700 sm:text-sm"
                      >
                        <Pencil size={15} />
                        Edit
                      </Link>

                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(job._id)
                        }
                        className="flex h-10 min-w-0 items-center justify-center gap-1 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 sm:text-sm"
                      >
                        <Trash2 size={15} />
                        Delete
                      </button>

                      <Link
                        to="/applicants"
                        className="flex h-10 min-w-0 items-center justify-center gap-1 rounded-xl bg-blue-600 text-xs font-semibold text-white transition hover:bg-blue-700 sm:text-sm"
                      >
                        <Users size={15} />
                        View
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default RecruiterDashboard;