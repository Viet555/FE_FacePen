import { useNavigate } from 'react-router-dom';
import './SideBar.scss'
import { useState } from 'react';

const SideBar = () => {
    const [showMoreMenu, setShowMoreMenu] = useState(false);
    const navigate = useNavigate()

    const toggleMoreMenu = () => {
        setShowMoreMenu(!showMoreMenu);
    };
    const handleLogOut = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')

        navigate('/login')
    }
    return (
        <div className="sidebar"  onMouseLeave={() => setShowMoreMenu(false)}>
            <div className="sidebar__logo">

            </div>
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
                    <li className="menu-item">
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
                            <li onClick={handleLogOut}>Switch Account</li>
                            <li>Log Out</li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}

export default SideBar