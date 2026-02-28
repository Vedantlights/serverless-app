import React, { useState } from 'react';

const DUMMY_EMPLOYEES = [
  { id: 1, name: 'Sarah Chen', email: 'sarah.chen@company.com', role: 'Frontend Lead', department: 'Engineering', status: 'Active' },
  { id: 2, name: 'Marcus Johnson', email: 'marcus.j@company.com', role: 'Backend Dev', department: 'Engineering', status: 'Active' },
  { id: 3, name: 'Elena Rodriguez', email: 'elena.r@company.com', role: 'Product Manager', department: 'Product', status: 'Active' },
  { id: 4, name: 'David Kim', email: 'david.kim@company.com', role: 'Designer', department: 'Design', status: 'On Leave' },
  { id: 5, name: 'Jessica Moore', email: 'jessica.m@company.com', role: 'DevOps', department: 'Engineering', status: 'Active' },
];

function AdminDashboard({ user }) {
  const [employees, setEmployees] = useState(DUMMY_EMPLOYEES);
  const [editingId, setEditingId] = useState(null);

  const handleEdit = (id) => {
    setEditingId(editingId === id ? null : id);
  };

  const handleDelete = (id) => {
    setEmployees((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <div className="dashboard-page fade-in">
      <div className="page-header">
        <h1>Admin Dashboard</h1>
        <p className="page-subtitle">Manage your team</p>
      </div>

      <div className="table-card glass-card card-reveal">
        <div className="table-wrapper">
          <table className="employees-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Department</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp, index) => (
                <tr
                  key={emp.id}
                  className="table-row-reveal"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <td>
                    <div className="employee-cell">
                      <span className="emp-avatar">{emp.name.charAt(0)}</span>
                      {emp.name}
                    </div>
                  </td>
                  <td>{emp.email}</td>
                  <td>{emp.role}</td>
                  <td>{emp.department}</td>
                  <td>
                    <span className={`status-badge status-${emp.status.toLowerCase().replace(' ', '')}`}>
                      {emp.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn-icon btn-edit"
                        onClick={() => handleEdit(emp.id)}
                        title="Edit"
                      >
                        ✎
                      </button>
                      <button
                        className="btn-icon btn-delete"
                        onClick={() => handleDelete(emp.id)}
                        title="Delete"
                      >
                        ×
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
