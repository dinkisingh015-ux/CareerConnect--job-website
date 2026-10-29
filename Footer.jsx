import { Link } from "react-router-dom";
import {
  BriefcaseBusiness,
  Mail,
  MapPin,
  Phone,
  Globe,
} from "lucide-react";

function Footer() {
  return (
    <footer className="bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center">
                <BriefcaseBusiness size={23} />
              </div>

              <span className="text-2xl font-black">
                Career<span className="text-blue-500">Connect</span>
              </span>
            </Link>

            <p className="mt-5 text-slate-400 leading-7 text-sm max-w-sm">
              Connecting talented candidates with great career
              opportunities and helping companies find the right talent.
            </p>

            <div className="flex items-center gap-2 mt-6">
              <span className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                <Globe size={18} className="text-blue-400" />
              </span>

              <span className="text-sm text-slate-400">
                Career opportunities made simple.
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold">
              Quick Links
            </h3>

            <div className="mt-5 space-y-3">
              <Link
                to="/"
                className="block text-slate-400 hover:text-white transition"
              >
                Home
              </Link>

              <Link
                to="/jobs"
                className="block text-slate-400 hover:text-white transition"
              >
                Browse Jobs
              </Link>

              <Link
                to="/login"
                className="block text-slate-400 hover:text-white transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="block text-slate-400 hover:text-white transition"
              >
                Create Account
              </Link>
            </div>
          </div>

          {/* Candidates */}
          <div>
            <h3 className="text-lg font-bold">
              For Candidates
            </h3>

            <div className="mt-5 space-y-3">
              <Link
                to="/jobs"
                className="block text-slate-400 hover:text-white transition"
              >
                Find Jobs
              </Link>

              <Link
                to="/profile"
                className="block text-slate-400 hover:text-white transition"
              >
                My Profile
              </Link>

              <Link
                to="/saved-jobs"
                className="block text-slate-400 hover:text-white transition"
              >
                Saved Jobs
              </Link>

              <Link
                to="/candidate"
                className="block text-slate-400 hover:text-white transition"
              >
                Candidate Dashboard
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold">
              Contact Us
            </h3>

            <div className="mt-5 space-y-4">

              <div className="flex items-start gap-3 text-slate-400">
                <Mail
                  size={18}
                  className="text-blue-500 mt-1 shrink-0"
                />

                <span className="text-sm">
                  support@careerconnect.com
                </span>
              </div>

              <div className="flex items-start gap-3 text-slate-400">
                <Phone
                  size={18}
                  className="text-blue-500 mt-1 shrink-0"
                />

                <span className="text-sm">
                  +91 98765 43210
                </span>
              </div>

              <div className="flex items-start gap-3 text-slate-400">
                <MapPin
                  size={18}
                  className="text-blue-500 mt-1 shrink-0"
                />

                <span className="text-sm leading-6">
                  Navi Mumbai,
                  <br />
                  Maharashtra, India
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">

            <p className="text-sm text-slate-500 text-center md:text-left">
              © {new Date().getFullYear()} CareerConnect.
              All rights reserved.
            </p>

            <div className="flex items-center gap-6 text-sm text-slate-500">
              <button className="hover:text-white transition">
                Privacy Policy
              </button>

              <button className="hover:text-white transition">
                Terms & Conditions
              </button>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;