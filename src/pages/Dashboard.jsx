import { useState, useEffect } from "react";
import CameraFeed from "../components/CameraFeed";
import DeviceCard from "../components/DeviceCard";
import { useNavigate } from "react-router-dom";
import { getDevices } from "../services/deviceStore";
import VoiceControl from "../components/VoiceControl";
// import { sendBrightness } from "../services/adafruitApi";
import GestureControl from "../components/GestureControl";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import {
  sendBrightness,
  sendToAllDevices,
  sendPower,
  resetDevice,
} from "../services/adafruitApi";
import {
  getDiscoveredDevices,
  getRegistryHeartbeat
} from "../services/discoveryService";



function Dashboard() {
  const navigate = useNavigate();
  const [brightness, setBrightness] = useState(50);
  const [selectedDevice, setSelectedDevice] =
  useState(
    localStorage.getItem(
      "selectedDevice"
    ) || null
  );
  localStorage.getItem("selectedDevice")

  const [deviceStatus, setDeviceStatus] = useState("Online");
  const [lastHeartbeat, setLastHeartbeat] =
    useState(Date.now());
  const [lastSeen, setLastSeen] =  useState(Date.now());
  const [controlMode, setControlMode] =  useState("selected");
  const [facingMode, setFacingMode] = useState("user");
useEffect(() => {
  if (selectedDevice) {
    localStorage.setItem(
      "selectedDevice",
      selectedDevice
    );
  }
}, [selectedDevice]);

useEffect(() => {
  getRegistryHeartbeat();

  const interval = setInterval(() => {
    getRegistryHeartbeat();
  }, 30000);

  return () => clearInterval(interval);
}, []);

useEffect(() => {
  const interval = setInterval(() => {
    const last =
      localStorage.getItem(
        "lastHeartbeat"
      );

    if (
      last &&
      Date.now() - Number(last) <
        90000
    ) {
      setDeviceStatus("Online");
    } else {
      setDeviceStatus("Offline");
    }
  }, 5000);

  return () =>
    clearInterval(interval);
}, []);


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
<p
  style={{
    textAlign: "center",
    color: "#94a3b8",
    marginBottom: "25px",
  }}
>
  Voice • Gesture • Camera • Adafruit IO Control
</p>

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
 
  <span>
  {deviceStatus === "Online"
  ? "🟢"
  : "🔴"}{" "}
{selectedDevice}
(
{deviceStatus}
)
</span>




<div
  style={{
    marginTop: "10px",
    display: "flex",
    gap: "15px",
    alignItems: "center",
  }}
>
  <label>
    <input
      type="radio"
      checked={controlMode === "selected"}
      onChange={() =>
        setControlMode("selected")
      }
    />
    Selected Device
  </label>

  <label>
    <input
      type="radio"
      checked={controlMode === "all"}
      onChange={() =>
        setControlMode("all")
      }
    />
    All Devices
  </label>
</div>



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

<GestureControl
  onBrightnessChange={(value) => {
    setBrightness(value);

   if (controlMode === "all") {
  sendToAllDevices(value);
} else if (selectedDevice) {
  sendBrightness(selectedDevice, value);
}
  }}
/>

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
    if (controlMode === "all") {
  sendToAllDevices(value);
} else {
  sendBrightness(
    selectedDevice,
    value
  );
}
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

<div
  style={{
    display: "flex",
    gap: "10px",
    marginTop: "15px",
  }}
>
  <button
    onClick={() =>
      sendPower(
        selectedDevice,
        true
      )
    }
  >
    💡 ON
  </button>

  <button
    onClick={() =>
      sendPower(
        selectedDevice,
        false
      )
    }
  >
    ⚫ OFF
  </button>
</div>

<button
  onClick={() =>
    resetDevice(
      selectedDevice
    )
  }
>
  🔄 Reset Device
</button>




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


<div
  style={{
    marginTop: "40px",
    textAlign: "center",
    color: "#94a3b8",
    fontSize: "14px",
  }}
>
  <p>
    Developed by Birbal Kumar | B.Tech CSE | Robomanthan Pvt Ltd
  </p>

  <div
    style={{
      display: "flex",
      justifyContent: "center",
      gap: "20px",
      marginTop: "10px",
    }}
  >
    <a
  href="https://www.linkedin.com/in/birbalkumar-sf32/"
  target="_blank"
  rel="noreferrer"
  style={{ color: "#60a5fa" }}
>
  <FaLinkedin size={24} />
</a>

<a
  href="https://github.com/Birbal5040"
  target="_blank"
  rel="noreferrer"
  style={{ color: "#60a5fa" }}
>
  <FaGithub size={24} />
</a>
  </div>
</div>


      </div>


    </div>
  );
}

export default Dashboard;