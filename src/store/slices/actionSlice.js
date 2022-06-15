const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  selectedVideo: {},
  filteredCategoryVideos: [],
  showPlaylistPopup: false,
  showCreatePlaylistBlock: false,
  toast: { showToast: true, type: "", message: "" },
  search: "",
  searchResult: [],
};
const actionSlice = createSlice({
  name: "action",
  initialState,
  reducers: {
    setSelectedVideo(state, action) {
      state.selectedVideo = action.payload;
    },
    filterCategory(state, action) {
      state.filteredCategoryVideos = action.payload;
    },
    setPlaylistPopupState(state, action) {
      state.showPlaylistPopup = action.payload;
    },
    setCreatePlaylistBlockState(state, action) {
      state.showCreatePlaylistBlock = action.payload;
    },
    setToast(state, action) {
      state.toast.showToast = action.payload.showToast;
      state.toast.type = action.payload.type;
      state.toast.message = action.payload.message;
    },
    setSearch(state, action) {
      state.search = action.payload.value;
      state.searchResult = action.payload.searchRes;
    },
  },
});

export const {
  setSelectedVideo,
  filterCategory,
  setPlaylistPopupState,
  setCreatePlaylistBlockState,
  setToast,
  setSearch,
} = actionSlice.actions;
export default actionSlice.reducer;
