import { useEffect } from "react";
import { useVideo } from "../context/VideoContext";
import { Sidebar } from "./Sidebar";
import { VideoBlock } from "./VideoBlock";

export const LikedVideos = () => {
  const { getLikedVideos, videoState } = useVideo();
  useEffect(() => {
    getLikedVideos();
  }, []);
  return (
    <div className="app-body">
      <Sidebar />
      <div className="vl-page-container">
        <h1 className="txt-3">Liked Videos</h1>
        <div className="video-list-container mt-1 flex-row g-1">
          {videoState?.likedVideos?.map((video) => (
            <VideoBlock video={video} />
          ))}
        </div>
      </div>
    </div>
  );
};
