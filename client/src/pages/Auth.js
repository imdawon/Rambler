import React from "react";
import GoogleLogin from "react-google-login";
import axios from 'axios';

function Auth() {

  const responseGoogle = (response) => {
    // id we need to pass to our backend
    const id_token = response.tc.id_token;
    // axios.post(`/google-auth`, id_token)
    // .then(res => {
    //   console.log(res);
    // })
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
