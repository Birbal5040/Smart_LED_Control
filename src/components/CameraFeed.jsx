import { useEffect, useRef } from "react";

function CameraFeed({ facingMode }) {
  const videoRef = useRef(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
  video: {
    facingMode: facingMode,
  },
})
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => {
        console.error(err);
      });
  }, [facingMode]);

  return (
    <video
      ref={videoRef}
      autoPlay
      playsInline
      style={{
        width: "100%",
        height: "250px",
        objectFit: "cover",
        borderRadius: "15px",
      }}
    />
  );
}

export default CameraFeed;