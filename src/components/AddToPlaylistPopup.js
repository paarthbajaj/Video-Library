import { useState, useEffect } from "react";
import {
  addToPlaylist,
  addVideoToPlaylist,
} from "../backend/utils/serviceUtil";
import { useVideo } from "../context/VideoContext";

export const PlaylistPopup = (video) => {
  const { videoDispatch, videoState, getPlaylists } = useVideo();
  const [playlistName, setPlaylistName] = useState("");
  useEffect(() => {
    getPlaylists();
  }, []);
  return (
    <>
      {console.log(videoState)}
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
                    onInput={() =>
                      addVideoToPlaylist(i._id, videoState.selectedVideo)
                    }
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
              <label className="flex-column">
                {" "}
                Name
                <input
                  type="text"
                  placeholder="Enter playlist name..."
                  value={playlistName}
                  onChange={(e) => setPlaylistName(() => e.target.value)}
                />
              </label>
              <button
                onClick={() => {
                  videoDispatch({ type: "HIDE_CREATE_PLAYLIST_BLOCK" });
                  videoDispatch({ type: "CLOSE_PLAYLIST_POPUP" });
                  addToPlaylist(playlistName, videoState.selectedVideo);
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
