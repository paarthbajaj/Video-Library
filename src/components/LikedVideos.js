import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLikedVideos } from "../store/thunks/videoThunk";
import { Sidebar } from "./Sidebar";
import { VideoBlock } from "./VideoBlock";

export const LikedVideos = () => {
  const encodedToken = localStorage.getItem("key");
  const dispatch = useDispatch();
  const { likedVideos } = useSelector((state) => state.videos);
  useEffect(() => {
    dispatch(fetchLikedVideos(encodedToken));
  }, []);
  return (
    <div className="app-body">
      <Sidebar />
      <div className="vl-page-container">
        <h1 className="txt-3">Liked Videos</h1>
        {likedVideos?.length > 0 ? (
          <div className="video-list-container mt-1 flex-row g-1">
            {likedVideos &&
              likedVideos?.map((video) => (
                <VideoBlock video={video} key={video._id} />
              ))}
          </div>
        ) : (
          <div className="empty-list txt-4">
            Nothing in the liked videos. Start liking some videos and show
            appreciation to the creators😃
          </div>
        )}
      </div>
    </div>
  );
};
