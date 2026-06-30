const AIO_USERNAME = import.meta.env.VITE_AIO_USERNAME;
const AIO_KEY = import.meta.env.VITE_AIO_KEY;
export async function sendToAllDevices(
  value
) {
  try {
    const url =
      `https://io.adafruit.com/api/v2/${AIO_USERNAME}/feeds/smartled-all/data`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "X-AIO-Key": AIO_KEY,
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        value,
      }),
    });

    const data =
      await response.json();

    console.log(
      "Fleet Response:",
      data
    );
  } catch (error) {
    console.error(error);
  }
}

export async function sendPower(device, power) {
  try {
    console.log("========== sendPower ==========");
    console.log("Feed:", device);
    console.log("Power:", power);

    const feedName = device;

    const url =
      `https://io.adafruit.com/api/v2/${AIO_USERNAME}/feeds/${feedName}/data`;

    console.log("URL:", url);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "X-AIO-Key": AIO_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        value: power ? "1,255" : "0,0",
      }),
    });

    const data = await response.json();

    console.log("Response:", data);
  } catch (error) {
    console.error(error);
  }
}


export async function sendBrightness(device, brightness) {
  try {
    if (!device) return;

    const feedName = device;

    const url =
      `https://io.adafruit.com/api/v2/${AIO_USERNAME}/feeds/${feedName}/data`;

    const pwm = Math.round((brightness / 100) * 255);
    console.log("Feed:", feedName);
    console.log("Brightness:", brightness);
    console.log("PWM:", pwm);
    console.log("URL:", url);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "X-AIO-Key": AIO_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        value: brightness === 0
          ? "0,0"
          : `1,${pwm}`,
      }),
    });

    const data = await response.json();

    console.log("Brightness Response:", data);

  } catch (error) {
    console.error(error);
  }
}

export async function resetDevice(
  device
){
  if (!device) {
    alert("Please select a device first");
    return;
  }
  try {
    const feedName = device;

    const url =
      `https://io.adafruit.com/api/v2/${AIO_USERNAME}/feeds/${feedName}/data`;

    await fetch(url, {
      method: "POST",
      headers: {
        "X-AIO-Key": AIO_KEY,
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        value: "RESET",
      }),
    });

    console.log(
      "Reset command sent"
    );
  } catch (error) {
    console.error(error);
  }
}