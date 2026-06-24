import { useNavigate } from "react-router-dom";

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
          margin: "10px 0",
        }}
      >
        Smart LED
      </h1>

      <p
        style={{
          color: "#94a3b8",
          fontSize: "1.5rem",
          textAlign: "center",
        }}
      >
        Fleet Dashboard — Powered by Adafruit IO
      </p>

      <button
        onClick={() => navigate("/dashboard")}
        style={{
          marginTop: "40px",
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