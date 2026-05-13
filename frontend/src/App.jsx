import { Routes, Route } from "react-router-dom";
import HomeComponent from "./components/Home/Home";
import "./style.css";
import Showcase from "./components/Showcase/Showcase";
import About from "./components/About/About";
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<HomeComponent />} />
        
        <Route path="/signin" element={<SignIn/>}/>

        <Route path="/signup" element={<SignUp/>}/>
        
        <Route path="/projects" element={<Showcase />}></Route>

        <Route path="/about" element={<About />} ></Route>
      </Routes>
    </main>
  );
}

export default App;
