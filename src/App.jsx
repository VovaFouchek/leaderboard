import { Wrapper } from './components/Wrapper';
import { Header } from './components/Header';
import { Board } from './components/Board';

import './App.css';

const App = () => {
  return (
    <div className="App">
      <Wrapper>
        <Header />
        <Board />
      </Wrapper>
    </div>
  );
}

export default App;
