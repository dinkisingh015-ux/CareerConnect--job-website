import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  BriefcaseBusiness,
  Building2,
  MapPin,
  IndianRupee,
  FileText,
  Clock3,
  Send,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

function PostJob() {
  const { id } = useParams();
  const navigate = useNavigate();

  const isEdit = !!id;

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
    jobType: "Full Time",
  });

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    if (isEdit) {
      fetchJob();
    }
  }, [id]);

  const fetchJob = async () => {
    try {
      setPageLoading(true);

      const token = localStorage.getItem("token");

      const res = await axios.get(
        `http://localhost:5000/api/jobs/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFormData({
        title: res.data.title || "",
        company: res.data.company || "",
        location: res.data.location || "",
        salary: res.data.salary || "",
        description: res.data.description || "",
        jobType: res.data.jobType || "Full Time",
      });
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to load job"
      );
    } finally {
      setPageLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      let res;

      if (isEdit) {
        res = await axios.put(
          `http://localhost:5000/api/jobs/${id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        res = await axios.post(
          "http://localhost:5000/api/jobs/create",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      alert(res.data.message);

      navigate("/recruiter");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">
            Loading job details...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Top Hero */}
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.25),transparent_35%)]"></div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-10">

          <button
            onClick={() => navigate("/recruiter")}
            className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition mb-8"
          >
            <ArrowLeft size={18} />
            Back to Dashboard
          </button>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-blue-300 text-sm font-medium mb-5">
                <Sparkles size={15} />
                Recruiter Workspace
              </div>

              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                {isEdit
                  ? "Edit Job Opportunity"
                  : "Post a New Job"}
              </h1>

              <p className="mt-4 max-w-2xl text-slate-400 text-lg leading-relaxed">
                {isEdit
                  ? "Update your job listing and keep your opportunity information accurate for candidates."
                  : "Create a professional job listing and connect with qualified candidates through CareerConnect."}
              </p>
            </div>

            <div className="hidden md:flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-5 py-4">
              <div className="w-11 h-11 rounded-xl bg-blue-500/15 flex items-center justify-center">
                <BriefcaseBusiness
                  size={22}
                  className="text-blue-400"
                />
              </div>

              <div>
                <p className="text-sm text-slate-400">
                  Listing status
                </p>
                <p className="font-semibold">
                  {isEdit ? "Editing" : "Ready to publish"}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-10">

        <div className="grid lg:grid-cols-[1fr_320px] gap-8">

          {/* Form */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">

            {/* Form Header */}
            <div className="px-7 md:px-9 py-7 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center">
                  <BriefcaseBusiness
                    size={22}
                    className="text-white"
                  />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Job Information
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    Fill in the details candidates need to know.
                  </p>
                </div>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="p-7 md:p-9 space-y-8"
            >

              {/* Basic Details */}
              <div>
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center">
                    <FileText
                      size={15}
                      className="text-blue-600"
                    />
                  </div>

                  <h3 className="font-bold text-slate-900">
                    Basic Details
                  </h3>
                </div>

                <div className="grid md:grid-cols-2 gap-5">

                  {/* Job Title */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Job Title
                    </label>

                    <div className="relative">
                      <BriefcaseBusiness
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        type="text"
                        name="title"
                        placeholder="e.g. Frontend Developer"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition"
                      />
                    </div>
                  </div>

                  {/* Company */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Company Name
                    </label>

                    <div className="relative">
                      <Building2
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        type="text"
                        name="company"
                        placeholder="e.g. TechNova Solutions"
                        value={formData.company}
                        onChange={handleChange}
                        required
                        className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition"
                      />
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Location
                    </label>

                    <div className="relative">
                      <MapPin
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        type="text"
                        name="location"
                        placeholder="e.g. Mumbai, Maharashtra"
                        value={formData.location}
                        onChange={handleChange}
                        required
                        className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition"
                      />
                    </div>
                  </div>

                  {/* Salary */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Salary Package
                    </label>

                    <div className="relative">
                      <IndianRupee
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        type="text"
                        name="salary"
                        placeholder="e.g. ₹4 - ₹6 LPA"
                        value={formData.salary}
                        onChange={handleChange}
                        required
                        className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition"
                      />
                    </div>
                  </div>

                  {/* Job Type */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Employment Type
                    </label>

                    <div className="relative">
                      <Clock3
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                      />

                      <select
                        name="jobType"
                        value={formData.jobType}
                        onChange={handleChange}
                        className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition appearance-none"
                      >
                        <option>Full Time</option>
                        <option>Part Time</option>
                        <option>Internship</option>
                        <option>Remote</option>
                      </select>
                    </div>
                  </div>

                </div>
              </div>

              {/* Description */}
              <div>
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center">
                    <FileText
                      size={15}
                      className="text-blue-600"
                    />
                  </div>

                  <h3 className="font-bold text-slate-900">
                    Job Description
                  </h3>
                </div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Description
                </label>

                <textarea
                  name="description"
                  placeholder="Describe the role, responsibilities, expectations and what makes this opportunity valuable..."
                  rows="9"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition resize-none leading-relaxed"
                />

                <p className="text-xs text-slate-400 mt-2">
                  A clear and detailed description helps candidates understand the opportunity better.
                </p>
              </div>

              {/* Coming Soon */}
              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0">
                    <Sparkles
                      size={18}
                      className="text-slate-500"
                    />
                  </div>

                  <div>
                    <h4 className="font-semibold text-slate-800">
                      Skills & Requirements
                    </h4>

                    <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                      Advanced skill and requirement management will be available in a future CareerConnect update.
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-3 border-t border-slate-200 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">

                <button
                  type="button"
                  onClick={() => navigate("/recruiter")}
                  className="px-6 py-3.5 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-slate-950 text-white font-semibold hover:bg-slate-800 transition disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-slate-900/10"
                >
                  {loading ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                      {isEdit ? "Updating..." : "Publishing..."}
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      {isEdit ? "Update Job" : "Publish Job"}
                    </>
                  )}
                </button>

              </div>

            </form>
          </div>

          {/* Right Sidebar */}
          <aside className="space-y-5">

            {/* Tips */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Sparkles
                    size={19}
                    className="text-blue-600"
                  />
                </div>

                <div>
                  <h3 className="font-bold text-slate-900">
                    Posting Tips
                  </h3>

                  <p className="text-xs text-slate-500">
                    Create a stronger listing
                  </p>
                </div>
              </div>

              <div className="space-y-4">

                <div className="flex gap-3">
                  <CheckCircle2
                    size={18}
                    className="text-emerald-500 shrink-0 mt-0.5"
                  />

                  <p className="text-sm text-slate-600 leading-relaxed">
                    Use a clear and specific job title.
                  </p>
                </div>

                <div className="flex gap-3">
                  <CheckCircle2
                    size={18}
                    className="text-emerald-500 shrink-0 mt-0.5"
                  />

                  <p className="text-sm text-slate-600 leading-relaxed">
                    Mention the actual work location.
                  </p>
                </div>

                <div className="flex gap-3">
                  <CheckCircle2
                    size={18}
                    className="text-emerald-500 shrink-0 mt-0.5"
                  />

                  <p className="text-sm text-slate-600 leading-relaxed">
                    Keep salary information transparent.
                  </p>
                </div>

                <div className="flex gap-3">
                  <CheckCircle2
                    size={18}
                    className="text-emerald-500 shrink-0 mt-0.5"
                  />

                  <p className="text-sm text-slate-600 leading-relaxed">
                    Write a detailed and easy-to-understand description.
                  </p>
                </div>

              </div>
            </div>

            {/* Preview */}
            <div className="bg-slate-950 text-white rounded-3xl p-6 overflow-hidden relative">

              <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-blue-500/10"></div>

              <div className="relative">
                <p className="text-xs uppercase tracking-widest text-slate-500 font-semibold">
                  Live Preview
                </p>

                <h3 className="text-xl font-bold mt-4">
                  {formData.title || "Your Job Title"}
                </h3>

                <div className="mt-4 space-y-3">

                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <Building2 size={15} />
                    {formData.company || "Company Name"}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <MapPin size={15} />
                    {formData.location || "Job Location"}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <IndianRupee size={15} />
                    {formData.salary || "Salary Package"}
                  </div>

                </div>

                <div className="mt-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-xs text-slate-300">
                  <Clock3 size={13} />
                  {formData.jobType}
                </div>
              </div>

            </div>

          </aside>

        </div>
      </main>
    </div>
  );
}

export default PostJob;