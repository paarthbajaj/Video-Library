import { VideoBlock } from "./VideoBlock";
import { Sidebar } from "./Sidebar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWatchLaterList } from "../store/thunks/videoThunk";

export const WatchLater = () => {
  const encodedToken = localStorage.getItem("key");
  const dispatch = useDispatch();
  const { watchLaterList } = useSelector((state) => state.videos);
  useEffect(() => {
    dispatch(fetchWatchLaterList(encodedToken));
  }, []);
  return (
    <>
      <div className="app-body">
        <Sidebar />
        <div className="vl-page-container">
          <h1 className="txt-3">Watch Later</h1>
          {watchLaterList && watchLaterList?.length > 0 ? (
            <div className="video-list-container mt-1 flex-row g-1">
              {watchLaterList &&
                watchLaterList?.map((video) => <VideoBlock video={video} />)}
            </div>
          ) : (
            <div className="empty-list txt-3">No videos in watch later</div>
          )}
        </div>
      </div>
    </>
  );
};
