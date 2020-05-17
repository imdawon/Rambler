import React from 'react';
import Wrapper from "./components/Wrapper";
import Main from "./components/Main";
import GetUserInfo from './components/GetUserInfo'
import { StoreProvider } from "./utils/GlobalState";
import './App.css';

function App() {
  return (
    <div>
    <GetUserInfo />
      <StoreProvider>
        <Wrapper>
          <Main>
          </Main>
        </Wrapper>
      </StoreProvider>
    </div>

  );

}

export default App;