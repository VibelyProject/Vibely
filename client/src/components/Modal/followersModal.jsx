import React from "react";
import Modal from "react-modal";

const FollowersModal = ({
  erIng,
  followersModalIsOpen,
  followingModalIsOpen,
  handleCloseFollowersModal,
  handleCloseFollowingModal,
}) => {
  return (
    <Modal
      isOpen={erIng === "er" ? followersModalIsOpen : followingModalIsOpen}
      onRequestClose={
        erIng === "er" ? handleCloseFollowersModal : handleCloseFollowingModal
      }
      ariaHideApp={false}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Arka planı karartmak için
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
        content: {
          position: "static",
          width: "300px",
          height: "300px",
          borderRadius: "8px",
          backgroundColor: "#fff",
        },
      }}
    >
      <div className="settings-header">
        <h2>{erIng === "er" ? "Followers" : "Following"}</h2>
        <button
          className="settings-close-button"
          onClick={
            erIng === "er"
              ? handleCloseFollowersModal
              : handleCloseFollowingModal
          }
        >
          X
        </button>
      </div>
    </Modal>
  );
};

export default FollowersModal;
