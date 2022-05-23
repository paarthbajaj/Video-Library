import { useVideo } from "../context/VideoContext";
import { Sidebar } from "./Sidebar";
import "./Video.css";
import {
  addToLikedVideos,
  addToWatchHistory,
} from "../backend/utils/serviceUtil";
import { useEffect } from "react";

export const SingleVideoPage = () => {
  const { videoState } = useVideo();
  useEffect(() => {
    addToWatchHistory(videoState.selectedVideo);
  }, []);

  return (
    <div className="app-body">
      <Sidebar />
      <div className="vl-page-container">
        <div className="video-block pt-1 flex-column">
          <iframe
            width="100%"
            height="400px"
            src={`https://www.youtube-nocookie.com/embed/${videoState.selectedVideo.videoUrl}`}
            title="video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
          <div className="single-video-info">
            <div className="flex-row mt-5">
              <span className="single-video-title grow-1 txt-bold">
                {videoState.selectedVideo.title}
              </span>
              <span
                className="cursor-pointer"
                onClick={() => addToLikedVideos(videoState.selectedVideo)}
              >
                <i className="fal fa-thumbs-up"></i>
                <span>Like</span>
              </span>
            </div>
            <div className="single-video-description">
              <span className="single-video-data txt-bold mr-1">
                {videoState.selectedVideo.views} •{" "}
                {videoState.selectedVideo.published_on}
              </span>
              {videoState.selectedVideo.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
