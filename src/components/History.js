import { Sidebar } from "./Sidebar";
import "./VideoList.css";
import { useEffect } from "react";
import { useVideo } from "../context/VideoContext";
import {
  delVideoFromHistory,
  delAllWatchHistory,
} from "../backend/utils/serviceUtil";
import "./Video.css";
import { useVideoAction } from "../context/VideoActionContext";
export const History = () => {
  const { getWatchHistory, videoState, videoDispatch } = useVideo();
  const { videoActionDispatch } = useVideoAction();
  useEffect(() => {
    getWatchHistory();
  }, []);
  return (
    <>
      <div className="app-body">
        <Sidebar />
        <div className="vl-page-container">
          <div className="flex-row">
            <h1 className="txt-3 grow-1">Watch History</h1>
            <button
              className="clear-history-btn cursor-pointer m-radius"
              onClick={() => {
                delAllWatchHistory();
                videoDispatch({ type: "DELETE_ALL_HISTORY" });
                videoActionDispatch({
                  type: "SET_SHOW_TOAST",
                  payload: true,
                });
                videoActionDispatch({
                  type: "SET_TOAST_TYPE",
                  payload: "alert-warning",
                });
                videoActionDispatch({
                  type: "SET_TOAST_MESSAGE",
                  payload: "History cleared",
                });
              }}
            >
              <i className="fal fa-trash-alt"></i>Clear all watch history
            </button>
          </div>
          <div className="video-list-container mt-1 flex-row g-1">
            {videoState?.watchHistory?.map((video) => (
              <div
                className="history-vd-container flex-row g-1"
                key={video._id}
              >
                <img src={video.thumbnail} />
                <div className="history-vd-txt-info">
                  <h3 className="pb-5">{video.title}</h3>
                  <div className="vd-add-info">
                    <span className="vd-add-info">{video.creator}</span> •{" "}
                    <span className="vd-add-info">{video.views}</span>
                  </div>
                </div>
                <div className="history-vd-del-btn">
                  <i
                    className="far fa-times cursor-pointer"
                    onClick={() => {
                      delVideoFromHistory(video._id);
                      videoDispatch({
                        type: "DELETE_FROM_HISTORY",
                        payload: video._id,
                      });
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
                        payload: "Removed from history",
                      });
                    }}
                  ></i>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
