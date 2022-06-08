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
        {videoState?.likedVideos?.length > 0 ? (
          <div className="video-list-container mt-1 flex-row g-1">
            {videoState?.likedVideos?.map((video) => (
              <VideoBlock video={video} key={video._id} />
            ))}
          </div>
        ) : (
          <div className="empty-list txt-4">
            Nothing in the liked videos. Start liking some videos and show
            appreciation to the creators😃
          </div>
        )}
      </div>
    </div>
  );
};
