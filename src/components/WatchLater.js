import { VideoBlock } from "./VideoBlock";
import { Sidebar } from "./Sidebar";

export const WatchLater = () => {
  return (
    <>
      <div className="app-body">
        <Sidebar />
        <div className="vl-page-container">
          <h1 className="txt-3">Watch Later</h1>
          <div className="video-list-container mt-1 flex-row g-1">
            <VideoBlock />
          </div>
        </div>
      </div>
    </>
  );
};
