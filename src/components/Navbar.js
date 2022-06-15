import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { setSearch } from "../store/slices/actionSlice";
import "./Navbar.css";
export const Navbar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { search } = useSelector((state) => state.actions);
  const { listOfVideos } = useSelector((state) => state.videos);
  return (
    <header className="desktop-header-container flex-row">
      <div className="logo-container brand-logo">VL Player</div>
      {location.pathname == "/home" ? (
        <div className="search-bar flex-row">
          <a className="search-icon" href="#">
            <span className="fal fa-search"></span>
          </a>
          <input
            className="input-search-bar"
            placeholder="Search"
            value={search}
            onChange={(e) => {
              let searchResult = [];
              let listOfVideosCopy = listOfVideos;
              for (let i = 0; i < listOfVideos.length - 1; i++) {
                let flag = listOfVideosCopy.find(
                  (video) => video.title.toLowerCase().search(search) != -1
                );
                if (flag) {
                  listOfVideosCopy = listOfVideosCopy.filter(
                    (i) => i._id !== flag._id
                  );
                  searchResult.push(flag);
                }
              }
              dispatch(
                setSearch({ value: e.target.value, searchRes: searchResult })
              );
            }}
          />
        </div>
      ) : (
        <></>
      )}

      <div className="header-actions flex-row">
        <Link to="/">
          <div className="txt-center cursor-pointer action-user">
            {location.pathname == "/" || location.pathname == "/signup" ? (
              <>
                {" "}
                <span className="fa fa-user icon "></span>
                <span className="txt-bold pl-3-4">Login</span>
              </>
            ) : (
              <span className="txt-bold" onClick={() => localStorage.clear()}>
                Logout
              </span>
            )}
          </div>
        </Link>
      </div>
    </header>
  );
};
