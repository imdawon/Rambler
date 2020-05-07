import React from "react";

function Auth() {
  
  return (
    <div>
      <h1>Weclome to Rambler Sign-in</h1>
      <div className="g-signin2" data-onsuccess="onSignIn"></div>
    </div>
  );
}

export default Auth;
