import React from "react";
import GoogleLogin from "react-google-login"

function Auth() {

  const responseGoogle = (response) => {
    console.log(response)
  }

  return (
    <div>
      <h1>Weclome to Rambler Sign-in</h1>
      <GoogleLogin
        clientId="174389928584-m3a4ljtpsks71r09srq96fobsujg8l9v.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
}

export default Auth;
