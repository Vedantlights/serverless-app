import React, { useState } from 'react';

const DUMMY_PROFILE = {
  name: 'John Doe',
  email: 'john.doe@company.com',
  role: 'Software Engineer',
  department: 'Engineering',
  joinDate: 'Jan 15, 2024',
  avatar: null,
};

function EmployeeDashboard({ user }) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const profile = { ...DUMMY_PROFILE, name: user?.name || DUMMY_PROFILE.name, email: user?.email || DUMMY_PROFILE.email };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    if (!files.length) return;

    setUploading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setUploadedFiles((prev) => [...prev, ...files.map((f) => ({ name: f.name, size: f.size }))]);
    setUploading(false);
  };

  const handleFileSelect = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setUploading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setUploadedFiles((prev) => [...prev, ...files.map((f) => ({ name: f.name, size: f.size }))]);
    setUploading(false);
    e.target.value = '';
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="dashboard-page fade-in">
      <div className="page-header">
        <h1>Employee Dashboard</h1>
        <p className="page-subtitle">Manage your profile and documents</p>
      </div>

      <div className="dashboard-grid">
        <div className="profile-card glass-card card-reveal">
          <div className="profile-header">
            <div className="profile-avatar">{profile.name.charAt(0)}</div>
            <div className="profile-badge">Active</div>
          </div>
          <h2 className="profile-name">{profile.name}</h2>
          <p className="profile-role">{profile.role}</p>
          <div className="profile-details">
            <div className="detail-row">
              <span className="detail-label">Email</span>
              <span className="detail-value">{profile.email}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Department</span>
              <span className="detail-value">{profile.department}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Join Date</span>
              <span className="detail-value">{profile.joinDate}</span>
            </div>
          </div>
        </div>

        <div className="upload-card glass-card card-reveal">
          <h3>File Upload</h3>
          <div
            className={`upload-zone ${isDragging ? 'dragging' : ''} ${uploading ? 'uploading' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              type="file"
              id="file-upload"
              multiple
              onChange={handleFileSelect}
              className="upload-input"
              disabled={uploading}
            />
            {uploading ? (
              <div className="upload-state">
                <span className="spinner" />
                <p>Uploading...</p>
              </div>
            ) : (
              <div className="upload-state">
                <span className="upload-icon">📁</span>
                <p>Drag and drop files here or click to browse</p>
              </div>
            )}
          </div>
          {uploadedFiles.length > 0 && (
            <div className="uploaded-files">
              {uploadedFiles.map((file, i) => (
                <div key={i} className="uploaded-file-item fade-in">
                  <span className="file-name">✓ {file.name}</span>
                  <span className="file-size">{formatSize(file.size)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EmployeeDashboard;
