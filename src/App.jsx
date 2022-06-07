import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Wrapper } from './shared/components/Wrapper';
import { Board } from './components/Board';
import { LeaderProfile } from './components/LeaderProfile';
import { NotFound } from './components/NotFound';

import './App.css';

const App = () => {
  const [list, setList] = useState([]);
  return (
    <div className="App">
      <Wrapper>
        <Routes>
          <Route path="/" element={<Board list={list} setList={setList} />} />
          <Route path="leader">
            <Route path=":id" element={<LeaderProfile />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Wrapper>
    </div>
  );
};

export default App;
