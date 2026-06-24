import { getDevices, saveDevices } from "../services/deviceStore";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDiscoveredDevices } from "../services/discoveryService";

function DeviceManager() {
  const navigate = useNavigate();
   const [devices, setDevices] = useState(getDevices());
   const [selectedDevice, setSelectedDevice] = useState(
  localStorage.getItem("selectedDevice")
);
   const [discoveredDevices, setDiscoveredDevices] = useState([]);
   useEffect(() => {
  loadDevices();
}, []);

async function loadDevices() {
  const devices = await getDiscoveredDevices();
  setDiscoveredDevices(devices);
}
  const addDevice = (deviceName = null) => {
  const name =
    deviceName || prompt("Enter Device Name");



  if (name) {
    const updated = [...devices, name];

    setDevices(updated);
    saveDevices(updated);
  }
};

 const deleteDevice = (deviceName) => {
    const updated = devices.filter(
      (device) => device !== deviceName
    );

    setDevices(updated);
    saveDevices(updated);
  };


const selectDevice = (deviceName) => {
  localStorage.setItem(
    "selectedDevice",
    deviceName
  );

  setSelectedDevice(deviceName);

  alert(`${deviceName} selected!`);
};


  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        padding: "20px",
      }}
    >
      <h1>Device Manager</h1>
      <button
  onClick={() => navigate("/dashboard")}
  style={{
    background: "#2563eb",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "8px",
    cursor: "pointer",
    marginBottom: "20px",
  }}
>
  ← Back to Dashboard
</button>

      <div
        style={{
          background: "#1e293b",
          padding: "20px",
          borderRadius: "12px",
          marginTop: "20px",
        }}
      >

    <h2
  style={{
    color: "#3b82f6",
    marginTop: "30px",
  }}
>
  DISCOVERED DEVICES
</h2>

<p
  style={{
    color: "#94a3b8",
    marginBottom: "20px",
  }}
>
  Devices currently powered on and broadcasting
</p>

{discoveredDevices.length === 0 ? (
  <p style={{ color: "#94a3b8" }}>
    No new devices detected.
  </p>
) : (
  discoveredDevices.map((device) => (
  <div
    key={device.key}
    style={{
      background: "#0f172a",
      padding: "15px",
      borderRadius: "12px",
      marginBottom: "10px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}
  >
    <div>
  <div>
    <strong>{device.key}</strong>
  </div>

  <div
    style={{
      color: "#22c55e",
      fontSize: "14px",
      marginTop: "5px",
    }}
  >
    🟢 Online
  </div>
</div>

    <button
      onClick={() => {
        const friendlyName = prompt(
          `Enter name for ${device.key}`
        );

        if (friendlyName) {
          addDevice(friendlyName);
        }
      }}
      style={{
        background: "#2563eb",
        color: "white",
        border: "none",
        padding: "8px 15px",
        borderRadius: "8px",
        cursor: "pointer",
      }}
    >
      Add
    </button>
  </div>
))
)}

 <h2
  style={{
    color: "#3b82f6",
    marginTop: "30px",
  }}
>
  SAVED DEVICES
</h2>       

       {devices.map((device, index) => (
  <div
    key={index}
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "10px",
      padding: "10px",
      background: "#0f172a",
      borderRadius: "8px",
    }}
  >
  <div>
  {selectedDevice === device
    ? `🟢 ${device} (Selected)`
    : device}
</div>

    <div
  style={{
    display: "flex",
    gap: "10px",
  }}
>
  <button
    onClick={() => selectDevice(device)}
    style={{
      background: "#22c55e",
      color: "white",
      border: "none",
      padding: "8px 12px",
      borderRadius: "6px",
      cursor: "pointer",
    }}
  >
    Select
  </button>

  <button
    onClick={() => deleteDevice(device)}
    style={{
      background: "#ef4444",
      color: "white",
      border: "none",
      padding: "8px 12px",
      borderRadius: "6px",
      cursor: "pointer",
    }}
  >
    Delete
  </button>
</div>
  </div>
))}

      </div>
    </div>
  );
}

export default DeviceManager;