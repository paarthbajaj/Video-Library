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
export const addToPlaylist = async (playlistName) => {
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
  } catch (err) {
    console.log(err);
  }
};
