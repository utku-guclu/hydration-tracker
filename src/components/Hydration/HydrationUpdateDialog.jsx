import React, { useRef, useState } from "react";

import HydrationUpdateForm from "./HydrationUpdateForm";
import Dialog from "../../context/Dialog";

function HydrationUpdateDialog({ log, onUpdate, onCancel }) {
  const [visible, setVisible] = useState(true);
  const dialogRef = useRef(null);

  const handleClose = () => {
    setVisible(false);
    onCancel();
  };

  return (
    <Dialog visible={visible} onClose={handleClose} dialogRef={dialogRef}>
      <h3>Update Hydration Log</h3>
      <HydrationUpdateForm log={log} onUpdate={onUpdate} />
    </Dialog>
  );
}

export default HydrationUpdateDialog;
