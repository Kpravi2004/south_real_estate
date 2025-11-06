import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../services/api";

const UpdateLand = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [land, setLand] = useState(null);

  useEffect(() => {
    axios.get(`/lands/${id}`).then((res) => setLand(res.data));
  }, [id]);

  const handleChange = (e) => {
    setLand({ ...land, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await axios.put(`/lands/${id}`, land);
    alert("Land Updated Successfully!");
    navigate("/admin/view");
  };

  if (!land) return <h3>Loading...</h3>;

  return (
    <div className="form-page">
      <h2>✏️ Update Land</h2>
      <form onSubmit={handleUpdate} className="styled-form">
        <input name="land_type" value={land.land_type} onChange={handleChange} />
        <input name="district" value={land.district} onChange={handleChange} />
        <input name="taluk" value={land.taluk} onChange={handleChange} />
        <input name="land_size" value={land.land_size} onChange={handleChange} />
        <input name="price" value={land.price} onChange={handleChange} />
        <textarea name="description" value={land.description} onChange={handleChange}></textarea>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateLand;
