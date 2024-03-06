import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

function Dialog({ visible, onClose, children }) {
  const dialogRef = useRef(null);

  // Function to handle closing the dialog
  const handleClose = () => {
    onClose();
  };

  // Close the dialog if clicking outside of it
  const handleClickOutside = (e) => {
    if (dialogRef.current && !dialogRef.current.contains(e.target)) {
      handleClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []); // Add and remove event listener on mount and unmount

  // Render the dialog outside of the main content area
  return ReactDOM.createPortal(
    <dialog
      style={{
        display: visible ? "flex" : "none",
        position: "fixed",
        border: "none",
        boxShadow: "0 0 10px 5px var(--main-color)",
        flexDirection: "column",
        alignItems: "center",
        top: "50%",
        bottom: "50%",
        backgroundColor: "rgba(33,33,33, 1)",
        zIndex: 100,
      }}
      ref={dialogRef}
    >
      {children}
      <button style={{ marginTop: "6px" }} onClick={handleClose}>
        Close
      </button>
    </dialog>,
    document.body
  );
}

export default Dialog;
