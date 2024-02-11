import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

import HydrationUpdateForm from "./HydrationUpdateForm";

function HydrationUpdateDialog({ log, onUpdate, onCancel }) {
  const [visible, setVisible] = useState(true);
  const dialogRef = useRef(null);

  const handleClose = () => {
    setVisible(false);
    onCancel();
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
      id="log-update"
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
      <h3>Update Hydration Log</h3>
      <HydrationUpdateForm log={log} onUpdate={onUpdate} />
      <button style={{ width: "100%", marginTop: "6px" }} onClick={handleClose}>
        Close
      </button>
    </dialog>,
    document.body
  );
}

export default HydrationUpdateDialog;
