import { useNavigate } from "react-router-dom";
import "./SideBar.scss";
import { useState } from "react";
import { useDispatch } from "react-redux";
import * as action from "../store/Export";
import PostModal from "./Modal/PostModal";
const SideBar = () => {
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false)
  const toggleMoreMenu = () => {
    setShowMoreMenu(!showMoreMenu);
  };
  const handleLogout = () => {
    dispatch(action.userLogout());
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/");
  };
  return (
    <div className="sidebar" onMouseLeave={() => setShowMoreMenu(false)}>
      <div className="sidebar__logo"></div>
      <div className="sidebar__menu">
        <ul className="menu-list">
          <li className="menu-item">
            <i className="fa-solid fa-house"></i>
            <span>Home</span>
          </li>
          <li className="menu-item">
            <i className="fa-solid fa-magnifying-glass"></i>
            <span>Search</span>
          </li>
          <li className="menu-item">
            <i className="fa-solid fa-film"></i>
            <span>Reels</span>
          </li>
          <li className="menu-item" onClick={() => setOpen(true)}>
            <i className="fa-solid fa-plus"></i>
            <span>New post</span>
          </li>
          <li className="menu-item">
            <i class="fa-solid fa-inbox"></i>
            <span>Message</span>
          </li>
          <li className="menu-item">
            <i className="fa-regular fa-heart"></i>
            <span>Notifications</span>
          </li>
          <li className="menu-item">
            <i class="fa-solid fa-compass"></i>
            <span>Explore</span>
          </li>
          <li className="menu-item">
            <i className="fa-regular fa-circle-user"></i>
            <span>Profile</span>
          </li>
        </ul>
      </div>
      <div className="sidebar__setting-menu" onClick={toggleMoreMenu}>
        <i className="fa-solid fa-bars"></i>
        <span>More</span>
        {showMoreMenu && (
          <div className="more-dropdown">
            <ul>
              <li onClick={handleLogout}>Switch Account</li>
              <li onClick={handleLogout}>Log Out</li>
            </ul>
          </div>
        )}
      </div>
      {open && <PostModal onClose={() => setOpen(false)} />}
    </div>
    
  )
}

export default SideBar;
