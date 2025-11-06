import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/adminDashboard.css";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("isAdminAuthenticated");
    navigate("/admin/login");
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
          <p className="version">v2.0 Secure</p>
        </div>
        <nav>
          <button onClick={() => navigate("/admin/post")}>➕ Post Land</button>
          <button onClick={() => navigate("/admin/view")}>📊 View Database</button>
          <button onClick={() => navigate("/admin/update")}>✏️ Update Land</button>
          <button onClick={logout} className="logout-btn">🚪 Logout</button>
        </nav>
      </aside>

      <main className="main-content">
        <header>
          <h1>Welcome, Super Admin 🛡️</h1>
          <p>Manage all lands safely and securely within this protected environment.</p>
        </header>

        <section className="stats-grid">
          <div className="stat-card">
            <h3>Total Lands</h3>
            <p>128</p>
          </div>
          <div className="stat-card">
            <h3>Available</h3>
            <p>96</p>
          </div>
          <div className="stat-card">
            <h3>Sold</h3>
            <p>22</p>
          </div>
          <div className="stat-card">
            <h3>Pending</h3>
            <p>10</p>
          </div>
        </section>

        <section className="info-card">
          <h2>Security Notice</h2>
          <p>
            All admin actions are logged for audit purposes. Unauthorized access attempts
            will trigger an instant alert to the system administrator.
          </p>
          <p>
            Ensure you log out properly after use. Use a strong network and secure device
            for better protection.
          </p>
        </section>
      </main>
    </div>
  );
}
