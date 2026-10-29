import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CandidateDashboard from "./pages/CandidateDashboard";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import PostJob from "./pages/PostJob";
import AdminDashboard from "./pages/AdminDashboard";
import Jobs from "./pages/Jobs";
import Applicants from "./pages/Applicants";
import Profile from "./pages/Profile";
import JobDetails from "./pages/JobDetails";
import SavedJobs from "./pages/SavedJobs";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/job/:id" element={<JobDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/candidate" element={<CandidateDashboard />} />
        <Route path="/recruiter" element={<RecruiterDashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/post-job" element={<PostJob />} />
        <Route path="/edit-job/:id" element={<PostJob />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/applicants" element={<Applicants />} />
        <Route path="/saved-jobs" element={<SavedJobs />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;