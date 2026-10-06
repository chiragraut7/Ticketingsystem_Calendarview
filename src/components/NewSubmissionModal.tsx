import React, { useState } from 'react';
import { Submission, SubmissionStatus } from '../types';

interface NewSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (submission: Submission) => void;
  initialDate?: string;
}

export const NewSubmissionModal: React.FC<NewSubmissionModalProps> = ({
  isOpen,
  onClose,
  onAdd,
  initialDate
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Trial Balance');
  const [serviceProvider, setServiceProvider] = useState('Test keyas Entity Sp');
  const [entityName, setEntityName] = useState('Analytics');
  const [propertyName, setPropertyName] = useState('UK Portfolio Complex');
  const [dataset, setDataset] = useState('UK_PM_TS_Data_Anomylised');
  const [dueDate, setDueDate] = useState(initialDate || '2026-09-24');
  const [postMonth, setPostMonth] = useState('Sep, 2026');
  const [status, setStatus] = useState<SubmissionStatus>('new');
  const [priority, setPriority] = useState<'High' | 'Medium' | 'Low'>('Medium');
  const [description, setDescription] = useState('');
  const [attachedFiles, setAttachedFiles] = useState<Array<{ name: string; size: string; type: 'excel' | 'pdf' | 'doc' | 'csv' }>>([
    { name: 'Submission_Template.xlsx', size: '1.8 MB', type: 'excel' }
  ]);

  if (!isOpen) return null;

  const quickCategories = [
    'Trial Balance',
    'Rent Roll',
    'Loan',
    'Journal Entry',
    'Tax Package',
    'Bank Rec',
    'AP Aging'
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const extension = file.name.split('.').pop()?.toLowerCase();
    const fileType = extension === 'pdf' ? 'pdf' : extension === 'csv' ? 'csv' : extension === 'doc' || extension === 'docx' ? 'doc' : 'excel';
    const newFile = {
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      type: fileType as any
    };
    setAttachedFiles(prev => [...prev, newFile]);
  };

  const handleRemoveFile = (index: number) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newNum = String(Math.floor(5700 + Math.random() * 299));
    const randomPrefix = Math.floor(100 + Math.random() * 900);
    const randomSuffix = Math.floor(100 + Math.random() * 900);
    const generatedRefId = `${randomPrefix}IS20F11D${randomSuffix}`;

    const newSubmission: Submission = {
      id: newNum,
      refId: generatedRefId,
      submissionNumber: newNum,
      title: title.trim() || `${dataset} Package`,
      category,
      serviceProvider,
      entityName,
      propertyName,
      dataset,
      dueDate,
      postMonth,
      status,
      priority,
      assignedTo: 'DAP Admin',
      description,
      files: attachedFiles.map(f => ({
        ...f,
        date: dueDate
      })),
      history: [
        {
          user: 'DAP Admin',
          action: 'Created new submission package',
          timestamp: new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })
        }
      ]
    };

    onAdd(newSubmission);
    onClose();
  };

  return (
    <div className="nice-modal-backdrop d-flex align-items-center justify-content-center p-3" tabIndex={-1}>
      <div className="nice-modal-dialog shadow-2xl border-0 rounded-4 overflow-hidden w-100" style={{ maxWidth: '780px' }}>
        
        {/* Header */}
        <div className="nice-modal-header d-flex align-items-center justify-content-between px-4 py-3 border-bottom bg-white">
          <div className="d-flex align-items-center gap-3">
            <div className="nice-modal-icon-badge">
              <i className="bi bi-file-earmark-plus-fill"></i>
            </div>
            <div>
              <h5 className="fw-bold text-dark m-0 d-flex align-items-center gap-2">
                Create New Submission
                <span className="badge bg-orange-subtle text-orange border border-orange-subtle" style={{ fontSize: '0.72rem' }}>
                  Workflow Active
                </span>
              </h5>
              <div className="text-secondary small mt-0.5">
                Define dataset parameters, service provider, and schedule target.
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

        {/* Quick Category Chips */}
        <div className="bg-light px-4 py-2 border-bottom d-flex align-items-center gap-2 overflow-x-auto">
          <span className="text-secondary small fw-medium text-nowrap">Quick Category:</span>
          <div className="d-flex align-items-center gap-1.5 flex-nowrap">
            {quickCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`category-chip-btn ${category === cat ? 'active' : ''}`}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit}>
          <div className="nice-modal-body p-4 bg-white" style={{ maxHeight: 'calc(80vh - 140px)', overflowY: 'auto' }}>
            <div className="row g-3">
              
              {/* Card 1: Title and Category */}
              <div className="col-12">
                <div className="nice-form-section p-3 border rounded-3 bg-light-subtle">
                  <div className="row g-3">
                    <div className="col-12 col-md-8">
                      <label className="form-label small fw-bold text-dark d-flex align-items-center gap-1.5 mb-1">
                        <span>Submission Title / Task Summary</span>
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-sm border-secondary-subtle"
                        placeholder="e.g. UK_PM_TS_Data_Anomylised"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                      />
                    </div>

                    <div className="col-12 col-md-4">
                      <label className="form-label small fw-bold text-dark mb-1">Priority</label>
                      <div className="d-flex align-items-center gap-1">
                        {(['Low', 'Medium', 'High'] as const).map((p) => (
                          <button
                            key={p}
                            type="button"
                            className={`priority-chip-btn ${priority === p ? `active-${p.toLowerCase()}` : ''}`}
                            onClick={() => setPriority(p)}
                          >
                            {p}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: Entity & Provider Details */}
              <div className="col-12">
                <div className="nice-form-section p-3 border rounded-3 bg-white">
                  <div className="section-title-label mb-2 text-uppercase text-secondary fw-bold" style={{ fontSize: '0.7rem', letterSpacing: '0.5px' }}>
                    <i className="bi bi-building me-1"></i> Entity & Service Provider
                  </div>
                  <div className="row g-2.5">
                    <div className="col-12 col-md-6">
                      <label className="form-label small fw-medium text-secondary mb-1">Service Provider Name *</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={serviceProvider}
                        onChange={(e) => setServiceProvider(e.target.value)}
                        required
                      />
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="form-label small fw-medium text-secondary mb-1">Entity Name *</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={entityName}
                        onChange={(e) => setEntityName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="form-label small fw-medium text-secondary mb-1">Property Name *</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={propertyName}
                        onChange={(e) => setPropertyName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="form-label small fw-medium text-secondary mb-1">Dataset Identifier *</label>
                      <div className="input-group input-group-sm">
                        <span className="input-group-text bg-light text-muted">
                          <i className="bi bi-database"></i>
                        </span>
                        <input
                          type="text"
                          className="form-control font-monospace"
                          value={dataset}
                          onChange={(e) => setDataset(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3: Lifecycle Schedule & Status */}
              <div className="col-12">
                <div className="nice-form-section p-3 border rounded-3 bg-white">
                  <div className="section-title-label mb-2 text-uppercase text-secondary fw-bold" style={{ fontSize: '0.7rem', letterSpacing: '0.5px' }}>
                    <i className="bi bi-calendar3 me-1"></i> Lifecycle & Schedule
                  </div>
                  <div className="row g-2.5">
                    <div className="col-12 col-md-4">
                      <label className="form-label small fw-medium text-secondary mb-1">Due Date *</label>
                      <input
                        type="date"
                        className="form-control form-control-sm"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        required
                      />
                    </div>

                    <div className="col-12 col-md-4">
                      <label className="form-label small fw-medium text-secondary mb-1">Post Month</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={postMonth}
                        placeholder="e.g. Sep, 2026"
                        onChange={(e) => setPostMonth(e.target.value)}
                      />
                    </div>

                    <div className="col-12 col-md-4">
                      <label className="form-label small fw-medium text-secondary mb-1">Initial Status</label>
                      <select
                        className="form-select form-select-sm"
                        value={status}
                        onChange={(e) => setStatus(e.target.value as SubmissionStatus)}
                      >
                        <option value="new">New</option>
                        <option value="in-progress">In-Progress</option>
                        <option value="submitted_for_review">Submitted For Review</option>
                        <option value="reopened">Reopened</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>

                    <div className="col-12">
                      <div className="d-flex align-items-center justify-content-between p-2 bg-light rounded mt-1 border">
                        <div className="d-flex align-items-center gap-2">
                          <div className="user-avatar-circle" style={{ width: '28px', height: '28px', fontSize: '0.72rem' }}>
                            DA
                          </div>
                          <div>
                            <span className="small fw-semibold text-dark">Assigned To: DAP Admin</span>
                            <span className="text-muted small ms-1">(dap-sa@4seeanalytics.net)</span>
                          </div>
                        </div>
                        <span className="badge bg-success-subtle text-success border border-success-subtle">
                          System Auto-Assign
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 4: Attachments */}
              <div className="col-12">
                <div className="nice-form-section p-3 border rounded-3 bg-white">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <span className="section-title-label text-uppercase text-secondary fw-bold" style={{ fontSize: '0.7rem', letterSpacing: '0.5px' }}>
                      <i className="bi bi-paperclip me-1"></i> Attached Files & Artifacts ({attachedFiles.length})
                    </span>
                    <label className="btn btn-xs btn-outline-secondary d-inline-flex align-items-center gap-1 cursor-pointer m-0">
                      <i className="bi bi-upload"></i> Upload File
                      <input type="file" className="d-none" onChange={handleFileUpload} />
                    </label>
                  </div>

                  {attachedFiles.length === 0 ? (
                    <div className="text-center py-3 border border-dashed rounded text-muted small">
                      <i className="bi bi-cloud-arrow-up fs-4 d-block mb-1 text-secondary opacity-50"></i>
                      Drag & drop files or click Upload File
                    </div>
                  ) : (
                    <div className="d-flex flex-wrap gap-2">
                      {attachedFiles.map((f, i) => (
                        <div key={i} className="attached-file-pill d-flex align-items-center gap-2 px-2.5 py-1 bg-light border rounded">
                          <i className={`bi ${f.type === 'excel' ? 'bi-file-earmark-excel text-success' : f.type === 'pdf' ? 'bi-file-earmark-pdf text-danger' : 'bi-file-earmark-text text-primary'}`}></i>
                          <span className="small text-dark fw-medium text-truncate" style={{ maxWidth: '180px' }}>{f.name}</span>
                          <span className="text-muted" style={{ fontSize: '0.7rem' }}>({f.size})</span>
                          <button
                            type="button"
                            className="btn btn-link p-0 text-muted hover-danger"
                            onClick={() => handleRemoveFile(i)}
                            aria-label={`Remove ${f.name}`}
                          >
                            <i className="bi bi-x"></i>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Card 5: Description */}
              <div className="col-12">
                <label className="form-label small fw-semibold text-secondary mb-1">
                  Description / Remarks
                </label>
                <textarea
                  className="form-control form-control-sm"
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Additional context, compliance notes, or instructions for this submission..."
                />
              </div>

            </div>
          </div>

          {/* Footer */}
          <div className="nice-modal-footer px-4 py-3 bg-light border-top d-flex align-items-center justify-content-between">
            <button
              type="button"
              className="btn btn-sm btn-white border px-3 text-secondary fw-semibold"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn btn-sm btn-brand px-4 py-1.5 shadow-sm fw-semibold d-flex align-items-center gap-2"
            >
              <i className="bi bi-check-lg fs-6"></i>
              <span>Create Submission</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
