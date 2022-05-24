import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
const encodedToken = localStorage.getItem("key");
const VideoContext = createContext();

const VideoContextProvider = ({ children }) => {
  const videoReducer = (state, action) => {
    switch (action.type) {
      case "FETCH_VIDEOS":
        return { ...state, listOfVideos: action.payload };
      case "SELECTED_VIDEO":
        return { ...state, selectedVideo: action.payload };
      case "SET_SELECTED_PLAYLIST":
        return { ...state, selectedPlaylist: action.payload };
      case "WATCH_LATER_LIST":
        return { ...state, watchLaterList: action.payload };
      case "CREATE_PLAYLIST":
        return { ...state, listOfPlaylist: action.payload };
      case "SET_LIKED_VIDEOS":
        return { ...state, likedVideos: action.payload };
      case "SET_WATCH_HISTORY":
        return { ...state, watchHistory: action.payload };
      case "DELETE_FROM_HISTORY":
        return {
          ...state,
          watchHistory: state.watchHistory.filter(
            (i) => i._id !== action.payload
          ),
        };
      case "DELETE_ALL_HISTORY":
        return { ...state, watchHistory: [] };
      case "DELETE_PLAYLIST":
        return { ...state, listOfPlaylist: [] };
      case "DELETE_VIDEO_FROM_PLAYLIST":
        return {
          ...state,
          selectedPlaylist: state.selectedPlaylist.videos.filter(
            (i) => i._id !== action.payload
          ),
        };
      case "FETCH_CATEGORIES":
        return { ...state, listOfCategory: action.payload };
      case "SET_CATEGORY_FILTER":
        return { ...state, catgoryFilteredVideos: action.payload };
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
    selectedVideo: {},
    selectedPlaylist: {},
    watchLaterList: [],
    showPlaylistPopup: false,
    showCreatePlaylistBlock: false,
    listOfPlaylist: [],
    likedVideos: [],
    watchHistory: [],
    listOfCategory: [],
    catgoryFilteredVideos: [],
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
    getCategories();
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
  const getPlaylists = async () => {
    try {
      const { data } = await axios.get("/api/user/playlists", {
        headers: { authorization: encodedToken },
      });
      videoDispatch({ type: "CREATE_PLAYLIST", payload: data.playlists });
    } catch (err) {
      console.log(err);
    }
  };
  const getLikedVideos = async () => {
    try {
      const { data } = await axios.get("/api/user/likes", {
        headers: { authorization: encodedToken },
      });
      videoDispatch({ type: "SET_LIKED_VIDEOS", payload: data.likes });
    } catch (err) {
      console.log(err);
    }
  };
  const getWatchHistory = async () => {
    try {
      const { data } = await axios.get("/api/user/history", {
        headers: { authorization: encodedToken },
      });
      videoDispatch({ type: "SET_WATCH_HISTORY", payload: data.history });
    } catch (err) {
      console.log(err);
    }
  };
  const addToLikedVideos = async (videoObj) => {
    try {
      const data = await axios.post(
        "/api/user/likes",
        {
          video: videoObj,
        },
        {
          headers: {
            authorization: encodedToken,
          },
        }
      );
      videoDispatch({ type: "SET_LIKED_VIDEOS", payload: data.data.likes });
    } catch (err) {
      console.log(err);
    }
  };
  const deleteFromLikedVideos = async (videoId) => {
    try {
      const data = await axios.delete(`/api/user/likes/${videoId}`, {
        headers: {
          authorization: encodedToken,
        },
      });
      videoDispatch({ type: "SET_LIKED_VIDEOS", payload: data.data.likes });
    } catch (err) {
      console.log(err);
    }
  };
  const getCategories = async () => {
    try {
      const { data } = await axios.get("/api/categories", {
        headers: {
          authorization: encodedToken,
        },
      });
      videoDispatch({ type: "FETCH_CATEGORIES", payload: data.categories });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <VideoContext.Provider
      value={{
        videoState,
        videoDispatch,
        getWatchLaterApi,
        getPlaylists,
        getLikedVideos,
        getWatchHistory,
        addToLikedVideos,
        deleteFromLikedVideos,
        getCategories,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};
const useVideo = () => useContext(VideoContext);

export { VideoContextProvider, useVideo };
