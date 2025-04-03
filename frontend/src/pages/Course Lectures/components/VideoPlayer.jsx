import React, { useRef, useState, useEffect } from "react";
import {
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeMute,
  FaExpand,
  FaCompress,
  FaForward,
  FaBackward,
} from "react-icons/fa";
import { BsArrowClockwise } from "react-icons/bs";
import { BsArrowCounterclockwise } from "react-icons/bs";

const VideoPlayer = ({ src, lectureDataFetching, lectureData, sectionIds }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isBuffering, setIsBuffering] = useState(true);
  const [showPlayPauseIcon, setShowPlayPauseIcon] = useState(null);
  const [showPlayPauseAnimation, setShowPlayPauseAnimation] = useState(false);
  const [autoplay, setAutoplay] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlayThrough = () => {
      setDuration(video.duration);
      setIsBuffering(false);

      if (autoplay) {
        video.muted = true;
        setIsMuted(true);
        video
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch((err) => console.error("Autoplay failed:", err));
      }
    };

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    const handleWaiting = () => {
      setIsBuffering(true);
    };

    const handlePlaying = () => {
      setIsBuffering(false);
    };

    video.addEventListener("canplaythrough", handleCanPlayThrough);
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("waiting", handleWaiting);
    video.addEventListener("playing", handlePlaying);

    return () => {
      video.removeEventListener("canplaythrough", handleCanPlayThrough);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("waiting", handleWaiting);
      video.removeEventListener("playing", handlePlaying);
    };
  }, [autoplay, isMuted]);

  //to handle the play pause icon animation in the center of the video
  const handlePlayPauseAnimation = () => {
    setShowPlayPauseAnimation(true);
    setTimeout(() => {
      setShowPlayPauseAnimation(false);
    }, 300);
  };

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.pause();
      setShowPlayPauseIcon("pause");
      handlePlayPauseAnimation();
    } else {
      video.play();
      setShowPlayPauseIcon("play");
      handlePlayPauseAnimation();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = e.target.value;
    setCurrentTime(e.target.value);
  };

  const handleVolumeChange = (e) => {
    const video = videoRef.current;
    if (!video) return;
    const newVolume = parseFloat(e.target.value);
    video.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleForward10 = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = Math.min(video.currentTime + 10, duration);
  };

  const handleBackward10 = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = Math.max(video.currentTime - 10, 0);
  };

  const handleFullscreen = () => {
    const playerContainer = videoRef.current?.parentElement;
    if (!playerContainer) return;

    if (!isFullscreen) {
      if (playerContainer.requestFullscreen) {
        playerContainer.requestFullscreen();
      } else if (playerContainer.webkitRequestFullscreen) {
        playerContainer.webkitRequestFullscreen();
      } else if (playerContainer.mozRequestFullScreen) {
        playerContainer.mozRequestFullScreen();
      } else if (playerContainer.msRequestFullscreen) {
        playerContainer.msRequestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  //to format the video time
  const formatVideoTime = (currentTime, duration) => {
    const formatTime = (time) => {
      const hours = Math.floor(time / 3600);
      const minutes = Math.floor((time % 3600) / 60);
      const seconds = Math.floor(time % 60);

      if (duration >= 3600) {
        return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
          2,
          "0"
        )}:${String(seconds).padStart(2, "0")}`;
      }
      return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
        2,
        "0"
      )}`;
    };
    return `${formatTime(currentTime)} / ${formatTime(duration)}`;
  };

  const handleMouseOverOnVideo = () => {
    setTimeout(() => {
      setShowControls(false);
    }, 5000);
    setShowControls(true);
  };

  useEffect(() => {
    if (lectureDataFetching) {
      setIsPlaying(false);
    }
  }, [lectureDataFetching]);

  return (
    <div
      className={`relative w-[90%] max-h-[80vh] lg:max-h-[70vh] rounded-md mx-auto transition-colors duration-500 bg-black`}
      onMouseMoveCapture={handleMouseOverOnVideo}
      onMouseLeave={() => setShowControls(false)}
    >
      <video ref={videoRef} className="w-full h-full rounded-md" src={src} />

      {/* play pause when clicking in the central area of video  */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          onDoubleClick={handleBackward10}
          className="w-[30%] h-[40%] z-50"
        />
        <div onClick={togglePlayPause} className="w-[40%] h-[40%] z-50" />
        <div onDoubleClick={handleForward10} className="w-[30%] h-[40%] z-50" />
      </div>

      {/* if no video */}
      {!lectureDataFetching && !lectureData?.success && (
        <div className="absolute inset-0 flex items-center justify-center z-50 text-white">
          No lecture selected
        </div>
      )}

      {/* loader */}
      {sectionIds?.sectionId && (lectureDataFetching || isBuffering) && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-t-4 border-primary border-t-white rounded-full animate-spin" />
        </div>
      )}

      {/* play pause button popup */}
      {showPlayPauseIcon !== null && (
        <div
          className="absolute inset-0 flex items-center justify-center 
          animate-fade-in-out transition-opacity duration-400"
        >
          {showPlayPauseIcon === "play" ? (
            <div>
              <FaPlay
                className={`text-white transition-all duration-400 ${
                  showPlayPauseAnimation ? "opacity-80" : "opacity-0 text-6xl"
                } `}
              />
            </div>
          ) : (
            <FaPause
              className={`text-white transition-all duration-400 ${
                showPlayPauseAnimation ? "opacity-80" : "opacity-0 text-6xl"
              }`}
            />
          )}
        </div>
      )}

      {/* controllers  */}
      <div
        className={`${
          showControls ? "opacity-100 duration-300" : "opacity-0 duration-1000"
        } absolute bottom-0 left-0 right-0 bg-transparent p-2 flex flex-col transition-all ${
          !lectureData?.success ? "hidden" : null
        }`}
      >
        <div className="flex-1 mx-4">
          <input
            type="range"
            min={0}
            max={duration}
            step={0.01}
            value={currentTime}
            onChange={handleSeek}
            className="w-full cursor-pointer h-2"
          />
        </div>
        <div className="flex items-center justify-between mx-4">
          <div className="flex items-center space-x-3">
            <button
              onClick={handleBackward10}
              className="text-white hover:text-gray-300 text-2xl cursor-pointer"
              title="10s"
            >
              <BsArrowCounterclockwise />
            </button>
            <button
              onClick={togglePlayPause}
              className="text-white hover:text-gray-300  text-xl cursor-pointer"
            >
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            <button
              onClick={handleForward10}
              className="text-white hover:text-gray-300  text-2xl cursor-pointer"
              title="10s"
            >
              <BsArrowClockwise />
            </button>

            <div>
              <p className="text-white">
                {formatVideoTime(currentTime, duration)}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={toggleMute}
              className="text-white hover:text-gray-300 cursor-pointer"
            >
              {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-16 cursor-pointer"
            />
            <button
              onClick={handleFullscreen}
              className="text-white hover:text-gray-300 cursor-pointer"
            >
              {isFullscreen ? <FaCompress /> : <FaExpand />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
