// Signup.jsx"
import React, { useCallback, useEffect } from "react";
import useFetch from "../../../hooks/useFetch";

import server from "../../../config/baseURL";
import { CircularProgress } from "@mui/material";

import googleClient from "../../../config/googleClient";

// https://developers.google.com/identity/gsi/web/reference/js-reference

import GoogleButton from "react-google-button";
import googleClient from "../../../config/googleClient";

const SignUp = () => {
  const { handleGoogle, loading, error, data } = useFetch(
    `${server}/user/google/signup`
  );

  const openGoogle = useCallback(() => {
    /* global google */
    if (window.google) {
      google.accounts.id.initialize({
        client_id: googleClient,
        callback: handleGoogle,
      });

      // google.accounts.id.renderButton(document.getElementById("signUpDiv"), {
      //   // type: "standard",
      //   theme: "filled_black",
      //   // size: "small",
      //   text: "continue_with",
      //   shape: "pill",
      // });

      google.accounts.id.prompt();
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
          <GoogleButton
            id="signUpDiv"
            data-text="signup_with"
            onClick={openGoogle}
          ></GoogleButton>
        )}
      </div>
    </>
  );
};

export default SignUp;
