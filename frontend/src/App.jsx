import { Routes, Route } from "react-router-dom";
import HomeComponent from "./components/Home/Home";
import "./style.css";
import Showcase from "./components/Showcase/Showcase";
import About from "./components/About/About";
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";
import MetricsDashboard from "./components/Metrics/MetricsDashboard";
import ProjectDetails from "./components/ProjectDetails/ProjectDetails";

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<HomeComponent />} />
        
        <Route path="/signin" element={<SignIn/>} />

        <Route path="/signup" element={<SignUp/>} />
        
        <Route path="/projects" element={<Showcase />} />

        <Route path="/projects/:id" element={<ProjectDetails />} />

        <Route path="/about" element={<About />} />

        <Route path="/metrics" element={<MetricsDashboard />} />
      </Routes>
    </main>
  );
}

export default App;
