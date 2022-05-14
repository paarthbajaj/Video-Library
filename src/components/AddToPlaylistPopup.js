import { useState } from "react";
import { addToPlaylist } from "../backend/utils/serviceUtil";
import { useVideo } from "../context/VideoContext";

export const PlaylistPopup = () => {
  const { videoDispatch, videoState } = useVideo();
  const [playlistName, setPlaylistName] = useState("");
  return (
    <>
      <div className="popup-overlay">
        <div className="popup-container">
          <div className="popup-header">
            <span>Save to...</span>
            <span
              className="cursor-pointer"
              onClick={() => videoDispatch({ type: "CLOSE_PLAYLIST_POPUP" })}
            >
              <i className="far fa-times"></i>
            </span>
          </div>
          {videoState?.listOfPlaylist.map((i) => (
            <div className="list-playlist" key={i}>
              <label>
                <input type="checkbox" />
                {i}
              </label>
            </div>
          ))}
          {/* {videoState.showCreatePlaylistBlock && ( */}
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
                addToPlaylist(playlistName);
              }}
            >
              Create
            </button>
          </div>
          {/* )} */}
          {/* {!videoState.showCreatePlaylistBlock && ( */}
          <div
            className="popup-footer cursor-pointer"
            onClick={() =>
              videoDispatch({ type: "SHOW_CREATE_PLAYLIST_BLOCK" })
            }
          >
            <i className="far fa-plus"></i>
            <span>Create a new playlist</span>
          </div>
          {/* )} */}
        </div>
      </div>
    </>
  );
};
