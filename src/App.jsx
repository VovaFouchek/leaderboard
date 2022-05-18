import { useState } from 'react';
import { Wrapper } from './components/Wrapper';
import { Header } from './components/Header';
import { Board } from './components/Board';

import './App.css';

const App = () => {
  const [list, setList] = useState([]);
  return (
    <div className="App">
      <Wrapper>
        <Header list={list} setList={setList} />
        <Board list={list} setList={setList} />
      </Wrapper>
    </div>
  );
};

export default App;
