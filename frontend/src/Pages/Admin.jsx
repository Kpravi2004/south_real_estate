import React, { useState } from "react";
import axios from "axios";
import "./Admin.css";

const Admin = () => {
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/lands", {
        ...formData,
        images: formData.images.split(","),
      });
      alert("✅ Land Added Successfully!");
      console.log(res.data);
    } catch (err) {
      console.error("❌ Error adding land:", err);
      alert("Error adding land!");
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-container">
        <h2 className="admin-title">🛠 Admin Dashboard</h2>
        <p className="admin-sub">Post, Update, and Manage Land Details</p>

        <form className="admin-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Land Type</label>
            <input type="text" name="land_type" value={formData.land_type} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>District</label>
            <input type="text" name="district" value={formData.district} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Taluk</label>
            <input type="text" name="taluk" value={formData.taluk} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Land Size</label>
            <input type="text" name="land_size" value={formData.land_size} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Price (₹)</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Status</label>
            <select name="status" value={formData.status} onChange={handleChange}>
              <option>Available</option>
              <option>Sold</option>
              <option>Pending</option>
            </select>
          </div>

          <div className="form-group">
            <label>Images (comma-separated URLs)</label>
            <input type="text" name="images" value={formData.images} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Video URL</label>
            <input type="text" name="video" value={formData.video} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange}></textarea>
          </div>

          <button type="submit" className="submit-btn">Add Land</button>
        </form>
      </div>
    </div>
  );
};

export default Admin;
