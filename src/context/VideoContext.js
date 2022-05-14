import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
const encodedToken = localStorage.getItem("key");
const VideoContext = createContext();

const VideoContextProvider = ({ children }) => {
  const videoReducer = (state, action) => {
    switch (action.type) {
      case "FETCH_VIDEOS":
        return { ...state, listOfVideos: action.payload };
      case "WATCH_LATER_LIST":
        return { ...state, watchLaterList: action.payload };
      case "CREATE_PLAYLIST":
        return { ...state, listOfPlaylist: action.payload };
      case "SHOW_PLAYLIST_POPUP":
        return { ...state, showPlaylistPopup: true };
      case "CLOSE_PLAYLIST_POPUP":
        return { ...state, showPlaylistPopup: false };
      case "SHOW_CREATE_PLAYLIST_BLOCK":
        return { ...state, showCreatePlaylistBlock: true };
      case "HIDE_CREATE_PLAYLIST_BLOCK":
        return { ...state, showCreatePlaylistBlock: false };
    }
  };
  const initialState = {
    listOfVideos: [],
    watchLaterList: [],
    showPlaylistPopup: false,
    showCreatePlaylistBlock: false,
    listOfPlaylist: [],
  };
  const [videoState, videoDispatch] = useReducer(videoReducer, initialState);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/api/videos");
        videoDispatch({ type: "FETCH_VIDEOS", payload: data.videos });
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  const getWatchLaterApi = async () => {
    try {
      const { data } = await axios.get("/api/user/watchlater", {
        headers: { authorization: encodedToken },
      });
      videoDispatch({ type: "WATCH_LATER_LIST", payload: data.watchlater });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <VideoContext.Provider
      value={{ videoState, videoDispatch, getWatchLaterApi }}
    >
      {children}
    </VideoContext.Provider>
  );
};
const useVideo = () => useContext(VideoContext);

export { VideoContextProvider, useVideo };
