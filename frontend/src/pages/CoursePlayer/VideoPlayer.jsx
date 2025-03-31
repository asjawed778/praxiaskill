
import React, { useRef, useState, useEffect } from "react";
import ReactPlayer from "react-player";
import {
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeMute,
  FaCog,
  FaExpand,
  FaCompress,
  FaRedo,
  FaUndo,
} from "react-icons/fa";
import { useUpdateCompletionMutation } from "../../services/coursePlayer.api";

const VideoPlayer = ({ subSection }) => {
  const playerRef = useRef(null);
  const containerRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [volume, setVolume] = useState(0.8);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const hideControlsTimeout = useRef(null);
  const [hasCompleted80, setHasCompleted80] = useState(false);
  const [updateCompletion] = useUpdateCompletionMutation();

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleProgress = (state) => {
    setProgress(state.playedSeconds);

    if (!duration) return;

    const percent = Math.floor((state.playedSeconds / duration) * 100);
    
    if (percent >= 80 && !hasCompleted80) {
      if (!subSection || !subSection.id) return;
      updateCompletion({ subsectionId: subSection.id, completed: true });
      setHasCompleted80(true);
    }
  };

  const handleSeekChange = (e) => {
    const newTime = parseFloat(e.target.value);
    setProgress(newTime);
    playerRef.current.seekTo(newTime);
  };

  const handleFullScreen = (e) => {
    e.stopPropagation();
    try {
      if (!document.fullscreenElement) {
        containerRef.current.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
      setIsFullScreen(!isFullScreen);
    } catch (error) {
      console.error("Fullscreen error:", error);
    }
    setShowControls(true);
  };

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
      setShowControls(true);
    };
    document.addEventListener("fullscreenchange", handleFullScreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullScreenChange);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative m-4  w-full  mx-6 bg-black rounded-lg overflow-hidden"
      onMouseMove={() => {
        setShowControls(true); 
        clearTimeout(hideControlsTimeout.current);
        hideControlsTimeout.current = setTimeout(() => setShowControls(false), 2000);
      }}
    >
      {/* Video Player */}
      <ReactPlayer
        ref={playerRef}
        url={subSection.videoUrl}
        playing={playing}
        muted={muted}
        volume={volume}
        playbackRate={speed}
        onProgress={handleProgress}
        onDuration={setDuration}
        controls={false}
        width="100%"
        height={isFullScreen ? "100vh" : "400px "}
      />

      {/* Controls */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-black/60 p-3 transition-opacity duration-500 ${
          showControls ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Seek Bar */}
        <input
          type="range"
          min="0"
          max={duration}
          value={progress}
          onChange={handleSeekChange}
          className="w-full h-1 bg-gray-300 rounded-lg cursor-pointer"
          onClick={(e) => e.stopPropagation()}
        />

        {/* Control Buttons */}
        <div className="flex flex-wrap items-center justify-between p-2 text-white">
          {/* Left Controls */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button onClick={() => playerRef.current.seekTo(progress - 10)} className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-700 rounded-full flex items-center justify-center">
              <FaUndo size={16} />
            </button>
            <button onClick={() => setPlaying(!playing)} className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-700 rounded-full flex items-center justify-center">
              {playing ? <FaPause size={18} /> : <FaPlay size={18} />}
            </button>
            <button onClick={() => playerRef.current.seekTo(progress + 10)} className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-700 rounded-full flex items-center justify-center">
              <FaRedo size={16} />
            </button>
            <span className="text-sm sm:text-base">{formatTime(progress)} / {formatTime(duration)}</span>
          </div>

          {/* Center Controls */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <select
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              className="bg-gray-800 text-white p-1 rounded text-xs sm:text-sm cursor-pointer"
              onClick={(e) => e.stopPropagation()}
            >
              <option value="0.5">0.5x</option>
              <option value="1">1x</option>
              <option value="1.5">1.5x</option>
              <option value="2">2x</option>
            </select>
          </div>

          {/* Right Controls */}
          <div className="flex items-center space-x-2 sm:space-x-4 overflow-x-auto">
            <button className="cursor-pointer w-8 h-8 sm:w-10 sm:h-10" onClick={() => setMuted(!muted)}>
              {muted ? <FaVolumeMute size={16} /> : <FaVolumeUp size={16} />}
            </button>
            <button className="cursor-pointer w-8 h-8 sm:w-10 sm:h-10" onClick={(e) => e.stopPropagation()}>
              <FaCog size={16} />
            </button>
            <button className="cursor-pointer w-8 h-8 sm:w-10 sm:h-10" onClick={handleFullScreen}>
              {isFullScreen ? <FaCompress size={16} /> : <FaExpand size={16} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;