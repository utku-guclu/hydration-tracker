import React, { useState } from "react";

import HydrationUpdateForm from "./HydrationUpdateForm";
import Dialog from "../../context/Dialog";

function HydrationUpdateDialog({ log, onUpdate, onCancel }) {
  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    setVisible(false);
    onCancel();
  };

  return (
    <Dialog visible={visible} onClose={handleClose}>
      <h3>Update Hydration Log</h3>
      <HydrationUpdateForm log={log} onUpdate={onUpdate} isDialogOpen={visible}/>
    </Dialog>
  );
}

export default HydrationUpdateDialog;
