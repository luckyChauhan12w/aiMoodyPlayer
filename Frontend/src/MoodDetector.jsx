import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";

export default function MoodDetector() {
  const videoRef = useRef(null);
  //   const canvasRef = useRef(null);
  const [mood, setMood] = useState("Detecting...");

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "/models";
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
    };

    const startVideo = () => {
      navigator.mediaDevices
        .getUserMedia({ video: {} })
        .then((stream) => {
          videoRef.current.srcObject = stream;
        })
        .catch((err) => console.error("Camera error:", err));
    };

    loadModels().then(startVideo);
  }, []);

  const handleVideoPlay = () => {
    const video = videoRef.current;
    // const canvas = canvasRef.current;

    // const displaySize = { width: video.width, height: video.height };
    // faceapi.matchDimensions(canvas, displaySize);

    setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceExpressions();

      //   const resized = faceapi.resizeResults(detections, displaySize);
      //   canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
      //   faceapi.draw.drawDetections(canvas, resized);
      //   faceapi.draw.drawFaceExpressions(canvas, resized);

      if (detections.length > 0) {
        const emotions = detections[0].expressions;
        const dominant = Object.keys(emotions).reduce((a, b) =>
          emotions[a] > emotions[b] ? a : b
        );
        setMood(dominant);
      }
    }, 500);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>😀 Current Mood: {mood}</h2>
      <video
        ref={videoRef}
        autoPlay
        muted
        width="640"
        height="480"
        onPlay={handleVideoPlay}
      />
      {/* <canvas
        ref={canvasRef}
        width="640"
        height="480"
        style={{ position: "absolute", top: 0, left: 0 }}
      /> */}
    </div>
  );
}
