import React from "react";
import * as queryString from 'query-string';

function Auth() {

  const onSignIn = (googleUser) => {
    console.log(`User is ${googleUser.getBasicProfile}`)
  }

  return (
    <div>
      <h1>Weclome to Rambler Sign-in</h1>
      <div className="g-signin2" data-onsuccess="onSignIn"></div>
    </div>
  );
}

export default Auth;
