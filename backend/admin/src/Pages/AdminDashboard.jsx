import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/AdminDashboard.css";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    available: 0,
    sold: 0,
    pending: 0,
  });

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  useEffect(() => {
    const fetchLands = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/lands");
        const lands = res.data;

        const total = lands.length;
        const available = lands.filter((land) => land.status === "Available").length;
        const sold = lands.filter((land) => land.status === "Sold").length;
        const pending = lands.filter((land) => land.status === "Pending").length;

        setStats({ total, available, sold, pending });
      } catch (err) {
        console.error("Error fetching land stats:", err);
      }
    };

    fetchLands();
  }, []);

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="admin-title">🏠 Admin Panel</div>
        <nav>
          <button onClick={() => navigate("/admin/post")}>➕ Post Land</button>
          <button onClick={() => navigate("/admin/view")}>📊 View Database</button>
          <button onClick={() => navigate("/admin/update")}>✏️ Update Land</button>
          <button onClick={logout} className="logout-btn">🚪 Logout</button>
        </nav>
      </aside>

      {/* Main Dashboard */}
      <main className="dashboard-main">
        <header className="admin-header">
          <h1>Land Management Dashboard</h1>
          <p>Welcome back, Admin!</p>
        </header>

        <div className="stats-grid">
          <div className="stat-card total">
            <h2>Total Lands</h2>
            <p>{stats.total}</p>
          </div>

          <div className="stat-card available">
            <h2>Available</h2>
            <p>{stats.available}</p>
          </div>

          <div className="stat-card sold">
            <h2>Sold</h2>
            <p>{stats.sold}</p>
          </div>

          <div className="stat-card pending">
            <h2>Pending</h2>
            <p>{stats.pending}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
