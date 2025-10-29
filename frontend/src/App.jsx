import { Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Landlist from "./Pages/Landlist";
import Home from "./Pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/landlist" element={<Landlist />} />
    </Routes>
  );
}

export default App;
