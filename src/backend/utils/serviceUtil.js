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
    console.log(playlistData);
    // console.log({ videoObj });

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
    console.log(data);
    // } catch (err) {
    //   console.log(err);
    // }
    // return playlistData;
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
    console.log(data);
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
    console.log(data);
  } catch (err) {
    console.log(err);
  }
};
