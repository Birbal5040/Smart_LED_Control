import { useState } from "react";
import { getDevices, saveDevices } from "../services/deviceStore";
import { useNavigate } from "react-router-dom";

function DeviceManager() {
  const navigate = useNavigate();
   const [devices, setDevices] = useState(getDevices());
  const addDevice = () => {
  const name = prompt("Enter Device Name");

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
        <h3>Discovered Devices</h3>

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
    <span>{device}</span>

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
))}

        <button
          style={{
            padding: "10px 15px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "8px",
          }}
        >
        <button
  onClick={addDevice}
  style={{
    padding: "10px 15px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  }}
>
  Add Device
</button>
        </button>
      </div>
    </div>
  );
}

export default DeviceManager;