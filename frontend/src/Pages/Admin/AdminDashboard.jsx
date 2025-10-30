import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [lands, setLands] = useState([]);
  const [formData, setFormData] = useState({
    land_type: "",
    district: "",
    taluk: "",
    land_size: "",
    price: "",
    status: "Available",
    images: "",
    video: "",
    description: "",
  });

  // Fetch all land data
  const fetchLands = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/lands");
      setLands(res.data);
    } catch (err) {
      console.error("Error fetching lands:", err);
    }
  };

  useEffect(() => {
    fetchLands();
  }, []);

  // Add new land
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/lands", {
        ...formData,
        images: formData.images.split(","), // Convert CSV to array
      });
      alert("Land added successfully!");
      setFormData({
        land_type: "",
        district: "",
        taluk: "",
        land_size: "",
        price: "",
        status: "Available",
        images: "",
        video: "",
        description: "",
      });
      fetchLands();
    } catch (err) {
      console.error("Error adding land:", err);
      alert("Failed to add land");
    }
  };

  // Delete land
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this land?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/lands/${id}`);
      alert("Land deleted successfully!");
      fetchLands();
    } catch (err) {
      console.error("Error deleting land:", err);
    }
  };

  return (
    <div className="admin-page">
      <aside className="admin-sidebar">
        <h2>Admin Panel</h2>
        <a href="#add">Add Land</a>
        <a href="#manage">Manage Lands</a>
        <button onClick={() => alert("Logged out!")}>Logout</button>
      </aside>

      <main className="admin-main">
        <section id="add" className="add-land-form">
          <h3>Add New Land</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Land Type"
              value={formData.land_type}
              onChange={(e) =>
                setFormData({ ...formData, land_type: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="District"
              value={formData.district}
              onChange={(e) =>
                setFormData({ ...formData, district: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Taluk"
              value={formData.taluk}
              onChange={(e) =>
                setFormData({ ...formData, taluk: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Land Size (e.g. 10 cents)"
              value={formData.land_size}
              onChange={(e) =>
                setFormData({ ...formData, land_size: e.target.value })
              }
              required
            />
            <input
              type="number"
              placeholder="Price"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              required
            />
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
            >
              <option value="Available">Available</option>
              <option value="Sold">Sold</option>
              <option value="Pending">Pending</option>
            </select>
            <input
              type="text"
              placeholder="Image URLs (comma separated)"
              value={formData.images}
              onChange={(e) =>
                setFormData({ ...formData, images: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Video URL"
              value={formData.video}
              onChange={(e) =>
                setFormData({ ...formData, video: e.target.value })
              }
            />
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            ></textarea>
            <button type="submit">Add Land</button>
          </form>
        </section>

        <section id="manage" className="land-manager">
          <h3>Manage Lands</h3>
          <table className="land-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>District</th>
                <th>Taluk</th>
                <th>Size</th>
                <th>Price</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {lands.length > 0 ? (
                lands.map((land) => (
                  <tr key={land._id}>
                    <td>{land.land_type}</td>
                    <td>{land.district}</td>
                    <td>{land.taluk}</td>
                    <td>{land.land_size}</td>
                    <td>₹{land.price.toLocaleString()}</td>
                    <td>{land.status}</td>
                    <td>
                      <button onClick={() => handleDelete(land._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center", color: "gray" }}>
                    No lands available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
