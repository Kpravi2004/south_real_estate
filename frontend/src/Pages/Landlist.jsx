// src/Pages/Landlist.jsx
import React, { useContext, useEffect, useMemo, useState } from "react";
import "./Landlist.css";
import { LanguageContext } from "../context/LanguageContext";
import { useLocation } from "react-router-dom";

/**
 * DistrictContainer: independent container for a single district
 * - media: array of { id, type: 'image'|'video', file, url }
 * - viewer shows activeIndex item
 * - thumbnails clickable to change activeIndex
 * - form fields for posting metadata
 */
function DistrictContainer({ district, taluks, language, onGlobalPostClick }) {
  const [open, setOpen] = useState(false);
  const [media, setMedia] = useState([]); // {id, type, file, url}
  const [activeIndex, setActiveIndex] = useState(0);
  const [landType, setLandType] = useState("");
  const [taluk, setTaluk] = useState("");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState("");
  const [contact, setContact] = useState("");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  // cleanup created object URLs on unmount
  useEffect(() => {
    return () => {
      media.forEach((m) => URL.revokeObjectURL(m.url));
    };
  }, [media]);

  const toggleOpen = () => setOpen((s) => !s);

  // helper to add files (images or video)
  const handleFiles = (files, kind) => {
    if (!files || files.length === 0) return;
    const newItems = Array.from(files).map((file) => {
      return {
        id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
        type: kind,
        file,
        url: URL.createObjectURL(file),
      };
    });
    setMedia((m) => [...m, ...newItems]);
    setActiveIndex(media.length); // jump to first newly added (approx)
  };

  const removeMedia = (id) => {
    setMedia((prev) => {
      const rem = prev.filter((p) => p.id !== id);
      return rem;
    });
    setActiveIndex((i) => Math.max(0, i - 1));
  };

  const handleChoosePhotos = (e) => {
    handleFiles(e.target.files, "image");
    e.target.value = null;
  };

  const handleChooseVideo = (e) => {
    handleFiles(e.target.files, "video");
    e.target.value = null;
  };

  // Fake upload (replace with real backend fetch/FormData)
  const handlePost = async () => {
    if (!landType || !contact) {
      alert(language === "en" ? "Please fill Land Type and Contact before posting." : "போஸ்ட் செய்ய முன்னர் நில வகை மற்றும் தொடர்பு நிரப்பவும்.");
      return;
    }

    // Prepare FormData if you integrate server
    const form = new FormData();
    form.append("landType", landType);
    form.append("district", district);
    form.append("taluk", taluk);
    form.append("size", size);
    form.append("price", price);
    form.append("contact", contact);
    media.forEach((m) => form.append("media[]", m.file, m.file.name));

    try {
      setUploading(true);
      setProgress(0);

      // Simulated upload progress loop (for demo)
      for (let p = 10; p <= 100; p += 10) {
        // simulate time
        // eslint-disable-next-line no-await-in-loop
        await new Promise((res) => setTimeout(res, 80));
        setProgress(p);
      }

      // TODO: replace with actual fetch/XHR to backend, for example:
      // const res = await fetch("/api/lands", { method: "POST", body: form });
      // const data = await res.json();

      alert(language === "en" ? "Posted successfully (demo)." : "வெற்றிகரமாகப் பதிவேற்றப்பட்டது (டெமோ).");
      // clear form
      setLandType("");
      setTaluk("");
      setSize("");
      setPrice("");
      setContact("");
      setMedia([]);
      setActiveIndex(0);
    } catch (err) {
      console.error(err);
      alert(language === "en" ? "Upload failed" : "பதிவேற்றம் தோல்வி");
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <div className={`district-container ${open ? "open" : ""}`}>
      <div className="district-header">
        <div>
          <h3>{district}</h3>
          <p className="muted">{language === "en" ? `Taluks: ${taluks.join(", ")}` : `தாலுக்கள்: ${taluks.join(", ")}`}</p>
        </div>
        <div className="header-actions">
          <button className="small-btn" onClick={toggleOpen}>{open ? (language === "en" ? "Collapse" : "மூட") : (language === "en" ? "Open" : "திற")}</button>
        </div>
      </div>

      {open && (
        <div className="district-body">
          {/* Left: media viewer */}
          <div className="media-col">
            <div className="media-viewer">
              {media.length === 0 ? (
                <div className="media-placeholder">
                  {language === "en" ? "No media yet — use 'Add' to upload photos/videos." : "இப்போது ஊடகம் எதுவுமில்லை — புகைப்படங்கள்/வீடியோக்களை பதிவேற்ற 'Add' ஐப் பயன்படுத்துக."}
                </div>
              ) : (
                <>
                  {media[activeIndex] && media[activeIndex].type === "video" ? (
                    <video key={media[activeIndex].id} src={media[activeIndex].url} controls className="media-main" />
                  ) : (
                    <img key={media[activeIndex] && media[activeIndex].id} src={media[activeIndex].url} alt="preview" className="media-main" />
                  )}
                </>
              )}
            </div>

            <div className="thumbs">
              {media.map((m, idx) => (
                <div key={m.id} className={`thumb ${idx === activeIndex ? "active" : ""}`}>
                  {m.type === "video" ? (
                    <video src={m.url} onClick={() => setActiveIndex(idx)} />
                  ) : (
                    <img src={m.url} alt={`thumb-${idx}`} onClick={() => setActiveIndex(idx)} />
                  )}
                  <button className="thumb-remove" onClick={() => removeMedia(m.id)}>✕</button>
                </div>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div className="form-col">
            <label>{language === "en" ? "Land Type" : "நில வகை"}</label>
            <select value={landType} onChange={(e) => setLandType(e.target.value)}>
              <option value="">{language === "en" ? "Select type" : "வகையை தேர்ந்தெடுக்கவும்"}</option>
              <option value="Agricultural">{language === "en" ? "Agricultural" : "விவசாய நிலம்"}</option>
              <option value="Plots">{language === "en" ? "Plots" : "பிளாட்"}</option>
              <option value="Industrial">{language === "en" ? "Industrial" : "தொழிற்சாலை"}</option>
              <option value="Empty">{language === "en" ? "Empty" : "காலி"}</option>
            </select>

            <label>{language === "en" ? "District" : "மாவட்டம்"}</label>
            <input value={district} readOnly />

            <label>{language === "en" ? "Taluk" : "தாலுக்"}</label>
            <select value={taluk} onChange={(e) => setTaluk(e.target.value)}>
              <option value="">{language === "en" ? "Select taluk" : "தாலுகைத் தேர்ந்தெடுக்கவும்"}</option>
              {taluks.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>

            <label>{language === "en" ? "Land Size" : "நில அளவு"}</label>
            <input value={size} onChange={(e) => setSize(e.target.value)} placeholder={language === "en" ? "e.g., 5 Cents / 2 Acres" : "உதா., 5 சென்ட் / 2 ஏக்கர்"} />

            <label>{language === "en" ? "Price (₹)" : "விலை (₹)"}</label>
            <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="e.g., 3000000" />

            <label>{language === "en" ? "Contact Number" : "தொடர்பு எண்"}</label>
            <input value={contact} onChange={(e) => setContact(e.target.value)} placeholder="10-digit mobile number" />

            <div className="form-actions">
              <button className="post-btn" onClick={handlePost} disabled={uploading}>
                {uploading ? `${progress}%` : (language === "en" ? "Post" : "போஸ்ட்")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add media floating button for this container */}
      <div className="container-add">
        <label className="add-btn">
          ＋ {language === "en" ? "Add" : "சேர்க்க"}
          <input type="file" accept="image/*" multiple style={{ display: "none" }} onChange={handleChoosePhotos} />
        </label>

        <label className="add-btn video">
          ▶ {language === "en" ? "Add Video" : "வீடியோ"}
          <input type="file" accept="video/*" style={{ display: "none" }} onChange={handleChooseVideo} />
        </label>

        {/* small hint for user */}
        <div className="add-hint">{language === "en" ? "Choose Photos / Videos" : "பட்டைகள் / வீடியோக்களை தேர்ந்தெடுக்கவும்"}</div>
      </div>
    </div>
  );
}

/* ---------- Parent Landlist page ---------- */

export default function Landlist() {
  const { language, toggleLanguage } = useContext(LanguageContext);

  // list of districts and their taluks (fixed per your request)
  const districts = useMemo(() => ({
    Kanyakumari: ["Agastheeswaram", "Thovalai", "Killiyoor"],
    Nagercoil: ["Nagercoil North", "Nagercoil South", "Thuckalay"],
    Thirunelveli: ["Palayamkottai", "Tirunelveli", "Radhapuram"],
    Thoothukudi: ["Thoothukudi North", "Thoothukudi South", "Srivaikundam"],
    Virudhunagar: ["Virudhunagar", "Sivakasi", "Aruppukottai"],
  }), []);

  // which district containers are visible/open — allow multiple
  const [visibleDistricts, setVisibleDistricts] = useState([]);

  const toggleDistrictVisibility = (d) => {
    setVisibleDistricts((prev) => (prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]));
  };

  // Global post button (posts the first visible container if any)
  const handleGlobalPost = () => {
    // The per-container post handles the actual posting — global button helps UX.
    alert(language === "en" ? "Use 'Post' inside each container to post. This is a convenience button." : "ஒவ்வொரு கூடாரத்தில் உள்ள 'போஸ்ட்' ஐப் பயன்படுத்தி பதிவேற்றவும்.");
  };

  return (
    <div className="landlist-root">
      <header className="landlist-header">
        <h1>{language === "en" ? "District Land Manager" : "மாவட்ட நில மேலாளர்"}</h1>
        <div className="header-controls">
          <button className="global-lang" onClick={toggleLanguage}>{language === "en" ? "தமிழ்" : "English"}</button>
        </div>
      </header>

      {/* District buttons */}
      <div className="district-buttons">
        {Object.keys(districts).map((d) => (
          <button
            key={d}
            className={`district-btn ${visibleDistricts.includes(d) ? "active" : ""}`}
            onClick={() => toggleDistrictVisibility(d)}
          >
            {d}
          </button>
        ))}
      </div>

      {/* Containers list: only show the ones toggled open */}
      <div className="containers-list">
        {visibleDistricts.length === 0 && (
          <div className="empty-hint">
            {language === "en" ? "Click a district above to open its container." : "மேலுள்ள மாவட்டத்தை கிளிக் செய்து அதன் கூடாரத்தை திறக்கவும்."}
          </div>
        )}

        {visibleDistricts.map((d) => (
          <DistrictContainer
            key={d}
            district={d}
            taluks={districts[d]}
            language={language}
            onGlobalPostClick={handleGlobalPost}
          />
        ))}
      </div>

      {/* Global floating post button */}
      <button className="floating-global-post" onClick={handleGlobalPost}>
        {language === "en" ? "Post Land" : "நிலத்தை பதிவேற்றுக"}
      </button>
    </div>
  );
}
