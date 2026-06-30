import { useEffect, useRef } from "react";

import {
  FilesetResolver,
  HandLandmarker,
} from "@mediapipe/tasks-vision";

function HandTracker() {
  const videoRef = useRef(null);
  const handLandmarkerRef = useRef(null);

  useEffect(() => {

  async function loadModel() {
  console.log("Loading MediaPipe...");

  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
  );

  handLandmarkerRef.current =
    await HandLandmarker.createFromOptions(
      vision,
      {
        baseOptions: {
          modelAssetPath:
            "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
        },

        runningMode: "VIDEO",

        numHands: 1,
      }
    );

  console.log("✅ Model Loaded");
}

  async function startCamera() {
    try {
      console.log("Starting camera...");

      const stream =
        await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "user",
          },
        });

      console.log("Camera stream:", stream);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;

        await videoRef.current.play();

        console.log("Camera Started Successfully");
      }
    } catch (err) {
      console.error("Camera Error:", err);
    }
  }

  // 👇 This line was missing
  async function initialize() {
  await loadModel();
  await startCamera();
}

initialize();

}, []);

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
    </div>
  );
}

export default HandTracker;