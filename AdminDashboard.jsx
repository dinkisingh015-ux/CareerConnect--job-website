import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Users,
  BriefcaseBusiness,
  Building2,
  FileText,
  UserRound,
  ArrowRight,
  Search,
  Settings,
  BarChart3,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

function AdminDashboard() {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* =========================
          HERO
      ========================= */}

      <section className="bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

            <div>

              <div className="inline-flex items-center gap-2 text-blue-400 text-sm font-bold uppercase tracking-wider">
                <Sparkles size={16} />
                Administration
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mt-3">
                Admin Dashboard
              </h1>

              <p className="text-slate-400 text-base sm:text-lg mt-3 max-w-2xl leading-7">
                Manage CareerConnect users, jobs, recruiters and
                platform activity from one central workspace.
              </p>

            </div>

            <div className="w-16 h-16 rounded-2xl bg-blue-600/20 border border-blue-500/20 flex items-center justify-center shrink-0">
              <ShieldCheck
                size={31}
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
            OVERVIEW
        ========================= */}

        <section>

          <div className="mb-5">

            <p className="text-sm text-blue-600 font-bold uppercase tracking-wider">
              Platform overview
            </p>

            <h2 className="text-2xl font-black text-slate-900 mt-1">
              System Management
            </h2>

          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">

            {/* USERS */}

            <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 hover:shadow-lg hover:-translate-y-1 transition-all">

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-sm font-semibold text-slate-500">
                    Users
                  </p>

                  <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2">
                    —
                  </h2>

                </div>

                <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Users
                    size={21}
                    className="text-blue-600"
                  />
                </div>

              </div>

              <p className="text-xs text-slate-400 mt-4">
                Registered platform users
              </p>

            </div>

            {/* JOBS */}

            <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 hover:shadow-lg hover:-translate-y-1 transition-all">

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-sm font-semibold text-slate-500">
                    Jobs
                  </p>

                  <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2">
                    —
                  </h2>

                </div>

                <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center">
                  <BriefcaseBusiness
                    size={21}
                    className="text-emerald-600"
                  />
                </div>

              </div>

              <p className="text-xs text-slate-400 mt-4">
                Job listings on platform
              </p>

            </div>

            {/* COMPANIES */}

            <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 hover:shadow-lg hover:-translate-y-1 transition-all">

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-sm font-semibold text-slate-500">
                    Recruiters
                  </p>

                  <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2">
                    —
                  </h2>

                </div>

                <div className="w-11 h-11 rounded-xl bg-purple-50 flex items-center justify-center">
                  <Building2
                    size={21}
                    className="text-purple-600"
                  />
                </div>

              </div>

              <p className="text-xs text-slate-400 mt-4">
                Companies and recruiters
              </p>

            </div>

            {/* APPLICATIONS */}

            <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 hover:shadow-lg hover:-translate-y-1 transition-all">

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-sm font-semibold text-slate-500">
                    Applications
                  </p>

                  <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2">
                    —
                  </h2>

                </div>

                <div className="w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center">
                  <FileText
                    size={21}
                    className="text-orange-500"
                  />
                </div>

              </div>

              <p className="text-xs text-slate-400 mt-4">
                Total job applications
              </p>

            </div>

          </div>

        </section>

        {/* =========================
            QUICK ACTIONS
        ========================= */}

        <section className="mt-10">

          <div className="mb-5">

            <p className="text-sm text-blue-600 font-bold uppercase tracking-wider">
              Administration tools
            </p>

            <h2 className="text-2xl font-black text-slate-900 mt-1">
              Quick Actions
            </h2>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

            {/* USERS */}

            <Link
              to="/profile"
              className="group bg-white border border-slate-200 rounded-2xl p-6 hover:border-blue-200 hover:shadow-xl hover:-translate-y-1 transition-all"
            >

              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-600 transition">

                <Users
                  size={23}
                  className="text-blue-600 group-hover:text-white transition"
                />

              </div>

              <h3 className="text-lg font-black text-slate-900 mt-5">
                Manage Users
              </h3>

              <p className="text-sm text-slate-500 mt-2 leading-6">
                Review and manage user accounts across
                the CareerConnect platform.
              </p>

              <div className="flex items-center gap-2 text-blue-600 font-bold text-sm mt-5">

                Manage Users

                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition"
                />

              </div>

            </Link>

            {/* JOBS */}

            <Link
              to="/jobs"
              className="group bg-white border border-slate-200 rounded-2xl p-6 hover:border-emerald-200 hover:shadow-xl hover:-translate-y-1 transition-all"
            >

              <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center group-hover:bg-emerald-600 transition">

                <BriefcaseBusiness
                  size={23}
                  className="text-emerald-600 group-hover:text-white transition"
                />

              </div>

              <h3 className="text-lg font-black text-slate-900 mt-5">
                Manage Jobs
              </h3>

              <p className="text-sm text-slate-500 mt-2 leading-6">
                View job listings and monitor opportunities
                available on the platform.
              </p>

              <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm mt-5">

                Browse Jobs

                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition"
                />

              </div>

            </Link>

            {/* RECRUITERS */}

            <Link
              to="/recruiter"
              className="group bg-white border border-slate-200 rounded-2xl p-6 hover:border-purple-200 hover:shadow-xl hover:-translate-y-1 transition-all"
            >

              <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center group-hover:bg-purple-600 transition">

                <Building2
                  size={23}
                  className="text-purple-600 group-hover:text-white transition"
                />

              </div>

              <h3 className="text-lg font-black text-slate-900 mt-5">
                Recruiter Management
              </h3>

              <p className="text-sm text-slate-500 mt-2 leading-6">
                Access recruiter tools and manage company
                recruitment activity.
              </p>

              <div className="flex items-center gap-2 text-purple-600 font-bold text-sm mt-5">

                Recruiter Area

                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition"
                />

              </div>

            </Link>

            {/* APPLICATIONS */}

            <Link
              to="/applicants"
              className="group bg-white border border-slate-200 rounded-2xl p-6 hover:border-orange-200 hover:shadow-xl hover:-translate-y-1 transition-all"
            >

              <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center group-hover:bg-orange-500 transition">

                <FileText
                  size={23}
                  className="text-orange-500 group-hover:text-white transition"
                />

              </div>

              <h3 className="text-lg font-black text-slate-900 mt-5">
                Applications
              </h3>

              <p className="text-sm text-slate-500 mt-2 leading-6">
                Review application activity and candidate
                recruitment information.
              </p>

              <div className="flex items-center gap-2 text-orange-500 font-bold text-sm mt-5">

                View Applications

                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition"
                />

              </div>

            </Link>

            {/* PROFILE */}

            <Link
              to="/profile"
              className="group bg-white border border-slate-200 rounded-2xl p-6 hover:border-cyan-200 hover:shadow-xl hover:-translate-y-1 transition-all"
            >

              <div className="w-12 h-12 rounded-xl bg-cyan-50 flex items-center justify-center group-hover:bg-cyan-600 transition">

                <UserRound
                  size={23}
                  className="text-cyan-600 group-hover:text-white transition"
                />

              </div>

              <h3 className="text-lg font-black text-slate-900 mt-5">
                Admin Profile
              </h3>

              <p className="text-sm text-slate-500 mt-2 leading-6">
                View and manage your administrator profile
                information.
              </p>

              <div className="flex items-center gap-2 text-cyan-600 font-bold text-sm mt-5">

                View Profile

                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition"
                />

              </div>

            </Link>

            {/* SETTINGS */}

            <div
              className="group bg-white border border-slate-200 rounded-2xl p-6 hover:border-slate-300 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer"
            >

              <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center group-hover:bg-slate-900 transition">

                <Settings
                  size={23}
                  className="text-slate-600 group-hover:text-white transition"
                />

              </div>

              <h3 className="text-lg font-black text-slate-900 mt-5">
                Platform Settings
              </h3>

              <p className="text-sm text-slate-500 mt-2 leading-6">
                Administrative settings and platform
                configuration tools.
              </p>

              <div className="flex items-center gap-2 text-slate-600 font-bold text-sm mt-5">

                Settings

                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition"
                />

              </div>

            </div>

          </div>

        </section>

        {/* =========================
            SYSTEM STATUS
        ========================= */}

        <section className="mt-10">

          <div className="bg-white border border-slate-200 rounded-3xl p-7 sm:p-8">

            <div className="flex items-center gap-4">

              <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center">
                <CheckCircle2
                  size={24}
                  className="text-emerald-600"
                />
              </div>

              <div>

                <p className="text-sm text-emerald-600 font-bold uppercase tracking-wider">
                  System status
                </p>

                <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                  CareerConnect is operational
                </h2>

              </div>

            </div>

            <div className="grid sm:grid-cols-3 gap-4 mt-7">

              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-sm font-bold text-slate-700">
                  User Management
                </p>
                <p className="text-xs text-emerald-600 font-semibold mt-1">
                  Available
                </p>
              </div>

              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-sm font-bold text-slate-700">
                  Job Management
                </p>
                <p className="text-xs text-emerald-600 font-semibold mt-1">
                  Available
                </p>
              </div>

              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-sm font-bold text-slate-700">
                  Application Management
                </p>
                <p className="text-xs text-emerald-600 font-semibold mt-1">
                  Available
                </p>
              </div>

            </div>

          </div>

        </section>

        {/* =========================
            BOTTOM CTA
        ========================= */}

        <section className="mt-10">

          <div className="bg-slate-950 rounded-3xl p-7 sm:p-9 text-white flex flex-col md:flex-row md:items-center md:justify-between gap-6">

            <div>

              <p className="text-blue-400 text-sm font-bold uppercase tracking-wider">
                Administration workspace
              </p>

              <h2 className="text-2xl sm:text-3xl font-black mt-2">
                Keep CareerConnect running smoothly.
              </h2>

              <p className="text-slate-400 mt-2">
                Monitor the platform and manage recruitment activity.
              </p>

            </div>

            <Link
              to="/jobs"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-bold transition shrink-0"
            >
              Browse Platform
              <ArrowRight size={18} />
            </Link>

          </div>

        </section>

      </main>

    </div>
  );
}

export default AdminDashboard;