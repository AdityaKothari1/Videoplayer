"use client"

import Playlist from "@/Components/Playlist";
import VideoPlayer from "@/Components/Videoplayer";
import Image from "next/image";
import { SetStateAction, useState } from "react";

export default function Home() {

  const [currentVideo, setCurrentVideo] = useState("http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4");
  const [desc, setDesc] = useState<string[]>([])
  const [poster, setPoster] = useState<string>('/assets/images/BigBuckBunny.png')

  const handleVideoChange = (newVideoUrl: string, title: string, description: string, thumb: string) => {
    setCurrentVideo(newVideoUrl);
    setDesc([title, description])
    setPoster(thumb)

  };
  console.log(currentVideo, desc)

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-10  absolute top-24 whitespace-nowrap">
      <div className="flex-col md:flex-row  lg:flex  gap-x-10 ">
        <VideoPlayer current={currentVideo} title={desc[0]} desc={desc[1]} thumb={poster} />

        <Playlist onVideoSelect={handleVideoChange} />
      </div>
    </div>
  );
}
