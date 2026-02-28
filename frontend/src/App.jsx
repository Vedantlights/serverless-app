import React, { useState } from 'react';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import EmployeeDashboard from './components/EmployeeDashboard';
import AdminDashboard from './components/AdminDashboard';
import Sidebar from './components/Sidebar';

const PAGES = {
  login: 'login',
  register: 'register',
  employee: 'employee',
  admin: 'admin',
};

function App() {
  const [currentPage, setCurrentPage] = useState(PAGES.login);
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
    setCurrentPage(userData.role === 'admin' ? PAGES.admin : PAGES.employee);
  };

  const handleRegister = () => {
    setCurrentPage(PAGES.login);
  };

  const handleNavigate = (page) => {
    if (page === 'logout') {
      setUser(null);
      setCurrentPage(PAGES.login);
      return;
    }
    setCurrentPage(page);
  };

  const showSidebar = user && (currentPage === PAGES.employee || currentPage === PAGES.admin);

  return (
    <div className={`app ${showSidebar ? 'with-sidebar' : ''}`}>
      {showSidebar && (
        <Sidebar
          currentPage={currentPage}
          onNavigate={handleNavigate}
          user={user}
        />
      )}
      <main className="main-content">
        <div className="page-transition-wrapper">
          {currentPage === PAGES.login && (
            <Login
              onLogin={handleLogin}
              onNavigateToRegister={() => setCurrentPage(PAGES.register)}
            />
          )}
          {currentPage === PAGES.register && (
            <Register onRegister={handleRegister} onNavigateToLogin={() => setCurrentPage(PAGES.login)} />
          )}
          {currentPage === PAGES.employee && <EmployeeDashboard user={user} />}
          {currentPage === PAGES.admin && <AdminDashboard user={user} />}
        </div>
      </main>
    </div>
  );
}

export default App;
