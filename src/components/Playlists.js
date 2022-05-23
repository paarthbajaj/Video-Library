import { Sidebar } from "./Sidebar";
import "./VideoList.css";
import { useEffect } from "react";
import { useVideo } from "../context/VideoContext";
import {
  getSelectedPlaylistVideos,
  deletePlaylist,
} from "../backend/utils/serviceUtil";
export const Playlists = () => {
  const { videoState, getPlaylists, videoDispatch } = useVideo();
  useEffect(() => {
    getPlaylists();
    const response = getPlaylists();
    console.log(response);
  }, []);
  return (
    <>
      {console.log(videoState)}
      <div className="app-body">
        <Sidebar />
        <div className="vl-page-container">
          <h1 className="txt-3">Playlists</h1>
          <div className="playlist-container mt-1 flex-row g-1">
            <div className="list-of-paylist">
              {videoState.listOfPlaylist?.map((i) => (
                <div className="single-playlist-block">
                  <div className="playlist-image flex-column cursor-pointer">
                    <img
                      src="https://content.wepik.com/statics/1472280/playlist-youtube-thumbnail-9157900page1.jpg"
                      alt="thumbnail"
                      onClick={() =>
                        videoDispatch({
                          type: "SET_SELECTED_PLAYLIST",
                          payload: i,
                        })
                      }
                    />
                    <div className="playlist-card-footer flex-row">
                      <span
                        className="grow-1"
                        onClick={() =>
                          videoDispatch({
                            type: "SET_SELECTED_PLAYLIST",
                            payload: i,
                          })
                        }
                      >
                        {i.title}
                      </span>
                      <button
                        className="cursor-pointer"
                        onClick={() => {
                          deletePlaylist(i._id);
                          videoDispatch({ type: "DELETE_PLAYLIST" });
                          videoDispatch({
                            type: "SET_SELECTED_PLAYLIST",
                            payload: "",
                          });
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="playlist-videos">
              {videoState.selectedPlaylist &&
                videoState.selectedPlaylist?.videos?.map((video) => (
                  <div className="playlist-video flex-row g-1" key={video._id}>
                    <img src={video.thumbnail} />
                    <div className="playlist-video-text mr-1">
                      <div className="playlist-video-title txt-bold pb-1 txt-6">
                        {video.title}
                      </div>
                      <div className="playlist-video-creator">
                        {video.creator}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
