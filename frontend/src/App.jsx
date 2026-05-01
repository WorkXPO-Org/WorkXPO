import { Routes, Route } from "react-router-dom";
import HomeComponent from "./components/Home/HomeComponent";
import "./style.css";

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<HomeComponent />} />
      </Routes>
    </main>
  );
}

export default App;
