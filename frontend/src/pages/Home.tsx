import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../css/home.css"; // Import the CSS file

const Home = () => {
  const navigate = useNavigate();
  const [fade, setFade] = useState(false);

  useEffect(() => {
    setFade(true);
  }, []);

  return (
    <div
      className={`home-container ${fade ? "fade-in" : "fade-out"}`}
      onClick={() => navigate("/ordertype")}
    >
      {/* Logo */}
      <img src="/logo.png" alt="Script and Sip Logo" className="home-logo" />

      {/* Title */}
      <h1 className="home-title">Script & Sip ☕</h1>

      {/* CTA */}
      <p className="home-cta">Tap anywhere to start</p>

      {/* Background Overlay */}
      <div className="home-overlay"></div>
    </div>
  );
};

export default Home;
