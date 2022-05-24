import { useState, useEffect } from "react";
import {
  addToPlaylist,
  addVideoToPlaylist,
  deleteVideoFromPlaylist,
} from "../backend/utils/serviceUtil";
import { useVideoAction } from "../context/VideoActionContext";
import { useVideo } from "../context/VideoContext";

export const PlaylistPopup = (video) => {
  const { videoDispatch, videoState, getPlaylists } = useVideo();
  const { videoActionDispatch, videoActionState } = useVideoAction();
  const [playlistName, setPlaylistName] = useState("");
  useEffect(() => {
    getPlaylists();
  }, [videoActionState.toast.showToast]);
  const deleteFromPlaylist = (playlistId, videoId) => {
    deleteVideoFromPlaylist(playlistId, videoId);
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
      payload: "Removed from playlist",
    });
  };
  const addToPlaylistFunc = (playlistId, videoId) => {
    addVideoToPlaylist(playlistId, videoId);
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
      payload: "Added to playlist",
    });
  };
  return (
    <>
      <div className="popup-overlay">
        <div className="popup-container">
          <div className="popup-header flex-row">
            <span className="grow-1">Save to...</span>
            <span
              className="cursor-pointer popup-close-icon"
              onClick={() => videoDispatch({ type: "CLOSE_PLAYLIST_POPUP" })}
            >
              <i className="far fa-times"></i>
            </span>
          </div>
          <div className="list-playlist-block">
            {videoState?.listOfPlaylist?.map((i) => (
              <div className="list-playlist" key={i._id}>
                <label className="cursor-pointer">
                  <input
                    type="checkbox"
                    onInput={() => {
                      i.videos.some(
                        (e) => e._id == videoState.selectedVideo._id
                      )
                        ? deleteFromPlaylist(
                            i._id,
                            videoState.selectedVideo._id
                          )
                        : addToPlaylistFunc(i._id, videoState.selectedVideo);
                    }}
                    defaultChecked={i.videos.some(
                      (e) => e._id == videoState.selectedVideo._id
                    )}
                  />
                  {i.title}
                </label>
              </div>
            ))}
          </div>
          {videoState.showCreatePlaylistBlock && (
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
                  videoDispatch({ type: "HIDE_CREATE_PLAYLIST_BLOCK" });
                  videoDispatch({ type: "CLOSE_PLAYLIST_POPUP" });
                  addToPlaylist(playlistName, videoState.selectedVideo);
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
                    payload: "Playlist created",
                  });
                }}
              >
                Create
              </button>
            </div>
          )}
          {!videoState.showCreatePlaylistBlock && (
            <div
              className="popup-footer cursor-pointer"
              onClick={() =>
                videoDispatch({ type: "SHOW_CREATE_PLAYLIST_BLOCK" })
              }
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
