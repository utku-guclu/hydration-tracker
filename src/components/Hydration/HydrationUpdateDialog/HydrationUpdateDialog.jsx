import React, { useState } from "react";

import HydrationUpdateForm from "../HydationUpdateForm/HydrationUpdateForm";
import Dialog from "../../../context/Dialog";

import { styled } from "@mui/system";

const HydrationUpdateHeading = styled("h2")(() => ({}));

function HydrationUpdateDialog({ log, onUpdate, onCancel }) {
  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    setVisible(false);
    onCancel();
  };

  return (
    <Dialog visible={visible} onClose={handleClose}>
      <HydrationUpdateHeading>Update Hydration Log</HydrationUpdateHeading>
      <HydrationUpdateForm
        log={log}
        onUpdate={onUpdate}
        isDialogOpen={visible}
      />
    </Dialog>
  );
}

export default HydrationUpdateDialog;
