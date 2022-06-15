import { Sidebar } from "./Sidebar";
import "./VideoList.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedPlaylist } from "../store/slices/videoSlice";
import {
  fetchPlaylists,
  removePlaylist,
  removeVideoFromPlaylist,
} from "../store/thunks/videoThunk";
import { setToast } from "../store/slices/actionSlice";

export const Playlists = () => {
  const encodedToken = localStorage.getItem("key");
  const dispatch = useDispatch();
  const { selectedPlaylist, listOfPlaylist } = useSelector(
    (state) => state.videos
  );
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    dispatch(fetchPlaylists(encodedToken));
  }, [counter]);
  return (
    <>
      <div className="app-body">
        <Sidebar />
        <div className="vl-page-container">
          <h1 className="txt-3">Playlists</h1>
          {listOfPlaylist?.length > 0 ? (
            <div className="playlist-container mt-1 flex-row g-1">
              <div className="list-of-paylist">
                {listOfPlaylist?.map((i) => (
                  <div className="single-playlist-block" key={i._id}>
                    <div className="playlist-image flex-column cursor-pointer">
                      <img
                        src="https://content.wepik.com/statics/1472280/playlist-youtube-thumbnail-9157900page1.jpg"
                        alt="thumbnail"
                        onClick={() => dispatch(setSelectedPlaylist(i))}
                      />
                      <div className="playlist-card-footer flex-row">
                        <span
                          className="grow-1"
                          onClick={() => dispatch(setSelectedPlaylist(i))}
                        >
                          {i.title}
                        </span>
                        <button
                          className="cursor-pointer"
                          onClick={() => {
                            dispatch(
                              removePlaylist({
                                playlistId: i._id,
                                encodedToken,
                              })
                            );
                            dispatch(setSelectedPlaylist(""));
                            dispatch(
                              setToast({
                                showToast: true,
                                type: "alert-danger",
                                message: "Playlist deleted",
                              })
                            );
                            setCounter((counter) => counter + 1);
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
                {selectedPlaylist &&
                  listOfPlaylist
                    .find((playlist) => playlist._id == selectedPlaylist._id)
                    ?.videos?.map((video) => (
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
                              dispatch(
                                removeVideoFromPlaylist({
                                  playlistId: selectedPlaylist._id,
                                  videoId: video._id,
                                  encodedToken,
                                })
                              );
                              dispatch(
                                setToast({
                                  showToast: true,
                                  type: "alert-danger",
                                  message: "Removed from playlist",
                                })
                              );
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
