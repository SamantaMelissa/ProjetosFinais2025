import React, { useRef, useState, useEffect } from "react";
import "./AudioPlayer.css";

export default function AudioPlayer({ src }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;

    const onLoaded = () => setDuration(audio.duration);
    const onTime = () => setCurrentTime(audio.currentTime);

    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("timeupdate", onTime);

    return () => {
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("timeupdate", onTime);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;

    if (isPlaying) audio.pause();
    else audio.play();

    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    audio.currentTime = e.target.value;
    setCurrentTime(audio.currentTime);
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return "00:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  return (
    <div className="audio-container">
     <button className="audio-play-btn" onClick={togglePlay}>
    {isPlaying ? (
        <span className="pause-icon">❚❚</span> // O pause (❚❚) geralmente não tem esse problema
    ) : (
        <svg className="play-icon" viewBox="0 0 24 24" fill="black" width="16" height="16">
            <path d="M6 3.5l14 8.5-14 8.5z"/>
        </svg>
    )}
</button>

      <div className="audio-track">
        <input
          type="range"
          className="audio-range"
          min="0"
          max={duration}
          value={currentTime}
          onChange={handleSeek}
        />
      </div>

      <div className="audio-time">
        {formatTime(currentTime)} / {formatTime(duration)}
      </div>

      <audio ref={audioRef} src={src}></audio>
    </div>
  );
}
