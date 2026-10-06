import React, { useState } from 'react';
import { Submission } from '../types';

interface UploadedFilesViewProps {
  submissions: Submission[];
  onBackToCalendar: () => void;
  onSelectSubmission: (submission: Submission) => void;
}

export const UploadedFilesView: React.FC<UploadedFilesViewProps> = ({
  submissions,
  onBackToCalendar,
  onSelectSubmission
}) => {
  const [fileSearch, setFileSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  // Extract all files with parent submission info
  const allFiles = submissions.flatMap(sub =>
    (sub.files || []).map(file => ({
      ...file,
      submissionId: sub.id,
      submissionRef: sub.refId,
      submissionTitle: sub.title,
      serviceProvider: sub.serviceProvider,
      entityName: sub.entityName,
      dueDate: sub.dueDate,
      parentSubmission: sub
    }))
  );

  const filteredFiles = allFiles.filter(f => {
    const matchesSearch =
      f.name.toLowerCase().includes(fileSearch.toLowerCase()) ||
      f.submissionRef.toLowerCase().includes(fileSearch.toLowerCase()) ||
      f.serviceProvider.toLowerCase().includes(fileSearch.toLowerCase()) ||
      f.entityName.toLowerCase().includes(fileSearch.toLowerCase());

    const matchesType = typeFilter === 'all' || f.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="uploaded-files-page mb-4">
      {/* Top Banner */}
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div>
          <button
            className="btn btn-sm btn-link text-decoration-none text-muted ps-0 mb-1 d-flex align-items-center gap-1"
            onClick={onBackToCalendar}
          >
            <i className="bi bi-arrow-left"></i> Back to Submission Calendar
          </button>
          <h4 className="fw-bold text-dark m-0">Uploaded Document Repository</h4>
          <p className="text-secondary small m-0">
            Centrally audit, inspect, and retrieve submission packages and compliance artifacts.
          </p>
        </div>

        <button
          className="btn btn-sm btn-brand d-flex align-items-center gap-1"
          onClick={() => alert('Drag and drop files to any submission in calendar view, or upload via submission detail modal.')}
        >
          <i className="bi bi-upload"></i> Upload Package
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="card shadow-sm border mb-3">
        <div className="card-body p-3">
          <div className="row g-2 align-items-center">
            <div className="col-12 col-md-6">
              <div className="input-group input-group-sm">
                <span className="input-group-text bg-light text-muted">
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Filter files by name, submission #, or service provider..."
                  value={fileSearch}
                  onChange={(e) => setFileSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="col-6 col-md-3">
              <select
                className="form-select form-select-sm"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="all">All File Formats</option>
                <option value="excel">Excel (.xlsx / .csv)</option>
                <option value="pdf">PDF Documents (.pdf)</option>
                <option value="doc">Word Documents (.docx)</option>
                <option value="presentation">Presentations (.pptx)</option>
              </select>
            </div>

            <div className="col-6 col-md-3 text-end">
              <span className="badge bg-light text-secondary border px-3 py-2">
                {filteredFiles.length} files available
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Files Table */}
      <div className="card shadow-sm border">
        <div className="table-responsive">
          <table className="table table-hover submissions-table mb-0">
            <thead>
              <tr>
                <th scope="col">File Name</th>
                <th scope="col">Linked Submission</th>
                <th scope="col">Service Provider</th>
                <th scope="col">Entity</th>
                <th scope="col">Size</th>
                <th scope="col">Upload Date</th>
                <th scope="col" className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredFiles.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-4 text-muted">
                    No files found matching filter.
                  </td>
                </tr>
              ) : (
                filteredFiles.map((file, idx) => (
                  <tr key={idx}>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <i className={`bi ${file.name.endsWith('.pdf') ? 'bi-file-earmark-pdf text-danger' : file.name.endsWith('.xlsx') || file.name.endsWith('.csv') ? 'bi-file-earmark-excel text-success' : 'bi-file-earmark-text text-primary'} fs-5`}></i>
                        <span className="fw-semibold text-dark">{file.name}</span>
                      </div>
                    </td>
                    <td>
                      <button
                        className="btn btn-link btn-sm p-0 text-decoration-none fw-medium"
                        onClick={() => onSelectSubmission(file.parentSubmission)}
                      >
                        {file.submissionRef} - {file.submissionTitle}
                      </button>
                    </td>
                    <td>{file.serviceProvider}</td>
                    <td>{file.entityName}</td>
                    <td className="text-muted">{file.size}</td>
                    <td className="text-muted">{file.date}</td>
                    <td className="text-end">
                      <div className="btn-group btn-group-sm">
                        <button
                          className="btn btn-outline-secondary"
                          onClick={() => alert(`Downloading file: ${file.name}`)}
                          title="Download"
                        >
                          <i className="bi bi-download"></i>
                        </button>
                        <button
                          className="btn btn-outline-primary"
                          onClick={() => onSelectSubmission(file.parentSubmission)}
                          title="Open submission details"
                        >
                          <i className="bi bi-box-arrow-up-right"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
