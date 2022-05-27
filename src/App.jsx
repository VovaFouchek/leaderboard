import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Wrapper } from './components/Wrapper';
import { Header } from './components/Header';
import { Board } from './components/Board';
import { LeaderProfile } from './components/LeaderProfile';
import { NotFound } from './components/NotFound';

import './App.css';

const App = () => {
  const [list, setList] = useState([]);
  return (
    <div className="App">
      <Wrapper>
        <Header list={list} setList={setList} />
        <Routes>
          <Route path="/" element={<Board list={list} setList={setList} />} />
          <Route path="leader">
            <Route path=":id" element={<LeaderProfile list={list} />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Wrapper>
    </div>
  );
};

export default App;
