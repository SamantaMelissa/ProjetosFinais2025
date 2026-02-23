import React, { useState, useEffect } from "react";
import "./Modal.css";

export const Modal = ({ onClose, children }) => {
  const [closing, setClosing] = useState(false);

  const handleClose = () => {
    setClosing(true);
    setTimeout(onClose, 300);
  };

  useEffect(() => {
    setClosing(false);
  }, []);

  return (
    <div
      className={`modal-overlay ${closing ? "fade-out" : ""}`}
      onClick={handleClose}
    >
      <div
        className={`modal-content ${closing ? "zoom-out" : "animate-modal"}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};
