const AIO_USERNAME = "Birbal_Kumar5040";
const AIO_KEY = "REMOVED_SECRET";

export async function sendBrightness(device, value) {
  try {
    const feedName =
      `smartled-${device.toLowerCase().replace(/\s+/g, "-")}`;

    const url =
  `https://io.adafruit.com/api/v2/${AIO_USERNAME}/feeds/${feedName}/data`;
  

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "X-AIO-Key": AIO_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        value: value,
      }),
    });

    const data = await response.json();

    console.log("Adafruit Response:", data);
  } catch (error) {
    console.error(error);
  }
}