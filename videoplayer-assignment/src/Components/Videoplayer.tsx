// VideoPlayer.tsx
"use client"
import React, { useState, useRef, useEffect } from 'react';
import { BsFillVolumeUpFill, BsPauseFill, BsPlayFill, BsFullscreen, BsFullscreenExit } from 'react-icons/bs';

interface VideoPlayerProps {
    current: string; // Define the type of the 'current' prop
    title: string,
    desc: string,
    thumb: string
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ current, title, desc, thumb }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.5);
    const [showVolumeRange, setShowVolumeRange] = useState(false);
    const [mute, setMute] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            video.addEventListener('timeupdate', updateTime);
            video.autoplay = true;
            video.muted = mute;
            setIsPlaying(true)
            setTimeout(() => {
                setDuration(video.duration);


            }, 100)
        }
        return () => {
            if (video) {
                video.removeEventListener('timeupdate', updateTime);
            }
        };
    }, [current]);

    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            setVolume(video.volume);
        }
    }, [mute]);

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
        const video = videoRef.current;
        if (video) {
            if (isPlaying) {
                video.pause();
            } else {
                video.play();
            }
        }
    };

    const updateTime = () => {
        const video = videoRef.current;
        if (video) {
            setCurrentTime(video.currentTime);
            setDuration(video.duration);
        }
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const video = videoRef.current;
        if (video) {
            video.currentTime = parseFloat(e.target.value);
            setCurrentTime(video.currentTime);
        }
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const video = videoRef.current;
        if (video) {
            video.volume = parseFloat(e.target.value);
            setVolume(video.volume);
        }

    };

    const handleSpeedChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const video = videoRef.current;
        if (video) {
            video.playbackRate = parseFloat(e.target.value);
        }
    };

    const toggleFullscreen = () => {
        const video = videoRef.current;
        if (video) {
            if (!isFullscreen) {
                if (video.requestFullscreen) {
                    video.requestFullscreen();
                }


            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                    //@ts-ignore
                } else if (document.mozCancelFullScreen) {
                    //@ts-ignore
                    document.mozCancelFullScreen();
                }
            }
        }
    };

    return (
        <div className="w-full md:w-full lg:w-3/4 xl:w-4/5 max-w-4xl">
            <div className='relative w-full'>
                <video
                    ref={videoRef}
                    src={current}
                    poster={thumb}
                    className="rounded-lg"
                ></video>
                <div className="absolute bottom-2   flex items-center justify-between mt-2 w-full pr-5">
                    <input
                        type="range"
                        min={0}
                        max={duration}
                        value={currentTime}
                        onChange={handleSeek}
                        className="absolute bottom-10  w-[95%] left-4 m-auto"
                    />
                    <div className="relative flex items-center ml-5 text-white ">
                        <div onClick={togglePlay} className="mr-2 ">
                            {isPlaying ? <BsPauseFill /> : <BsPlayFill />}
                        </div>
                        <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
                    </div>
                    <div className="flex items-center">
                        <div className="flex items-center relative">
                            <div
                                className="flex items-center relative"
                                onMouseEnter={() => setShowVolumeRange(true)}
                                onMouseLeave={() => setShowVolumeRange(false)}
                            >
                                <div className="flex items-center text-white">
                                    {showVolumeRange && (
                                        <input
                                            type="range"
                                            min={0}
                                            max={1}
                                            step={0.01}
                                            value={volume}
                                            onChange={handleVolumeChange}
                                            className="mr-3 w-20"
                                        />
                                    )}
                                    <BsFillVolumeUpFill className="mr-5" />
                                </div>
                            </div>
                            <select onChange={handleSpeedChange} className='text-black px-1 py-1 rounded  border-gray-300 focus:outline-none'>
                                <option value="1">1x</option>
                                <option value="1.5">1.5x</option>
                                <option value="2">2x</option>
                            </select>
                        </div>
                        <div className="ml-2 text-white" onClick={toggleFullscreen}>
                            {isFullscreen ? <BsFullscreenExit /> : <BsFullscreen />}
                        </div>
                    </div>
                </div>
            </div>
            <h1 className='font-bold text-3xl mt-5 '>{title}</h1>
            <h2 className='text-md text-justify mt-3  text-wrap'>{desc}</h2>

        </div>
    );
};

export default VideoPlayer;
const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);

    if (hours > 0) {
        return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    } else {
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
};