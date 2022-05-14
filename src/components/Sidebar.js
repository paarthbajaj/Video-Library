import { Link } from "react-router-dom";
import "./Sidebar.css";
export const Sidebar = () => {
  return (
    <aside className="vl-sidebar">
      <Link to="/home">
        <div className="pb-1 cursor-pointer">
          <i className="fal fa-home"></i>
          <span className="pl-3-4 ">Home</span>
        </div>
      </Link>

      <Link to="/history">
        <div className="pb-1 cursor-pointer">
          <i className="fal fa-history"></i>
          <span className="pl-3-4 ">History</span>
        </div>
      </Link>
      <div className="pb-1 cursor-pointer">
        <i className="fal fa-stream"></i>
        <span className="pl-3-4 ">Playlist</span>
      </div>
      <Link to="/watch-later">
        <div className="pb-1 cursor-pointer">
          <i className="fal fa-clock"></i>
          <span className="pl-3-4 ">Watch Later</span>
        </div>
      </Link>
    </aside>
  );
};
