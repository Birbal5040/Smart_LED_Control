export const getDevices = () => {
  return JSON.parse(localStorage.getItem("devices")) || [];
};

export const saveDevices = (devices) => {
  localStorage.setItem("devices", JSON.stringify(devices));
};