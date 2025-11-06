import React, { useEffect, useState } from "react";
import axios from "../services/api";
import { useNavigate } from "react-router-dom";

const ViewDatabase = () => {
  const [lands, setLands] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/lands").then((res) => setLands(res.data));
  }, []);

  const handleDelete = async (id) => {
    const pass = prompt("Enter password to delete:");
    if (pass === "admin123") {
      await axios.delete(`/lands/${id}`);
      alert("Deleted Successfully!");
      setLands(lands.filter((l) => l._id !== id));
    } else {
      alert("Incorrect Password");
    }
  };

  return (
    <div className="database-page">
      <h2>📂 Lands in Database</h2>
      <div className="land-grid">
        {lands.map((land) => (
          <div key={land._id} className="land-card">
            <h3>{land.land_type} - {land.district}</h3>
            <p><b>Taluk:</b> {land.taluk}</p>
            <p><b>Size:</b> {land.land_size}</p>
            <p><b>Price:</b> ₹{land.price}</p>
            <div className="image-carousel">
              {land.images.map((img, i) => (
                <img src={img} alt={`land-${i}`} key={i} />
              ))}
            </div>
            {land.video && (
              <video controls>
                <source src={land.video} type="video/mp4" />
              </video>
            )}
            <p>{land.description}</p>
            <div className="action-btns">
              <button onClick={() => navigate(`/admin/update/${land._id}`)}>Update</button>
              <button className="delete-btn" onClick={() => handleDelete(land._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewDatabase;
