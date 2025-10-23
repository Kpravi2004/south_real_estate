import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  const [language, setLanguage] = useState("en");

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ta" : "en");
  };

  return (
    <div className="home-page">
      {/* Top-right Language Button */}
      <div className="top-right">
        <button onClick={toggleLanguage} className="lang-btn">
          {language === "en" ? "தமிழ்" : "English"}
        </button>
      </div>

      {/* Center Section */}
      <div className="content">
        <div className="glass-box">
          <h1 className="title">
            {language === "en"
              ? "South District Real Estate Hub"
              : "தென் மாவட்ட நில ஆவண மையம்"}
          </h1>
          <p className="description">
            {language === "en"
              ? "A trusted platform to explore verified lands across South Tamil Nadu. Secure listings managed by admin to ensure genuine property exchanges."
              : "தென் தமிழ்நாட்டின் சரிபார்க்கப்பட்ட நிலங்களை காண ஒரு நம்பகமான தளம். நிர்வாகி வழிநடத்தும் பட்டியல்கள் பாதுகாப்பான நில பரிவர்த்தனைகளை உறுதி செய்கின்றன."}
          </p>

          <Link to="/dashboard" className="explore-btn">
            {language === "en" ? "Explore Lands" : "நிலங்களை காண்க"}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
