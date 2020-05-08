import React from "react";
import GoogleLogin from "react-google-login";
// import axios from 'axios';

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
        clientId={process.env.OAUTH_CLIENT_ID}
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
}

export default Auth;
