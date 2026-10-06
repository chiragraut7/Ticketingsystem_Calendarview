import React, { useState, useEffect } from 'react';
import { Submission, SubmissionStatus } from '../types';

interface EventModalProps {
  submission: Submission | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updated: Submission) => void;
  onDelete: (id: string) => void;
}

export const EventModal: React.FC<EventModalProps> = ({
  submission,
  isOpen,
  onClose,
  onSave,
  onDelete
}) => {
  const [formData, setFormData] = useState<Submission | null>(null);
  const [activeTab, setActiveTab] = useState<'details' | 'files' | 'history'>('details');
  const [newComment, setNewComment] = useState('');
  const [uploadNotice, setUploadNotice] = useState<string | null>(null);

  useEffect(() => {
    if (submission) {
      setFormData({ ...submission });
      setActiveTab('details');
      setNewComment('');
      setUploadNotice(null);
    }
  }, [submission]);

  if (!isOpen || !formData) return null;

  const handleChange = (field: keyof Submission, value: any) => {
    setFormData(prev => prev ? { ...prev, [field]: value } : null);
  };

  const handleStatusChange = (newStatus: SubmissionStatus) => {
    if (!formData) return;
    const historyEntry = {
      user: 'DAP Admin',
      action: `Changed status to ${newStatus.toUpperCase()}`,
      timestamp: new Date().toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short'
      })
    };
    setFormData({
      ...formData,
      status: newStatus,
      history: [historyEntry, ...(formData.history || [])]
    });
  };

  const handleAddComment = () => {
    if (!newComment.trim() || !formData) return;
    const commentEntry = {
      user: 'DAP Admin',
      action: `Note added: "${newComment.trim()}"`,
      timestamp: new Date().toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short'
      })
    };
    setFormData({
      ...formData,
      history: [commentEntry, ...(formData.history || [])]
    });
    setNewComment('');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !formData) return;

    const newFile = {
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      date: new Date().toISOString().split('T')[0],
      type: file.name.endsWith('.pdf') ? 'pdf' : file.name.endsWith('.xlsx') ? 'excel' : 'doc'
    };

    setFormData({
      ...formData,
      files: [...(formData.files || []), newFile],
      history: [
        {
          user: 'DAP Admin',
          action: `Uploaded attachment: ${file.name}`,
          timestamp: new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })
        },
        ...(formData.history || [])
      ]
    });
    setUploadNotice(`File "${file.name}" uploaded successfully.`);
    setTimeout(() => setUploadNotice(null), 3000);
  };

  const handleRemoveFile = (index: number) => {
    if (!formData || !formData.files) return;
    const updatedFiles = [...formData.files];
    const removed = updatedFiles.splice(index, 1)[0];
    setFormData({
      ...formData,
      files: updatedFiles,
      history: [
        {
          user: 'Dharmendra Jaiswal',
          action: `Removed attachment: ${removed.name}`,
          timestamp: new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })
        },
        ...(formData.history || [])
      ]
    });
  };

  const handleSaveAndClose = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      onSave(formData);
      onClose();
    }
  };

  return (
    <div className="nice-modal-backdrop d-flex align-items-center justify-content-center p-3" tabIndex={-1}>
      <div className="nice-modal-dialog shadow-2xl border-0 rounded-4 overflow-hidden w-100" style={{ maxWidth: '820px' }}>
        
        {/* Modal Header */}
        <div className="nice-modal-header d-flex align-items-center justify-content-between px-4 py-3 border-bottom bg-white">
          <div className="d-flex align-items-center gap-3">
            <div className="nice-modal-icon-badge">
              <i className="bi bi-file-earmark-check-fill"></i>
            </div>
            <div>
              <div className="d-flex align-items-center gap-2">
                <span className="ref-id-badge font-monospace">{formData.refId}</span>
                <span className="fw-bold text-dark fs-6">{formData.title}</span>
                <span className={`status-pill ${formData.status}`}>
                  {formData.status.toUpperCase()}
                </span>
              </div>
              <div className="text-secondary small mt-0.5">
                {formData.serviceProvider} • {formData.entityName}
              </div>
            </div>
          </div>
          <button
            type="button"
            className="nice-modal-close-btn"
            aria-label="Close"
            onClick={onClose}
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

          {/* Modal Nav Tabs */}
          <div className="border-bottom px-4 pt-2 bg-white">
            <ul className="nav nav-tabs border-0" role="tablist">
              <li className="nav-item">
                <button
                  className={`nav-link small fw-medium py-2 px-3 ${activeTab === 'details' ? 'active border-bottom border-primary border-2 text-primary' : 'text-secondary'}`}
                  onClick={() => setActiveTab('details')}
                >
                  <i className="bi bi-info-circle me-1"></i> Details & Attributes
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link small fw-medium py-2 px-3 ${activeTab === 'files' ? 'active border-bottom border-primary border-2 text-primary' : 'text-secondary'}`}
                  onClick={() => setActiveTab('files')}
                >
                  <i className="bi bi-paperclip me-1"></i> Attached Files ({formData.files?.length || 0})
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link small fw-medium py-2 px-3 ${activeTab === 'history' ? 'active border-bottom border-primary border-2 text-primary' : 'text-secondary'}`}
                  onClick={() => setActiveTab('history')}
                >
                  <i className="bi bi-clock-history me-1"></i> Activity & Audit Trail
                </button>
              </li>
            </ul>
          </div>

          {/* Modal Body */}
          <div className="modal-body p-4" style={{ maxHeight: '68vh', overflowY: 'auto' }}>
            
            {/* TAB 1: DETAILS */}
            {activeTab === 'details' && (
              <form onSubmit={handleSaveAndClose}>
                <div className="row g-3">
                  
                  {/* Row 1: Category & Status */}
                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold text-secondary">Category / Submission Type</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      value={formData.category}
                      onChange={(e) => handleChange('category', e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold text-secondary">Status</label>
                    <select
                      className="form-select form-select-sm"
                      value={formData.status}
                      onChange={(e) => handleStatusChange(e.target.value as SubmissionStatus)}
                    >
                      <option value="overdue">🔴 Overdue</option>
                      <option value="duesoon">🟠 Due Soon</option>
                      <option value="upcoming">🔵 Upcoming</option>
                      <option value="completed">🟢 Completed / Closed</option>
                      <option value="reopened">🟣 Reopened</option>
                    </select>
                  </div>

                  {/* Row 2: Service Provider & Entity */}
                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold text-secondary">Service Provider</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      value={formData.serviceProvider}
                      onChange={(e) => handleChange('serviceProvider', e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold text-secondary">Entity Name</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      value={formData.entityName}
                      onChange={(e) => handleChange('entityName', e.target.value)}
                      required
                    />
                  </div>

                  {/* Row 3: Property Name & Dataset */}
                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold text-secondary">Property Name</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      value={formData.propertyName}
                      onChange={(e) => handleChange('propertyName', e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold text-secondary">Dataset</label>
                    <input
                      type="text"
                      className="form-control form-control-sm font-monospace"
                      value={formData.dataset}
                      onChange={(e) => handleChange('dataset', e.target.value)}
                      required
                    />
                  </div>

                  {/* Row 4: Due Date & Post Month */}
                  <div className="col-12 col-md-4">
                    <label className="form-label small fw-semibold text-secondary">Due Date</label>
                    <input
                      type="date"
                      className="form-control form-control-sm"
                      value={formData.dueDate}
                      onChange={(e) => handleChange('dueDate', e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-12 col-md-4">
                    <label className="form-label small fw-semibold text-secondary">Post Month</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      value={formData.postMonth}
                      placeholder="e.g. Oct 2024"
                      onChange={(e) => handleChange('postMonth', e.target.value)}
                    />
                  </div>
                  <div className="col-12 col-md-4">
                    <label className="form-label small fw-semibold text-secondary">Priority</label>
                    <select
                      className="form-select form-select-sm"
                      value={formData.priority || 'Medium'}
                      onChange={(e) => handleChange('priority', e.target.value)}
                    >
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>

                  {/* Row 5: Assigned User */}
                  <div className="col-12">
                    <label className="form-label small fw-semibold text-secondary">Assigned Specialist</label>
                    <div className="input-group input-group-sm">
                      <span className="input-group-text bg-light text-muted">
                        <i className="bi bi-person"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={formData.assignedTo || 'Dharmendra Jaiswal'}
                        onChange={(e) => handleChange('assignedTo', e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Row 6: Description */}
                  <div className="col-12">
                    <label className="form-label small fw-semibold text-secondary">Scope / Notes & Instructions</label>
                    <textarea
                      className="form-control form-control-sm"
                      rows={3}
                      value={formData.description || ''}
                      onChange={(e) => handleChange('description', e.target.value)}
                      placeholder="Add specific instructions, SLA requirements, or internal notes..."
                    />
                  </div>

                </div>
              </form>
            )}

            {/* TAB 2: FILES & ATTACHMENTS */}
            {activeTab === 'files' && (
              <div>
                {uploadNotice && (
                  <div className="alert alert-success py-2 small d-flex align-items-center gap-2 mb-3">
                    <i className="bi bi-check-circle-fill"></i>
                    <span>{uploadNotice}</span>
                  </div>
                )}

                {/* Upload Trigger Area */}
                <div className="border border-2 border-dashed rounded-3 p-4 text-center bg-light mb-3">
                  <i className="bi bi-cloud-arrow-up fs-2 text-primary d-block mb-1"></i>
                  <h6 className="fw-semibold text-dark mb-1">Upload Supporting Documentation</h6>
                  <p className="small text-muted mb-2">Drag and drop files here, or click to browse</p>
                  <label className="btn btn-sm btn-outline-primary px-3 cursor-pointer">
                    <i className="bi bi-folder2-open me-1"></i> Select File
                    <input
                      type="file"
                      className="d-none"
                      onChange={handleFileUpload}
                    />
                  </label>
                </div>

                {/* File list */}
                <h6 className="small fw-bold text-secondary mb-2">Attached Documents ({formData.files?.length || 0})</h6>
                {!formData.files || formData.files.length === 0 ? (
                  <div className="p-3 bg-light rounded text-center small text-muted">
                    No files attached to this submission yet.
                  </div>
                ) : (
                  <div className="list-group list-group-flush border rounded">
                    {formData.files.map((file, idx) => (
                      <div key={idx} className="list-group-item d-flex align-items-center justify-content-between py-2 px-3">
                        <div className="d-flex align-items-center gap-2">
                          <i className={`bi ${file.name.endsWith('.pdf') ? 'bi-file-earmark-pdf text-danger' : file.name.endsWith('.xlsx') || file.name.endsWith('.csv') ? 'bi-file-earmark-excel text-success' : 'bi-file-earmark-text text-primary'} fs-5`}></i>
                          <div>
                            <div className="fw-medium small text-dark">{file.name}</div>
                            <div className="text-muted" style={{ fontSize: '0.7rem' }}>{file.size} • Uploaded {file.date}</div>
                          </div>
                        </div>

                        <div className="d-flex align-items-center gap-1">
                          <button
                            className="btn btn-sm btn-outline-secondary p-1"
                            title="Download file"
                            onClick={() => alert(`Downloading: ${file.name}`)}
                          >
                            <i className="bi bi-download"></i>
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger p-1"
                            title="Remove attachment"
                            onClick={() => handleRemoveFile(idx)}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: HISTORY & AUDIT TRAIL */}
            {activeTab === 'history' && (
              <div>
                {/* Add internal comment */}
                <div className="card bg-light border p-3 mb-3">
                  <label className="form-label small fw-semibold text-secondary mb-1">Add Note / Comment</label>
                  <div className="d-flex gap-2">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      placeholder="Type an internal note or status clarification..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddComment();
                        }
                      }}
                    />
                    <button
                      className="btn btn-sm btn-primary px-3 text-nowrap"
                      onClick={handleAddComment}
                      disabled={!newComment.trim()}
                    >
                      Post Note
                    </button>
                  </div>
                </div>

                {/* Timeline */}
                <h6 className="small fw-bold text-secondary mb-2">Audit Log</h6>
                <div className="position-relative ps-3 border-start ms-2">
                  {(!formData.history || formData.history.length === 0) ? (
                    <div className="text-muted small">No activity recorded yet.</div>
                  ) : (
                    formData.history.map((log, index) => (
                      <div key={index} className="mb-3 position-relative">
                        <div
                          className="position-absolute rounded-circle bg-primary"
                          style={{
                            width: '8px',
                            height: '8px',
                            left: '-17px',
                            top: '5px'
                          }}
                        />
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="fw-semibold small text-dark">{log.user}</span>
                          <span className="text-muted" style={{ fontSize: '0.7rem' }}>{log.timestamp}</span>
                        </div>
                        <div className="small text-secondary">{log.action}</div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

          </div>

          {/* Modal Footer */}
          <div className="modal-footer bg-light border-top py-2 px-4 d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-sm btn-outline-danger"
              onClick={() => {
                if (window.confirm(`Are you sure you want to delete submission ${formData.refId}?`)) {
                  onDelete(formData.id);
                  onClose();
                }
              }}
            >
              <i className="bi bi-trash me-1"></i> Delete
            </button>

            <div className="d-flex align-items-center gap-2">
              {formData.status !== 'completed' ? (
                <button
                  type="button"
                  className="btn btn-sm btn-success"
                  onClick={() => {
                    handleStatusChange('completed');
                  }}
                >
                  <i className="bi bi-check2-circle me-1"></i> Mark as Completed
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-sm btn-outline-warning text-dark"
                  onClick={() => {
                    handleStatusChange('reopened');
                  }}
                >
                  <i className="bi bi-arrow-repeat me-1"></i> Reopen Task
                </button>
              )}

              <button
                type="button"
                className="btn btn-sm btn-secondary"
                onClick={onClose}
              >
                Close
              </button>

              <button
                type="button"
                className="btn btn-sm btn-brand"
                onClick={handleSaveAndClose}
              >
                Save Changes
              </button>
            </div>
          </div>

        </div>
      </div>
    );
  };
