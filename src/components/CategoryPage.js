import { Link } from "react-router-dom";
import { useVideo } from "../context/VideoContext";
import { Sidebar } from "./Sidebar";
import { VideoBlock } from "./VideoBlock";
import "./VideoList.css";

export const CategoryPage = () => {
  const { videoState, videoDispatch } = useVideo();
  return (
    <div className="app-body">
      <Sidebar />
      <div className="vl-page-container">
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
            videoState.catgoryFilteredVideos.map((video) => (
              <VideoBlock video={video} key={video._id} />
            ))}
        </div>
      </div>
    </div>
  );
};
