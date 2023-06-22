import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Toss from './components/Toss';
import Play from './components/Play';
import AllMatches from './components/AllMatches';
import MatchDetail from './components/MatchDetail';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/toss' element={<Toss />} />
          <Route path='/play/:id' element={<Play />} />
          <Route path='/matches' element={<AllMatches />} />
          <Route path='/matches/:id' element={<MatchDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
