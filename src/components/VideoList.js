import { VideoBlock } from "./VideoBlock";
import { Sidebar } from "./Sidebar";
import { videos } from "../backend/db/videos";
import "./VideoList.css";
export const VideoList = () => {
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
          <VideoBlock />
          <VideoBlock />
          <VideoBlock />
          <VideoBlock />
          <VideoBlock />
          <VideoBlock />
          <VideoBlock />
        </div>
      </main>
    </>
  );
};
