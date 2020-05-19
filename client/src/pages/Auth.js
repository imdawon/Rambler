import React from "react";

function Auth() {
  return (
    <div style={{textAlign:"center"}}>
      <h1>Weclome to Rambler Sign-in</h1>
      <br />
      <span className="icon is-small is-centered">
            
        </span> <br />
      <a href="/google-auth"><button class="button is-success is-light"><i className="fa fa-google fa-lg"></i>&nbsp;&nbsp;Login With Google</button></a>
    </div>
  );
}

export default Auth;
