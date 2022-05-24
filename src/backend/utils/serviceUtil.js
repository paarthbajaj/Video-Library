import axios from "axios";
const encodedToken = localStorage.getItem("key");

export const addToWatchLater = async (videoObj) => {
  try {
    const watchLaterData = await axios.post(
      "/api/user/watchlater",
      {
        video: videoObj,
      },
      {
        headers: {
          authorization: encodedToken,
        },
      }
    );
  } catch (err) {
    console.log(err);
  }
};
export const addToPlaylist = async (playlistName, videoObj) => {
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
    const data = await axios.post(
      `/api/user/playlists/${
        playlistData.data.playlists[playlistData.data.playlists.length - 1]._id
      }`,
      {
        video: videoObj,
      },
      {
        headers: {
          authorization: encodedToken,
        },
      }
    );
  } catch (err) {
    console.log(err);
  }
};

export const addVideoToPlaylist = async (playlistId, videoObj) => {
  try {
    const data = await axios.post(
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
  } catch (err) {
    console.log(err);
  }
};
export const getSelectedPlaylistVideos = async (selectedPlaylistId) => {
  try {
    const data = await axios.get(`/api/user/playlists/${selectedPlaylistId}`, {
      headers: {
        authorization: encodedToken,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const addToWatchHistory = async (videoObj) => {
  try {
    const data = await axios.post(
      "/api/user/history",
      {
        video: videoObj,
      },
      {
        headers: {
          authorization: encodedToken,
        },
      }
    );
  } catch (err) {
    console.log(err);
  }
};
export const delVideoFromHistory = async (videoId) => {
  try {
    const data = await axios.delete(`/api/user/history/${videoId}`, {
      headers: {
        authorization: encodedToken,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
export const delAllWatchHistory = async () => {
  try {
    const data = await axios.delete("/api/user/history/all", {
      headers: {
        authorization: encodedToken,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
export const deletePlaylist = async (playlistId) => {
  try {
    const data = await axios.delete(`/api/user/playlists/${playlistId}`, {
      headers: {
        authorization: encodedToken,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
export const removeFromWatchLater = async (videoId) => {
  try {
    const data = await axios.delete(`/api/user/watchlater/${videoId}`, {
      headers: {
        authorization: encodedToken,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
export const deleteVideoFromPlaylist = async (playlistId, videoId) => {
  try {
    const data = await axios.delete(
      `/api/user/playlists/${playlistId}/${videoId}`,
      {
        headers: {
          authorization: encodedToken,
        },
      }
    );
  } catch (err) {
    console.log(err);
  }
};
