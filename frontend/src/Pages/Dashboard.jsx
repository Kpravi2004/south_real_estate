import React, { useState } from "react";
import "./Dashboard.css";

function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  const categories = [
    { title: "Agricultural Lands", img: "/agriculture.jpg" },
    { title: "Plots", img: "/plots.jpg" },
    { title: "Industrial Lands", img: "/industrial.jpg" },
    { title: "Empty Lands", img: "/empty.jpeg" },
  ];

  return (
    <div className="dashboard-page">
      {/* Search Section */}
      <div className="search-container">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search by district or region..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-bar"
          />
          <button type="submit" className="search-btn">
            🔍 Search
          </button>
        </form>
      </div>

      {/* Category Section - Full row images */}
      <div className="category-container">
        {categories.map((cat, index) => (
          <div key={index} className="category-row">
            <img src={cat.img} alt={cat.title} />
            <div className="overlay">
              <h2>{cat.title}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
