import React from 'react';

import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { NFTPage } from './pages/NFTPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="" element={<HomePage />} />
            <Route path="/nftPage" element={<NFTPage />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </div>
  );
};

export default App;
