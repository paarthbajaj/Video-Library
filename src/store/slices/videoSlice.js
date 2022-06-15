import {
  fetchVideos,
  fetchCategories,
  fetchWatchLaterList,
  fetchPlaylists,
  fetchLikedVideos,
  fetchWatchHistory,
  addToLikedVideos,
  deleteFromLikedVideos,
  addToWatchLater,
  addToWatchHistory,
  removeFromWatchHistory,
  removeAllFromWatchHistory,
  removeVideoFromPlaylist,
} from "../thunks/videoThunk";
const { createSlice } = require("@reduxjs/toolkit");

const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const initialState = {
  listOfVideos: [],
  selectedPlaylist: {},
  watchLaterList: [],
  listOfPlaylist: [],
  likedVideos: [],
  watchHistory: [],
  listOfCategory: [],
  status: STATUSES.IDLE,
};

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    setSelectedPlaylist(state, action) {
      state.selectedPlaylist = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideos.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchVideos.fulfilled, (state, action) => {
        state.listOfVideos = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchVideos.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(fetchCategories.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.listOfCategory = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(fetchWatchLaterList.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchWatchLaterList.fulfilled, (state, action) => {
        state.watchLaterList = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchWatchLaterList.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(addToWatchLater.fulfilled, (state, action) => {
        state.watchLaterList.push(action.payload);
        state.status = STATUSES.IDLE;
      })
      .addCase(addToWatchLater.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(fetchPlaylists.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchPlaylists.fulfilled, (state, action) => {
        state.listOfPlaylist = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchPlaylists.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(removeVideoFromPlaylist.fulfilled, (state, action) => {
        state.listOfPlaylist
          .find((playlist) => playlist._id == action.payload.playlistId)
          .videos.filter((i) => i._id !== action.payload.videoId);
        state.status = STATUSES.IDLE;
      })
      .addCase(removeVideoFromPlaylist.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(fetchLikedVideos.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchLikedVideos.fulfilled, (state, action) => {
        state.likedVideos = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchLikedVideos.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(addToLikedVideos.fulfilled, (state, action) => {
        state.likedVideos = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(addToLikedVideos.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(deleteFromLikedVideos.fulfilled, (state, action) => {
        state.likedVideos = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(deleteFromLikedVideos.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(fetchWatchHistory.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchWatchHistory.fulfilled, (state, action) => {
        state.watchHistory = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchWatchHistory.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(addToWatchHistory.fulfilled, (state, action) => {
        state.watchHistory = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(addToWatchHistory.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(removeFromWatchHistory.fulfilled, (state, action) => {
        state.watchHistory.filter((video) => video._id !== action.payload);
        state.status = STATUSES.IDLE;
      })
      .addCase(removeFromWatchHistory.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(removeAllFromWatchHistory.fulfilled, (state, action) => {
        state.watchHistory = [];
        state.status = STATUSES.IDLE;
      })
      .addCase(removeAllFromWatchHistory.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  },
});
export const { setVideos, setStatus, setSelectedPlaylist } = videoSlice.actions;
export default videoSlice.reducer;
