export const getDevices = () => {
  return JSON.parse(localStorage.getItem("devices")) || [
    "Living Room LED",
  ];
};

export const saveDevices = (devices) => {
  localStorage.setItem("devices", JSON.stringify(devices));
};