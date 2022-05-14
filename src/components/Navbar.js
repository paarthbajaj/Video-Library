import { Link } from "react-router-dom";
import "./Navbar.css";
export const Navbar = () => {
  return (
    <header className="desktop-header-container flex-row">
      <div className="logo-container brand-logo">VL Player</div>
      <div className="search-bar flex-row">
        <a className="search-icon" href="#">
          <span className="fal fa-search"></span>
        </a>
        <input className="input-search-bar" placeholder="Search" />
      </div>
      <div className="header-actions flex-row">
        <Link to="/">
          <div className="txt-center cursor-pointer action-user">
            <span className="fa fa-user icon "></span>
            <span className="txt-bold pl-3-4">Signin</span>
          </div>
        </Link>
      </div>
    </header>
  );
};
