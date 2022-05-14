import { VideoBlock } from "./VideoBlock";
import { Sidebar } from "./Sidebar";
import "./VideoList.css";
import { useVideo } from "../context/VideoContext";
import { PlaylistPopup } from "./AddToPlaylistPopup";

export const VideoList = () => {
  const { videoState } = useVideo();
  return (
    <>
      {" "}
      <Sidebar />
      <main className="vl-page-container">
        <div className="banner-img-container">
          <img
            className="banner-img mt-1"
            src="https://picsum.photos/id/1018/900/350"
            alt="banner-image"
          />
          <button className="banner-btn vl-pri-btn">Watch Now</button>
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
