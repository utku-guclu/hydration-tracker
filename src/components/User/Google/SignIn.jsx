// Login.jsx
import React, { useEffect } from "react";
import useFetch from "../../../hooks/useFetch";

import server from "../../../config/baseURL";
import { CircularProgress } from "@mui/material";

import googleClient from "../../../config/googleClient";

// https://developers.google.com/identity/gsi/web/reference/js-reference

const SignIn = () => {
  const { handleGoogle, loading, error } = useFetch(
    `${server}/auth/google/signin`
  );

  useEffect(() => {
    /* global google */
    if (window.google) {
      google.accounts.id.initialize({
        client_id: googleClient,
        callback: handleGoogle,
      });

      google.accounts.id.renderButton(document.getElementById("signInDiv"), {
        // type: "standard",
        theme: "filled_black",
        // size: "small",
        text: "signin_with",
        shape: "pill",
      });

      // google.accounts.id.prompt();
    }
  }, [handleGoogle]);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {loading ? (
          <CircularProgress />
        ) : (
          <div id="signInDiv" data-text="sigin_with"></div>
        )}
      </div>
    </>
  );
};

export default SignIn;
