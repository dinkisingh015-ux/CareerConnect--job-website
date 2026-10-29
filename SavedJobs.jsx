import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Heart,
  Building2,
  MapPin,
  IndianRupee,
  BriefcaseBusiness,
  Trash2,
  ArrowRight,
  Search,
  BookmarkCheck,
  Sparkles,
} from "lucide-react";

function SavedJobs() {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState(null);

  useEffect(() => {
    fetchSavedJobs();
  }, []);

  const fetchSavedJobs = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/auth/saved-jobs",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setJobs(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const removeSavedJob = async (jobId) => {
    try {
      setRemovingId(jobId);

      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/auth/saved-jobs/${jobId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setJobs((prev) =>
        prev.filter((job) => job._id !== jobId)
      );
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Unable to remove saved job"
      );
    } finally {
      setRemovingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-slate-950 text-white">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(236,72,153,0.18),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.15),transparent_35%)]"></div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-14 md:py-16">

          <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/10 border border-white/10 text-pink-300 text-sm font-medium">
            <BookmarkCheck size={16} />
            Your saved opportunities
          </div>

          <div className="mt-6 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">

            <div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight">
                Saved Jobs
              </h1>

              <p className="mt-4 text-slate-400 text-lg max-w-2xl leading-relaxed">
                Keep track of the opportunities you love and come back
                whenever you're ready to apply.
              </p>
            </div>

            <button
              onClick={() => navigate("/jobs")}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-slate-950 font-bold hover:bg-slate-100 transition w-fit"
            >
              <Search size={18} />
              Find More Jobs
            </button>

          </div>

          {/* Stats */}
          <div className="mt-10 flex items-center gap-3">

            <div className="w-11 h-11 rounded-xl bg-pink-500/15 border border-pink-400/10 flex items-center justify-center">
              <Heart
                size={21}
                className="text-pink-400 fill-pink-400"
              />
            </div>

            <div>
              <p className="text-2xl font-bold">
                {jobs.length}
              </p>

              <p className="text-sm text-slate-500">
                {jobs.length === 1
                  ? "Saved opportunity"
                  : "Saved opportunities"}
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-12">

        {loading ? (

          /* ================= LOADING ================= */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="bg-white border border-slate-200 rounded-3xl p-6 animate-pulse"
              >
                <div className="flex justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-slate-200"></div>
                  <div className="w-10 h-10 rounded-xl bg-slate-200"></div>
                </div>

                <div className="h-6 bg-slate-200 rounded mt-6 w-3/4"></div>

                <div className="h-4 bg-slate-200 rounded mt-3 w-1/2"></div>

                <div className="space-y-3 mt-7">
                  <div className="h-4 bg-slate-100 rounded"></div>
                  <div className="h-4 bg-slate-100 rounded"></div>
                  <div className="h-4 bg-slate-100 rounded"></div>
                </div>

                <div className="h-12 bg-slate-200 rounded-xl mt-7"></div>
              </div>
            ))}

          </div>

        ) : jobs.length === 0 ? (

          /* ================= EMPTY STATE ================= */
          <div className="min-h-[500px] flex items-center justify-center">

            <div className="text-center max-w-lg">

              <div className="relative mx-auto w-24 h-24">

                <div className="absolute inset-0 bg-pink-100 rounded-3xl rotate-6"></div>

                <div className="relative w-24 h-24 rounded-3xl bg-white border border-pink-100 shadow-sm flex items-center justify-center">
                  <Heart
                    size={42}
                    className="text-pink-400"
                  />
                </div>

              </div>

              <h2 className="text-3xl font-black text-slate-900 mt-8">
                No Saved Jobs Yet
              </h2>

              <p className="text-slate-500 mt-3 leading-relaxed">
                Your saved jobs will appear here. Explore available
                opportunities and save the ones you'd like to apply for later.
              </p>

              <button
                onClick={() => navigate("/jobs")}
                className="mt-7 inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-950 text-white font-bold hover:bg-slate-800 transition shadow-lg"
              >
                Explore Jobs
                <ArrowRight size={18} />
              </button>

            </div>

          </div>

        ) : (

          <>
            {/* Section Heading */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">

              <div>
                <p className="text-sm font-semibold text-pink-600 uppercase tracking-wider">
                  My Collection
                </p>

                <h2 className="text-2xl font-black text-slate-900 mt-1">
                  Opportunities you've saved
                </h2>
              </div>

              <div className="inline-flex items-center gap-2 text-sm text-slate-500">
                <Sparkles size={16} />
                Ready when you are
              </div>

            </div>

            {/* ================= JOB GRID ================= */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

              {jobs.map((job) => (

                <article
                  key={job._id}
                  className="group bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >

                  {/* Top */}
                  <div className="p-6">

                    <div className="flex items-start justify-between gap-4">

                      <div className="w-14 h-14 rounded-2xl bg-slate-950 flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition">
                        <Building2 size={25} />
                      </div>

                      <button
                        onClick={() =>
                          removeSavedJob(job._id)
                        }
                        disabled={removingId === job._id}
                        title="Remove saved job"
                        className="w-10 h-10 rounded-xl border border-slate-200 bg-white flex items-center justify-center hover:bg-red-50 hover:border-red-200 transition disabled:opacity-50"
                      >
                        {removingId === job._id ? (
                          <span className="w-4 h-4 border-2 border-slate-300 border-t-red-500 rounded-full animate-spin"></span>
                        ) : (
                          <Trash2
                            size={18}
                            className="text-slate-400 hover:text-red-500"
                          />
                        )}
                      </button>

                    </div>

                    {/* Title */}
                    <button
                      onClick={() =>
                        navigate(`/job/${job._id}`)
                      }
                      className="text-left w-full mt-6"
                    >
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition line-clamp-2">
                        {job.title}
                      </h3>

                      <p className="text-sm text-slate-500 mt-2 flex items-center gap-2">
                        <Building2 size={15} />
                        {job.company}
                      </p>
                    </button>

                    {/* Job Info */}
                    <div className="mt-6 space-y-3">

                      <div className="flex items-center gap-3 text-sm text-slate-600">
                        <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center">
                          <MapPin
                            size={16}
                            className="text-slate-500"
                          />
                        </div>

                        <span className="truncate">
                          {job.location}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 text-sm text-slate-600">
                        <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center">
                          <IndianRupee
                            size={16}
                            className="text-slate-500"
                          />
                        </div>

                        <span className="truncate">
                          {job.salary}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 text-sm text-slate-600">
                        <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center">
                          <BriefcaseBusiness
                            size={16}
                            className="text-slate-500"
                          />
                        </div>

                        <span>
                          {job.jobType}
                        </span>
                      </div>

                    </div>

                    {/* Description */}
                    <p className="text-sm text-slate-500 leading-6 mt-6 line-clamp-3">
                      {job.description}
                    </p>

                    {/* Buttons */}
                    <div className="grid grid-cols-[1fr_auto] gap-3 mt-7">

                      <button
                        onClick={() =>
                          navigate(`/job/${job._id}`)
                        }
                        className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-950 text-white font-semibold hover:bg-slate-800 transition"
                      >
                        View Job
                        <ArrowRight size={17} />
                      </button>

                      <button
                        onClick={() =>
                          navigate(`/job/${job._id}`)
                        }
                        title="Open job details"
                        className="w-12 rounded-xl border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition"
                      >
                        <BriefcaseBusiness
                          size={18}
                          className="text-slate-600"
                        />
                      </button>

                    </div>

                  </div>

                  {/* Bottom saved indicator */}
                  <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-slate-500">
                    <Heart
                      size={14}
                      className="text-pink-500 fill-pink-500"
                    />
                    Saved to your collection
                  </div>

                </article>

              ))}

            </div>
          </>
        )}

      </main>
    </div>
  );
}

export default SavedJobs;