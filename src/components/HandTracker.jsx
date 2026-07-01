import { initializeHandTracker } from "../utils/handTracker";
import { useEffect, useRef, useState } from "react";
import { drawLandmarks } from "../utils/landmarkDrawer";
import { countFingers } from "../utils/fingerCounter";
import { sendBrightness } from "../services/adafruitApi";

// import {
//   FilesetResolver,
//   HandLandmarker,
//   DrawingUtils,
// } from "@mediapipe/tasks-vision";

function HandTracker({
    selectedDevice,
    facingMode,
}) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const handLandmarkerRef = useRef(null);
  const animationRef = useRef(null);

  const [fingerCount, setFingerCount] = useState(0);
  const [brightness, setBrightness] = useState(0);

  //  Prevent unnecessary re-renders
const lastFingerRef = useRef(-1);
const lastBrightnessRef = useRef(-1);
const lastSendTime = useRef(0);

const stableFingerRef = useRef(-1);
const fingerChangedTimeRef = useRef(Date.now());

  useEffect(() => {
  async function startCamera() {
    try {
      console.log("Starting camera...");

      const stream =
        await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: facingMode,
          },
        });

      console.log("Camera stream:", stream);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;

       await videoRef.current.play();
        await new Promise((resolve) => {
          videoRef.current.onloadeddata = resolve;
        });
        console.log("Camera Started Successfully");
      }
    } catch (err) {
      console.error("Camera Error:", err);
    }
  }


  function detectHands() {
          if (!videoRef.current || !handLandmarkerRef.current) {
            requestAnimationFrame(detectHands);
            return;
          }

          if (
              videoRef.current.videoWidth === 0 ||
              videoRef.current.videoHeight === 0
            ) {
              requestAnimationFrame(detectHands);
              return;
            }

          const results =
            handLandmarkerRef.current.detectForVideo(
              videoRef.current,
              performance.now()
            );

            

if (results.landmarks.length > 0) {

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    ctx.clearRect(
      0,
      0,
      canvas.width,
      canvas.height
    );

    drawLandmarks(
      ctx,
      results.landmarks[0]
    );

const fingers = countFingers(results.landmarks[0]);

// Finger changed?
if (stableFingerRef.current !== fingers) {

    stableFingerRef.current = fingers;

    fingerChangedTimeRef.current = Date.now();

}

// Wait until the finger count is stable
if (Date.now() - fingerChangedTimeRef.current < 250) {

    animationRef.current =
        requestAnimationFrame(detectHands);

    return;

}

// const brightnessValue = fingers * 20;

// TODO:
// Temporary fix for MediaPipe fist detection.
// Fingers 0 and 1 are treated as OFF.
// Later replace with a stable gesture recognition algorithm.
let brightnessValue;

if (fingers <= 1) {
  brightnessValue = 0;
} else {
  brightnessValue = fingers * 20;
}


if (lastFingerRef.current !== fingers) {
    lastFingerRef.current = fingers;
    setFingerCount(fingers);
}

if (lastBrightnessRef.current !== brightnessValue) {
  lastBrightnessRef.current = brightnessValue;
  setBrightness(brightnessValue);

  // Send only once every 300ms
  if (Date.now() - lastSendTime.current > 300) {
    lastSendTime.current = Date.now();

    if (selectedDevice) {
      console.log(selectedDevice);
      console.log("Selected Device:", selectedDevice);
console.log("Feed:", selectedDevice.feed);
console.log("Brightness:", brightnessValue);

sendBrightness(
  selectedDevice.feed,
  brightnessValue
);
    }
  }
}
// setBrightness(brightness);

}
   animationRef.current = requestAnimationFrame(detectHands);
          }

          detectHands();

  // 👇 This line was missing
  async function initialize() {
  handLandmarkerRef.current =
  await initializeHandTracker();
  await startCamera();
   detectHands();
}

initialize();

return () => {
  if (animationRef.current) {
    cancelAnimationFrame(animationRef.current);
  }

  if (videoRef.current?.srcObject) {
    videoRef.current.srcObject
      .getTracks()
      .forEach(track => track.stop());
  }
};

}, [facingMode]);

  return (
    <div
      style={{
        background: "#1e293b",
        padding: "20px",
        borderRadius: "15px",
      }}
    >
      <h3
        style={{
          color: "white",
          textAlign: "center",
        }}
      >
        ✋ Hand Tracker
      </h3>
      <p
  style={{
    color: "#22c55e",
    textAlign: "center",
    fontSize: "22px",
    fontWeight: "bold",
    marginBottom: "15px",
  }}
>
    Fingers Detected : {fingerCount}
</p>

<p
  style={{
    color: "#38bdf8",
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: "15px",
  }}
>
  Brightness: {brightness}%
</p>

<div
  style={{
    position: "relative",
    width: "100%",
  }}
>
  <video
    ref={videoRef}
    autoPlay
    playsInline
    muted
    style={{
      width: "100%",
      minHeight: "300px",
      background: "#000",
      borderRadius: "15px",
      objectFit: "cover",
    }}
  />

  <canvas
    ref={canvasRef}
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      pointerEvents: "none",
    }}
  />
</div>
    </div>
  );
}

export default HandTracker;