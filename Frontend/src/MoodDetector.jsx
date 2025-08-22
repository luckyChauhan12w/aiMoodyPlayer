import React, { useRef, useState } from "react";
import * as faceapi from "face-api.js";

export default function MoodDetector() {
  const videoRef = useRef(null);
  //   const canvasRef = useRef(null);
  const [mood, setMood] = useState("Detecting...");

  const runDetaction = () => {
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
  };

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
      } else {
        setMood("face note detacting...");
      }

      //   console.log(detections[0]?.expressions || "Face not detected!");
    }, 500);
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg p-6 max-w-lg w-full text-center">
        <h2 className="text-2xl font-semibold mb-4">
          😀 Current Mood: <span className="text-indigo-600">{mood}</span>
        </h2>

        <div className="rounded-xl overflow-hidden border-4 bg-black border-indigo-200 shadow-md mb-4">
          <video
            ref={videoRef}
            autoPlay
            muted
            width="640"
            height="480"
            onPlay={handleVideoPlay}
            className="w-full h-auto"
          />
        </div>

        <button
          onClick={runDetaction}
          className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl shadow transition"
        >
          Start Detection
        </button>
      </div>
    </>
  );
}
