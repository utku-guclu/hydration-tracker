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
        border: "4px solid var(--main-color)",
        boxShadow: "0 0 10px 5px var(--main-color)",
        padding: "10px",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "rgba(33,33,33, 1)",
      }}
      ref={dialogRef}
    >
      {children}
      <button style={{ width: "100%", marginTop: "6px" }} onClick={handleClose}>
        Close
      </button>
    </dialog>,
    document.body
  );
}

export default Dialog;