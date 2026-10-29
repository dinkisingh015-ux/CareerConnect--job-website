import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import {
  Search,
  MapPin,
  ArrowRight,
  BriefcaseBusiness,
  Users,
  FileText,
  Code2,
  Palette,
  Megaphone,
  BarChart3,
  Headphones,
  Database,
  CheckCircle2,
  Sparkles,
  Building2,
  ChevronRight,
} from "lucide-react";

import "./Home.css";

function Home() {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/jobs"
        );

        setJobs(res.data.slice(0, 3));
      } catch (error) {
        console.log("Home jobs error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();

    if (keyword.trim()) {
      params.set("keyword", keyword.trim());
    }

    if (location.trim()) {
      params.set("location", location.trim());
    }

    navigate(`/jobs?${params.toString()}`);
  };

  const popularSearches = [
    "React Developer",
    "Node.js Developer",
    "UI/UX Designer",
    "MERN Stack",
  ];

  const categories = [
    {
      title: "Technology",
      subtitle: "Software & IT",
      icon: Code2,
      keyword: "Technology",
      className: "blue",
    },
    {
      title: "Design",
      subtitle: "Creative roles",
      icon: Palette,
      keyword: "Design",
      className: "purple",
    },
    {
      title: "Marketing",
      subtitle: "Marketing roles",
      icon: Megaphone,
      keyword: "Marketing",
      className: "orange",
    },
    {
      title: "Data & Analytics",
      subtitle: "Data-driven careers",
      icon: BarChart3,
      keyword: "Data",
      className: "green",
    },
    {
      title: "Finance",
      subtitle: "Finance & accounting",
      icon: Database,
      keyword: "Finance",
      className: "indigo",
    },
    {
      title: "Customer Support",
      subtitle: "Support opportunities",
      icon: Headphones,
      keyword: "Customer Support",
      className: "pink",
    },
  ];

  const formatSalary = (salary) => {
    if (!salary) return "Salary not disclosed";
    return salary;
  };

  return (
    <div className="cc-home">

      {/* ================= HERO ================= */}
      <section className="cc-hero">
        <div className="cc-hero-glow cc-glow-one"></div>
        <div className="cc-hero-glow cc-glow-two"></div>

        <div className="cc-container cc-hero-grid">

          {/* LEFT */}
          <div className="cc-hero-content">

            <div className="cc-eyebrow">
              <span className="cc-eyebrow-dot"></span>
              YOUR NEXT CAREER STARTS HERE
            </div>

            <h1>
              Find work that
              <span> moves you forward.</span>
            </h1>

            <p className="cc-hero-description">
              Discover meaningful opportunities, connect with
              recruiters, and build the career you want.
            </p>

            {/* SEARCH */}
            <form
              className="cc-search-box"
              onSubmit={handleSearch}
            >
              <div className="cc-search-field">
                <div className="cc-search-icon">
                  <Search size={21} />
                </div>

                <div>
                  <label>What are you looking for?</label>

                  <input
                    type="text"
                    placeholder="Job title, skill or keyword"
                    value={keyword}
                    onChange={(e) =>
                      setKeyword(e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="cc-search-divider"></div>

              <div className="cc-search-field">
                <div className="cc-search-icon">
                  <MapPin size={21} />
                </div>

                <div>
                  <label>Where?</label>

                  <input
                    type="text"
                    placeholder="City or location"
                    value={location}
                    onChange={(e) =>
                      setLocation(e.target.value)
                    }
                  />
                </div>
              </div>

              <button type="submit" className="cc-search-button">
                <Search size={18} />
                Search
              </button>
            </form>

            {/* POPULAR */}
            <div className="cc-popular">
              <span>Popular:</span>

              {popularSearches.map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setKeyword(item);
                    navigate(
                      `/jobs?keyword=${encodeURIComponent(item)}`
                    );
                  }}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* TRUST */}
            <div className="cc-hero-trust">
              <div className="cc-trust-avatars">
                <span>R</span>
                <span>A</span>
                <span>S</span>
                <span>+</span>
              </div>

              <div>
                <strong>Built for modern job seekers</strong>
                <small>
                  Find, apply and grow with confidence.
                </small>
              </div>
            </div>
          </div>

          {/* RIGHT VISUAL */}
          <div className="cc-hero-visual">

            <div className="cc-orbit orbit-one"></div>
            <div className="cc-orbit orbit-two"></div>

            <div className="cc-match-card">

              <div className="cc-match-header">
                <div>
                  <span>CAREERCONNECT</span>
                  <h3>Find your match</h3>
                </div>

                <div className="cc-match-check">
                  <CheckCircle2 size={22} />
                </div>
              </div>

              <div className="cc-profile-progress">
                <div className="cc-progress-top">
                  <span>Profile strength</span>
                  <strong>92%</strong>
                </div>

                <div className="cc-progress">
                  <span></span>
                </div>
              </div>

              <div className="cc-mini-jobs">

                <div className="cc-mini-job">
                  <div className="cc-mini-icon blue">
                    <Building2 size={19} />
                  </div>

                  <div>
                    <strong>Software Developer</strong>
                    <small>Technology · Mumbai</small>
                  </div>

                  <ArrowRight size={18} />
                </div>

                <div className="cc-mini-job">
                  <div className="cc-mini-icon purple">
                    <Palette size={19} />
                  </div>

                  <div>
                    <strong>UI/UX Designer</strong>
                    <small>Design · Remote</small>
                  </div>

                  <ArrowRight size={18} />
                </div>

                <div className="cc-mini-job highlighted">
                  <div className="cc-mini-icon green">
                    <BarChart3 size={19} />
                  </div>

                  <div>
                    <strong>Data Analyst</strong>
                    <small>Analytics · Pune</small>
                  </div>

                  <ArrowRight size={18} />
                </div>

              </div>

              <div className="cc-match-footer">
                <Users size={17} />
                <span>Opportunities matched to your profile</span>
              </div>
            </div>

            <div className="cc-floating-card save-card">
              <BriefcaseBusiness size={17} />
              <span>Save jobs you like</span>
            </div>

            <div className="cc-floating-card easy-card">
              <CheckCircle2 size={17} />
              <span>Easy applications</span>
            </div>

            <div className="cc-floating-spark">
              <Sparkles size={19} />
            </div>
          </div>
        </div>
      </section>

      {/* ================= BENEFITS ================= */}
      <section className="cc-benefits">
        <div className="cc-container cc-benefits-grid">

          <div className="cc-benefit">
            <div className="cc-benefit-icon">
              <BriefcaseBusiness size={20} />
            </div>

            <div>
              <strong>Relevant opportunities</strong>
              <span>Find roles that fit your goals</span>
            </div>
          </div>

          <div className="cc-benefit">
            <div className="cc-benefit-icon">
              <Users size={20} />
            </div>

            <div>
              <strong>Connect with recruiters</strong>
              <span>Build your professional profile</span>
            </div>
          </div>

          <div className="cc-benefit">
            <div className="cc-benefit-icon">
              <FileText size={20} />
            </div>

            <div>
              <strong>Simple application flow</strong>
              <span>Apply and track everything easily</span>
            </div>
          </div>

        </div>
      </section>

      {/* ================= FEATURED JOBS ================= */}
      <section className="cc-section cc-featured">
        <div className="cc-container">

          <div className="cc-section-heading">
            <div>
              <span className="cc-section-label">
                OPPORTUNITIES
              </span>

              <h2>Featured jobs</h2>

              <p>
                Explore opportunities from companies looking
                for new talent.
              </p>
            </div>

            <Link to="/jobs" className="cc-view-all">
              View all jobs
              <ArrowRight size={18} />
            </Link>
          </div>

          {loading ? (
            <div className="cc-jobs-grid">
              {[1, 2, 3].map((item) => (
                <div className="cc-job-skeleton" key={item}>
                  <div></div>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              ))}
            </div>
          ) : jobs.length > 0 ? (
            <div className="cc-jobs-grid">
              {jobs.map((job) => (
                <Link
                  to={`/job/${job._id}`}
                  className="cc-job-card"
                  key={job._id}
                >
                  <div className="cc-job-card-top">

                    <div className="cc-company-logo">
                      {job.company
                        ? job.company.charAt(0).toUpperCase()
                        : "C"}
                    </div>

                    <span className="cc-job-arrow">
                      <ArrowRight size={18} />
                    </span>
                  </div>

                  <div className="cc-job-company">
                    {job.company || "Company"}
                  </div>

                  <h3>{job.title}</h3>

                  <div className="cc-job-meta">
                    <span>
                      <MapPin size={15} />
                      {job.location || "India"}
                    </span>

                    <span>
                      <BriefcaseBusiness size={15} />
                      {job.jobType || "Full Time"}
                    </span>
                  </div>

                  <div className="cc-job-bottom">
                    <strong>
                      {formatSalary(job.salary)}
                    </strong>

                    <span>
                      View job
                      <ChevronRight size={16} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="cc-empty-jobs">

              <div className="cc-empty-icon">
                <BriefcaseBusiness size={28} />
              </div>

              <div>
                <h3>New opportunities are coming soon</h3>
                <p>
                  We're preparing more roles for you.
                  Explore all available jobs in the meantime.
                </p>
              </div>

              <Link to="/jobs" className="cc-empty-button">
                Browse jobs
                <ArrowRight size={17} />
              </Link>

            </div>
          )}
        </div>
      </section>

      {/* ================= CATEGORIES ================= */}
      <section className="cc-section cc-categories">
        <div className="cc-container">

          <div className="cc-section-heading">
            <div>
              <span className="cc-section-label">
                EXPLORE
              </span>

              <h2>Browse by category</h2>

              <p>
                Start with an area that matches your skills
                and interests.
              </p>
            </div>
          </div>

          <div className="cc-category-grid">
            {categories.map((category) => {
              const Icon = category.icon;

              return (
                <button
                  key={category.title}
                  className="cc-category-card"
                  onClick={() =>
                    navigate(
                      `/jobs?keyword=${encodeURIComponent(
                        category.keyword
                      )}`
                    )
                  }
                >
                  <div
                    className={`cc-category-icon ${category.className}`}
                  >
                    <Icon size={22} />
                  </div>

                  <div className="cc-category-text">
                    <strong>{category.title}</strong>
                    <span>{category.subtitle}</span>
                  </div>

                  <ArrowRight size={19} />
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="cc-section cc-how">

        <div className="cc-container">

          <div className="cc-centered-heading">
            <span className="cc-section-label">
              HOW IT WORKS
            </span>

            <h2>
              Your next opportunity is
              <span> three steps away.</span>
            </h2>

            <p>
              A simple journey from discovering a job to
              connecting with the right employer.
            </p>
          </div>

          <div className="cc-steps">

            <div className="cc-step">
              <div className="cc-step-number">01</div>

              <div>
                <h3>Search</h3>
                <p>
                  Find jobs using your skills,
                  preferred role and location.
                </p>
              </div>
            </div>

            <div className="cc-step-line"></div>

            <div className="cc-step">
              <div className="cc-step-number">02</div>

              <div>
                <h3>Apply</h3>
                <p>
                  Review the opportunity and
                  send your application.
                </p>
              </div>
            </div>

            <div className="cc-step-line"></div>

            <div className="cc-step">
              <div className="cc-step-number">03</div>

              <div>
                <h3>Get hired</h3>
                <p>
                  Connect with recruiters and
                  move your career forward.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ================= EMPLOYER CTA ================= */}
      <section className="cc-employer-section">
        <div className="cc-container">

          <div className="cc-employer-card">

            <div className="cc-employer-glow"></div>

            <div className="cc-employer-content">

              <span className="cc-section-label">
                FOR EMPLOYERS
              </span>

              <h2>Have a position to fill?</h2>

              <p>
                Reach talented candidates who are ready
                for their next opportunity.
              </p>

              <Link
                to="/post-job"
                className="cc-primary-button"
              >
                Post a job
                <ArrowRight size={18} />
              </Link>

            </div>

            <div className="cc-employer-visual">

              <div className="cc-employer-icon-main">
                <Building2 size={35} />
              </div>

              <div className="cc-employer-mini-card card-one">
                <Users size={17} />
                <span>Reach candidates</span>
              </div>

              <div className="cc-employer-mini-card card-two">
                <CheckCircle2 size={17} />
                <span>Hire with confidence</span>
              </div>

              <div className="cc-employer-dots"></div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="cc-final-cta">
        <div className="cc-container">

          <div>
            <span className="cc-section-label">
              START TODAY
            </span>

            <h2>Your next career move could be here.</h2>

            <p>
              Explore opportunities and take the next
              step with CareerConnect.
            </p>
          </div>

          <Link
            to="/jobs"
            className="cc-primary-button"
          >
            Explore jobs
            <ArrowRight size={18} />
          </Link>

        </div>
      </section>

    </div>
  );
}

export default Home;