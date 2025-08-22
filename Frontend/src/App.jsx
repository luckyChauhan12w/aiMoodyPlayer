import React, { useState, useRef } from "react";
import MoodDetector from "./MoodDetector";

const songs = [
  {
    id: 1,
    title: "Shape of You",
    artist: "Ed Sheeran",
    src: "/songs/shape-of-you.mp3",
  },
  {
    id: 2,
    title: "Blinding Lights",
    artist: "The Weeknd",
    src: "/songs/blinding-lights.mp3",
  },
  {
    id: 3,
    title: "Levitating",
    artist: "Dua Lipa",
    src: "/songs/levitating.mp3",
  },
  {
    id: 3,
    title: "Levitating",
    artist: "Dua Lipa",
    src: "/songs/levitating.mp3",
  },
  {
    id: 3,
    title: "Levitating",
    artist: "Dua Lipa",
    src: "/songs/levitating.mp3",
  },
  {
    id: 3,
    title: "Levitating",
    artist: "Dua Lipa",
    src: "/songs/levitating.mp3",
  },
  {
    id: 3,
    title: "Levitating",
    artist: "Dua Lipa",
    src: "/songs/levitating.mp3",
  },
  {
    id: 3,
    title: "Levitating",
    artist: "Dua Lipa",
    src: "/songs/levitating.mp3",
  },
];

function App() {
  const [currentSong, setCurrentSong] = useState(songs[0]); // default song
  const audioRef = useRef(null);

  // Play selected song
  const playSong = (song) => {
    setCurrentSong(song);
    if (audioRef.current) {
      audioRef.current.load(); // reload source
      audioRef.current.play(); // auto-play
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-700 p-6">
      <h1 className="text-3xl font-bold text-white text-center mb-8">
        🎶 Moody Player
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Side: Mood Detector */}
        <div className="bg-white rounded-2xl shadow-lg p-6 flex items-center justify-center">
          <MoodDetector />
        </div>

        {/* Right Side: Music Player */}
        <div className="bg-white rounded-2xl max-h-[600px] shadow-lg p-6 flex flex-col w-full">
          {/* Now Playing */}
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-2">
              🎵 Now Playing
            </h2>
            <p className="text-lg font-medium">{currentSong.title}</p>
            <p className="text-sm text-gray-500">{currentSong.artist}</p>
            <audio ref={audioRef} controls className="w-full mt-4 rounded-lg">
              <source src={currentSong.src} type="audio/mp3" />
              Your browser does not support the audio element.
            </audio>
          </div>

          {/* Playlist */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-700">
              Playlist
            </h3>
            <ul className="divide-y divide-gray-200 max-h-60 overflow-y-auto rounded-lg">
              {songs.map((song) => (
                <li
                  key={song.id}
                  className={`p-3 cursor-pointer hover:bg-indigo-50 transition ${
                    currentSong.id === song.id
                      ? "bg-indigo-100 font-semibold"
                      : ""
                  }`}
                  onClick={() => playSong(song)}
                >
                  <p>{song.title}</p>
                  <p className="text-sm text-gray-500">{song.artist}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
