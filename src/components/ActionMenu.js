import { useEffect } from "react";
import {
  addToWatchLater,
  removeFromWatchLater,
} from "../backend/utils/serviceUtil";
import { useVideoAction } from "../context/VideoActionContext";
import { useVideo } from "../context/VideoContext";

export const ActionMenu = ({ setShowActionMenu, showActionMenu, video }) => {
  const { videoState, videoDispatch, getWatchLaterApi } = useVideo();
  const { videoActionDispatch, videoActionState } = useVideoAction();
  useEffect(() => {
    getWatchLaterApi();
  }, [showActionMenu]);
  return (
    <div className="action-menu cursor-pointer">
      <i
        className="far fa-ellipsis-v"
        onClick={() => {
          setShowActionMenu((prev) => !prev);
        }}
      ></i>
      {showActionMenu && (
        <div className="action-menu-options">
          {videoState?.watchLaterList?.map((i) => i._id).includes(video._id) ? (
            <div
              onClick={() => {
                setShowActionMenu(false);
                removeFromWatchLater(video._id);
                videoActionDispatch({ type: "SET_SHOW_TOAST", payload: true });
                videoActionDispatch({
                  type: "SET_TOAST_TYPE",
                  payload: "alert-danger",
                });
                videoActionDispatch({
                  type: "SET_TOAST_MESSAGE",
                  payload: "Removed from watch later",
                });
              }}
              className="action-option-block"
            >
              <i className="fal fa-trash-alt action-option"></i>
              <span>Remove from watch later</span>
            </div>
          ) : (
            <div
              onClick={() => {
                setShowActionMenu(false);
                addToWatchLater(video);
                videoActionDispatch({ type: "SET_SHOW_TOAST", payload: true });
                videoActionDispatch({
                  type: "SET_TOAST_TYPE",
                  payload: "alert-success",
                });
                videoActionDispatch({
                  type: "SET_TOAST_MESSAGE",
                  payload: "Added to watch later",
                });
              }}
              className="action-option-block"
            >
              <i className="fal fa-clock action-option"></i>
              <span>Save to watch later</span>
            </div>
          )}

          <div
            onClick={() => {
              setShowActionMenu(false);
              videoDispatch({ type: "SHOW_PLAYLIST_POPUP" });
            }}
            className="action-option-block"
          >
            <i className="fal fa-layer-plus action-option"></i>
            <span>Add to playlist</span>
          </div>
        </div>
      )}
    </div>
  );
};
