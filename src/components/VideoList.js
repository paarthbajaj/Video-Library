import { VideoBlock } from "./VideoBlock";
import { Sidebar } from "./Sidebar";
import "./VideoList.css";
import { PlaylistPopup } from "./AddToPlaylistPopup";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, fetchVideos } from "../store/thunks/videoThunk";
import { useEffect } from "react";
import { filterCategory, setSearch } from "../store/slices/actionSlice";

export const VideoList = () => {
  const encodedToken = localStorage.getItem("key");
  const dispatch = useDispatch();
  const { listOfVideos, listOfCategory, status } = useSelector(
    (state) => state.videos
  );
  const { showPlaylistPopup, search, searchResult } = useSelector(
    (state) => state.actions
  );
  let videosArray = search == "" ? listOfVideos : searchResult;
  useEffect(() => {
    dispatch(fetchVideos());
    dispatch(fetchCategories(encodedToken));
  }, []);

  return (
    <>
      {" "}
      <Sidebar />
      <main className="vl-page-container">
        <div className="category-list pl-3-4 flex-row g-1">
          {listOfCategory?.map((category) => (
            <Link to="/category" key={category._id}>
              {" "}
              <span
                className="category-item cursor-pointer"
                onClick={() => {
                  dispatch(
                    filterCategory(
                      listOfVideos.filter(
                        (video) => video.categoryName == category.categoryName
                      )
                    )
                  );
                  dispatch(setSearch({ value: "" }));
                }}
              >
                {category.categoryName}
              </span>
            </Link>
          ))}
        </div>
        <div className="video-list-container mt-1 flex-row g-1">
          {videosArray.map((video) => (
            <VideoBlock video={video} key={video._id} />
          ))}
        </div>
        {showPlaylistPopup && <PlaylistPopup />}
      </main>
    </>
  );
};
