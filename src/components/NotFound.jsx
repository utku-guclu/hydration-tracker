import React from "react";

const NotFound = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <pre>
        {`
      ─────────▄▄───────────────▄▄──
      ────────▌▒█───────────▄▄▀▒▌───
      ────────▌▒▒▀▄───────▄▄▀▒▒▒▐───
      ───────▐▄▀▒▒▀▀▀▀▄▄▄▀▒▒▒▒▒▐───
      ─────▄▄▀▒▒▒▒▒▒▒▒▒▒▒█▒▒▄█▒▐───
      ───▄▀▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▀██▀▒▌───
      ──▐▒▒▒▄▄▄▒▒▒▒▒▒▒▒▒▒▒▒▀▄▒▒▌───
      ──▌▒▒▐▄█▀▒▒▒▒▄▀█▄▒▒▒▒▒▒▒█▒▐───
      ─▐▒▒▐▀▐▄▄▒▄▄▀▀▀▄▄▒▒▒▒▒▒▒▒▀▄▌──
      ─▌▒▒▌▀▄▄▄▄▄▄▀▀▀▒▒▒▒▒▒▒▒▒▒▒▒▐──
      ▐▒▒▐▒▀▐▄▄▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▄▒▒▐──
      ─▀▄▌▌▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▄▄▄▀▒▒▐──
      ───▐▐────────────────────▐▀▒▒▌─
      ───▐▐------------------------▌▒▌─
      ───▐▌▌------------------------▐▐─
      ───▐▌▌------------------------▐▐─
      ───▐▌▐-------------------------▐▌─
      ───▐▐─▌-------------------------▐▌
        `}
      </pre>
      <div
        aria-label="Oops! The page you are looking for does not exist."
        role="alert"
      >
        <h2 style={{ margin: 0 }}>404 - Page Not Found</h2>
      </div>
      <p
        style={{
          position: "absolute",
          left: "-9999px",
          width: "1px",
          height: "1px",
          overflow: "hidden",
        }}
      >
        Oops! The page you are looking for does not exist.
      </p>
    </div>
  );
};

export default NotFound;
