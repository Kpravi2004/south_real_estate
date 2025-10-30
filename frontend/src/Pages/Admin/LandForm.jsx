import { useState } from "react";
import axios from "axios";

export default function LandForm() {
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
      await axios.post("http://localhost:5000/api/lands", {
        ...formData,
        images: formData.images.split(","),
      });
      alert("✅ Land added successfully!");
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
    } catch (error) {
      alert("❌ Error adding land!");
      console.error(error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-xl font-semibold mb-4 text-gray-700">Add New Land</h3>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <input name="land_type" value={formData.land_type} onChange={handleChange} placeholder="Land Type" className="border p-2 rounded" />
        <input name="district" value={formData.district} onChange={handleChange} placeholder="District" className="border p-2 rounded" />
        <input name="taluk" value={formData.taluk} onChange={handleChange} placeholder="Taluk" className="border p-2 rounded" />
        <input name="land_size" value={formData.land_size} onChange={handleChange} placeholder="Land Size" className="border p-2 rounded" />
        <input name="price" value={formData.price} onChange={handleChange} placeholder="Price" type="number" className="border p-2 rounded" />
        <input name="status" value={formData.status} onChange={handleChange} placeholder="Status" className="border p-2 rounded" />
        <input name="images" value={formData.images} onChange={handleChange} placeholder="Image URLs (comma separated)" className="border p-2 rounded" />
        <input name="video" value={formData.video} onChange={handleChange} placeholder="Video URL" className="border p-2 rounded" />
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="col-span-2 border p-2 rounded" />
        <button className="col-span-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
          Submit
        </button>
      </form>
    </div>
  );
}
