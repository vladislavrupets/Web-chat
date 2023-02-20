import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import "./modal.css";

const Modal = ({ isActive, setActive, children }) => {
  return ReactDOM.createPortal(
    <div
      className={isActive ? "modal active" : "modal"}
      onClick={() => setActive(false)}
    >
      <div
        className={isActive ? "modal-content active" : "modal-content"}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default Modal;
