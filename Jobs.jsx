import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";

import {
  Search,
  MapPin,
  Building2,
  BriefcaseBusiness,
  IndianRupee,
  Heart,
  ArrowRight,
  SlidersHorizontal,
  X,
  ChevronDown,
  Clock3,
  CheckCircle2,
} from "lucide-react";

function Jobs() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [jobs, setJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);

  const [loading, setLoading] = useState(true);
  const [savingJob, setSavingJob] = useState(null);
  const [applyingJob, setApplyingJob] = useState(null);

  const [search, setSearch] = useState(
    searchParams.get("keyword") || ""
  );

  const [location, setLocation] = useState(
    searchParams.get("location") || "All"
  );

  const [jobType, setJobType] = useState(
    searchParams.get("jobType") || "All"
  );

  const [sortBy, setSortBy] = useState("latest");

  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  // =====================================================
  // FETCH JOBS
  // =====================================================

  useEffect(() => {
    fetchJobs();
  }, [searchParams]);

  const fetchJobs = async () => {
    try {
      setLoading(true);

      const keyword = searchParams.get("keyword") || "";
      const selectedLocation =
        searchParams.get("location") || "";
      const selectedJobType =
        searchParams.get("jobType") || "All";

      const res = await axios.get(
        "http://localhost:5000/api/jobs",
        {
          params: {
            keyword,
            location: selectedLocation,
            jobType: selectedJobType,
          },
        }
      );

      setJobs(res.data);
    } catch (error) {
      console.log("Unable to fetch jobs", error);

      showMessage(
        "error",
        "Unable to load jobs. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // FETCH SAVED JOBS
  // =====================================================

  useEffect(() => {
    fetchSavedJobs();
  }, []);

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

      const ids = res.data.map((job) => job._id);

      setSavedJobs(ids);
    } catch (error) {
      console.log("Unable to fetch saved jobs", error);
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
  // SEARCH / FILTER
  // =====================================================

  const applyFilters = () => {
    const params = {};

    if (search.trim()) {
      params.keyword = search.trim();
    }

    if (location !== "All") {
      params.location = location;
    }

    if (jobType !== "All") {
      params.jobType = jobType;
    }

    setSearchParams(params);
  };

  const clearFilters = () => {
    setSearch("");
    setLocation("All");
    setJobType("All");
    setSortBy("latest");

    setSearchParams({});
  };

  // =====================================================
  // ENTER SEARCH
  // =====================================================

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      applyFilters();
    }
  };

  // =====================================================
  // SAVE / UNSAVE JOB
  // =====================================================

  const handleSaveJob = async (jobId) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        showMessage(
          "error",
          "Please login to save jobs."
        );
        return;
      }

      setSavingJob(jobId);

      if (savedJobs.includes(jobId)) {
        await axios.delete(
          `http://localhost:5000/api/auth/saved-jobs/${jobId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setSavedJobs((prev) =>
          prev.filter((id) => id !== jobId)
        );

        showMessage(
          "success",
          "Job removed from saved jobs."
        );
      } else {
        await axios.post(
          `http://localhost:5000/api/auth/save-job/${jobId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setSavedJobs((prev) => [...prev, jobId]);

        showMessage(
          "success",
          "Job saved successfully."
        );
      }
    } catch (error) {
      showMessage(
        "error",
        error.response?.data?.message ||
          "Unable to update saved job."
      );
    } finally {
      setSavingJob(null);
    }
  };

  // =====================================================
  // APPLY JOB
  // =====================================================

  const handleApply = async (jobId) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        showMessage(
          "error",
          "Please login to apply for this job."
        );
        return;
      }

      setApplyingJob(jobId);

      const res = await axios.post(
        "http://localhost:5000/api/applications/apply",
        {
          jobId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      showMessage(
        "success",
        res.data.message || "Application submitted successfully."
      );
    } catch (error) {
      showMessage(
        "error",
        error.response?.data?.message ||
          "Application failed."
      );
    } finally {
      setApplyingJob(null);
    }
  };

  // =====================================================
  // SORT JOBS
  // =====================================================

  const sortedJobs = [...jobs].sort((a, b) => {
    if (sortBy === "salaryHigh") {
      const salaryA = parseInt(
        String(a.salary || "").replace(/\D/g, "")
      );

      const salaryB = parseInt(
        String(b.salary || "").replace(/\D/g, "")
      );

      return salaryB - salaryA;
    }

    if (sortBy === "salaryLow") {
      const salaryA = parseInt(
        String(a.salary || "").replace(/\D/g, "")
      );

      const salaryB = parseInt(
        String(b.salary || "").replace(/\D/g, "")
      );

      return salaryA - salaryB;
    }

    return 0;
  });

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {
    if (!date) return "Recently posted";

    const created = new Date(date);
    const now = new Date();

    const difference =
      now.getTime() - created.getTime();

    const days = Math.floor(
      difference / (1000 * 60 * 60 * 24)
    );

    if (days === 0) {
      return "Today";
    }

    if (days === 1) {
      return "1 day ago";
    }

    if (days < 30) {
      return `${days} days ago`;
    }

    return created.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // =====================================================
  // ACTIVE FILTER COUNT
  // =====================================================

  const activeFilters =
    (location !== "All" ? 1 : 0) +
    (jobType !== "All" ? 1 : 0);

  return (
    <div className="min-h-screen bg-slate-50">

      {/* =================================================
          TOP HEADER
      ================================================= */}

      <section className="bg-slate-950 text-white">

        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14">

          <div className="max-w-3xl">

            <div className="inline-flex items-center gap-2 text-blue-400 text-sm font-bold uppercase tracking-wider">
              <BriefcaseBusiness size={17} />
              Career opportunities
            </div>

            <h1 className="text-4xl sm:text-5xl font-black tracking-tight mt-3">
              Find your next opportunity
            </h1>

            <p className="text-slate-400 text-lg mt-4 leading-7">
              Search thousands of opportunities and find a role
              that matches your skills and career goals.
            </p>

          </div>

        </div>

      </section>


      {/* =================================================
          SEARCH AREA
      ================================================= */}

      <section className="relative -mt-7">

        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-4">

            <div className="grid lg:grid-cols-[1.5fr_1fr_1fr_auto] gap-3">

              {/* SEARCH */}

              <div className="relative">

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
                  onKeyDown={handleSearchKeyDown}
                  placeholder="Job title, skills or company"
                  className="w-full h-12 pl-11 pr-4 rounded-xl border border-slate-200 bg-slate-50 outline-none text-sm focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                />

              </div>


              {/* LOCATION */}

              <div className="relative">

                <MapPin
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />

                <select
                  value={location}
                  onChange={(e) =>
                    setLocation(e.target.value)
                  }
                  className="appearance-none w-full h-12 pl-11 pr-10 rounded-xl border border-slate-200 bg-slate-50 outline-none text-sm focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition cursor-pointer"
                >
                  <option value="All">
                    All Locations
                  </option>
                  <option value="Mumbai">
                    Mumbai
                  </option>
                  <option value="Pune">
                    Pune
                  </option>
                  <option value="Delhi">
                    Delhi
                  </option>
                  <option value="Bangalore">
                    Bangalore
                  </option>
                  <option value="Hyderabad">
                    Hyderabad
                  </option>
                </select>

                <ChevronDown
                  size={17}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />

              </div>


              {/* JOB TYPE */}

              <div className="relative">

                <BriefcaseBusiness
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />

                <select
                  value={jobType}
                  onChange={(e) =>
                    setJobType(e.target.value)
                  }
                  className="appearance-none w-full h-12 pl-11 pr-10 rounded-xl border border-slate-200 bg-slate-50 outline-none text-sm focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition cursor-pointer"
                >
                  <option value="All">
                    All Job Types
                  </option>
                  <option value="Full Time">
                    Full Time
                  </option>
                  <option value="Part Time">
                    Part Time
                  </option>
                  <option value="Internship">
                    Internship
                  </option>
                  <option value="Remote">
                    Remote
                  </option>
                </select>

                <ChevronDown
                  size={17}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />

              </div>


              {/* SEARCH BUTTON */}

              <button
                onClick={applyFilters}
                className="h-12 px-7 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center justify-center gap-2 transition shadow-md"
              >
                <Search size={18} />
                Search
              </button>

            </div>


            {/* FILTER FOOTER */}

            <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-4 border-t border-slate-100">

              <div className="flex items-center gap-2 text-sm text-slate-500">

                <SlidersHorizontal size={16} />

                {activeFilters > 0 ? (
                  <span>
                    {activeFilters} filter
                    {activeFilters > 1 ? "s" : ""} applied
                  </span>
                ) : (
                  <span>
                    Refine your job search
                  </span>
                )}

              </div>


              {(search ||
                location !== "All" ||
                jobType !== "All") && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-red-600 transition"
                >
                  <X size={15} />
                  Clear filters
                </button>
              )}

            </div>

          </div>

        </div>

      </section>


      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-12">

        {/* MESSAGE */}

        {message.text && (
          <div
            className={`fixed top-24 right-5 z-[60] max-w-sm flex items-center gap-3 px-5 py-4 rounded-xl shadow-2xl border ${
              message.type === "success"
                ? "bg-white border-green-200 text-green-700"
                : "bg-white border-red-200 text-red-700"
            }`}
          >

            {message.type === "success" ? (
              <CheckCircle2 size={20} />
            ) : (
              <X size={20} />
            )}

            <p className="text-sm font-semibold">
              {message.text}
            </p>

          </div>
        )}


        {/* TOOLBAR */}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">

          <div>

            <h2 className="text-2xl font-black text-slate-900">
              {loading
                ? "Finding jobs..."
                : `${jobs.length} ${
                    jobs.length === 1
                      ? "job"
                      : "jobs"
                  } found`}
            </h2>

            {!loading && (
              <p className="text-sm text-slate-500 mt-1">
                Showing opportunities that match your search.
              </p>
            )}

          </div>


          {!loading && jobs.length > 0 && (

            <div className="flex items-center gap-2">

              <span className="text-sm text-slate-500">
                Sort by
              </span>

              <div className="relative">

                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(e.target.value)
                  }
                  className="appearance-none bg-white border border-slate-200 rounded-xl pl-4 pr-9 py-2.5 text-sm font-semibold text-slate-700 outline-none focus:border-blue-500 cursor-pointer"
                >
                  <option value="latest">
                    Latest
                  </option>

                  <option value="salaryHigh">
                    Salary: High to Low
                  </option>

                  <option value="salaryLow">
                    Salary: Low to High
                  </option>
                </select>

                <ChevronDown
                  size={15}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />

              </div>

            </div>

          )}

        </div>


        {/* =================================================
            LOADING
        ================================================= */}

        {loading ? (

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {[1, 2, 3, 4, 5, 6].map((item) => (

              <div
                key={item}
                className="bg-white border border-slate-200 rounded-2xl p-6 animate-pulse"
              >

                <div className="flex justify-between">

                  <div className="w-12 h-12 rounded-xl bg-slate-200"></div>

                  <div className="w-9 h-9 rounded-full bg-slate-200"></div>

                </div>

                <div className="h-6 bg-slate-200 rounded mt-6 w-3/4"></div>

                <div className="h-4 bg-slate-200 rounded mt-3 w-1/2"></div>

                <div className="space-y-3 mt-6">

                  <div className="h-4 bg-slate-200 rounded w-2/3"></div>

                  <div className="h-4 bg-slate-200 rounded w-1/2"></div>

                </div>

                <div className="h-10 bg-slate-200 rounded-xl mt-7"></div>

              </div>

            ))}

          </div>

        ) : jobs.length === 0 ? (

          /* =================================================
             EMPTY STATE
          ================================================= */

          <div className="bg-white border border-slate-200 rounded-3xl p-12 sm:p-16 text-center">

            <div className="w-20 h-20 mx-auto rounded-2xl bg-blue-50 flex items-center justify-center">
              <Search
                size={34}
                className="text-blue-500"
              />
            </div>

            <h3 className="text-2xl font-black text-slate-900 mt-6">
              No jobs found
            </h3>

            <p className="text-slate-500 max-w-md mx-auto mt-3 leading-7">
              We couldn't find any opportunities matching
              your current search. Try different keywords
              or remove some filters.
            </p>

            <button
              onClick={clearFilters}
              className="mt-7 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-bold transition"
            >
              Clear search
              <ArrowRight size={17} />
            </button>

          </div>

        ) : (

          /* =================================================
             JOB GRID
          ================================================= */

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {sortedJobs.map((job) => (

              <article
                key={job._id}
                className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-blue-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >

                {/* TOP */}

                <div className="p-6">

                  <div className="flex items-start justify-between gap-4">

                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-600 transition-colors">

                      <Building2
                        size={22}
                        className="text-blue-600 group-hover:text-white transition-colors"
                      />

                    </div>


                    <button
                      onClick={() =>
                        handleSaveJob(job._id)
                      }
                      disabled={
                        savingJob === job._id
                      }
                      title={
                        savedJobs.includes(job._id)
                          ? "Remove from saved jobs"
                          : "Save job"
                      }
                      className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center hover:border-red-200 hover:bg-red-50 transition disabled:opacity-50"
                    >

                      <Heart
                        size={19}
                        className={
                          savedJobs.includes(job._id)
                            ? "fill-red-500 text-red-500"
                            : "text-slate-400 group-hover:text-red-400"
                        }
                      />

                    </button>

                  </div>


                  {/* JOB TITLE */}

                  <Link
                    to={`/job/${job._id}`}
                    className="block mt-6"
                  >

                    <h3 className="text-xl font-black text-slate-900 group-hover:text-blue-600 transition line-clamp-2">
                      {job.title}
                    </h3>

                  </Link>


                  {/* COMPANY */}

                  <div className="flex items-center gap-2 mt-2 text-slate-500">

                    <Building2 size={16} />

                    <span className="text-sm font-medium truncate">
                      {job.company}
                    </span>

                  </div>


                  {/* INFO */}

                  <div className="space-y-3 mt-6">

                    <div className="flex items-center gap-2 text-sm text-slate-500">

                      <MapPin
                        size={17}
                        className="text-slate-400 shrink-0"
                      />

                      <span className="truncate">
                        {job.location ||
                          "Location not specified"}
                      </span>

                    </div>


                    <div className="flex items-center gap-2 text-sm text-slate-500">

                      <IndianRupee
                        size={17}
                        className="text-slate-400 shrink-0"
                      />

                      <span className="truncate">
                        {job.salary ||
                          "Salary not disclosed"}
                      </span>

                    </div>

                  </div>


                  {/* TAGS */}

                  <div className="flex flex-wrap items-center gap-2 mt-6">

                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 text-xs font-bold">

                      <BriefcaseBusiness size={14} />

                      {job.jobType || "Full Time"}

                    </span>


                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 text-xs font-semibold">

                      <Clock3 size={14} />

                      {formatDate(job.createdAt)}

                    </span>

                  </div>


                  {/* DESCRIPTION */}

                  <p className="text-sm text-slate-500 leading-6 mt-6 line-clamp-3">
                    {job.description ||
                      "Explore this opportunity and learn more about the role, requirements and responsibilities."}
                  </p>

                </div>


                {/* BOTTOM */}

                <div className="border-t border-slate-100 p-5 flex items-center gap-3">

                  <Link
                    to={`/job/${job._id}`}
                    className="flex-1 h-11 rounded-xl border border-slate-200 text-slate-700 font-bold text-sm flex items-center justify-center gap-2 hover:bg-slate-50 transition"
                  >
                    View Details
                    <ArrowRight size={16} />
                  </Link>


                  <button
                    onClick={() =>
                      handleApply(job._id)
                    }
                    disabled={
                      applyingJob === job._id
                    }
                    className="flex-1 h-11 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm flex items-center justify-center gap-2 transition disabled:opacity-60 disabled:cursor-not-allowed"
                  >

                    {applyingJob === job._id ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
                        Applying
                      </>
                    ) : (
                      <>
                        Apply
                        <ArrowRight size={16} />
                      </>
                    )}

                  </button>

                </div>

              </article>

            ))}

          </div>

        )}

      </main>

    </div>
  );
}

export default Jobs;