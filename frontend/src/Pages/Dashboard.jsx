import React, { useState, useContext } from "react";
import "./Dashboard.css";
import { LanguageContext } from "../context/LanguageContext";
import { useNavigate } from "react-router-dom"; // ✅ Import navigation hook

function Dashboard() {
  const { language, toggleLanguage } = useContext(LanguageContext);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate(); // ✅ Initialize navigation

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  // ✅ Category list with images and route key
  const categories = [
    {
      title: language === "en" ? "Agricultural Lands" : "விவசாய நிலங்கள்",
      img: "/agriculture.jpg",
      route: "/landlist",
    },
    {
      title: language === "en" ? "Plots" : "தோட்ட நிலங்கள்",
      img: "/plots.jpg",
      route: "/landlist",
    },
    {
      title: language === "en" ? "Industrial Lands" : "தொழிற்சாலை நிலங்கள்",
      img: "/industrial.jpg",
      route: "/landlist",
    },
    {
      title: language === "en" ? "Empty Lands" : "காலியாக் நிலங்கள்",
      img: "/empty.jpeg",
      route: "/landlist",
    },
  ];

  // ✅ Handle click navigation
  const handleCategoryClick = (route) => {
    navigate(route);
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
            placeholder={
              language === "en"
                ? "Search by district or region..."
                : "மாவட்டம் அல்லது பகுதியின்படி தேடவும்..."
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-bar"
          />
          <button type="submit" className="search-btn">
            🔍 {language === "en" ? "Search" : "தேடவும்"}
          </button>
        </form>
      </div>

      {/* ✅ Category rows clickable */}
      <div className="category-container">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="category-row"
            onClick={() => handleCategoryClick(cat.route)} // ✅ Click to navigate
          >
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
