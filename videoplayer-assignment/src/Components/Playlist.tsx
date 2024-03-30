// Playlist.tsx
"use client"

import React, { useEffect, useState } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragOverlay } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, useSortable } from '@dnd-kit/sortable';
import Play from './play';




const Allvideos = [
    {
        "description": "Big Buck Bunny tells the story of a giant rabbit with a heart bigger than himself. When one sunny day three rodents rudely harass him, something snaps... and the rabbit ain't no bunny anymore! In the typical cartoon tradition he prepares the nasty rodents a comical revenge.\n\nLicensed under the Creative Commons Attribution license\nhttp://www.bigbuckbunny.org",
        "sources": ["http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"],
        "subtitle": "By Blender Foundation",
        "thumb": "/assets/images/BigBuckBunny.png",
        "title": "Big Buck Bunny"
    },
    {
        "description": "The first Blender Open Movie from 2006",
        "sources": ["http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"],
        "subtitle": "By Blender Foundation",
        "thumb": "/assets/images/ElephantsDream.jpg",
        "title": "Elephant Dream"
    },
    {
        "description": "HBO GO now works with Chromecast -- the easiest way to enjoy online video on your TV. For when you want to settle into your Iron Throne to watch the latest episodes. For $35.\nLearn how to use Chromecast with HBO GO and more at google.com/chromecast.",
        "sources": ["http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"],
        "subtitle": "By Google",
        "thumb": "/assets/images/ForBiggerBlazes.png",
        "title": "For Bigger Blazes"
    },
    {
        "description": "Introducing Chromecast. The easiest way to enjoy online video and music on your TV—for when Batman's escapes aren't quite big enough. For $35. Learn how to use Chromecast with Google Play Movies and more at google.com/chromecast.",
        "sources": ["http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"],
        "subtitle": "By Google",
        "thumb": "/assets/images/ForBiggerEscapes.jpg",
        "title": "For Bigger Escape"
    },
    {
        "description": "Introducing Chromecast. The easiest way to enjoy online video and music on your TV. For $35.  Find out more at google.com/chromecast.",
        "sources": ["http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"],
        "subtitle": "By Google",
        "thumb": "/assets/images/ForBiggerFun.jpg",
        "title": "For Bigger Fun"
    },
    {
        "description": "Introducing Chromecast. The easiest way to enjoy online video and music on your TV—for the times that call for bigger joyrides. For $35. Learn how to use Chromecast with YouTube and more at google.com/chromecast.",
        "sources": ["http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"],
        "subtitle": "By Google",
        "thumb": "/assets/images/ForBiggerJoyrides.jpg",
        "title": "For Bigger Joyrides"
    },
    {
        "description": "Introducing Chromecast. The easiest way to enjoy online video and music on your TV—for when you want to make Buster's big meltdowns even bigger. For $35. Learn how to use Chromecast with Netflix and more at google.com/chromecast.",
        "sources": ["http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4"],
        "subtitle": "By Google",
        "thumb": "/assets/images/ForBiggerMeltdowns.jpg",
        "title": "For Bigger Meltdowns"
    },
    {
        "description": "Sintel is an independently produced short film, initiated by the Blender Foundation as a means to further improve and validate the free/open source 3D creation suite Blender. With initial funding provided by 1000s of donations via the internet community, it has again proven to be a viable development model for both open 3D technology as for independent animation film.\nThis 15 minute film has been realized in the studio of the Amsterdam Blender Institute, by an international team of artists and developers. In addition to that, several crucial technical and creative targets have been realized online, by developers and artists and teams all over the world.\nwww.sintel.org",
        "sources": ["http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4"],
        "subtitle": "By Blender Foundation",
        "thumb": "/assets/images/Sintel.jpg",
        "title": "Sintel"
    },
    {
        "description": "Smoking Tire takes the all-new Subaru Outback to the highest point we can find in hopes our customer-appreciation Balloon Launch will get some free T-shirts into the hands of our viewers.",
        "sources": ["http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4"],
        "subtitle": "By Garage419",
        "thumb": "/assets/images/SubaruOutbackOnStreetAndDirt.jpg",
        "title": "Subaru Outback On Street And Dirt"
    },
    {
        "description": "Tears of Steel was realized with crowd-funding by users of the open source 3D creation tool Blender. Target was to improve and test a complete open and free pipeline for visual effects in film - and to make a compelling sci-fi film in Amsterdam, the Netherlands.  The film itself, and all raw material used for making it, have been released under the Creatieve Commons 3.0 Attribution license. Visit the tearsofsteel.org website to find out more about this, or to purchase the 4-DVD box with a lot of extras.  (CC) Blender Foundation - http://www.tearsofsteel.org",
        "sources": ["http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"],
        "subtitle": "By Blender Foundation",
        "thumb": "/assets/images/TearsOfSteel.jpg",
        "title": "Tears of Steel"
    },

    {
        "description": "The Smoking Tire is going on the 2010 Bullrun Live Rally in a 2011 Shelby GT500, and posting a video from the road every single day! The only place to watch them is by subscribing to The Smoking Tire or watching at BlackMagicShine.com",
        "sources": ["http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4"],
        "subtitle": "By Garage419",
        "thumb": "/assets/images/WeAreGoingOnBullrun.jpg",
        "title": "We Are Going On Bullrun"
    },

];
interface VideoPlayerProps {
    onVideoSelect: any;


}

const Playlist: React.FC<VideoPlayerProps> = ({ onVideoSelect }) => {


    const [videos, setVideos] = useState(Allvideos);
    const [filteredVideos, setFilteredVideos] = useState(videos);



    const handleVideoClick = (src: string, title: string, description: string, thumb: string) => {
        localStorage.removeItem('playbackState');
        onVideoSelect(src, title, description, thumb)
        // localStorage.setItem("video_url", src)
        // const videoPlayer = document.querySelector('video');
        // if (videoPlayer) {

        //     videoPlayer.src = src;
        //     videoPlayer.play();

        // }
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value.toLowerCase();
        const filtered = videos && videos.filter(video => video.title.toLowerCase().includes(searchTerm));
        setFilteredVideos(filtered);
    };
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    console.log(filteredVideos)
    const handleDragEnd = ({ active, over }: any) => {
        if (active.id !== over.id) {
            const oldIndex = videos.findIndex(video => video.title === active.id);
            const newIndex = videos.findIndex(video => video.title === over.id);
            const reorderedVideos = [...videos];
            const [movedItem] = reorderedVideos.splice(oldIndex, 1);
            reorderedVideos.splice(newIndex, 0, movedItem);
            setFilteredVideos(reorderedVideos);
        }
    };

    return (
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
            <div className="mt-5 md:mt-0 md:w-2/3 lg:w-1/3">
                <h2 className="text-lg font-bold mb-2">Playlist</h2>
                <input
                    type="text"
                    placeholder="Search videos..."
                    onChange={handleSearch}
                    className="mb-2 w-full px-2 py-1 rounded border border-gray-300 text-black "
                />
                <SortableContext
                    items={filteredVideos.map(video => video.title)}

                >
                    <div className='flex flex-col gap-y-1 max-h-screen overflow-hidden overflow-y-scroll mt-5  scrollbar pr-2'>
                        {filteredVideos.map((video_url: any, i) => {
                            return (
                                <Play key={i} videoUrl={video_url.sources[0]} thumb={video_url.thumb} title={video_url.title} description={video_url.description} onVideoClick={handleVideoClick} />
                            );
                        })}
                    </div>
                </SortableContext>

            </div>
        </DndContext>
    );
};

export default Playlist;
