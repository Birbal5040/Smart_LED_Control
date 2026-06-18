import { useState, useEffect } from "react";

function GestureControl({ onBrightnessChange }) {
  const [fingers, setFingers] = useState(0);
  

  return (
    <div
      style={{
        background: "#1e293b",
        padding: "15px",
        marginTop: "20px",
        borderRadius: "15px",
        color: "white",
        textAlign: "center",
      }}
    >
      <h3>✋ Gesture Control</h3>

      <p>Detected Fingers: {fingers}</p>

      <div
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {[0, 1, 2, 3, 4, 5].map((num) => (
          <button
            key={num}
            onClick={() => {
  setFingers(num);

  if (onBrightnessChange) {
    onBrightnessChange(num * 20);
  }
}}
            style={{
              padding: "10px 15px",
              borderRadius: "8px",
              border: "none",
              background: "#2563eb",
              color: "white",
              cursor: "pointer",
            }}
          >
            {num}
          </button>
        ))}
      </div>

      <p style={{ marginTop: "15px" }}>
        Brightness: {fingers * 20}%
      </p>
    </div>
  );
}

export default GestureControl;