import { useEffect, useState } from "react";
import axios from "axios";

import {
  UserRound,
  Mail,
  Phone,
  GraduationCap,
  BriefcaseBusiness,
  Code2,
  FileText,
  Camera,
  Save,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Pencil,
} from "lucide-react";

function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    skills: "",
    education: "",
    experience: "",
    bio: "",
    resume: "",
    profileImage: "",
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  // =========================
  // FETCH PROFILE
  // =========================

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      const res = await axios.get(
        "http://localhost:5000/api/auth/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProfile(res.data);

      localStorage.setItem(
        "user",
        JSON.stringify(res.data)
      );
    } catch (error) {
      console.log(error);

      setMessage({
        type: "error",
        text:
          error.response?.data?.message ||
          "Failed to load profile.",
      });
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
  // UPDATE PROFILE
  // =========================

  const updateProfile = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const token = localStorage.getItem("token");

      const formData = new FormData();

      formData.append("name", profile.name);
      formData.append("phone", profile.phone);
      formData.append("skills", profile.skills);
      formData.append("education", profile.education);
      formData.append("experience", profile.experience);
      formData.append("bio", profile.bio);

      if (image) {
        formData.append("profileImage", image);
      }

      const res = await axios.put(
        "http://localhost:5000/api/auth/profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setProfile(res.data.user);

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      setImage(null);

      showMessage(
        "success",
        res.data.message ||
          "Profile updated successfully."
      );
    } catch (error) {
      showMessage(
        "error",
        error.response?.data?.message ||
          "Profile update failed."
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================
  // IMAGE PREVIEW
  // =========================

  const imagePreview = image
    ? URL.createObjectURL(image)
    : profile.profileImage
    ? `http://localhost:5000/uploads/${profile.profileImage}`
    : `https://ui-avatars.com/api/?background=2563eb&color=fff&size=200&name=${encodeURIComponent(
        profile.name || "User"
      )}`;

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">

        <div className="text-center">

          <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mx-auto"></div>

          <p className="text-sm font-semibold text-slate-500 mt-4">
            Loading your profile...
          </p>

        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">

      {/* =========================
          SUCCESS / ERROR MESSAGE
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

        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-10 sm:py-12">

          <div className="flex flex-col sm:flex-row sm:items-center gap-5">

            <div className="w-14 h-14 rounded-2xl bg-blue-600/20 border border-blue-500/20 flex items-center justify-center">

              <UserRound
                size={28}
                className="text-blue-400"
              />

            </div>

            <div>

              <p className="text-blue-400 text-sm font-bold uppercase tracking-wider">
                CareerConnect Account
              </p>

              <h1 className="text-3xl sm:text-4xl font-black tracking-tight mt-1">
                My Profile
              </h1>

              <p className="text-slate-400 mt-2">
                Manage your professional information and profile.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* =========================
          MAIN
      ========================= */}

      <main className="max-w-6xl mx-auto px-6 lg:px-8 py-10">

        <form onSubmit={updateProfile}>

          <div className="grid lg:grid-cols-3 gap-7">

            {/* =========================
                LEFT PROFILE CARD
            ========================= */}

            <aside className="lg:col-span-1">

              <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden">

                <div className="h-24 bg-gradient-to-r from-blue-600 to-indigo-600"></div>

                <div className="px-6 pb-7">

                  <div className="-mt-14 flex justify-center">

                    <div className="relative">

                      <img
                        src={imagePreview}
                        alt="Profile"
                        className="w-28 h-28 rounded-3xl object-cover border-4 border-white shadow-xl"
                      />

                      <label
                        htmlFor="profileImage"
                        className="absolute -bottom-2 -right-2 w-10 h-10 rounded-xl bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center cursor-pointer shadow-lg transition"
                      >

                        <Camera size={18} />

                      </label>

                      <input
                        id="profileImage"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files?.[0]) {
                            setImage(e.target.files[0]);
                          }
                        }}
                      />

                    </div>

                  </div>

                  <div className="text-center mt-5">

                    <h2 className="text-xl font-black text-slate-900">
                      {profile.name || "Your Name"}
                    </h2>

                    <p className="text-sm text-slate-500 mt-1 break-all">
                      {profile.email || "Email address"}
                    </p>

                  </div>

                  <div className="mt-6 pt-6 border-t border-slate-100">

                    <div className="flex items-center gap-3 text-sm text-slate-600">

                      <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">

                        <ShieldCheck
                          size={17}
                          className="text-blue-600"
                        />

                      </div>

                      <div>
                        <p className="font-bold text-slate-800">
                          Professional Profile
                        </p>

                        <p className="text-xs text-slate-400 mt-0.5">
                          Keep your details updated
                        </p>
                      </div>

                    </div>

                  </div>

                  {profile.resume && (
                    <a
                      href={`http://localhost:5000/uploads/${profile.resume}`}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-5 w-full inline-flex items-center justify-center gap-2 h-11 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold transition"
                    >

                      <FileText size={17} />

                      View Current Resume

                    </a>
                  )}

                </div>

              </div>

            </aside>

            {/* =========================
                RIGHT CONTENT
            ========================= */}

            <div className="lg:col-span-2 space-y-7">

              {/* =========================
                  PERSONAL INFORMATION
              ========================= */}

              <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8">

                <div className="flex items-center gap-3 mb-7">

                  <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">

                    <UserRound
                      size={21}
                      className="text-blue-600"
                    />

                  </div>

                  <div>

                    <p className="text-xs text-blue-600 font-bold uppercase tracking-wider">
                      Personal details
                    </p>

                    <h2 className="text-xl font-black text-slate-900 mt-1">
                      Basic Information
                    </h2>

                  </div>

                </div>

                <div className="grid sm:grid-cols-2 gap-5">

                  {/* NAME */}

                  <div>

                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Full Name
                    </label>

                    <div className="relative">

                      <UserRound
                        size={17}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        type="text"
                        value={profile.name || ""}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            name: e.target.value,
                          })
                        }
                        placeholder="Enter your full name"
                        className="w-full h-12 pl-11 pr-4 rounded-xl border border-slate-200 bg-slate-50 outline-none text-sm focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                      />

                    </div>

                  </div>

                  {/* EMAIL */}

                  <div>

                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Email Address
                    </label>

                    <div className="relative">

                      <Mail
                        size={17}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        type="email"
                        value={profile.email || ""}
                        readOnly
                        className="w-full h-12 pl-11 pr-4 rounded-xl border border-slate-200 bg-slate-100 text-slate-500 outline-none text-sm cursor-not-allowed"
                      />

                    </div>

                    <p className="text-xs text-slate-400 mt-2">
                      Email address cannot be changed.
                    </p>

                  </div>

                  {/* PHONE */}

                  <div>

                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Phone Number
                    </label>

                    <div className="relative">

                      <Phone
                        size={17}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        type="text"
                        value={profile.phone || ""}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            phone: e.target.value,
                          })
                        }
                        placeholder="Enter phone number"
                        className="w-full h-12 pl-11 pr-4 rounded-xl border border-slate-200 bg-slate-50 outline-none text-sm focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                      />

                    </div>

                  </div>

                </div>

              </section>

              {/* =========================
                  PROFESSIONAL INFORMATION
              ========================= */}

              <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8">

                <div className="flex items-center gap-3 mb-7">

                  <div className="w-11 h-11 rounded-xl bg-purple-50 flex items-center justify-center">

                    <BriefcaseBusiness
                      size={21}
                      className="text-purple-600"
                    />

                  </div>

                  <div>

                    <p className="text-xs text-purple-600 font-bold uppercase tracking-wider">
                      Professional details
                    </p>

                    <h2 className="text-xl font-black text-slate-900 mt-1">
                      Career Information
                    </h2>

                  </div>

                </div>

                <div className="space-y-5">

                  {/* SKILLS */}

                  <div>

                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Skills
                    </label>

                    <div className="relative">

                      <Code2
                        size={17}
                        className="absolute left-4 top-4 text-slate-400"
                      />

                      <input
                        type="text"
                        value={profile.skills || ""}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            skills: e.target.value,
                          })
                        }
                        placeholder="e.g. React.js, Node.js, MongoDB, Java"
                        className="w-full h-12 pl-11 pr-4 rounded-xl border border-slate-200 bg-slate-50 outline-none text-sm focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                      />

                    </div>

                    <p className="text-xs text-slate-400 mt-2">
                      Separate multiple skills with commas.
                    </p>

                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">

                    {/* EDUCATION */}

                    <div>

                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        Education
                      </label>

                      <div className="relative">

                        <GraduationCap
                          size={17}
                          className="absolute left-4 top-4 text-slate-400"
                        />

                        <input
                          type="text"
                          value={profile.education || ""}
                          onChange={(e) =>
                            setProfile({
                              ...profile,
                              education: e.target.value,
                            })
                          }
                          placeholder="e.g. B.Sc. Computer Science"
                          className="w-full h-12 pl-11 pr-4 rounded-xl border border-slate-200 bg-slate-50 outline-none text-sm focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                        />

                      </div>

                    </div>

                    {/* EXPERIENCE */}

                    <div>

                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        Experience
                      </label>

                      <div className="relative">

                        <BriefcaseBusiness
                          size={17}
                          className="absolute left-4 top-4 text-slate-400"
                        />

                        <input
                          type="text"
                          value={profile.experience || ""}
                          onChange={(e) =>
                            setProfile({
                              ...profile,
                              experience: e.target.value,
                            })
                          }
                          placeholder="e.g. 1 year / Fresher"
                          className="w-full h-12 pl-11 pr-4 rounded-xl border border-slate-200 bg-slate-50 outline-none text-sm focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                        />

                      </div>

                    </div>

                  </div>

                </div>

              </section>

              {/* =========================
                  ABOUT
              ========================= */}

              <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8">

                <div className="flex items-center gap-3 mb-7">

                  <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center">

                    <Pencil
                      size={20}
                      className="text-emerald-600"
                    />

                  </div>

                  <div>

                    <p className="text-xs text-emerald-600 font-bold uppercase tracking-wider">
                      Professional summary
                    </p>

                    <h2 className="text-xl font-black text-slate-900 mt-1">
                      About You
                    </h2>

                  </div>

                </div>

                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Bio
                </label>

                <textarea
                  rows="6"
                  value={profile.bio || ""}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      bio: e.target.value,
                    })
                  }
                  placeholder="Write a short professional introduction about yourself..."
                  className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 outline-none text-sm leading-6 resize-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                />

              </section>

              {/* =========================
                  RESUME
              ========================= */}

              <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8">

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

                  <div className="flex items-center gap-4">

                    <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center">

                      <FileText
                        size={23}
                        className="text-orange-500"
                      />

                    </div>

                    <div>

                      <p className="text-xs text-orange-500 font-bold uppercase tracking-wider">
                        Resume
                      </p>

                      <h2 className="text-xl font-black text-slate-900 mt-1">
                        Career Document
                      </h2>

                    </div>

                  </div>

                  {profile.resume ? (

                    <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-bold">

                      <CheckCircle2 size={17} />

                      Resume Uploaded

                    </div>

                  ) : (

                    <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 text-sm font-bold">

                      <XCircle size={17} />

                      No Resume

                    </div>

                  )}

                </div>

                <div className="mt-5 p-4 rounded-xl bg-slate-50 border border-slate-100">

                  {profile.resume ? (

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                      <div>

                        <p className="text-sm font-bold text-slate-800">
                          Your resume is ready
                        </p>

                        <p className="text-xs text-slate-500 mt-1">
                          Recruiters can access your uploaded resume.
                        </p>

                      </div>

                      <a
                        href={`http://localhost:5000/uploads/${profile.resume}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold transition"
                      >

                        <FileText size={16} />

                        View Resume

                      </a>

                    </div>

                  ) : (

                    <p className="text-sm text-slate-500">
                      You have not uploaded a resume yet. Upload one from your Candidate Dashboard.
                    </p>

                  )}

                </div>

              </section>

              {/* =========================
                  SAVE BUTTON
              ========================= */}

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-slate-950 rounded-3xl p-6 sm:p-7">

                <div>

                  <p className="text-blue-400 text-sm font-bold uppercase tracking-wider">
                    Profile settings
                  </p>

                  <h2 className="text-lg sm:text-xl font-black text-white mt-1">
                    Keep your professional profile updated.
                  </h2>

                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition disabled:opacity-60 disabled:cursor-not-allowed shrink-0"
                >

                  {saving ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={18} />
                      Save Profile
                    </>
                  )}

                </button>

              </div>

            </div>

          </div>

        </form>

      </main>

    </div>
  );
}

export default Profile;