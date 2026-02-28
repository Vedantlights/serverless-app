import React, { useState, useRef, useEffect } from 'react';

const DUMMY_PROFILE = {
  name: 'John Doe',
  email: 'john.doe@company.com',
  role: 'Software Engineer',
  department: 'Engineering',
  joinDate: 'Jan 15, 2024',
  avatar: null,
  phone: '',
  address: '',
  city: '',
  dateOfBirth: '',
  bio: '',
};

function EmployeeDashboard({ user }) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [profile, setProfile] = useState(() => ({
    ...DUMMY_PROFILE,
    name: user?.name || DUMMY_PROFILE.name,
    email: user?.email || DUMMY_PROFILE.email,
  }));
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isModalClosing, setIsModalClosing] = useState(false);
  const [editForm, setEditForm] = useState({ ...profile });
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '' });
  const fileInputRef = useRef(null);

  useEffect(() => {
    setProfile((prev) => ({ ...prev, name: user?.name || prev.name, email: user?.email || prev.email }));
  }, [user?.name, user?.email]);

  useEffect(() => {
    if (!isEditModalOpen) return;
    const onEscape = (e) => { if (e.key === 'Escape') closeEditModal(); };
    window.addEventListener('keydown', onEscape);
    return () => window.removeEventListener('keydown', onEscape);
  }, [isEditModalOpen]);

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

  const openEditModal = () => {
    setEditForm({
      name: profile.name,
      email: profile.email,
      phone: profile.phone ?? '',
      address: profile.address ?? '',
      city: profile.city ?? '',
      dateOfBirth: profile.dateOfBirth ?? '',
      bio: profile.bio ?? '',
    });
    setProfileImagePreview(profile.avatar);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsModalClosing(true);
    setTimeout(() => {
      setIsEditModalOpen(false);
      setIsModalClosing(false);
      setProfileImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }, 280);
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = () => setProfileImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleEditFormChange = (field, value) => {
    setEditForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = () => {
    setProfile((prev) => ({
      ...prev,
      name: editForm.name,
      phone: editForm.phone,
      address: editForm.address,
      city: editForm.city,
      dateOfBirth: editForm.dateOfBirth,
      bio: editForm.bio,
      avatar: profileImagePreview ?? prev.avatar,
    }));
    closeEditModal();
    setToast({ show: true, message: 'Profile saved successfully!' });
    setTimeout(() => setToast((prev) => ({ ...prev, show: false })), 3000);
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
            <div className="profile-avatar">
              {profile.avatar ? (
                <img src={profile.avatar} alt="" className="profile-avatar-img" />
              ) : (
                profile.name.charAt(0)
              )}
            </div>
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
          <button type="button" className="btn btn-primary edit-profile-btn" onClick={openEditModal}>
            Edit Profile
          </button>
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

      {isEditModalOpen && (
        <div
          className={`modal-overlay ${isModalClosing ? 'modal-overlay-closing' : 'modal-overlay-visible'}`}
          onClick={closeEditModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="edit-profile-title"
        >
          <div
            className="modal-content glass-card profile-edit-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="edit-profile-title" className="modal-title">Edit Profile</h2>

            <div className="profile-edit-avatar-wrap">
              <label className="profile-edit-avatar-label">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleProfileImageChange}
                  className="profile-edit-avatar-input"
                />
                <div className="profile-edit-avatar-preview">
                  {profileImagePreview ? (
                    <img src={profileImagePreview} alt="" />
                  ) : (
                    <span>{editForm.name ? editForm.name.charAt(0) : '?'}</span>
                  )}
                </div>
                <span className="profile-edit-avatar-hint">Change photo</span>
              </label>
            </div>

            <form
              className="profile-edit-form"
              onSubmit={(e) => { e.preventDefault(); handleSaveProfile(); }}
            >
              <div className="input-group">
                <input
                  type="text"
                  className="input-field"
                  placeholder=" "
                  value={editForm.name}
                  onChange={(e) => handleEditFormChange('name', e.target.value)}
                  id="edit-fullname"
                />
                <label className="input-label" htmlFor="edit-fullname">Full name</label>
              </div>
              <div className="input-group">
                <input
                  type="email"
                  className="input-field"
                  placeholder=" "
                  value={editForm.email}
                  readOnly
                  disabled
                  id="edit-email"
                />
                <label className="input-label" htmlFor="edit-email">Email (read-only)</label>
              </div>
              <div className="input-group">
                <input
                  type="tel"
                  className="input-field"
                  placeholder=" "
                  value={editForm.phone}
                  onChange={(e) => handleEditFormChange('phone', e.target.value)}
                  id="edit-phone"
                />
                <label className="input-label" htmlFor="edit-phone">Phone number</label>
              </div>
              <div className="input-group">
                <input
                  type="text"
                  className="input-field"
                  placeholder=" "
                  value={editForm.address}
                  onChange={(e) => handleEditFormChange('address', e.target.value)}
                  id="edit-address"
                />
                <label className="input-label" htmlFor="edit-address">Address</label>
              </div>
              <div className="input-group">
                <input
                  type="text"
                  className="input-field"
                  placeholder=" "
                  value={editForm.city}
                  onChange={(e) => handleEditFormChange('city', e.target.value)}
                  id="edit-city"
                />
                <label className="input-label" htmlFor="edit-city">City</label>
              </div>
              <div className="input-group">
                <input
                  type="date"
                  className="input-field"
                  value={editForm.dateOfBirth}
                  onChange={(e) => handleEditFormChange('dateOfBirth', e.target.value)}
                  id="edit-dob"
                />
                <label className="input-label input-label-date" htmlFor="edit-dob">Date of birth</label>
              </div>
              <div className="input-group">
                <textarea
                  className="input-field input-field-textarea"
                  placeholder=" "
                  value={editForm.bio}
                  onChange={(e) => handleEditFormChange('bio', e.target.value)}
                  id="edit-bio"
                  rows={4}
                />
                <label className="input-label input-label-textarea" htmlFor="edit-bio">Bio</label>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={closeEditModal}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {toast.show && (
        <div className="toast toast-visible" role="status">
          {toast.message}
        </div>
      )}
    </div>
  );
}

export default EmployeeDashboard;
