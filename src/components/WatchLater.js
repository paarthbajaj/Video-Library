import { VideoBlock } from "./VideoBlock";
import { Sidebar } from "./Sidebar";
import { useVideo } from "../context/VideoContext";
import { useEffect } from "react";

export const WatchLater = () => {
  const { getWatchLaterApi, videoState } = useVideo();
  useEffect(() => {
    getWatchLaterApi();
  }, []);
  return (
    <>
      <div className="app-body">
        <Sidebar />
        <div className="vl-page-container">
          <h1 className="txt-3">Watch Later</h1>
          {videoState?.watchLaterList?.length > 0 ? (
            <div className="video-list-container mt-1 flex-row g-1">
              {videoState?.watchLaterList?.map((video) => (
                <VideoBlock video={video} />
              ))}
            </div>
          ) : (
            <div className="empty-list txt-3">No videos in watch later</div>
          )}
        </div>
      </div>
    </>
  );
};
