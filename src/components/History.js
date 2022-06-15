import { Sidebar } from "./Sidebar";
import "./VideoList.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchWatchHistory,
  removeAllFromWatchHistory,
  removeFromWatchHistory,
} from "../store/thunks/videoThunk";
import { setToast } from "../store/slices/actionSlice";
export const History = () => {
  const encodedToken = localStorage.getItem("key");
  const dispatch = useDispatch();
  const { watchHistory } = useSelector((state) => state.videos);
  useEffect(() => {
    dispatch(fetchWatchHistory(encodedToken));
  }, [watchHistory]);
  return (
    <>
      <div className="app-body">
        <Sidebar />
        <div className="vl-page-container">
          <div className="flex-row">
            <h1 className="txt-3 grow-1">Watch History</h1>
            {watchHistory?.length > 0 ? (
              <button
                className="clear-history-btn cursor-pointer m-radius"
                onClick={() => {
                  dispatch(removeAllFromWatchHistory(encodedToken));
                  dispatch(
                    setToast({
                      showToast: true,
                      type: "alert-warning",
                      message: "History cleared",
                    })
                  );
                }}
              >
                <i className="fal fa-trash-alt"></i>Clear all watch history
              </button>
            ) : (
              <></>
            )}
          </div>
          {watchHistory?.length > 0 ? (
            <div className="video-list-container mt-1 flex-row g-1">
              {watchHistory?.map((video) => (
                <div
                  className="history-vd-container flex-row g-1"
                  key={video._id}
                >
                  <img src={video.thumbnail} />
                  <div className="history-vd-txt-info">
                    <h3 className="pb-5">{video.title}</h3>
                    <div className="vd-add-info">
                      <span className="vd-add-info">{video.creator}</span> •{" "}
                      <span className="vd-add-info">{video.views}</span>
                    </div>
                  </div>
                  <div className="history-vd-del-btn">
                    <i
                      className="far fa-times cursor-pointer"
                      onClick={() => {
                        dispatch(
                          removeFromWatchHistory({
                            videoId: video._id,
                            encodedToken,
                          })
                        );
                        dispatch(
                          setToast({
                            showToast: true,
                            type: "alert-danger",
                            message: "Removed from history",
                          })
                        );
                      }}
                    ></i>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-list txt-3">Nothing in the watch history</div>
          )}
        </div>
      </div>
    </>
  );
};
