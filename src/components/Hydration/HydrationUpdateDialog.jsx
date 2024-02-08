import React, { useState, useEffect, useRef } from "react";
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

    return (
        <div
            style={{
                display: visible ? "flex" : "none",
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                border: "1px solid black",
                padding: "10px",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "rgba(33,33,33, 1)",
            }}
            ref={dialogRef}
        >
            <h3>Update Hydration Log</h3>
            <HydrationUpdateForm log={log} onUpdate={onUpdate} />
            <button onClick={handleClose}>Close</button>
        </div>
    );
}

export default HydrationUpdateDialog;
