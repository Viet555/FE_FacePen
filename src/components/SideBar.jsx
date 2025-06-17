import { useNavigate } from "react-router-dom";
import "./SideBar.scss";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../store/Export";
import PostModal from "./Modal/PostModal";
import NotificationArea from "./Modal/Notification";

const SideBar = () => {
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [open, setOpen] = useState(false);
  const [openNotifications, setOpenNotifications] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.account);

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
    <>
      <div className="topbar-mobile">
        <div className="logo">MyApp</div>
        <div
          className="notification"
          onClick={() => setOpenNotifications(!openNotifications)}
        >
          <i className="fa-regular fa-bell"></i>
        </div>
      </div>

      <div className="sidebar" onMouseLeave={() => setShowMoreMenu(false)}>
        <div className="sidebar__logo">MyApp</div>
        <div className="sidebar__menu">
          <ul className="menu-list">
            <li className="menu-item">
              <i className="fa-solid fa-house"></i>
              <span>Home</span>
            </li>

            <li className="menu-item hide-on-mobile">
              <i className="fa-solid fa-magnifying-glass"></i>
              <span>Search</span>
            </li>

            <li className="menu-item hide-on-mobile">
              <i className="fa-solid fa-film"></i>
              <span>Reels</span>
            </li>

            <li className="menu-item" onClick={() => setOpen(true)}>
              <i className="fa-solid fa-plus"></i>
              <span>New Post</span>
            </li>

            <li className="menu-item">
              <i className="fa-solid fa-inbox"></i>
              <span>Message</span>
            </li>

            <li className="menu-item hide-on-mobile" onClick={() => setOpenNotifications(!openNotifications)}>
              <i className="fa-regular fa-heart"></i>
              <span>Notifications</span>
            </li>

            <li className="menu-item">
              <i className="fa-solid fa-compass"></i>
              <span>Explore</span>
            </li>

            <li className="menu-item">
              <i className="fa-regular fa-circle-user"></i>
              <span>Profile</span>
            </li>
          </ul>
        </div>

        <div className="sidebar__setting-menu hide-on-mobile" onClick={toggleMoreMenu}>
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

        <NotificationArea
          setOpenNotifications={setOpenNotifications}
          openNotifications={openNotifications}
          user={userId}
        />
        {open && <PostModal user={userId} onClose={() => setOpen(false)} />}
      </div>
    </>
  );
};

export default SideBar;
