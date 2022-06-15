import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCreatePlaylistBlockState,
  setPlaylistPopupState,
  setToast,
} from "../store/slices/actionSlice";
import {
  fetchPlaylists,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
  createPlaylist,
} from "../store/thunks/videoThunk";

export const PlaylistPopup = (video) => {
  const encodedToken = localStorage.getItem("key");
  const dispatch = useDispatch();
  const { listOfPlaylist } = useSelector((state) => state.videos);
  const { selectedVideo, showCreatePlaylistBlock } = useSelector(
    (state) => state.actions
  );
  const [playlistName, setPlaylistName] = useState("");
  useEffect(() => {
    dispatch(fetchPlaylists(encodedToken));
  }, []);
  const deleteFromPlaylist = (playlistId, videoId) => {
    dispatch(removeVideoFromPlaylist({ playlistId, videoId, encodedToken }));
    dispatch(
      setToast({
        showToast: true,
        type: "alert-danger",
        message: "Removed from playlist",
      })
    );
  };
  const addToPlaylistFunc = (playlistId, videoObj) => {
    dispatch(addVideoToPlaylist({ playlistId, videoObj, encodedToken }));
    dispatch(
      setToast({
        showToast: true,
        type: "alert-success",
        message: "Added to playlist",
      })
    );
  };
  return (
    <>
      <div className="popup-overlay">
        <div className="popup-container">
          <div className="popup-header flex-row">
            <span className="grow-1">Save to...</span>
            <span
              className="cursor-pointer popup-close-icon"
              onClick={() => dispatch(setPlaylistPopupState(false))}
            >
              <i className="far fa-times"></i>
            </span>
          </div>
          <div className="list-playlist-block">
            {listOfPlaylist &&
              listOfPlaylist?.map((i) => (
                <div className="list-playlist" key={i._id}>
                  <label className="cursor-pointer">
                    <input
                      type="checkbox"
                      onInput={() => {
                        i.videos.some((e) => e._id == selectedVideo._id)
                          ? deleteFromPlaylist(i._id, selectedVideo._id)
                          : addToPlaylistFunc(i._id, selectedVideo);
                      }}
                      defaultChecked={i.videos.some(
                        (e) => e._id == selectedVideo._id
                      )}
                    />
                    {i.title}
                  </label>
                </div>
              ))}
          </div>
          {showCreatePlaylistBlock && (
            <div className="flex-column">
              <label className="flex-column mt-5">
                {" "}
                Name
                <input
                  type="text"
                  placeholder="Enter playlist name..."
                  className="enter-playlist-name"
                  value={playlistName}
                  onChange={(e) => setPlaylistName(() => e.target.value)}
                />
              </label>
              <button
                className="vl-pri-btn mt-5"
                onClick={() => {
                  dispatch(setCreatePlaylistBlockState(false));
                  dispatch(setPlaylistPopupState(false));
                  dispatch(
                    createPlaylist({
                      playlistName,
                      selectedVideo,
                      encodedToken,
                    })
                  );
                  dispatch(
                    setToast({
                      showToast: true,
                      type: "alert-success",
                      message: "Playlist created",
                    })
                  );
                }}
              >
                Create
              </button>
            </div>
          )}
          {!showCreatePlaylistBlock && (
            <div
              className="popup-footer cursor-pointer"
              onClick={() => dispatch(setCreatePlaylistBlockState(true))}
            >
              <i className="far fa-plus mr-1"></i>
              <span>Create a new playlist</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
