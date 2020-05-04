import React from 'react';
import Wrapper from "./components/Wrapper";
import Main from "./components/Main";
import './App.css';

console.log(process.env.REACT_APP_REI_API_KEY);

function App() {
  return (
   <div>
   <Wrapper>
   <Main>
   </Main>
   </Wrapper>
   </div>

  );
  
}

export default App;
