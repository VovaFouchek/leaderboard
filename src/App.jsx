import { Routes, Route } from 'react-router-dom';

import Board from 'components/Board';
import LeaderProfile from 'components/LeaderProfile';
import NotFound from 'components/NotFound';
import { Wrapper } from 'shared/components/Wrapper';
import 'App.css';

const App = () => {
  return (
    <div className="App">
      <Wrapper>
        <Routes>
          <Route path="/" element={<Board />} />
          <Route path="leader/:id" element={<LeaderProfile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Wrapper>
    </div>
  );
};

export default App;
