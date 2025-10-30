import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import LandList from "./Pages/Landlist";
import Dashboard from "./Pages/Dashboard";
import Admin from "./Pages/Admin";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/landlist" element={<LandList />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}

export default App;
