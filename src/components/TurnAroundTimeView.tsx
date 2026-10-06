import React, { useState, useMemo } from 'react';
import {
  INITIAL_REPORT_RECORDS,
  SUBMISSION_STATUS_BY_PERIOD,
  AVG_SUBMISSION_DAYS_BY_PROVIDER,
  TOTAL_SUBMISSIONS_BY_PROVIDER,
} from '../data/reportsDummyData';
import { ExactHorizontalBarChart } from './charts/ExactHorizontalBarChart';
import { ExactDualLineChart } from './charts/ExactDualLineChart';
import { ExactStackedBarChart } from './charts/ExactStackedBarChart';

export const TurnAroundTimeView: React.FC = () => {
  // Filter States
  const [reportPackage, setReportPackage] = useState('All');
  const [serviceProvider, setServiceProvider] = useState('All');
  const [propertyName, setPropertyName] = useState('All');
  const [postMonth, setPostMonth] = useState('All');

  // Pagination & Sorting for Bottom Table
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [sortField, setSortField] = useState<'submissionId' | 'postMonth' | 'days'>('submissionId');
  const [sortAsc, setSortAsc] = useState(true);

  const resetFilters = () => {
    setReportPackage('All');
    setServiceProvider('All');
    setPropertyName('All');
    setPostMonth('All');
    setCurrentPage(1);
  };

  // Dropdown options
  const packageOptions = [
    'All',
    'Trial Balance',
    'ESG - Electric City Usage',
    'Property Attribute',
    'Tenancy Scheduled',
    'Account Receivable',
  ];
  const providerOptions = [
    'All',
    'CS Service Provider',
    'Shamrock Service Provider',
    'Skybridge Realty Service Provider',
    'Old Orleans Service Provider',
    'Phoenix Peak Service Provider',
    'S cop Service Provider',
  ];
  const propertyOptions = [
    'All',
    'WT Tower',
    'Nishifunabashi Tower',
    'Alpha 1',
    'Square Tower',
    'Alpha 3',
    'EPIC TOWER',
    'Alpha 2',
  ];
  const monthOptions = [
    'All',
    'Sep-23',
    'Oct-23',
    'Nov-23',
    'Dec-23',
    'Jan-24',
    'Feb-24',
    'Mar-24',
    'Apr-24',
    'May-24',
    'Jun-24',
    'Jul-24',
    'Aug-24',
    'Sep-24',
    'Oct-24',
  ];

  // 4 KPI Cards for Turn Around Time styled using Image 2's visual cards & coloured accent tops
  const kpiCards = [
    {
      id: 'total_prop',
      title: 'Total Properties',
      value: '36',
      subtitle: 'Active properties',
      topBorderColor: '#7c3aed', // Purple accent
      valueColor: '#7c3aed',
      badge: null,
    },
    {
      id: 'on_time_sub',
      title: 'On Time Submissions',
      value: '786',
      subtitle: 'Within SLA target',
      topBorderColor: '#10b981', // Green accent
      valueColor: '#16a34a',
      badge: {
        text: '86.85%',
        color: '#16a34a',
        bg: '#dcfce7',
      },
    },
    {
      id: 'delayed_sub',
      title: 'Delayed Submissions',
      value: '119',
      subtitle: 'Exceeded SLA target',
      topBorderColor: '#ef4444', // Red accent
      valueColor: '#dc2626',
      badge: {
        text: '13.15%',
        color: '#dc2626',
        bg: '#fee2e2',
      },
    },
    {
      id: 'total_sub',
      title: 'Total Submissions',
      value: '905',
      subtitle: 'MTD Total volume',
      topBorderColor: '#3b82f6', // Blue accent
      valueColor: '#2563eb',
      badge: null,
    },
  ];

  // Chart 1 Data: Submission Status by Period (14 Months Dual Line)
  const periodStatusData = useMemo(() => {
    return SUBMISSION_STATUS_BY_PERIOD.map((s) => ({
      month: s.month,
      success: s.onTime,
      errors: s.delayed,
    }));
  }, []);

  // Chart 2 Data: Total Submissions by Provider (% On-Time vs % Delayed)
  const providerSubmissionsData = useMemo(() => {
    return TOTAL_SUBMISSIONS_BY_PROVIDER.map((p) => ({
      name: p.name,
      topPct: p.delayedPct,
      bottomPct: p.onTimePct,
    }));
  }, []);

  // Chart 3 Data: Avg Submission Days by Service Provider
  const providerDaysData = useMemo(() => {
    return AVG_SUBMISSION_DAYS_BY_PROVIDER.map((p) => ({
      name: p.name,
      value: p.days,
    }));
  }, []);

  // Filtered records for Table
  const filteredRecords = useMemo(() => {
    return INITIAL_REPORT_RECORDS.filter((rec) => {
      if (reportPackage !== 'All' && rec.reportPackageName !== reportPackage) return false;
      if (serviceProvider !== 'All' && rec.serviceProviderName !== serviceProvider) return false;
      if (propertyName !== 'All' && rec.propertyName !== propertyName) return false;
      if (postMonth !== 'All' && rec.postMonth !== postMonth) return false;
      return true;
    }).sort((a, b) => {
      const valA = a[sortField];
      const valB = b[sortField];
      if (valA < valB) return sortAsc ? -1 : 1;
      if (valA > valB) return sortAsc ? 1 : -1;
      return 0;
    });
  }, [reportPackage, serviceProvider, propertyName, postMonth, sortField, sortAsc]);

  const totalPages = Math.ceil(filteredRecords.length / pageSize) || 1;
  const paginatedRecords = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredRecords.slice(start, start + pageSize);
  }, [filteredRecords, currentPage]);

  return (
    <div className="d-flex flex-column gap-3-5 pb-4">
      {/* 1. Page Title styled like Image 2 typography */}
      <div>
        <h1
          className="text-dark mb-0"
          style={{
            fontSize: '1.75rem',
            fontWeight: 400,
            letterSpacing: '-0.3px',
            color: '#1e293b',
          }}
        >
          Turn Around Time
        </h1>
      </div>

      {/* 2. Filter Row: Image 2's clean white card, pill buttons & spacing */}
      <div
        className="bg-white rounded-3 shadow-sm p-3 p-md-3-5 d-flex flex-wrap align-items-end gap-3"
        style={{
          border: '1px solid #e2e8f0',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.03)',
        }}
      >
        {/* Report Package Name */}
        <div className="d-flex flex-column flex-grow-1" style={{ minWidth: '170px' }}>
          <label className="text-secondary mb-1" style={{ fontSize: '0.75rem', fontWeight: 500, color: '#64748b' }}>
            Report Package Name
          </label>
          <select
            className="form-select form-select-sm border-secondary-subtle rounded-2"
            style={{ fontSize: '0.8rem', height: '36px', backgroundColor: '#fff' }}
            value={reportPackage}
            onChange={(e) => {
              setReportPackage(e.target.value);
              setCurrentPage(1);
            }}
          >
            {packageOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {/* Service Provider */}
        <div className="d-flex flex-column flex-grow-1" style={{ minWidth: '170px' }}>
          <label className="text-secondary mb-1" style={{ fontSize: '0.75rem', fontWeight: 500, color: '#64748b' }}>
            Service Provider
          </label>
          <select
            className="form-select form-select-sm border-secondary-subtle rounded-2"
            style={{ fontSize: '0.8rem', height: '36px', backgroundColor: '#fff' }}
            value={serviceProvider}
            onChange={(e) => {
              setServiceProvider(e.target.value);
              setCurrentPage(1);
            }}
          >
            {providerOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {/* Property Name */}
        <div className="d-flex flex-column flex-grow-1" style={{ minWidth: '160px' }}>
          <label className="text-secondary mb-1" style={{ fontSize: '0.75rem', fontWeight: 500, color: '#64748b' }}>
            Property Name
          </label>
          <select
            className="form-select form-select-sm border-secondary-subtle rounded-2"
            style={{ fontSize: '0.8rem', height: '36px', backgroundColor: '#fff' }}
            value={propertyName}
            onChange={(e) => {
              setPropertyName(e.target.value);
              setCurrentPage(1);
            }}
          >
            {propertyOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {/* Post Month */}
        <div className="d-flex flex-column flex-grow-1" style={{ minWidth: '130px' }}>
          <label className="text-secondary mb-1" style={{ fontSize: '0.75rem', fontWeight: 500, color: '#64748b' }}>
            Post Month
          </label>
          <select
            className="form-select form-select-sm border-secondary-subtle rounded-2"
            style={{ fontSize: '0.8rem', height: '36px', backgroundColor: '#fff' }}
            value={postMonth}
            onChange={(e) => {
              setPostMonth(e.target.value);
              setCurrentPage(1);
            }}
          >
            {monthOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {/* Action Buttons styled like Image 2 */}
        <div className="d-flex align-items-center gap-2">
          {/* Search Button (Solid Orange Pill matching Image 2) */}
          <button
            type="button"
            className="btn text-white rounded-pill px-4 shadow-sm"
            style={{
              backgroundColor: '#e65c00',
              borderColor: '#e65c00',
              height: '36px',
              fontSize: '0.82rem',
              fontWeight: 500,
            }}
            onClick={() => setCurrentPage(1)}
          >
            Search
          </button>

          {/* Reset Button (Outlined Orange Pill matching Image 2) */}
          <button
            type="button"
            className="btn rounded-pill px-4"
            style={{
              backgroundColor: '#fff',
              color: '#e65c00',
              border: '1px solid #e65c00',
              height: '36px',
              fontSize: '0.82rem',
              fontWeight: 500,
            }}
            onClick={resetFilters}
          >
            Reset
          </button>
        </div>
      </div>

      {/* 3. 4 KPI Cards: Turn Around Time Values & Percentages with Image 2 Coloured Accent Tops */}
      <div className="row g-3">
        {kpiCards.map((kpi) => (
          <div key={kpi.id} className="col-12 col-sm-6 col-lg-3">
            <div
              className="bg-white rounded-3 p-3 shadow-sm h-100 d-flex flex-column justify-content-between position-relative"
              style={{
                border: '1px solid #e2e8f0',
                borderTop: `3.5px solid ${kpi.topBorderColor}`,
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.03)',
                minHeight: '108px',
              }}
            >
              {/* Card Header Title */}
              <div className="d-flex align-items-center justify-content-between">
                <span
                  style={{
                    color: '#64748b',
                    fontSize: '0.78rem',
                    fontWeight: 500,
                  }}
                >
                  {kpi.title}
                </span>

                {/* Percentage Badge */}
                {kpi.badge && (
                  <span
                    className="px-2 py-0.5 rounded-pill fw-bold"
                    style={{
                      fontSize: '0.72rem',
                      color: kpi.badge.color,
                      backgroundColor: kpi.badge.bg,
                    }}
                  >
                    {kpi.badge.text}
                  </span>
                )}
              </div>

              {/* Big Bold KPI Number */}
              <div
                className="my-1 fw-bold"
                style={{
                  fontSize: '1.85rem',
                  lineHeight: 1.1,
                  color: kpi.valueColor,
                }}
              >
                {kpi.value}
              </div>

              {/* Subtitle / Context */}
              <div
                style={{
                  color: '#94a3b8',
                  fontSize: '0.72rem',
                  fontWeight: 400,
                }}
              >
                {kpi.subtitle}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 4. Chart Cards: 4 Charts in Image 2's clean white card styling with generous spacing */}
      <div className="row g-3">
        {/* Chart 1: Submission Status by Period */}
        <div className="col-12 col-lg-7">
          <div
            className="bg-white rounded-3 p-3 p-md-3-5 shadow-sm h-100 d-flex flex-column"
            style={{
              border: '1px solid #e2e8f0',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.03)',
            }}
          >
            <div className="mb-2">
              <div className="fw-semibold text-dark" style={{ fontSize: '0.95rem', color: '#1e293b' }}>
                Submission Status by Period
              </div>
              <div className="text-secondary" style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                On-time vs delayed volume · rolling 14 months (Sep-23 to Oct-24)
              </div>
            </div>

            <div className="flex-grow-1 d-flex flex-column justify-content-center pt-1">
              <ExactDualLineChart
                data={periodStatusData}
                title=""
                successLabel="# On-Time"
                errorsLabel="# Delayed"
              />
            </div>
          </div>
        </div>

        {/* Chart 2: Total Submissions by Service Provider */}
        <div className="col-12 col-lg-5">
          <div
            className="bg-white rounded-3 p-3 p-md-3-5 shadow-sm h-100 d-flex flex-column"
            style={{
              border: '1px solid #e2e8f0',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.03)',
            }}
          >
            <div className="mb-2">
              <div className="fw-semibold text-dark" style={{ fontSize: '0.95rem', color: '#1e293b' }}>
                Total Submissions by Service Provider
              </div>
              <div className="text-secondary" style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                % On Time vs % Delayed across providers
              </div>
            </div>

            <div className="flex-grow-1 d-flex flex-column justify-content-center pt-1">
              <ExactStackedBarChart
                data={providerSubmissionsData}
                title=""
                topLabel="% Delayed"
                bottomLabel="% On Time"
              />
            </div>
          </div>
        </div>

        {/* Chart 3: Avg Submission Days by Service Provider */}
        <div className="col-12 col-lg-6">
          <div
            className="bg-white rounded-3 p-3 p-md-3-5 shadow-sm h-100 d-flex flex-column"
            style={{
              border: '1px solid #e2e8f0',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.03)',
            }}
          >
            <div className="mb-2">
              <div className="fw-semibold text-dark" style={{ fontSize: '0.95rem', color: '#1e293b' }}>
                Avg Submission Days by Service Provider
              </div>
              <div className="text-secondary" style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                Average turnaround duration per submission (Days)
              </div>
            </div>

            <div className="flex-grow-1 d-flex flex-column justify-content-center pt-1">
              <ExactHorizontalBarChart data={providerDaysData} decimals={2} valueSuffix="d" />
            </div>
          </div>
        </div>

        {/* Chart 4: Turnaround Compliance Breakdown */}
        <div className="col-12 col-lg-6">
          <div
            className="bg-white rounded-3 p-3 p-md-3-5 shadow-sm h-100 d-flex flex-column"
            style={{
              border: '1px solid #e2e8f0',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.03)',
            }}
          >
            <div className="mb-2">
              <div className="fw-semibold text-dark" style={{ fontSize: '0.95rem', color: '#1e293b' }}>
                Turnaround Accuracy Breakdown
              </div>
              <div className="text-secondary" style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                SLA compliance benchmark across service providers
              </div>
            </div>

            <div className="flex-grow-1 d-flex flex-column justify-content-center pt-1">
              <ExactStackedBarChart
                data={providerSubmissionsData}
                title=""
                topLabel="% Delayed"
                bottomLabel="% On-Time"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 5. Full-width Submissions Table with Image 2 styling */}
      <div
        className="bg-white rounded-3 shadow-sm overflow-hidden"
        style={{
          border: '1px solid #e2e8f0',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.03)',
        }}
      >
        <div className="p-3 border-bottom d-flex align-items-center justify-content-between">
          <div>
            <span className="fw-semibold text-dark" style={{ fontSize: '0.95rem' }}>
              Turn Around Time Submissions
            </span>
            <span className="text-secondary ms-2" style={{ fontSize: '0.75rem' }}>
              ({filteredRecords.length} total entries)
            </span>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0" style={{ fontSize: '0.78rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                <th
                  scope="col"
                  style={{ cursor: 'pointer', padding: '11px 14px' }}
                  onClick={() => {
                    if (sortField === 'submissionId') setSortAsc(!sortAsc);
                    else {
                      setSortField('submissionId');
                      setSortAsc(true);
                    }
                  }}
                >
                  <div className="d-flex align-items-center gap-1 fw-bold text-dark">
                    <span>Submission ID</span>
                    <i
                      className={`bi bi-caret-${sortField === 'submissionId' ? (sortAsc ? 'up-fill' : 'down-fill') : 'up-fill'}`}
                      style={{ fontSize: '0.68rem', color: '#0f172a' }}
                    ></i>
                  </div>
                </th>
                <th scope="col" style={{ padding: '11px 14px', fontWeight: 600, color: '#334155' }}>
                  Report Package Name
                </th>
                <th scope="col" style={{ padding: '11px 14px', fontWeight: 600, color: '#334155' }}>
                  Service Provider Name
                </th>
                <th scope="col" style={{ padding: '11px 14px', fontWeight: 600, color: '#334155' }}>
                  Property Name
                </th>
                <th scope="col" style={{ padding: '11px 14px', fontWeight: 600, color: '#334155' }}>
                  Fund Name
                </th>
                <th scope="col" style={{ padding: '11px 14px', fontWeight: 600, color: '#334155' }}>
                  Status
                </th>
                <th scope="col" style={{ padding: '11px 14px', fontWeight: 600, color: '#334155' }}>
                  File Uploaded By
                </th>
                <th
                  scope="col"
                  style={{ cursor: 'pointer', padding: '11px 14px' }}
                  onClick={() => {
                    if (sortField === 'postMonth') setSortAsc(!sortAsc);
                    else {
                      setSortField('postMonth');
                      setSortAsc(true);
                    }
                  }}
                >
                  <div className="d-flex align-items-center gap-1 fw-bold text-dark">
                    <span>Post Month</span>
                    <i className="bi bi-arrow-down-up" style={{ fontSize: '0.65rem' }}></i>
                  </div>
                </th>
                <th scope="col" style={{ padding: '11px 14px', fontWeight: 600, color: '#334155' }}>
                  File Uploaded Date
                </th>
                <th
                  scope="col"
                  style={{ cursor: 'pointer', padding: '11px 14px', textAlign: 'center' }}
                  onClick={() => {
                    if (sortField === 'days') setSortAsc(!sortAsc);
                    else {
                      setSortField('days');
                      setSortAsc(true);
                    }
                  }}
                >
                  <div className="d-flex align-items-center justify-content-center gap-1 fw-bold text-dark">
                    <span>Turn Around (Days)</span>
                    <i className="bi bi-arrow-down-up" style={{ fontSize: '0.65rem' }}></i>
                  </div>
                </th>
                <th scope="col" style={{ padding: '11px 14px', fontWeight: 600, color: '#334155', textAlign: 'center' }}>
                  SLA Status
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedRecords.length === 0 ? (
                <tr>
                  <td colSpan={11} className="text-center py-4 text-muted bg-white">
                    No matching records found.
                  </td>
                </tr>
              ) : (
                paginatedRecords.map((row) => {
                  const isDelayed = row.days > 0;
                  return (
                    <tr key={row.submissionId} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td className="text-secondary ps-3" style={{ fontWeight: 500 }}>
                        {row.submissionId}
                      </td>
                      <td className="text-dark fw-medium">{row.reportPackageName}</td>
                      <td className="text-secondary">{row.serviceProviderName}</td>
                      <td className="text-secondary">{row.propertyName}</td>
                      <td className="text-secondary">{row.fundName}</td>
                      <td>
                        <span className="badge bg-light text-dark border px-2 py-1" style={{ fontWeight: 500 }}>
                          {row.status}
                        </span>
                      </td>
                      <td className="text-secondary">{row.fileUploadedBy}</td>
                      <td className="text-secondary font-monospace" style={{ fontSize: '0.75rem' }}>
                        {row.postMonth}
                      </td>
                      <td className="text-secondary">{row.fileUploadedDate}</td>
                      <td className="text-secondary text-center fw-medium">
                        {row.days} {row.days === 1 ? 'day' : 'days'}
                      </td>
                      <td className="text-center">
                        <span
                          className={`badge rounded-pill px-2.5 py-1 ${
                            isDelayed
                              ? 'bg-danger-subtle text-danger border border-danger-subtle'
                              : 'bg-success-subtle text-success border border-success-subtle'
                          }`}
                          style={{ fontSize: '0.72rem', fontWeight: 600 }}
                        >
                          {isDelayed ? 'Delayed' : 'On-Time'}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
            {/* Total Footer Row */}
            <tfoot>
              <tr style={{ backgroundColor: '#f8fafc', borderTop: '2px solid #e2e8f0' }}>
                <td colSpan={9} className="fw-bold ps-3 text-dark">
                  Total (MTD Average)
                </td>
                <td className="fw-bold text-center text-dark" style={{ fontSize: '0.85rem' }}>
                  0.72 days avg
                </td>
                <td className="fw-bold text-center text-success" style={{ fontSize: '0.85rem' }}>
                  86.85% On-Time
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Pagination Controls styled like Image 2 */}
        <div
          className="p-2.5 px-3 border-top bg-white d-flex align-items-center justify-content-between"
          style={{ fontSize: '0.75rem' }}
        >
          <div className="text-secondary">
            Page {currentPage} of {totalPages} ({filteredRecords.length} records)
          </div>
          <div className="d-flex align-items-center gap-1">
            <button
              className="btn btn-sm btn-outline-secondary py-0.5 px-2.5 rounded-2"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              style={{ fontSize: '0.75rem' }}
            >
              Previous
            </button>
            <button
              className="btn btn-sm btn-outline-secondary py-0.5 px-2.5 rounded-2"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              style={{ fontSize: '0.75rem' }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
