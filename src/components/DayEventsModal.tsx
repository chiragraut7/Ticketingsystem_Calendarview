import React from 'react';
import { Submission } from '../types';

interface DayEventsModalProps {
  isOpen: boolean;
  date: string | null;
  submissions: Submission[];
  onClose: () => void;
  onSelectEvent: (submission: Submission) => void;
  onAddNewEvent: (date: string) => void;
}

export const DayEventsModal: React.FC<DayEventsModalProps> = ({
  isOpen,
  date,
  submissions,
  onClose,
  onSelectEvent,
  onAddNewEvent
}) => {
  if (!isOpen || !date) return null;

  // Format date display
  const formatDateDisplay = (dateStr: string) => {
    try {
      const [year, month, day] = dateStr.split('-');
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return `${parseInt(day, 10)} ${monthNames[parseInt(month, 10) - 1]} ${year}`;
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="nice-modal-backdrop d-flex align-items-center justify-content-center p-3" tabIndex={-1}>
      <div className="nice-modal-dialog shadow-2xl border-0 rounded-4 overflow-hidden w-100" style={{ maxWidth: '620px' }}>
        
        <div className="nice-modal-header d-flex align-items-center justify-content-between px-4 py-3 border-bottom bg-white">
          <div className="d-flex align-items-center gap-3">
            <div className="nice-modal-icon-badge">
              <i className="bi bi-calendar3"></i>
            </div>
            <div>
              <h5 className="fw-bold text-dark m-0 d-flex align-items-center gap-2">
                Submissions for {formatDateDisplay(date)}
              </h5>
              <div className="text-secondary small mt-0.5">
                {submissions.length} total tasks scheduled for this day
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

        <div className="nice-modal-body p-4 bg-white" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
          <div className="d-flex flex-column gap-2.5">
            {submissions.map((sub) => (
              <div
                key={sub.id}
                className="list-group-item list-group-item-action border rounded-3 p-3 cursor-pointer shadow-sm hover-shadow transition"
                onClick={() => {
                  onSelectEvent(sub);
                  onClose();
                }}
                style={{ cursor: 'pointer' }}
              >
                <div className="d-flex justify-content-between align-items-start mb-1">
                  <div className="d-flex align-items-center gap-2">
                    <span className="ref-id-badge font-monospace">{sub.refId}</span>
                    <span className="fw-bold text-dark">{sub.title}</span>
                  </div>
                  <span className={`status-pill ${sub.status}`}>{sub.status.toUpperCase()}</span>
                </div>
                <div className="small text-secondary mb-1">
                  <span className="fw-semibold">{sub.serviceProvider}</span> • {sub.entityName}
                </div>
                <div className="d-flex justify-content-between align-items-center text-muted small mt-2 pt-2 border-top">
                  <span>Category: <strong className="text-dark">{sub.category}</strong></span>
                  <span className="text-orange fw-semibold">View details →</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="nice-modal-footer px-4 py-3 bg-light border-top d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-sm btn-brand d-flex align-items-center gap-1.5"
            onClick={() => {
              onClose();
              onAddNewEvent(date);
            }}
          >
            <i className="bi bi-plus-lg"></i> Add Submission For This Day
          </button>
          <button type="button" className="btn btn-sm btn-white border text-secondary fw-semibold px-3" onClick={onClose}>
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
