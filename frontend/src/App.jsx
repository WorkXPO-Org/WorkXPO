import { Routes, Route } from "react-router-dom";
import HomeComponent from "./components/Home/Home";
import "./style.css";
import Showcase from "./components/Showcase/Showcase";
import About from "./components/About/About";
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";
import MetricsDashboard from "./components/Metrics/MetricsDashboard";
import ProjectDetails from "./components/ProjectDetails/ProjectDetails";
import EditProfile from "./components/Profile/EditProfile";
import ProfileDetails from "./components/Profile/ProfileDetails";

function App() {
  return (
    <main>
      <Routes>

        {/* dashboard */}
        <Route path="/" element={<HomeComponent />} />


        {/* sign pages */}
        <Route path="/signin" element={<SignIn />} />

        <Route path="/signup" element={<SignUp />} />


        {/* profile pages */}
        <Route path="/profile/details" element={<ProfileDetails />} />

        <Route path="/profile/edit" element={<EditProfile />} />


        {/* project pages */}
        <Route path="/projects" element={<Showcase />} />

        <Route path="/projects/:id" element={<ProjectDetails />} />


        {/* extra pages */}
        <Route path="/about" element={<About />} />
        <Route path="/metrics" element={<MetricsDashboard />} />
      </Routes>
    </main>
  );
}

export default App;
