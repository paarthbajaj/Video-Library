import { VideoBlock } from "./VideoBlock";
import { Sidebar } from "./Sidebar";
import "./VideoList.css";
export const History = () => {
  return (
    <>
      <div className="app-body">
        <Sidebar />
        <div className="vl-page-container">
          <h1 className="txt-3">Watch History</h1>
          <div className="video-list-container mt-1 flex-row g-1">
            <VideoBlock />
          </div>
        </div>
      </div>
    </>
  );
};
