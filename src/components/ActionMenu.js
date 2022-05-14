import { addToWatchLater } from "../backend/utils/serviceUtil";
import { useVideo } from "../context/VideoContext";

export const ActionMenu = ({ setShowActionMenu, showActionMenu, video }) => {
  const { videoState, videoDispatch } = useVideo();
  return (
    <div className="action-menu cursor-pointer">
      <i
        className="far fa-ellipsis-v"
        onClick={() => setShowActionMenu((prev) => !prev)}
      ></i>
      {showActionMenu && (
        <div className="action-menu-options">
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
