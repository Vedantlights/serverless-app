import React from 'react';

function Sidebar({ currentPage, onNavigate, user }) {
  const isAdmin = user?.role === 'admin';

  const navItems = [
    ...(isAdmin ? [{ id: 'admin', label: 'Admin Dashboard', icon: '👥' }] : []),
    { id: 'employee', label: 'Employee Dashboard', icon: '📊' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <span className="logo-icon">◇</span>
          <span>Dashboard</span>
        </div>
      </div>
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
            onClick={() => onNavigate(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="sidebar-footer">
        <div className="user-badge">
          <span className="user-avatar">{user?.name?.charAt(0) || '?'}</span>
          <div className="user-info">
            <span className="user-name">{user?.name}</span>
            <span className="user-role">{user?.role}</span>
          </div>
        </div>
        <button className="logout-btn" onClick={() => onNavigate('logout')}>
          Log out
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
