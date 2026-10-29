import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  BriefcaseBusiness,
  Home,
  User,
  Users,
  Bookmark,
  LayoutDashboard,
  LogOut,
  PlusCircle,
  Menu,
  X,
  Search,
} from "lucide-react";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [mobileMenu, setMobileMenu] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  // Hide navbar on authentication pages
  if (
    location.pathname === "/login" ||
    location.pathname === "/register"
  ) {
    return null;
  }

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setMobileMenu(false);

    alert("Logged Out Successfully");

    navigate("/login");
  };

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }

    return location.pathname.startsWith(path);
  };

  const linkClass = (path) =>
    `flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
      isActive(path)
        ? "bg-blue-50 text-blue-700 shadow-sm"
        : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
    }`;

  const mobileLinkClass = (path) =>
    `flex items-center gap-3 w-full px-4 py-3 rounded-xl font-semibold transition ${
      isActive(path)
        ? "bg-blue-50 text-blue-700"
        : "text-slate-600 hover:bg-slate-50"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-sm">

      <div className="max-w-7xl mx-auto px-5 lg:px-8">

        <div className="h-[76px] flex items-center justify-between">

          {/* ================= LOGO ================= */}

          <Link
            to="/"
            onClick={() => setMobileMenu(false)}
            className="flex items-center gap-3 group shrink-0"
          >

            <div className="relative">

              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg group-hover:shadow-blue-200 group-hover:scale-105 transition-all duration-300">
                <BriefcaseBusiness size={23} strokeWidth={2.3} />
              </div>

              <div className="absolute -right-1 -top-1 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>

            </div>

            <div>

              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 leading-none">
                Career<span className="text-blue-600">Connect</span>
              </h1>

              <p className="hidden sm:block mt-1 text-[9px] uppercase tracking-[0.18em] text-slate-400 font-bold">
                Build Your Future
              </p>

            </div>

          </Link>


          {/* ================= DESKTOP NAV ================= */}

          <div className="hidden lg:flex items-center gap-1">

            <Link
              to="/"
              className={linkClass("/")}
            >
              <Home size={17} />
              Home
            </Link>

            <Link
              to="/jobs"
              className={linkClass("/jobs")}
            >
              <Search size={17} />
              Find Jobs
            </Link>


            {/* Candidate */}

            {user?.role === "candidate" && (
              <>

                <Link
                  to="/candidate"
                  className={linkClass("/candidate")}
                >
                  <LayoutDashboard size={17} />
                  Dashboard
                </Link>

                <Link
                  to="/saved-jobs"
                  className={linkClass("/saved-jobs")}
                >
                  <Bookmark size={17} />
                  Saved Jobs
                </Link>

                <Link
                  to="/profile"
                  className={linkClass("/profile")}
                >
                  <User size={17} />
                  Profile
                </Link>

              </>
            )}


            {/* Recruiter */}

            {user?.role === "recruiter" && (
              <>

                <Link
                  to="/recruiter"
                  className={linkClass("/recruiter")}
                >
                  <LayoutDashboard size={17} />
                  Dashboard
                </Link>

                <Link
                  to="/post-job"
                  className={linkClass("/post-job")}
                >
                  <PlusCircle size={17} />
                  Post Job
                </Link>

                <Link
                  to="/applicants"
                  className={linkClass("/applicants")}
                >
                  <Users size={17} />
                  Applicants
                </Link>

              </>
            )}


            {/* Admin */}

            {user?.role === "admin" && (
              <Link
                to="/admin"
                className={linkClass("/admin")}
              >
                <LayoutDashboard size={17} />
                Admin
              </Link>
            )}

          </div>


          {/* ================= RIGHT SIDE ================= */}

          <div className="hidden lg:flex items-center gap-3">

            {!user ? (
              <>

                <Link
                  to="/login"
                  className="px-4 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:text-blue-600 hover:bg-slate-50 transition"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-bold shadow-md hover:bg-blue-700 hover:shadow-lg transition-all"
                >
                  Get Started
                  <PlusCircle size={17} />
                </Link>

              </>
            ) : (
              <>

                <div className="h-8 w-px bg-slate-200"></div>

                <div className="flex items-center gap-2">

                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-black uppercase shadow-sm">
                    {user.name?.charAt(0) || "U"}
                  </div>

                  <div className="max-w-[120px]">

                    <p className="text-sm font-bold text-slate-800 truncate">
                      {user.name || "User"}
                    </p>

                    <p className="text-[11px] text-slate-400 capitalize">
                      {user.role}
                    </p>

                  </div>

                </div>

                <button
                  onClick={logoutHandler}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-50 text-red-600 text-sm font-bold hover:bg-red-100 transition"
                >
                  <LogOut size={17} />
                  Logout
                </button>

              </>
            )}

          </div>


          {/* ================= MOBILE BUTTON ================= */}

          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="lg:hidden w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition"
          >

            {mobileMenu ? (
              <X size={23} />
            ) : (
              <Menu size={23} />
            )}

          </button>

        </div>


        {/* ================= MOBILE MENU ================= */}

        {mobileMenu && (
          <div className="lg:hidden border-t border-slate-100 py-5">

            <div className="space-y-2">

              <Link
                to="/"
                onClick={() => setMobileMenu(false)}
                className={mobileLinkClass("/")}
              >
                <Home size={19} />
                Home
              </Link>

              <Link
                to="/jobs"
                onClick={() => setMobileMenu(false)}
                className={mobileLinkClass("/jobs")}
              >
                <Search size={19} />
                Find Jobs
              </Link>


              {/* Candidate Mobile */}

              {user?.role === "candidate" && (
                <>

                  <Link
                    to="/candidate"
                    onClick={() => setMobileMenu(false)}
                    className={mobileLinkClass("/candidate")}
                  >
                    <LayoutDashboard size={19} />
                    Dashboard
                  </Link>

                  <Link
                    to="/saved-jobs"
                    onClick={() => setMobileMenu(false)}
                    className={mobileLinkClass("/saved-jobs")}
                  >
                    <Bookmark size={19} />
                    Saved Jobs
                  </Link>

                  <Link
                    to="/profile"
                    onClick={() => setMobileMenu(false)}
                    className={mobileLinkClass("/profile")}
                  >
                    <User size={19} />
                    Profile
                  </Link>

                </>
              )}


              {/* Recruiter Mobile */}

              {user?.role === "recruiter" && (
                <>

                  <Link
                    to="/recruiter"
                    onClick={() => setMobileMenu(false)}
                    className={mobileLinkClass("/recruiter")}
                  >
                    <LayoutDashboard size={19} />
                    Dashboard
                  </Link>

                  <Link
                    to="/post-job"
                    onClick={() => setMobileMenu(false)}
                    className={mobileLinkClass("/post-job")}
                  >
                    <PlusCircle size={19} />
                    Post Job
                  </Link>

                  <Link
                    to="/applicants"
                    onClick={() => setMobileMenu(false)}
                    className={mobileLinkClass("/applicants")}
                  >
                    <Users size={19} />
                    Applicants
                  </Link>

                </>
              )}


              {/* Admin Mobile */}

              {user?.role === "admin" && (
                <Link
                  to="/admin"
                  onClick={() => setMobileMenu(false)}
                  className={mobileLinkClass("/admin")}
                >
                  <LayoutDashboard size={19} />
                  Admin Dashboard
                </Link>
              )}


              {/* Guest Mobile */}

              {!user && (
                <div className="pt-3 mt-3 border-t border-slate-100 space-y-2">

                  <Link
                    to="/login"
                    onClick={() => setMobileMenu(false)}
                    className={mobileLinkClass("/login")}
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    onClick={() => setMobileMenu(false)}
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition"
                  >
                    Get Started
                    <PlusCircle size={18} />
                  </Link>

                </div>
              )}


              {/* Logged In Mobile */}

              {user && (
                <div className="pt-4 mt-3 border-t border-slate-100">

                  <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl mb-3">

                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-black uppercase">
                      {user.name?.charAt(0) || "U"}
                    </div>

                    <div>
                      <p className="font-bold text-slate-800">
                        {user.name}
                      </p>

                      <p className="text-xs text-slate-400 capitalize">
                        {user.role}
                      </p>
                    </div>

                  </div>

                  <button
                    onClick={logoutHandler}
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-red-50 text-red-600 font-bold hover:bg-red-100 transition"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>

                </div>
              )}

            </div>

          </div>
        )}

      </div>

    </nav>
  );
}

export default Navbar;