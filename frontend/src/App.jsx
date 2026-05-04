import { Routes, Route } from "react-router-dom";
import HomeComponent from "./components/Home/Home";
import "./style.css";
import Showcase from "./components/Showcase/Showcase";
import About from "./components/About/About";

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/projects" element={<Showcase />}></Route>
        <Route path="/about" element={<About />} ></Route>
      </Routes>
    </main>
  );
}

export default App;
