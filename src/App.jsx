
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import PublicPage from './components/PublicPage';
import ProtectedPage from './components/ProtectedPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import withAuth from './components/withAuth';

function App() {
  const [authenticated, setAuthenticated] = useState(localStorage.getItem('authenticated') === 'true');

  const handleLogin = () => {
    setAuthenticated(true);
    localStorage.setItem('authenticated', 'true');
  };

  const handleLogout = () => {
    setAuthenticated(false);
    localStorage.removeItem('authenticated');
  };

  return (
    <div>
      {authenticated && <button onClick={handleLogout}>Logout</button>}
      <Routes>
        <Route path="/public" element={<PublicPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/protected" element={withAuth(ProtectedPage)()} />
      </Routes>
    </div>
  );
}

export default App;