import React, { useState, useEffect, useRef } from "react";
import "./navbar css.css";
import homeIcon0 from "../icon/navbar icon/home 0.png";
import searchIcon0 from "../icon/navbar icon/search 0.png";
import shareIcon0 from "../icon/navbar icon/share post.png";
import exploreIcon0 from "../icon/navbar icon/explore 0.png";
import messageIcon0 from "../icon/navbar icon/message 0.png";
import notificationsIcon0 from "../icon/navbar icon/notifications 0.png";
import settingsIcon0 from "../icon/navbar icon/settings 0.png";
import profileIcon0 from "../icon/navbar icon/profile 0.png";
import homeIcon1 from "../icon/navbar icon/home 1.png";
import searchIcon1 from "../icon/navbar icon/search 1.png";
import exploreIcon1 from "../icon/navbar icon/explore 1.png";
import messageIcon1 from "../icon/navbar icon/message 1.png";
import notificationsIcon1 from "../icon/navbar icon/notifications 1.png";
import settingsIcon1 from "../icon/navbar icon/settings 1.png";
import profileIcon1 from "../icon/navbar icon/profile 1.png";
import SettingsModal from "./Modal/settingsModal";

const Navbar = () => {
  const homeIconRef = useRef(null);
  const searchIconRef = useRef(null);
  const shareIconRef = useRef(null);
  const exploreIconRef = useRef(null);
  const messagesIconRef = useRef(null);
  const notificationsIconRef = useRef(null);
  const settingsIconRef = useRef(null);
  const profileIconRef = useRef(null);

  const urlElements = window.location.href.split("/");
  const setCurrentPage = urlElements[urlElements.length - 1];

  const user_name = localStorage.getItem("user_name");

  const [settingsModalIsOpen, setSettingsModalIsOpen] = useState(false);
  const [searchModalIsOpen, setSearchModalIsOpen] = useState(false);
  const [notificationsIsOpen, setNotificationsModalIsOpen] = useState(false);

  const handleOpenSettingsModal = () => {
    setSettingsModalIsOpen(true);
    settingsIconRef.current.src = settingsIcon1;
  };

  const handleCloseSettingsModal = () => {
    setSettingsModalIsOpen(false);
    settingsIconRef.current.src = settingsIcon0;
  };

  const handleOpenSearchModal = () => {
    setSearchModalIsOpen(true);
    searchIconRef.current.src = searchIcon1;
  };

  const handleCloseSearchModal = () => {
    setSearchModalIsOpen(false);
    searchIconRef.current.src = searchIcon0;
  };

  const handleOpenNotificationsModal = () => {
    setNotificationsModalIsOpen(true);
    notificationsIconRef.current.src = notificationsIcon1;
  };

  const handleCloseNotificationsModal = () => {
    setNotificationsModalIsOpen(false);
    notificationsIconRef.current.src = notificationsIcon0;
  };
  const handleSetAllIcons0 = () => {
    homeIconRef.current.src = homeIcon0;
    searchIconRef.current.src = searchIcon0;
    shareIconRef.current.src = shareIcon0;
    exploreIconRef.current.src = exploreIcon0;
    messagesIconRef.current.src = messageIcon0;
    notificationsIconRef.current.src = notificationsIcon0;
    settingsIconRef.current.src = settingsIcon0;
    profileIconRef.current.src = profileIcon0;
  };

  const handleSetIcon1 = (currentPage) => {
    handleSetAllIcons0();
    if (currentPage === "") {
      homeIconRef.current.src = homeIcon1;
    } else if (currentPage === "messages") {
      messagesIconRef.current.src = messageIcon1;
    } else if (currentPage === "explore") {
      exploreIconRef.current.src = exploreIcon1;
    } else {
      profileIconRef.current.src = profileIcon1;
    }
  };

  useEffect(() => {
    handleSetIcon1(setCurrentPage);
  }, [setCurrentPage]);

  return (
    <div className="navbar-container">
      <nav className="navbar">
        <a href="/">
          <div className="navbar-logo for-pc">
            <div className="navbar-logo-icon"></div>
            <div className="navbar-logo-icon-txt icon-span">
              <span className="navbar-one-letter">V</span>
              <span className="navbar-after-one-letter">ibely</span>
            </div>
          </div>
        </a>
        <a href="/">
          <div className="navbar-element phone-margin">
            <img
              ref={homeIconRef}
              src={homeIcon0}
              alt="Home"
              style={{ height: "24px", width: "24px" }}
            />
            <span className="icon-span">Home</span>
          </div>
        </a>
        <a href="/search">
          <div className="navbar-element  phone-margin">
            <img
              ref={searchIconRef}
              src={searchIcon0}
              alt="Search"
              style={{ height: "24px", width: "24px" }}
            />
            <span className="icon-span">Search</span>
          </div>
        </a>
        <a href="/share-post">
          <div className="navbar-element phone-margin">
            <img
              ref={shareIconRef}
              src={shareIcon0}
              alt="Share Post"
              style={{ height: "24px", width: "24px" }}
            />
            <span className="icon-span">Share</span>
          </div>
        </a>
        <a href="/explore">
          <div className="navbar-element phone-margin">
            <img
              ref={exploreIconRef}
              src={exploreIcon0}
              alt="Explore"
              style={{ height: "24px", width: "24px" }}
            />
            <span className="icon-span">Explore</span>
          </div>
        </a>
        <a href="/messages" className="for-pc">
          <div className="navbar-element">
            <img
              ref={messagesIconRef}
              src={messageIcon0}
              alt="Messages"
              style={{ height: "24px", width: "24px" }}
            />
            <span className="icon-span">Messages</span>
          </div>
        </a>
        <button
          onClick={handleOpenNotificationsModal}
          className="icon-button for-pc"
        >
          <div className="navbar-element">
            <img
              ref={notificationsIconRef}
              src={notificationsIcon0}
              alt="Notifications"
              style={{ height: "24px", width: "24px" }}
            />
            <span className="icon-span">Notifications</span>
          </div>
        </button>
        <button
          onClick={handleOpenSettingsModal}
          className="icon-button for-pc"
        >
          <div className="navbar-element phone-margin">
            <img
              ref={settingsIconRef}
              src={settingsIcon0}
              alt="Settings"
              style={{ height: "24px", width: "24px" }}
            />
            <span className="icon-span">Settings</span>
          </div>
        </button>

        <a href={user_name !== "null" ? "/" + user_name : "/signin"}>
          <div className="navbar-element">
            <img
              ref={profileIconRef}
              src={profileIcon0}
              alt="Profile"
              style={{ height: "24px", width: "24px" }}
            />
            <span className="icon-span">Profile</span>
          </div>
        </a>
      </nav>
      <SettingsModal
        settingsModalIsOpen={settingsModalIsOpen}
        handleCloseSettingsModal={handleCloseSettingsModal}
      />
    </div>
  );
};

export default Navbar;
