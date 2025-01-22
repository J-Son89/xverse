import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HomePage } from './pages/HomePage'
import { NFTPage } from './pages/NFTPage'
import { AppStateProvider } from './appState'

function App() {
  return (
    <div className="App">
      <Router>
        <AppStateProvider>
          <Routes>
            <Route path="" element={<HomePage />} />
            <Route path="nftPage" element={<NFTPage />} />
          </Routes>
        </AppStateProvider>
      </Router>
    </div>
  );
}

export default App;
