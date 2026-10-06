import React, { useState, useMemo } from 'react';
import { Submission, SubmissionStatus } from '../types';

interface SubmissionsTableProps {
  submissions: Submission[];
  selectedDate: string | null;
  onClearDateFilter: () => void;
  onSelectEvent: (submission: Submission) => void;
  onUpdateStatus: (id: string, newStatus: SubmissionStatus) => void;
  onDeleteSubmission: (id: string) => void;
}

export const SubmissionsTable: React.FC<SubmissionsTableProps> = ({
  submissions,
  selectedDate,
  onClearDateFilter,
  onSelectEvent,
  onUpdateStatus,
  onDeleteSubmission
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInput, setPageInput] = useState('1');
  const [sortField, setSortField] = useState<'dueDate' | 'refId' | 'submissionNumber'>('dueDate');
  const [sortAsc, setSortAsc] = useState(true);
  const [openActionDropdownId, setOpenActionDropdownId] = useState<string | null>(null);
  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Format date display like the screenshot: "Sep 24, 26" or "Oct 07, 26"
  const formatDateTheme = (dateStr: string) => {
    try {
      const [year, month, day] = dateStr.split('-');
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const mStr = monthNames[parseInt(month, 10) - 1];
      const yShort = year.length === 4 ? year.slice(-2) : year;
      return `${mStr} ${day.padStart(2, '0')}, ${yShort}`;
    } catch {
      return dateStr;
    }
  };

  // Filtered and sorted data
  const filteredSubmissions = useMemo(() => {
    let list = [...submissions];

    // Filter by selected date if set
    if (selectedDate) {
      list = list.filter(item => item.dueDate === selectedDate);
    }

    // Filter by category
    if (categoryFilter !== 'all') {
      list = list.filter(item => item.category === categoryFilter);
    }

    // Filter by status dropdown
    if (statusFilter !== 'all') {
      list = list.filter(item => item.status === statusFilter);
    }

    // Filter by search term
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      list = list.filter(item =>
        item.refId.toLowerCase().includes(q) ||
        item.submissionNumber.toLowerCase().includes(q) ||
        item.serviceProvider.toLowerCase().includes(q) ||
        item.entityName.toLowerCase().includes(q) ||
        item.propertyName.toLowerCase().includes(q) ||
        item.dataset.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.status.toLowerCase().includes(q) ||
        (item.postMonth && item.postMonth.toLowerCase().includes(q))
      );
    }

    // Sort
    list.sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];
      if (valA < valB) return sortAsc ? -1 : 1;
      if (valA > valB) return sortAsc ? 1 : -1;
      return 0;
    });

    return list;
  }, [submissions, selectedDate, categoryFilter, statusFilter, searchTerm, sortField, sortAsc]);

  // Dynamic entries display based on actual dummy submissions
  const totalEntries = filteredSubmissions.length;
  const totalPages = Math.max(1, Math.ceil(totalEntries / pageSize));

  // Ensure current page stays within valid bounds
  const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);

  const paginatedEntries = useMemo(() => {
    const start = (safeCurrentPage - 1) * pageSize;
    return filteredSubmissions.slice(start, start + pageSize);
  }, [filteredSubmissions, safeCurrentPage, pageSize]);

  const handleSort = (field: 'dueDate' | 'refId' | 'submissionNumber') => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const getStatusBadge = (status: SubmissionStatus) => {
    switch (status) {
      case 'new':
        return <span className="theme-status-pill pill-new">New</span>;
      case 'reopened_by_system':
        return <span className="theme-status-pill pill-reopened-system">Reopened By System</span>;
      case 'submitted_for_review':
        return <span className="theme-status-pill pill-review">Submitted For Review</span>;
      case 'in-progress':
      case 'duesoon':
        return <span className="theme-status-pill pill-in-progress">In-Progress</span>;
      case 'completed':
        return <span className="theme-status-pill pill-completed">Completed</span>;
      case 'reopened':
      case 'overdue':
        return <span className="theme-status-pill pill-reopened">Reopened</span>;
      case 'upcoming':
        return <span className="theme-status-pill pill-new">Upcoming</span>;
      default:
        return <span className="theme-status-pill pill-new">{status}</span>;
    }
  };

  const allCategories = Array.from(new Set(submissions.map(s => s.category).filter(Boolean)));

  const handleGoToPage = (e: React.FormEvent) => {
    e.preventDefault();
    const p = parseInt(pageInput, 10);
    if (!isNaN(p) && p >= 1 && p <= totalPages) {
      setCurrentPage(p);
    }
  };

  return (
    <div className="theme-table-container mb-2">
      
      {/* Top Filter and Search Bar */}
      <div className="d-flex flex-wrap align-items-center justify-content-between mb-2 gap-2">
        <div className="d-flex align-items-center gap-2 flex-grow-1" style={{ maxWidth: '650px' }}>
          
          {/* Search box with pill border */}
          <div className="position-relative flex-grow-1" style={{ maxWidth: '420px' }}>
            <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
            <input
              type="text"
              className="form-control form-control-sm ps-5 rounded-pill border py-2 bg-white"
              placeholder="Search by ID, Provider, Property, Dataset..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ fontSize: '0.8125rem', borderColor: '#e2e8f0' }}
            />
            {searchTerm && (
              <button
                className="btn btn-sm btn-link position-absolute top-50 end-0 translate-middle-y me-2 p-0 text-muted"
                onClick={() => setSearchTerm('')}
              >
                <i className="bi bi-x"></i>
              </button>
            )}
          </div>

          {/* Filter button with orange funnel and text */}
          <button
            className={`btn btn-sm btn-outline-filter d-flex align-items-center gap-1 ${showAdvancedFilter ? 'active' : ''}`}
            onClick={() => setShowAdvancedFilter(!showAdvancedFilter)}
          >
            <i className="bi bi-funnel-fill text-orange"></i>
            <span className="fw-semibold">Filter</span>
          </button>

          {/* Checked filter status button */}
          <button
            className="btn btn-sm btn-icon-round"
            title="Active filters"
            onClick={() => setShowAdvancedFilter(!showAdvancedFilter)}
          >
            <i className="bi bi-check-circle text-orange"></i>
          </button>

          {/* Reset / History reload button */}
          <button
            className="btn btn-sm btn-icon-round"
            title="Reset filters and reload view"
            onClick={() => {
              setSearchTerm('');
              setCategoryFilter('all');
              setStatusFilter('all');
              onClearDateFilter();
            }}
          >
            <i className="bi bi-arrow-counterclockwise text-orange"></i>
          </button>

        </div>

        {/* Right: Show entries dropdown */}
        <div className="d-flex align-items-center gap-2 ms-auto">
          <span className="text-secondary small">Show</span>
          <select
            className="form-select form-select-sm"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
            style={{ width: '70px', fontSize: '0.8125rem' }}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <span className="text-secondary small">entries</span>
        </div>
      </div>

      {/* Expandable filter options */}
      {showAdvancedFilter && (
        <div className="card shadow-xs border p-3 mb-3 bg-white">
          <div className="row g-2 align-items-end">
            <div className="col-12 col-md-4">
              <label className="form-label small text-muted mb-1">Filter by Ticket Category:</label>
              <select
                className="form-select form-select-sm"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="all">All Categories</option>
                {allCategories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="col-12 col-md-4">
              <label className="form-label small text-muted mb-1">Filter by Status:</label>
              <select
                className="form-select form-select-sm"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="new">New</option>
                <option value="in-progress">In-Progress</option>
                <option value="completed">Completed / Closed</option>
                <option value="reopened">Reopened</option>
                <option value="reopened_by_system">Reopened By System</option>
                <option value="submitted_for_review">Submitted For Review</option>
              </select>
            </div>
            <div className="col-12 col-md-4">
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => {
                  setCategoryFilter('all');
                  setStatusFilter('all');
                  setSearchTerm('');
                }}
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Active Date Banner if selected */}
      {selectedDate && (
        <div className="alert alert-light border d-flex align-items-center justify-content-between py-2 px-3 mb-3">
          <div className="d-flex align-items-center gap-2 small">
            <i className="bi bi-calendar-event text-orange"></i>
            <span>Filtering by date: <strong>{formatDateTheme(selectedDate)}</strong></span>
          </div>
          <button className="btn btn-sm btn-link text-danger p-0 text-decoration-none small" onClick={onClearDateFilter}>
            Clear date filter
          </button>
        </div>
      )}

      {/* Main Table: Rounded corners, Solid Orange Header Banner, Capitalized Columns */}
      <div className="theme-table-card">
        <div className="table-responsive">
          <table className="table theme-grid-table mb-0">
            <thead>
              <tr className="theme-thead-row">
                <th scope="col" style={{ width: '130px' }}>REF ID</th>
                <th scope="col" style={{ width: '100px' }}>SUBMISSION#</th>
                <th scope="col">SERVICE PROVIDER NAME</th>
                <th scope="col">ENTITY NAME</th>
                <th scope="col">PROPERTY NAME</th>
                <th scope="col">DATASET</th>
                <th
                  scope="col"
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleSort('dueDate')}
                  title="Sort by due date"
                >
                  <div className="d-flex align-items-center gap-1">
                    <span>DUE DATE</span>
                    <i className={`bi bi-arrow-${sortField === 'dueDate' ? (sortAsc ? 'up' : 'down') : 'down-up'}`} style={{ fontSize: '0.75rem' }}></i>
                  </div>
                </th>
                <th scope="col">POST MONTH</th>
                <th scope="col">TICKET CATEGORY</th>
                <th scope="col">STATUS</th>
                <th scope="col" className="text-center" style={{ width: '50px' }}>
                  <i className="bi bi-three-dots"></i>
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedEntries.length === 0 ? (
                <tr>
                  <td colSpan={11} className="text-center py-5 text-muted bg-white">
                    <i className="bi bi-folder2-open fs-2 d-block mb-2 text-secondary"></i>
                    No submissions found matching criteria.
                  </td>
                </tr>
              ) : (
                paginatedEntries.map((row) => (
                  <tr
                    key={row.id}
                    onClick={() => onSelectEvent(row)}
                    className="theme-tbody-row"
                  >
                    <td>
                      <span className="ref-id-badge">
                        {row.refId}
                      </span>
                    </td>
                    <td className="text-muted fw-normal">{row.submissionNumber}</td>
                    <td className="fw-medium text-dark">{row.serviceProvider}</td>
                    <td className="text-secondary">{row.entityName}</td>
                    <td className="text-secondary">{row.propertyName || '-'}</td>
                    <td className="text-dark font-monospace" style={{ fontSize: '0.78rem' }}>
                      {row.dataset}
                    </td>
                    <td className="text-secondary">{formatDateTheme(row.dueDate)}</td>
                    <td className="text-secondary">{row.postMonth || 'Sep, 2026'}</td>
                    <td className="text-secondary">{row.category || ''}</td>
                    <td>
                      <div className="d-flex align-items-center gap-1.5">
                        {getStatusBadge(row.status)}
                        <div className="rounded-pill bg-light border overflow-hidden d-none d-lg-block" style={{ width: '22px', height: '5px' }}>
                          <div
                            className="h-100 rounded-pill"
                            style={{
                              width: row.status === 'completed' ? '100%' : row.status === 'submitted_for_review' ? '75%' : row.status === 'in-progress' || row.status === 'duesoon' ? '50%' : row.status === 'reopened' || row.status === 'reopened_by_system' ? '30%' : '15%',
                              backgroundColor: row.status === 'completed' ? '#16a34a' : row.status === 'in-progress' || row.status === 'duesoon' ? '#ea580c' : row.status === 'reopened' || row.status === 'reopened_by_system' ? '#dc2626' : '#0284c7'
                            }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="text-center position-relative" onClick={(e) => e.stopPropagation()}>
                      <button
                        className="btn btn-sm btn-link text-muted p-0"
                        onClick={() => setOpenActionDropdownId(openActionDropdownId === row.id ? null : row.id)}
                        aria-label="Actions"
                      >
                        <i className="bi bi-three-dots text-secondary"></i>
                      </button>

                      {openActionDropdownId === row.id && (
                        <div
                          className="dropdown-menu dropdown-menu-end show position-absolute shadow-lg border py-1"
                          style={{ zIndex: 1050, minWidth: '170px' }}
                        >
                          <button
                            className="dropdown-item small py-2 d-flex align-items-center gap-2"
                            onClick={() => {
                              onSelectEvent(row);
                              setOpenActionDropdownId(null);
                            }}
                          >
                            <i className="bi bi-eye text-primary"></i> View Details
                          </button>
                          <button
                            className="dropdown-item small py-2 d-flex align-items-center gap-2"
                            onClick={() => {
                              onSelectEvent(row);
                              setOpenActionDropdownId(null);
                            }}
                          >
                            <i className="bi bi-pencil text-secondary"></i> Edit
                          </button>
                          <div className="dropdown-divider"></div>
                          <button
                            className="dropdown-item small py-2 d-flex align-items-center gap-2 text-danger"
                            onClick={() => {
                              onDeleteSubmission(row.id);
                              setOpenActionDropdownId(null);
                            }}
                          >
                            <i className="bi bi-trash"></i> Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Table Pagination Footer matching screenshot with dynamic dummy data */}
      <div className="d-flex flex-wrap align-items-center justify-content-between mt-3 px-1 gap-2">
        
        {/* Left info & Go to page */}
        <div className="d-flex align-items-center gap-3 text-muted small">
          <span>
            Showing <strong>{totalEntries === 0 ? 0 : (safeCurrentPage - 1) * pageSize + 1}</strong> to <strong>{Math.min(safeCurrentPage * pageSize, totalEntries)}</strong> of <strong>{totalEntries}</strong> entries
          </span>
          <span className="text-secondary">|</span>
          <form onSubmit={handleGoToPage} className="d-flex align-items-center gap-1">
            <span>Go to page:</span>
            <input
              type="text"
              value={pageInput}
              onChange={(e) => setPageInput(e.target.value)}
              className="form-control form-control-sm text-center px-1"
              style={{ width: '42px', height: '26px', fontSize: '0.8rem' }}
              placeholder={String(safeCurrentPage)}
            />
          </form>
        </div>

        {/* Right: Dynamic Pagination controls */}
        <nav aria-label="Table pagination">
          <ul className="pagination pagination-sm m-0 gap-1 theme-pagination">
            <li className={`page-item ${safeCurrentPage <= 1 ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => setCurrentPage(1)}
                disabled={safeCurrentPage <= 1}
                title="First Page"
              >
                «
              </button>
            </li>
            <li className={`page-item ${safeCurrentPage <= 1 ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => setCurrentPage(safeCurrentPage - 1)}
                disabled={safeCurrentPage <= 1}
                title="Previous Page"
              >
                ‹
              </button>
            </li>

            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pg) => (
              <li key={pg} className={`page-item ${safeCurrentPage === pg ? 'active' : ''}`}>
                <button
                  className={`page-link ${safeCurrentPage === pg ? 'page-link-orange' : ''}`}
                  onClick={() => setCurrentPage(pg)}
                >
                  {pg}
                </button>
              </li>
            ))}

            <li className={`page-item ${safeCurrentPage >= totalPages ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => setCurrentPage(safeCurrentPage + 1)}
                disabled={safeCurrentPage >= totalPages}
                title="Next Page"
              >
                ›
              </button>
            </li>
            <li className={`page-item ${safeCurrentPage >= totalPages ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => setCurrentPage(totalPages)}
                disabled={safeCurrentPage >= totalPages}
                title="Last Page"
              >
                »
              </button>
            </li>
          </ul>
        </nav>

      </div>

    </div>
  );
};
