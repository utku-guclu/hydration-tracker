import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function ValidationTextField({
  id,
  name,
  type,
  value,
  autoComplete,
  onChange,
  placeholder,
  error,
  label,
  helperText,
}) {
  return (
    <TextField
      name={name}
      type={type}
      value={value}
      autoComplete={autoComplete}
      onChange={onChange}
      error={error}
      id={id}
      label={label}
      // defaultValue={placeholder}
      helperText={helperText}
      placeholder={placeholder}
      required
    />
  );
}
