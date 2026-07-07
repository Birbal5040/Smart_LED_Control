function DeviceCard({ device, name, status, onSelect,})
 {
  return (
    <div
      style={{
        background: "#0f172a",
        padding: "15px",
        borderRadius: "12px",
        marginTop: "10px",
      }}
    >
      <h3>{name}</h3>

      <p>
        Status: {status ? "Online 🟢" : "Offline 🔴"}
      </p>

      <button
    onClick={() => {
  onSelect(device);
}}
        style={{
          marginTop: "10px",
          padding: "10px 20px",
          background: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
        
      >
        Select Device
      </button>
    </div>
  );
}

export default DeviceCard;