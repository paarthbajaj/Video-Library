import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPlaylistPopupState, setToast } from "../store/slices/actionSlice";
import {
  fetchWatchLaterList,
  addToWatchLater,
  removeFromWatchLater,
} from "../store/thunks/videoThunk";

export const ActionMenu = ({ setShowActionMenu, showActionMenu, video }) => {
  const encodedToken = localStorage.getItem("key");
  const dispatch = useDispatch();
  const { watchLaterList } = useSelector((state) => state.videos);
  useEffect(() => {
    dispatch(fetchWatchLaterList(encodedToken));
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
          {watchLaterList &&
          watchLaterList?.map((i) => i._id).includes(video._id) ? (
            <div
              onClick={() => {
                setShowActionMenu(false);
                dispatch(
                  removeFromWatchLater({ videoId: video._id, encodedToken })
                );
                dispatch(
                  setToast({
                    showToast: true,
                    type: "alert-danger",
                    message: "Removed from watch later",
                  })
                );
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
                dispatch(addToWatchLater({ video, encodedToken }));
                dispatch(
                  setToast({
                    showToast: true,
                    type: "alert-success",
                    message: "Added to watch later",
                  })
                );
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
              dispatch(setPlaylistPopupState(true));
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
