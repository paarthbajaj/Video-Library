import { VideoBlock } from "./VideoBlock";
import { Sidebar } from "./Sidebar";
import "./VideoList.css";
import { useVideo } from "../context/VideoContext";
import { PlaylistPopup } from "./AddToPlaylistPopup";
import { Link } from "react-router-dom";

export const VideoList = () => {
  const { videoState, videoDispatch } = useVideo();
  return (
    <>
      {" "}
      <Sidebar />
      <main className="vl-page-container">
        <div className="category-list pl-3-4 flex-row g-1">
          {videoState.listOfCategory?.map((category) => (
            <Link to="/category" key={category._id}>
              {" "}
              <span
                className="category-item cursor-pointer"
                onClick={() => {
                  videoDispatch({
                    type: "SET_CATEGORY_FILTER",
                    payload: videoState.listOfVideos.filter(
                      (video) => video.categoryName == category.categoryName
                    ),
                  });
                }}
              >
                {category.categoryName}
              </span>
            </Link>
          ))}
        </div>
        <div className="video-list-container mt-1 flex-row g-1">
          {videoState &&
            videoState.listOfVideos.map((video) => (
              <VideoBlock video={video} key={video._id} />
            ))}
        </div>
        {videoState.showPlaylistPopup && <PlaylistPopup />}
      </main>
    </>
  );
};
