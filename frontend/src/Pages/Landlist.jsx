import React, { useContext, useState } from "react";
import "./Landlist.css";
import { LanguageContext } from "../context/LanguageContext";

function Landlist() {
  const { language, toggleLanguage } = useContext(LanguageContext);

  // Simulated data from backend (you’ll later replace with real DB data)
  const landData = {
    Madurai: [
      { taluk: "Melur", size: "8 cents", price: "₹15 Lakhs" },
      { taluk: "Thirumangalam", size: "12 cents", price: "₹22 Lakhs" },
    ],
    Tirunelveli: [],
    Dindigul: [
      { taluk: "Oddanchatram", size: "10 cents", price: "₹18 Lakhs" },
    ],
  };

  // State for filter options
  const [filters, setFilters] = useState({
    district: "",
    taluk: "",
    sizeRange: "",
    priceRange: "",
  });

  const [filteredData, setFilteredData] = useState(landData);
  const [showFilter, setShowFilter] = useState(false);

  // Districts and Taluks in both languages
  const districtTaluks = {
    Madurai: ["Melur", "Thirumangalam", "Usilampatti"],
    Tirunelveli: ["Tenkasi", "Palayamkottai", "Ambasamudram"],
    Dindigul: ["Oddanchatram", "Palani", "Nilakottai"],
  };

  const translate = (text) => {
    const dict = {
      "Filter": "வடிகட்டி",
      "Select District": "மாவட்டத்தைத் தேர்ந்தெடுக்கவும்",
      "Select Taluk": "தாலுகைத் தேர்ந்தெடுக்கவும்",
      "Select Land Size": "நில அளவைத் தேர்ந்தெடுக்கவும்",
      "Select Price Range": "விலை வரம்பைத் தேர்ந்தெடுக்கவும்",
      "Submit": "சமர்ப்பிக்கவும்",
      "No Lands Available": "நிலங்கள் இல்லை",
      "View Details": "விவரங்களை காண்க",
    };
    return language === "ta" ? dict[text] || text : text;
  };

  // Handle filter logic
  const handleFilter = (e) => {
    e.preventDefault();
    const { district, taluk, sizeRange, priceRange } = filters;
    let updated = {};

    Object.keys(landData).forEach((dist) => {
      let lands = landData[dist];
      if (district && dist !== district) return;
      if (taluk) lands = lands.filter((l) => l.taluk === taluk);
      updated[dist] = lands;
    });

    setFilteredData(updated);
    setShowFilter(false);
  };

  return (
    <div className="landlist-page">
      {/* Top Section */}
      <div className="top-bar">
        <h1 className="title">
          {language === "en" ? "Available Lands" : "கிடைக்கக்கூடிய நிலங்கள்"}
        </h1>

        <div className="top-buttons">
          <button onClick={() => setShowFilter(!showFilter)} className="filter-btn">
            ⚙️ {translate("Filter")}
          </button>
          <button onClick={toggleLanguage} className="lang-btn">
            {language === "en" ? "தமிழ்" : "English"}
          </button>
        </div>
      </div>

      {/* Filter Panel */}
      {showFilter && (
        <form className="filter-panel" onSubmit={handleFilter}>
          <select
            value={filters.district}
            onChange={(e) =>
              setFilters({ ...filters, district: e.target.value, taluk: "" })
            }
          >
            <option value="">{translate("Select District")}</option>
            {Object.keys(districtTaluks).map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          {filters.district && (
            <select
              value={filters.taluk}
              onChange={(e) => setFilters({ ...filters, taluk: e.target.value })}
            >
              <option value="">{translate("Select Taluk")}</option>
              {districtTaluks[filters.district].map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          )}

          <select
            value={filters.sizeRange}
            onChange={(e) => setFilters({ ...filters, sizeRange: e.target.value })}
          >
            <option value="">{translate("Select Land Size")}</option>
            <option value="under10">Under 10 cents</option>
            <option value="10-20">10 - 20 cents</option>
            <option value="above20">Above 20 cents</option>
          </select>

          <select
            value={filters.priceRange}
            onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
          >
            <option value="">{translate("Select Price Range")}</option>
            <option value="under10L">Under ₹10 Lakhs</option>
            <option value="10-25L">₹10 - ₹25 Lakhs</option>
            <option value="above25L">Above ₹25 Lakhs</option>
          </select>

          <button type="submit" className="submit-btn">
            {translate("Submit")}
          </button>
        </form>
      )}

      {/* Land Display Section */}
      <div className="land-container">
        {Object.keys(filteredData).map((district) => (
          <div key={district} className="district-section">
            <h2>{district}</h2>
            {filteredData[district].length > 0 ? (
              filteredData[district].map((land, index) => (
                <div key={index} className="land-card">
                  <p><b>Taluk:</b> {land.taluk}</p>
                  <p><b>Size:</b> {land.size}</p>
                  <p><b>Price:</b> {land.price}</p>
                  <button className="view-btn">{translate("View Details")}</button>
                </div>
              ))
            ) : (
              <p className="empty-text">{translate("No Lands Available")}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Landlist;
