import { useNavigate } from "react-router-dom";
import logo from "../assets/company-logo.png";
function Home() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#081229,#1e293b,#3b1f4a)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
      }}
    >

      <img
  src={logo}
  alt="Company Logo"
  style={{
    width: "180px",
    height: "180px",
    objectFit: "contain",
    background: "#ffffff",
    borderRadius: "120px",
    padding: "10px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.35)",
    marginBottom: "15px",
  }}
/>

<p
  style={{
    color: "#cbd5e1",
    fontSize: "1.2rem",
    marginBottom: "50px",
  }}
>
  Powered by <br />
  Robomanthan Incubated by IIT Patna
</p>

      <div
        style={{
          fontSize: "100px",
          color: "#facc15",
        }}
      >
        💡
        
      </div>

      <h1
        style={{
          fontSize: "4rem",
          margin: "50px 0",
          color: "#facc15",
        }}
      >
        Smart LED
      </h1>

      {/* <p
        style={{
          color: "#94a3b8",
          fontSize: "1.5rem",
          textAlign: "center",
        }}
      >
        Fleet Dashboard — Powered by Adafruit IO
      </p> */}

      <button
        onClick={() => navigate("/dashboard")}
        style={{
          marginTop: "50px",
          padding: "20px 50px",
          border: "none",
          borderRadius: "15px",
          background: "#3b82f6",
          color: "white",
          fontSize: "1.5rem",
          cursor: "pointer",
        }}
      >
        Open Dashboard
      </button>
    </div>
  );
}

export default Home;