import { useEffect, useState } from "react";
import axios from "axios";

import {
  Users,
  BriefcaseBusiness,
  Building2,
  Mail,
  FileText,
  CheckCircle2,
  XCircle,
  Clock3,
  MapPin,
  IndianRupee,
  ArrowRight,
  Search,
  Sparkles,
} from "lucide-react";

function Applicants() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  useEffect(() => {
    fetchApplicants();
  }, []);

  // =========================
  // FETCH APPLICANTS
  // =========================

  const fetchApplicants = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      if (!token) {
        setApplications([]);
        return;
      }

      const res = await axios.get(
        "http://localhost:5000/api/applications/recruiter",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setApplications(res.data);
    } catch (error) {
      console.log(error);

      showMessage(
        "error",
        error.response?.data?.message ||
          "Unable to load applicants."
      );
    } finally {
      setLoading(false);
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
  // UPDATE STATUS
  // =========================

  const updateStatus = async (id, status) => {
    try {
      setUpdating(id);

      const token = localStorage.getItem("token");

      const res = await axios.put(
        `http://localhost:5000/api/applications/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setApplications((prev) =>
        prev.map((app) =>
          app._id === id
            ? { ...app, status }
            : app
        )
      );

      showMessage(
        "success",
        res.data.message ||
          `Application ${status.toLowerCase()}.`
      );
    } catch (error) {
      showMessage(
        "error",
        error.response?.data?.message ||
          "Something went wrong."
      );
    } finally {
      setUpdating(null);
    }
  };

  // =========================
  // STATUS STYLE
  // =========================

  const getStatusStyle = (status) => {
    if (status === "Accepted") {
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    }

    if (status === "Rejected") {
      return "bg-red-50 text-red-700 border-red-200";
    }

    return "bg-amber-50 text-amber-700 border-amber-200";
  };

  const getStatusIcon = (status) => {
    if (status === "Accepted") {
      return <CheckCircle2 size={15} />;
    }

    if (status === "Rejected") {
      return <XCircle size={15} />;
    }

    return <Clock3 size={15} />;
  };

  // =========================
  // FILTER
  // =========================

  const filteredApplications = applications.filter(
    (app) => {
      const candidateName =
        app.userId?.name?.toLowerCase() || "";

      const email =
        app.userId?.email?.toLowerCase() || "";

      const jobTitle =
        app.jobId?.title?.toLowerCase() || "";

      const searchText = search.toLowerCase();

      const matchesSearch =
        candidateName.includes(searchText) ||
        email.includes(searchText) ||
        jobTitle.includes(searchText);

      const matchesFilter =
        filter === "All" ||
        app.status === filter;

      return matchesSearch && matchesFilter;
    }
  );

  const totalApplicants = applications.length;

  const pendingApplicants = applications.filter(
    (app) => app.status === "Pending"
  ).length;

  const acceptedApplicants = applications.filter(
    (app) => app.status === "Accepted"
  ).length;

  const rejectedApplicants = applications.filter(
    (app) => app.status === "Rejected"
  ).length;

  return (
    <div className="min-h-screen bg-slate-50">

      {/* =========================
          MESSAGE
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

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-7">

            <div>

              <div className="inline-flex items-center gap-2 text-blue-400 text-sm font-bold uppercase tracking-wider">
                <Sparkles size={16} />
                Talent management
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mt-3">
                Applicants
              </h1>

              <p className="text-slate-400 text-base sm:text-lg mt-3 max-w-2xl">
                Review candidates, evaluate applications,
                and make confident hiring decisions.
              </p>

            </div>

            <div className="w-14 h-14 rounded-2xl bg-blue-600/20 border border-blue-500/20 flex items-center justify-center">
              <Users
                size={28}
                className="text-blue-400"
              />
            </div>

          </div>

        </div>

      </section>

      {/* =========================
          MAIN
      ========================= */}

      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-10">

        {/* =========================
            STATS
        ========================= */}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">

          <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 hover:shadow-lg hover:-translate-y-1 transition-all">

            <div className="flex items-start justify-between">

              <div>

                <p className="text-sm font-semibold text-slate-500">
                  Total Applicants
                </p>

                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2">
                  {totalApplicants}
                </h2>

              </div>

              <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                <Users
                  size={21}
                  className="text-blue-600"
                />
              </div>

            </div>

          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 hover:shadow-lg hover:-translate-y-1 transition-all">

            <div className="flex items-start justify-between">

              <div>

                <p className="text-sm font-semibold text-slate-500">
                  Pending Review
                </p>

                <h2 className="text-3xl sm:text-4xl font-black text-amber-600 mt-2">
                  {pendingApplicants}
                </h2>

              </div>

              <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center">
                <Clock3
                  size={21}
                  className="text-amber-600"
                />
              </div>

            </div>

          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 hover:shadow-lg hover:-translate-y-1 transition-all">

            <div className="flex items-start justify-between">

              <div>

                <p className="text-sm font-semibold text-slate-500">
                  Accepted
                </p>

                <h2 className="text-3xl sm:text-4xl font-black text-emerald-600 mt-2">
                  {acceptedApplicants}
                </h2>

              </div>

              <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center">
                <CheckCircle2
                  size={21}
                  className="text-emerald-600"
                />
              </div>

            </div>

          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 hover:shadow-lg hover:-translate-y-1 transition-all">

            <div className="flex items-start justify-between">

              <div>

                <p className="text-sm font-semibold text-slate-500">
                  Rejected
                </p>

                <h2 className="text-3xl sm:text-4xl font-black text-red-600 mt-2">
                  {rejectedApplicants}
                </h2>

              </div>

              <div className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center">
                <XCircle
                  size={21}
                  className="text-red-600"
                />
              </div>

            </div>

          </div>

        </div>

        {/* =========================
            SEARCH + FILTER
        ========================= */}

        <section className="mt-10">

          <div className="bg-white border border-slate-200 rounded-2xl p-4">

            <div className="flex flex-col lg:flex-row gap-3">

              <div className="relative flex-1">

                <Search
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Search candidate, email or job title..."
                  className="w-full h-12 pl-11 pr-4 rounded-xl border border-slate-200 bg-slate-50 outline-none text-sm focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                />

              </div>

              <div className="flex flex-wrap gap-2">

                {["All", "Pending", "Accepted", "Rejected"].map(
                  (status) => (
                    <button
                      key={status}
                      onClick={() => setFilter(status)}
                      className={`px-4 h-12 rounded-xl text-sm font-bold border transition ${
                        filter === status
                          ? "bg-blue-600 border-blue-600 text-white"
                          : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {status}
                    </button>
                  )
                )}

              </div>

            </div>

          </div>

        </section>

        {/* =========================
            APPLICANTS
        ========================= */}

        <section className="mt-8">

          <div className="flex items-end justify-between mb-5">

            <div>

              <p className="text-sm text-blue-600 font-bold uppercase tracking-wider">
                Candidate pipeline
              </p>

              <h2 className="text-2xl font-black text-slate-900 mt-1">
                Candidate Applications
              </h2>

            </div>

            {!loading && (
              <span className="text-sm text-slate-500">
                {filteredApplications.length} result
                {filteredApplications.length !== 1
                  ? "s"
                  : ""}
              </span>
            )}

          </div>

          {loading ? (

            <div className="space-y-5">

              {[1, 2, 3].map((item) => (

                <div
                  key={item}
                  className="bg-white border border-slate-200 rounded-2xl p-7 animate-pulse"
                >

                  <div className="flex gap-4">

                    <div className="w-14 h-14 rounded-xl bg-slate-200"></div>

                    <div className="flex-1">

                      <div className="h-5 bg-slate-200 rounded w-1/3"></div>

                      <div className="h-4 bg-slate-200 rounded w-1/2 mt-3"></div>

                    </div>

                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mt-7">

                    <div className="h-20 bg-slate-100 rounded-xl"></div>

                    <div className="h-20 bg-slate-100 rounded-xl"></div>

                  </div>

                </div>

              ))}

            </div>

          ) : filteredApplications.length === 0 ? (

            <div className="bg-white border border-slate-200 rounded-3xl p-12 sm:p-16 text-center">

              <div className="w-20 h-20 rounded-2xl bg-blue-50 mx-auto flex items-center justify-center">

                <Users
                  size={34}
                  className="text-blue-600"
                />

              </div>

              <h3 className="text-2xl font-black text-slate-900 mt-6">
                No applicants found
              </h3>

              <p className="text-slate-500 mt-2 max-w-md mx-auto leading-7">
                Try changing your search or filter to find
                candidate applications.
              </p>

            </div>

          ) : (

            <div className="space-y-5">

              {filteredApplications.map((app) => {

                const status =
                  app.status || "Pending";

                return (

                  <article
                    key={app._id}
                    className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-blue-200 hover:shadow-xl transition-all duration-300"
                  >

                    {/* Job Header */}

                    <div className="bg-slate-950 text-white p-5 sm:p-6">

                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                        <div>

                          <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider">
                            <BriefcaseBusiness size={14} />
                            Application
                          </div>

                          <h3 className="text-xl sm:text-2xl font-black mt-2">
                            {app.jobId?.title ||
                              "Job Deleted"}
                          </h3>

                          <div className="flex items-center gap-2 text-slate-400 mt-2 text-sm">
                            <Building2 size={15} />
                            {app.jobId?.company || "-"}
                          </div>

                        </div>

                        <span
                          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-bold self-start md:self-auto ${getStatusStyle(
                            status
                          )}`}
                        >
                          {getStatusIcon(status)}
                          {status}
                        </span>

                      </div>

                    </div>

                    {/* Candidate */}

                    <div className="p-5 sm:p-7">

                      <div className="flex items-center gap-4 mb-6">

                        <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0">

                          <Users
                            size={24}
                            className="text-blue-600"
                          />

                        </div>

                        <div className="min-w-0">

                          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                            Candidate
                          </p>

                          <h4 className="text-xl font-black text-slate-900 truncate">
                            {app.userId?.name ||
                              "Unknown Candidate"}
                          </h4>

                        </div>

                      </div>

                      {/* Candidate Info */}

                      <div className="grid md:grid-cols-2 gap-4">

                        <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">

                          <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide mb-2">
                            Email
                          </p>

                          <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 break-all">

                            <Mail
                              size={16}
                              className="text-blue-600 shrink-0"
                            />

                            {app.userId?.email || "-"}

                          </div>

                        </div>

                        <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">

                          <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide mb-2">
                            Job Location
                          </p>

                          <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">

                            <MapPin
                              size={16}
                              className="text-blue-600 shrink-0"
                            />

                            {app.jobId?.location || "-"}

                          </div>

                        </div>

                        <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">

                          <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide mb-2">
                            Salary
                          </p>

                          <div className="flex items-center gap-2 text-sm font-semibold text-emerald-700">

                            <IndianRupee
                              size={16}
                              className="shrink-0"
                            />

                            {app.jobId?.salary ||
                              "Not disclosed"}

                          </div>

                        </div>

                        <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">

                          <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide mb-2">
                            Application Status
                          </p>

                          <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">

                            {getStatusIcon(status)}

                            {status}

                          </div>

                        </div>

                      </div>

                      {/* Resume */}

                      <div className="mt-6">

                        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-3">
                          Candidate Resume
                        </p>

                        {app.userId?.resume ? (

                          <a
                            href={`http://localhost:5000/uploads/${app.userId.resume}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold transition shadow-md"
                          >

                            <FileText size={17} />

                            View Resume

                            <ArrowRight size={15} />

                          </a>

                        ) : (

                          <div className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-bold">

                            <XCircle size={17} />

                            Resume Not Uploaded

                          </div>

                        )}

                      </div>

                      {/* Actions */}

                      <div className="border-t border-slate-100 mt-7 pt-6">

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

                          <div>

                            <p className="text-sm font-bold text-slate-700">
                              Application Decision
                            </p>

                            <p className="text-xs text-slate-400 mt-1">
                              Review the candidate before making a decision.
                            </p>

                          </div>

                          <div className="flex gap-2">

                            <button
                              onClick={() =>
                                updateStatus(
                                  app._id,
                                  "Accepted"
                                )
                              }
                              disabled={
                                updating === app._id
                              }
                              className="h-11 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-2 text-sm font-bold transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >

                              <CheckCircle2 size={17} />

                              {updating === app._id
                                ? "Updating..."
                                : "Accept"}

                            </button>

                            <button
                              onClick={() =>
                                updateStatus(
                                  app._id,
                                  "Rejected"
                                )
                              }
                              disabled={
                                updating === app._id
                              }
                              className="h-11 px-5 rounded-xl bg-red-600 hover:bg-red-700 text-white flex items-center justify-center gap-2 text-sm font-bold transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >

                              <XCircle size={17} />

                              {updating === app._id
                                ? "Updating..."
                                : "Reject"}

                            </button>

                          </div>

                        </div>

                      </div>

                    </div>

                  </article>

                );
              })}

            </div>

          )}

        </section>

      </main>

    </div>
  );
}

export default Applicants;