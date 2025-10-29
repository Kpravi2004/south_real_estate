// src/Pages/Dashboard.jsx
import React, { useState, useContext } from "react";
import "./Dashboard.css";
import { LanguageContext } from "../context/LanguageContext";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { language, toggleLanguage } = useContext(LanguageContext);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    // For now just console — you can later hook to backend/search API
    console.log("Searching for:", searchQuery);
  };

  // categories — route will navigate to /landlist?type=...
  const categories = [
    { key: "agriculture", titleEn: "Agricultural Lands", titleTa: "விவசாய நிலங்கள்", img: "/agriculture.jpg" },
    { key: "plots", titleEn: "Plots", titleTa: "பிளாட்கள்", img: "/plots.jpg" },
    { key: "industrial", titleEn: "Industrial Lands", titleTa: "தொழிற்சாலை நிலங்கள்", img: "/industrial.jpg" },
    { key: "empty", titleEn: "Empty Lands", titleTa: "வெற்றிநிலங்கள்", img: "/empty.jpeg" },
  ];

  const handleCategoryClick = (key) => {
    // navigate to landlist and send type as query param
    navigate(`/landlist?type=${encodeURIComponent(key)}`);
  };

  return (
    <div className="dashboard-page">
      <div className="top-right">
        <button onClick={toggleLanguage} className="lang-btn">
          {language === "en" ? "தமிழ்" : "English"}
        </button>
      </div>

      <div className="search-container">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder={language === "en" ? "Search by district or region..." : "மாவட்டம் அல்லது பகுதியின்படி தேடவும்..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-bar"
          />
          <button type="submit" className="search-btn">
            🔍 {language === "en" ? "Search" : "தேடவும்"}
          </button>
        </form>
      </div>

      <div className="category-container">
        {categories.map((cat) => (
          <div key={cat.key} className="category-row" onClick={() => handleCategoryClick(cat.key)}>
            <img src={cat.img} alt={language === "en" ? cat.titleEn : cat.titleTa} />
            <div className="overlay">
              <h2>{language === "en" ? cat.titleEn : cat.titleTa}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
