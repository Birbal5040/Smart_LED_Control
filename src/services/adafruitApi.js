const AIO_USERNAME = import.meta.env.VITE_AIO_USERNAME;
const AIO_KEY = import.meta.env.VITE_AIO_KEY;

export async function sendBrightness(device, value) {
  try {
    const feedName = device;
   
    console.log("Feed Name:", feedName);
    
   const url =
  `https://io.adafruit.com/api/v2/${AIO_USERNAME}/feeds/${feedName}/data`;

console.log("URL =", JSON.stringify(url));
console.log("Feed =", JSON.stringify(feedName));


    const response = await fetch(url, {
      method: "POST",
      headers: {
        "X-AIO-Key": AIO_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
       value: `1,${Math.floor(value * 255 / 100)}`
      }),
    });

    const data = await response.json();

    console.log("Adafruit Response:", data);
  } catch (error) {
    console.error(error);
  }
}

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

export async function sendPower(
  device,
  power
) {
  try {
    const feedName = device;

    const url =
      `https://io.adafruit.com/api/v2/${AIO_USERNAME}/feeds/${feedName}/data`;

    const response = await fetch(
      url,
      {
        method: "POST",
        headers: {
          "X-AIO-Key": AIO_KEY,
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          value: power
            ? "1,255"
            : "0,0",
        }),
      }
    );

    const data =
      await response.json();

    console.log(data);
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