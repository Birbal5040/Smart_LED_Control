import HandTracker from "../components/HandTracker";

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

const [selectedDevice, setSelectedDevice] = useState(() => {
  const saved = localStorage.getItem("selectedDevice");

  if (!saved) return null;

  try {
    return JSON.parse(saved);
  } catch {
    // Old format stored as plain string
    return {
      name: saved,
      feed: saved,
    };
  }
});

const [deviceStatus, setDeviceStatus] = useState("Offline");

const [controlMode, setControlMode] = useState("selected");

const [facingMode, setFacingMode] = useState("user");

const [cameraEnabled, setCameraEnabled] = useState(false);
  
  
useEffect(() => {
  if (selectedDevice) {
    localStorage.setItem(
      "selectedDevice",
      JSON.stringify(selectedDevice)
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
    const lastHeartbeat = Number(
      localStorage.getItem("lastHeartbeat")
    );

    const heartbeatDevice =
      localStorage.getItem("lastHeartbeatDevice");

    if (
      selectedDevice &&
      heartbeatDevice === selectedDevice.feed &&
      Date.now() - lastHeartbeat < 90000
    ) {
      setDeviceStatus("Online");
    } else {
      setDeviceStatus("Offline");
    }
  }, 2000);

  return () => clearInterval(interval);
}, [selectedDevice]);


const handleVoiceCommand = (command) => {
  console.log("Voice:", command);

  if (!selectedDevice) {
    alert("Please select a device first.");
    return;
  }

  // Turn ON
  if (command.includes("turn on")) {
    setBrightness(100);

    sendPower(selectedDevice.feed, true);
    return;
  }

  // Turn OFF
  if (command.includes("turn off")) {
    setBrightness(0);

    sendPower(selectedDevice.feed, false);
    return;
  }

  // Brightness
  const match = command.match(/\d+/);

  if (match) {
    const value = Number(match[0]);

    setBrightness(value);

    sendBrightness(selectedDevice.feed, value);
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
    background: "#1d0f2a",
    color: "white",
    padding: "20px",
    maxWidth: "1200px",
    margin: "0 auto",
    width: "100%",
    boxSizing: "border-box",
  }}
>
<h1
  style={{
    fontSize: "clamp(2rem,5vw,3.5rem)",
    marginTop: "30px",
    marginBottom: "10px",
    textAlign: "center",
    color: "white",
  }}
>
  Smart LED Dashboard
</h1>
<p
  style={{
    color: "#94a3b8",
    textAlign: "center",
    fontSize: "clamp(0.9rem,2vw,1.1rem)",
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
    flexWrap: "wrap",
    gap: "15px",
  }}
>
 
 <div
  style={{
    fontSize: "18px",
    fontWeight: "bold",
  }}
>
  {deviceStatus === "Online" ? "🟢" : "🔴"}{" "}
  {selectedDevice?.name || "No Device Selected"}

  <div
    style={{
      fontSize: "14px",
      color: "#94a3b8",
      marginTop: "5px",
    }}
  >
    Status: {deviceStatus}
  </div>
</div>




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
  background:"#1e293b",
  padding:"20px",
  marginTop:"20px",
  borderRadius:"15px",
  width:"100%",
  boxSizing:"border-box",
}}
>
 {cameraEnabled ? (
  <HandTracker
    selectedDevice={selectedDevice}
  />
) : (
  <div
  style={{
    height: "280px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "#94a3b8",
  }}
>
  <h1 style={{ fontSize: "60px" }}>📷</h1>

  <h3>Camera is OFF</h3>

  <p>
    Click "Start Camera" below
  </p>
</div>
)}
</div>

<div
  style={{
    background: "#1e293b",
    padding: "20px",
    marginTop: "20px",
    borderRadius: "15px",
    width: "100%",
    boxSizing: "border-box",
  }}
>
  <GestureControl
    onBrightnessChange={(value) => {
      setBrightness(value);

      if (controlMode === "all") {
        sendToAllDevices(value);
      } else if (selectedDevice) {
        sendBrightness(selectedDevice.feed, value)
      }
    }}
  />
</div>

{/* Brightness */}
<div
  style={{
  background:"#1e293b",
  padding:"20px",
  marginTop:"20px",
  borderRadius:"15px",
  width:"100%",
  boxSizing:"border-box",
}}
>
  <h3
  style={{
    textAlign: "center",
    fontSize: "22px",
    marginBottom: "20px",
  }}
>
  💡 Brightness Control
</h3>

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

  console.log("Selected Device:", selectedDevice);
  console.log("Control Mode:", controlMode);

  if (selectedDevice) {
    if (controlMode === "all") {
      sendToAllDevices(value);
    } else {
      sendBrightness(selectedDevice.feed, value);
    }
  }
    console.log(
      "Device:",
      selectedDevice,
      "Brightness:",
      value
    );
  }}
  style={{
  width: "100%",
  cursor: "pointer",
}}
/>

  <p
  style={{
    textAlign: "center",
    marginTop: "15px",
    fontSize: "22px",
    fontWeight: "bold",
    color: "#60a5fa",
  }}
>
    💡 Brightness: {brightness}%
  </p>
</div>

<div
  style={{
  background:"#1e293b",
  padding:"20px",
  marginTop:"20px",
  borderRadius:"15px",
  width:"100%",
  boxSizing:"border-box",
}}
>
  <h3
  style={{
    textAlign: "center",
    marginBottom: "25px",
    fontSize: "24px",
  }}
>
    Device Controls
  </h3>

  <div
    style={{
      display: "flex",
      gap: "15px",
      flexWrap: "wrap",
      justifyContent: "center",
    }}
  >
    <button
     onClick={() => {
  console.log("Selected Device:", selectedDevice);

  if (!selectedDevice) {
    alert("Please select a device first.");
    return;
  }

  sendPower(selectedDevice.feed, true);
}}
      onMouseEnter={(e) => {
  e.target.style.transform =
    "scale(1.05)";
  e.target.style.boxShadow =
    "0 8px 20px rgba(0,0,0,0.4)";
}}

onMouseLeave={(e) => {
  e.target.style.transform =
    "scale(1)";
}}
      style={{
  flex: 1,
  minWidth: "180px",
  padding: "15px",
  background: "#22c55e",
  color: "white",
  border: "none",
  borderRadius: "12px",
  fontSize: "18px",
  cursor: "pointer",
  transition: "all 0.3s ease",
  height: "60px",
  width: "100%",
}}
    >
      💡 Turn ON
    </button>

    <button
      onClick={() =>
        sendPower(selectedDevice.feed, false)
      }
      onMouseEnter={(e) => {
  e.target.style.transform =
    "scale(1.05)";
  e.target.style.boxShadow =
    "0 8px 20px rgba(0,0,0,0.4)";
}}

onMouseLeave={(e) => {
  e.target.style.transform =
    "scale(1)";
  e.target.style.boxShadow =
    "0 4px 12px rgba(0,0,0,0.3)";
}}
      style={{
  flex: 1,
  minWidth: "180px",
  padding: "15px",
  background: "#ef4444",
  color: "white",
  border: "none",
  borderRadius: "12px",
  fontSize: "18px",
  cursor: "pointer",
  transition: "all 0.3s ease",
  height: "60px",
  width: "100%",
}}
    >
      ⚫ Turn OFF
    </button>

    <button
      onClick={() =>
        resetDevice(selectedDevice.feed)
      }
     onMouseEnter={(e) => {
  e.target.style.transform =
    "scale(1.05)";
  e.target.style.boxShadow =
    "0 8px 20px rgba(0,0,0,0.4)";
}}

onMouseLeave={(e) => {
  e.target.style.transform =
    "scale(1)";
  e.target.style.boxShadow =
    "0 4px 12px rgba(0,0,0,0.3)";
}}
      style={{
  flex: 1,
  minWidth: "180px",
  padding: "15px",
  background: "#f59e0b",
  color: "white",
  border: "none",
  borderRadius: "12px",
  fontSize: "18px",
  cursor: "pointer",
  transition: "all 0.3s ease",
  height: "60px",
  width: "100%",
}}
    >
      🔄 Reset Device
    </button>
  </div>
</div>



{/* Controls */}
<div
  style={{
    display: "grid",
    gridTemplateColumns:
    "repeat(auto-fit,minmax(220px,1fr))",
    gap: "15px",
    marginTop: "20px",
  }}
>
  
  <button
    onClick={() =>
      setFacingMode(
        facingMode === "user"
          ? "environment"
          : "user"
      )
    }
    style={{
      padding: "15px",
      background: "#2563eb",
      color: "white",
      border: "none",
      borderRadius: "12px",
      cursor: "pointer",
      fontSize: "16px",
    }}
  >
    🔄 Flip Camera
  </button>

  <button
    onClick={() =>
      setCameraEnabled(
        !cameraEnabled
      )
    }
    style={{
      padding: "15px",
      background:
        cameraEnabled
          ? "#ef4444"
          : "#22c55e",
      color: "white",
      border: "none",
      borderRadius: "12px",
      cursor: "pointer",
      fontSize: "16px",
    }}
  >
    {cameraEnabled
      ? "⏹ Stop Camera"
      : "▶️ Start Camera"}
  </button>
<VoiceControl
  onCommand={handleVoiceCommand}
/>

</div>


      {/* Devices */}
      <div
        style={{
  background:"#1e293b",
  padding:"20px",
  marginTop:"20px",
  borderRadius:"15px",
  width:"100%",
  boxSizing:"border-box",
}}
      >
     <h3
  style={{
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "24px",
  }}
>
  📡 Connected Devices
</h3>

      {getDevices().map((device, index) => (
  <DeviceCard
  key={index}
  name={device.name}
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
  <p
  style={{
    lineHeight: "1.8",
  }}
>
  Developed with ❤️ by <b>Birbal Kumar</b>

  <br />

  B.Tech CSE | AI & Robotics Intern

  <br />

  Robomanthan Pvt. Ltd.
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
  style={{
    color: "#60a5fa",
    transition: "all 0.3s ease",
    display: "inline-flex",
  }}
  onMouseEnter={(e) => {
  e.currentTarget.style.transform = "scale(1.25)";
  e.currentTarget.style.filter =
    "drop-shadow(0 0 10px #60a5fa)";
}}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "scale(1)";
    e.currentTarget.style.filter = "none";
  }}
>
  <FaLinkedin size={30} />
</a>

<a
  href="https://github.com/Birbal5040"
  target="_blank"
  rel="noreferrer"
  style={{
    color: "#60a5fa",
    transition: "all 0.3s ease",
    display: "inline-flex",
  }}
 onMouseEnter={(e) => {
  e.currentTarget.style.transform = "scale(1.25)";
  e.currentTarget.style.filter =
    "drop-shadow(0 0 10px #60a5fa)";
}}
  onMouseLeave={(e) => {
  e.currentTarget.style.transform = "scale(1)";
  e.currentTarget.style.filter = "none";
}}
>
  <FaGithub size={30} />
</a>
  </div>
</div>


      </div>


    </div>
  );
}

// console.log("Selected Device JSON:", JSON.stringify(selectedDevice));

export default Dashboard;