const AIO_USERNAME = "Birbal_Kumar5040";
const AIO_KEY = "REMOVED_SECRET";

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
      `https://io.adafruit.com/api/v2/${AIO_USERNAME}/feeds/smartled-registry/data?limit=1`,
      {
        headers: {
          "X-AIO-Key": AIO_KEY,
        },
      }
    );

    const data = await response.json();

    if (data.length > 0) {
      localStorage.setItem(
        "lastHeartbeat",
        new Date(data[0].created_at).getTime()
      );
    }
  } catch (error) {
    console.error(error);
  }
}