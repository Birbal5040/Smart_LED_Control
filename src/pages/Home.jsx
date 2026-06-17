import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#0f172a,#1e3a8a,#312e81)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "4rem" }}>💡 Smart LED</h1>

        <p style={{ marginTop: "10px" }}>
          Fleet Dashboard — Powered by Adafruit IO
        </p>

        <button
          onClick={() => navigate("/dashboard")}
          style={{
            marginTop: "25px",
            padding: "15px 40px",
            borderRadius: "12px",
            border: "none",
            background: "#3b82f6",
            color: "white",
            cursor: "pointer",
            fontSize: "18px",
          }}
        >
          Open Dashboard
        </button>
      </div>
    </div>
  );
}

export default Home;