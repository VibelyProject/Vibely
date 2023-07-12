import React from "react";
import Modal from "react-modal";
import "./isLoadingModal.css";

const LoadingModal = ({ isOpen, handleClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
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
          width: "100vw",
          height: "100vh",
          borderRadius: "8px",
          backgroundColor: "#fff",
        },
      }}
    >
      <div className="loading-container">
        <div className="loading-icon"></div>
      </div>
    </Modal>
  );
};

export default LoadingModal;
