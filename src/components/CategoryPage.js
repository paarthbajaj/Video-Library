import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { filterCategory } from "../store/slices/actionSlice";
import { Sidebar } from "./Sidebar";
import { VideoBlock } from "./VideoBlock";
import "./VideoList.css";

export const CategoryPage = () => {
  const dispatch = useDispatch();
  const { listOfCategory, listOfVideos } = useSelector((state) => state.videos);
  const { filteredCategoryVideos } = useSelector((state) => state.actions);
  return (
    <div className="app-body">
      <Sidebar />
      <div className="vl-page-container">
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
                }}
              >
                {category.categoryName}
              </span>
            </Link>
          ))}
        </div>
        <div className="video-list-container mt-1 flex-row g-1">
          {filteredCategoryVideos &&
            filteredCategoryVideos.map((video) => (
              <VideoBlock video={video} key={video._id} />
            ))}
        </div>
      </div>
    </div>
  );
};
