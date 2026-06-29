const AIO_USERNAME = import.meta.env.VITE_AIO_USERNAME;
const AIO_KEY = import.meta.env.VITE_AIO_KEY;

export async function getDiscoveredDevices() {
  try {
    const response = await fetch(
      `https://io.adafruit.com/api/v2/${AIO_USERNAME}/feeds`,
      {
        headers: {
          "X-AIO-Key": AIO_KEY,
        },
      }
    );

    const feeds = await response.json();

    return feeds.filter(
      (feed) =>
        feed.key.startsWith("smartled-") &&
        feed.key !== "smartled-all" &&
        feed.key !== "smartled-registry"
    );
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getRegistryHeartbeat() {
  try {
    const response = await fetch(
      `https://io.adafruit.com/api/v2/${AIO_USERNAME}/feeds/smartled-registry/data/last`,
      {
        headers: {
          "X-AIO-Key": AIO_KEY,
        },
      }
    );

    const data = await response.json();

    console.log("Latest Heartbeat:", data);

    localStorage.setItem(
      "lastHeartbeat",
      new Date(data.created_at).getTime()
    );

    localStorage.setItem(
      "lastHeartbeatDevice",
      data.value
    );

  } catch (error) {
    console.error(error);
  }
}