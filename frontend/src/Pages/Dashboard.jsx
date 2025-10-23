import React, { useState, useContext } from "react";
import "./Dashboard.css";
import { LanguageContext } from "../context/LanguageContext";

function Dashboard() {
  const { language, toggleLanguage } = useContext(LanguageContext);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  const categories = [
    { title: language === "en" ? "Agricultural Lands" : "விவசாய நிலங்கள்", img: "/agriculture.jpg" },
    { title: language === "en" ? "Plots" : "தோட்ட நிலங்கள்", img: "/plots.jpg" },
    { title: language === "en" ? "Industrial Lands" : "தொழிற்சாலை நிலங்கள்", img: "/industrial.jpg" },
    { title: language === "en" ? "Empty Lands" : "காலியாக் நிலங்கள்", img: "/empty.jpeg" },
  ];

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
