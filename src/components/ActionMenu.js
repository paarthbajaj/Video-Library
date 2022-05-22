import { useEffect } from "react";
import {
  addToWatchLater,
  removeFromWatchLater,
} from "../backend/utils/serviceUtil";
import { useVideo } from "../context/VideoContext";
import { PlaylistPopup } from "./AddToPlaylistPopup";

export const ActionMenu = ({ setShowActionMenu, showActionMenu, video }) => {
  const { videoState, videoDispatch, getWatchLaterApi } = useVideo();
  useEffect(() => {
    getWatchLaterApi();
  }, [showActionMenu]);
  return (
    <div className="action-menu cursor-pointer">
      <i
        className="far fa-ellipsis-v"
        onClick={(e) => {
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
