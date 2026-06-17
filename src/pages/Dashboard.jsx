import { useState } from "react";
import CameraFeed from "../components/CameraFeed";
import DeviceCard from "../components/DeviceCard";
import { useNavigate } from "react-router-dom";
import { getDevices } from "../services/deviceStore";
import VoiceControl from "../components/VoiceControl";
import { sendBrightness } from "../services/adafruitApi";
function Dashboard() {
  const navigate = useNavigate();
  const [brightness, setBrightness] = useState(50);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [facingMode, setFacingMode] = useState("user");

const handleVoiceCommand = (command) => {
  console.log(command);

  if (command.includes("turn off")) {
    setBrightness(0);
  }

  if (command.includes("turn on")) {
    setBrightness(100);
  }

  const match = command.match(/\d+/);

  if (match) {
    setBrightness(Number(match[0]));
  }
};

  // const [selectedDevice, setSelectedDevice] = useState("🟢 {selectedDevice}");
  const devices = [
  { id: 1, name: "Living Room LED", status: true },
  { id: 2, name: "Bedroom LED", status: true },
  { id: 3, name: "Kitchen LED", status: false },
];
  return (
    
    <div
    
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        padding: "20px",
        
      }}
    >
<h1
  style={{
    textAlign: "center",
    color: "white",
    fontSize: "3rem",
    marginBottom: "20px",
  }}
>
  Smart LED Dashboard
</h1>


<div
  style={{
    background: "#1e293b",
    padding: "15px",
    borderRadius: "12px",
    marginBottom: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  }}
>
  <span>🟢 {selectedDevice || "No device selected"}</span>

  <button
    style={{
      background: "#2563eb",
      color: "white",
      border: "none",
      padding: "10px 15px",
      borderRadius: "8px",
      cursor: "pointer",
    }}
  >
   <button
  onClick={() => navigate("/devices")}
  style={{
    background: "#2563eb",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "8px",
    cursor: "pointer",
  }}
>
  Device Manager
</button>
  </button>
</div>





     {/* Camera Section */}
<div
  style={{
    height: "250px",
    background: "#1e293b",
    borderRadius: "15px",
    marginTop: "20px",
    overflow: "hidden",
  }}
>
  <CameraFeed facingMode={facingMode} />
</div>

{/* Brightness */}
<div
  style={{
    marginTop: "20px",
    padding: "15px",
    background: "#1e293b",
    borderRadius: "15px",
  }}
>
  <h3>Brightness</h3>

  <input
  type="range"
  min="0"
  max="100"
  value={brightness}
  onChange={(e) => {
  setBrightness(Number(e.target.value));
}}

onMouseUp={(e) => {
  const value = Number(e.target.value);

  if (selectedDevice) {
    sendBrightness(selectedDevice, value);
  }
    console.log(
      "Device:",
      selectedDevice,
      "Brightness:",
      value
    );
  }}
  style={{ width: "100%" }}
/>

  <p
    style={{
      textAlign: "center",
      marginTop: "10px",
      fontSize: "18px",
    }}
  >
    💡 Brightness: {brightness}%
  </p>
</div>

      {/* Controls */}
      <div
        style={{
          display: "flex",
          gap: "15px",
          marginTop: "20px",
        }}
      >
        <VoiceControl
  onCommand={handleVoiceCommand}
/>

       <button
  onClick={() =>
    setFacingMode(
      facingMode === "user"
        ? "environment"
        : "user"
    )
  }
  style={{
    flex: 1,
    padding: "15px",
    borderRadius: "12px",
    border: "none",
    background: "#2563eb",
    color: "white",
  }}
>
  📷 Flip Camera
</button>
      </div>

      {/* Devices */}
      <div
        style={{
          marginTop: "25px",
          background: "#1e293b",
          padding: "20px",
          borderRadius: "15px",
        }}
      >
        <h3>Devices</h3>

      {getDevices().map((device, index) => (
  <DeviceCard
  key={index}
  name={device}
  status="Online"
  onSelect={setSelectedDevice}
/>
))}


      </div>
    </div>
  );
}

export default Dashboard;