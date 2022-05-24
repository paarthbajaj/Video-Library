import { useVideo } from "../context/VideoContext";
import { Sidebar } from "./Sidebar";
import "./Video.css";
import { addToWatchHistory } from "../backend/utils/serviceUtil";
import { useEffect, useState } from "react";
import { useVideoAction } from "../context/VideoActionContext";

export const SingleVideoPage = () => {
  const { videoState, addToLikedVideos, deleteFromLikedVideos } = useVideo();
  const { videoActionDispatch } = useVideoAction();
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    addToWatchHistory(videoState.selectedVideo);
  }, [counter]);

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
              {videoState?.likedVideos
                ?.map((i) => i._id)
                .includes(videoState.selectedVideo._id) ? (
                <span
                  className="cursor-pointer"
                  onClick={() => {
                    deleteFromLikedVideos(videoState.selectedVideo._id);
                    setCounter((counter) => counter + 1);
                    videoActionDispatch({
                      type: "SET_SHOW_TOAST",
                      payload: true,
                    });
                    videoActionDispatch({
                      type: "SET_TOAST_TYPE",
                      payload: "alert-danger",
                    });
                    videoActionDispatch({
                      type: "SET_TOAST_MESSAGE",
                      payload: "Removed from liked videos",
                    });
                  }}
                >
                  <i className="fas fa-thumbs-up"></i>
                  <span>Liked</span>
                </span>
              ) : (
                <span
                  className="cursor-pointer"
                  onClick={() => {
                    addToLikedVideos(videoState.selectedVideo);
                    videoActionDispatch({
                      type: "SET_SHOW_TOAST",
                      payload: true,
                    });
                    videoActionDispatch({
                      type: "SET_TOAST_TYPE",
                      payload: "alert-success",
                    });
                    videoActionDispatch({
                      type: "SET_TOAST_MESSAGE",
                      payload: "Added to liked videos",
                    });
                  }}
                >
                  <i className="fal fa-thumbs-up"></i>

                  <span>Like</span>
                </span>
              )}
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
