import React from 'react';

import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HomePage } from './pages/HomePage'
import { NFTPage } from './pages/NFTPage'
import { AppStateProvider } from './appState'

const App: React.FC= () => {
  return (
    <div className="App">
      <Router>
        <AppStateProvider>
          <Routes>
            <Route path="" element={<HomePage />} />
            <Route path="/nftPage/:id" element={<NFTPage />} />
          </Routes>
        </AppStateProvider>
      </Router>
    </div>
  );
}

export default App;
