import * as React from "react";

import InputAdornment from "@mui/material/InputAdornment";

import TextField from "@mui/material/TextField";

export default function UnitTexField({
  unit,
  label,
  placeholder,
  type,
  id,
  name,
  value,
  min,
  onChange,
  onFocus,
  onBlur,
}) {
  return (
    <TextField
      style={{ width: "100%" }}
      label={label}
      placeholder={String(placeholder)}
      type={type}
      id={id}
      name={name}
      value={value}
      min={min}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      sx={{ m: 1, width: "25ch" }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">{unit}</InputAdornment>
        ),
      }}
    />
  );
}
