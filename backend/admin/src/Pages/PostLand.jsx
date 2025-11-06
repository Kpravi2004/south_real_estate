import React, { useState } from "react";
import axios from "../services/api";
import { useNavigate } from "react-router-dom";

const PostLand = () => {
  const [form, setForm] = useState({
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

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { ...form, images: form.images.split(",") };
    await axios.post("/lands", data);
    alert("Land Posted Successfully!");
    navigate("/admin/dashboard");
  };

  return (
    <div className="form-page">
      <h2>📝 Post New Land</h2>
      <form onSubmit={handleSubmit} className="styled-form">
        <input name="land_type" placeholder="Land Type" onChange={handleChange} required />
        <input name="district" placeholder="District" onChange={handleChange} required />
        <input name="taluk" placeholder="Taluk" onChange={handleChange} required />
        <input name="land_size" placeholder="Land Size" onChange={handleChange} required />
        <input name="price" type="number" placeholder="Price (₹)" onChange={handleChange} required />
        <select name="status" onChange={handleChange}>
          <option>Available</option>
          <option>Sold</option>
          <option>Pending</option>
        </select>
        <input name="images" placeholder="Image URLs (comma separated)" onChange={handleChange} />
        <input name="video" placeholder="Video URL" onChange={handleChange} />
        <textarea name="description" placeholder="Description" onChange={handleChange}></textarea>
        <button type="submit">Post Land</button>
      </form>
    </div>
  );
};

export default PostLand;
