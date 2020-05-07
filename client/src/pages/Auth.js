import React from "react";
import * as queryString from 'query-string';

function Auth() {

    const stringifiedParams = queryString.stringify({
        client_id: process.env.REACT_APP_OAUTH_CLIENT_ID,
        redirect_uri: 'https://shielded-reaches-07010.herokuapp.com/google-auth/',
        scope: [
          'https://www.googleapis.com/auth/userinfo.email',
          'https://www.googleapis.com/auth/userinfo.profile',
        ].join(' '), // space seperated string
        response_type: 'code',
        access_type: 'offline',
        prompt: 'consent',
      });
      
      const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`;
      console.log(`googleLoginUrl: ${googleLoginUrl}`);
      console.log(`CLIENT ID: ${process.env.OAUTH_CLIENT_ID}`);

  return (
    <div>
        <h1>Weclome to Rambler Sign-in</h1>
        <a href={googleLoginUrl}>Sign up & in With Google</a>
    </div>
  );
}

export default Auth;
