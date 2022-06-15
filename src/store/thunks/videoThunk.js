import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchVideos = createAsyncThunk("videos/fetch", async () => {
  const { data } = await axios.get("/api/videos");
  return data.videos;
});

export const fetchCategories = createAsyncThunk(
  "videosCategory/fetch",
  async (encodedToken) => {
    const { data } = await axios.get("/api/categories", {
      headers: {
        authorization: encodedToken,
      },
    });
    return data.categories;
  }
);
export const fetchWatchLaterList = createAsyncThunk(
  "watcLaterVideos/fetch",
  async (encodedToken) => {
    const { data } = await axios.get("/api/user/watchlater", {
      headers: { authorization: encodedToken },
    });
    return data.watchlater;
  }
);
export const addToWatchLater = createAsyncThunk(
  "watcLaterVideos/add",
  async (args) => {
    const { video, encodedToken } = args;
    const { data } = await axios.post(
      "/api/user/watchlater",
      {
        video: video,
      },
      {
        headers: {
          authorization: encodedToken,
        },
      }
    );
    return data;
  }
);
export const removeFromWatchLater = createAsyncThunk(
  "watcLaterVideos/remove",
  async (args) => {
    const { videoId, encodedToken } = args;
    const { data } = await axios.delete(`/api/user/watchlater/${videoId}`, {
      headers: {
        authorization: encodedToken,
      },
    });
    return data;
  }
);
export const fetchPlaylists = createAsyncThunk(
  "playlists/fetch",
  async (encodedToken) => {
    const { data } = await axios.get("/api/user/playlists", {
      headers: { authorization: encodedToken },
    });
    return data.playlists;
  }
);
export const createPlaylist = createAsyncThunk(
  "playlist/create",
  async (args) => {
    const { playlistName, selectedVideo, encodedToken } = args;
    try {
      const playlistData = await axios.post(
        "/api/user/playlists",
        {
          playlist: { title: playlistName, description: "" },
        },
        {
          headers: {
            authorization: encodedToken,
          },
        }
      );
      const { data } = await axios.post(
        `/api/user/playlists/${
          playlistData.data.playlists[playlistData.data.playlists.length - 1]
            ._id
        }`,
        {
          video: selectedVideo,
        },
        {
          headers: {
            authorization: encodedToken,
          },
        }
      );
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);
export const removePlaylist = createAsyncThunk(
  "playlist/remove",
  async (args) => {
    const { playlistId, encodedToken } = args;
    try {
      const { data } = await axios.delete(`/api/user/playlists/${playlistId}`, {
        headers: {
          authorization: encodedToken,
        },
      });
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);
export const addVideoToPlaylist = createAsyncThunk(
  "playlistVideo/add",
  async (args) => {
    const { playlistId, videoObj, encodedToken } = args;
    try {
      const { data } = await axios.post(
        `/api/user/playlists/${playlistId}`,
        {
          video: videoObj,
        },
        {
          headers: {
            authorization: encodedToken,
          },
        }
      );
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);
export const removeVideoFromPlaylist = createAsyncThunk(
  "playlistVideo/remove",
  async (args) => {
    const { playlistId, videoId, encodedToken } = args;
    try {
      const { data } = await axios.delete(
        `/api/user/playlists/${playlistId}/${videoId}`,
        {
          headers: {
            authorization: encodedToken,
          },
        }
      );
      return { playlist: data.playlist, playlistId, videoId };
    } catch (err) {
      console.log(err);
    }
  }
);
export const fetchSelectedPlaylistVideos = createAsyncThunk(
  "selectedPlaylistVideos/fetch",
  async (args) => {
    const { selectedPlaylistId, encodedToken } = args;
    try {
      const { data } = await axios.get(
        `/api/user/playlists/${selectedPlaylistId}`,
        {
          headers: {
            authorization: encodedToken,
          },
        }
      );
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);
export const fetchLikedVideos = createAsyncThunk(
  "likedVideos/fetch",
  async (encodedToken) => {
    try {
      const { data } = await axios.get("/api/user/likes", {
        headers: { authorization: encodedToken },
      });
      return data.likes;
    } catch (err) {
      console.log(err);
    }
  }
);
export const addToLikedVideos = createAsyncThunk(
  "likedVideos/add",
  async (args) => {
    const { selectedVideo, encodedToken } = args;
    try {
      const { data } = await axios.post(
        "/api/user/likes",
        {
          video: selectedVideo,
        },
        {
          headers: {
            authorization: encodedToken,
          },
        }
      );
      return data.likes;
    } catch (err) {
      console.log(err);
    }
  }
);
export const deleteFromLikedVideos = createAsyncThunk(
  "likedVideos/remove",
  async (args) => {
    const { videoId, encodedToken } = args;
    const { data } = await axios.delete(`/api/user/likes/${videoId}`, {
      headers: {
        authorization: encodedToken,
      },
    });
    return data.likes;
  }
);
export const fetchWatchHistory = createAsyncThunk(
  "watchHistory/fetch",
  async (encodedToken) => {
    const { data } = await axios.get("/api/user/history", {
      headers: { authorization: encodedToken },
    });
    return data.history;
  }
);
export const addToWatchHistory = createAsyncThunk(
  "watchHistory/add",
  async (args) => {
    const { selectedVideo, encodedToken } = args;
    try {
      const { data } = await axios.post(
        "/api/user/history",
        {
          video: selectedVideo,
        },
        {
          headers: {
            authorization: encodedToken,
          },
        }
      );
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);
export const removeFromWatchHistory = createAsyncThunk(
  "watchHistory/remove",
  async (args) => {
    const { videoId, encodedToken } = args;
    try {
      const { data } = await axios.delete(`/api/user/history/${videoId}`, {
        headers: {
          authorization: encodedToken,
        },
      });
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);
export const removeAllFromWatchHistory = createAsyncThunk(
  "watchHistory/removeAll",
  async (encodedToken) => {
    try {
      const { data } = await axios.delete("/api/user/history/all", {
        headers: {
          authorization: encodedToken,
        },
      });
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);
