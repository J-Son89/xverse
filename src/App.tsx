import React from 'react';

import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {HomePage} from './pages/HomePage';
import {NFTPage} from './pages/NFTPage';

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="" element={<HomePage />} />
          <Route path="/nftPage" element={<NFTPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
