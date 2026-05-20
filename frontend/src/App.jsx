import { Routes, Route } from "react-router-dom";
import HomeComponent from "./components/Home/Home";
import "./style.css";
import Showcase from "./components/Showcase/Showcase";
import About from "./components/About/About";
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";
import MetricsDashboard from "./components/Metrics/MetricsDashboard";
import ProjectDetails from "./components/Projects/ProjectDetails";
import EditProfile from "./components/Profile/EditProfile";
import ProfileDetails from "./components/Profile/ProfileDetails";
import SubmitProject from "./components/Projects/SubmitProject";

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

        {/* 
          we call the same component, 
          but one path is to submit and the other to edit the project 
        */}
        <Route path="/projects/submit" element={<SubmitProject />} />
        <Route path="/projects/edit/:id" element={<SubmitProject />} />


        {/* extra pages */}
        <Route path="/about" element={<About />} />
        <Route path="/metrics" element={<MetricsDashboard />} />
      </Routes>
    </main>
  );
}

export default App;
