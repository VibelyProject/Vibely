import React from "react";
import Modal from "react-modal";

const SettingsModal = ({ settingsModalIsOpen, handleCloseSettingsModal }) => {
  const signOut = () => {
    localStorage.setItem("signedIn", false);
    localStorage.setItem("user_name", null);
    localStorage.setItem("password", null);
    window.location.href = "/signin";
  };

  return (
    <Modal
      isOpen={settingsModalIsOpen}
      onRequestClose={handleCloseSettingsModal}
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
          height: "200px",
          borderRadius: "8px",
          backgroundColor: "#fff",
        },
      }}
    >
      {/* Ayarlar içeriğini buraya ekleyin */}
      <div className="settings-header">
        <h2>Settings</h2>
        <button
          className="settings-close-button"
          onClick={handleCloseSettingsModal}
        >
          X
        </button>
      </div>
      <div className="settings-buttons-container">
        <button onClick={signOut} className="settings-button">
          Sign Out
        </button>
      </div>
    </Modal>
  );
};

export default SettingsModal;
