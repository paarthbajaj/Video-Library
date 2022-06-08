import { Sidebar } from "./Sidebar";
import "./VideoList.css";
import { useEffect, useState } from "react";
import { useVideo } from "../context/VideoContext";
import {
  deletePlaylist,
  deleteVideoFromPlaylist,
} from "../backend/utils/serviceUtil";
import { useVideoAction } from "../context/VideoActionContext";
export const Playlists = () => {
  const { videoState, getPlaylists, videoDispatch } = useVideo();
  const { videoActionDispatch } = useVideoAction();
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    getPlaylists();
    videoDispatch({
      type: "SET_SELECTED_PLAYLIST",
      payload: "",
    });
  }, [counter]);
  return (
    <>
      <div className="app-body">
        <Sidebar />
        <div className="vl-page-container">
          <h1 className="txt-3">Playlists</h1>
          {videoState.listOfPlaylist?.length > 0 ? (
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
                              payload: "Playlist deleted",
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
                    <div
                      className="playlist-video flex-row g-1"
                      key={video._id}
                    >
                      <img src={video.thumbnail} />
                      <div className="playlist-video-text mr-1">
                        <div className="playlist-video-title txt-bold pb-1 txt-6">
                          {video.title}
                        </div>
                        <div className="playlist-video-creator">
                          {video.creator}
                        </div>
                      </div>
                      <div className="playlist-vd-del-btn">
                        <i
                          className="far fa-times cursor-pointer"
                          onClick={() => {
                            deleteVideoFromPlaylist(
                              videoState.selectedPlaylist._id,
                              video._id
                            );
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
                            setCounter((counter) => counter + 1);
                          }}
                        ></i>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            <div className="empty-list txt-4">Playlist is empty</div>
          )}
        </div>
      </div>
    </>
  );
};
