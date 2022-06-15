import { Sidebar } from "./Sidebar";
import "./Video.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToLikedVideos,
  addToWatchHistory,
  deleteFromLikedVideos,
} from "../store/thunks/videoThunk";
import { setToast } from "../store/slices/actionSlice";

export const SingleVideoPage = () => {
  const encodedToken = localStorage.getItem("key");
  const dispatch = useDispatch();
  const { likedVideos } = useSelector((state) => state.videos);
  const { selectedVideo } = useSelector((state) => state.actions);
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    dispatch(addToWatchHistory({ selectedVideo, encodedToken }));
  }, [counter]);

  return (
    <div className="app-body">
      <Sidebar />
      <div className="vl-page-container">
        <div className="video-block pt-1 flex-column">
          <iframe
            width="100%"
            height="400px"
            src={`https://www.youtube-nocookie.com/embed/${selectedVideo.videoUrl}`}
            title="video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <div className="single-video-info">
            <div className="flex-row mt-5">
              <span className="single-video-title grow-1 txt-bold">
                {selectedVideo.title}
              </span>
              {likedVideos &&
              likedVideos?.map((i) => i._id).includes(selectedVideo._id) ? (
                <span
                  className="cursor-pointer"
                  onClick={() => {
                    dispatch(
                      deleteFromLikedVideos({
                        videoId: selectedVideo._id,
                        encodedToken,
                      })
                    );
                    setCounter((counter) => counter + 1);
                    dispatch(
                      setToast({
                        showToast: true,
                        type: "alert-danger",
                        message: "Removed from liked videos",
                      })
                    );
                  }}
                >
                  <i className="fas fa-thumbs-up"></i>
                  <span>Liked</span>
                </span>
              ) : (
                <span
                  className="cursor-pointer"
                  onClick={() => {
                    dispatch(addToLikedVideos({ selectedVideo, encodedToken }));
                    dispatch(
                      setToast({
                        showToast: true,
                        type: "alert-success",
                        message: "Added to liked videos",
                      })
                    );
                  }}
                >
                  <i className="fal fa-thumbs-up"></i>

                  <span>Like</span>
                </span>
              )}
            </div>
            <div className="single-video-description">
              <span className="single-video-data txt-bold mr-1">
                {selectedVideo.views} • {selectedVideo.published_on}
              </span>
              {selectedVideo.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
