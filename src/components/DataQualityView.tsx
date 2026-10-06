import React, { useState, useMemo } from 'react';
import {
  INITIAL_REPORT_RECORDS,
  PROPERTIES_HIGHEST_ERRORS,
  DATASET_HIGHEST_AVG_ERRORS,
  SUBMISSIONS_BY_POST_MONTH,
  ACCURACY_BY_SERVICE_PROVIDER,
} from '../data/reportsDummyData';
import { ExactHorizontalBarChart } from './charts/ExactHorizontalBarChart';
import { ExactDualLineChart } from './charts/ExactDualLineChart';
import { ExactStackedBarChart } from './charts/ExactStackedBarChart';

export const DataQualityView: React.FC = () => {
  // Filter States from Image 1
  const [reportPackage, setReportPackage] = useState('All');
  const [serviceProvider, setServiceProvider] = useState('All');
  const [propertyName, setPropertyName] = useState('All');
  const [postMonth, setPostMonth] = useState('All');

  // Pagination & Sorting for Bottom Table
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [sortField, setSortField] = useState<'submissionId' | 'postMonth' | 'days' | 'errors'>('submissionId');
  const [sortAsc, setSortAsc] = useState(true);

  const resetFilters = () => {
    setReportPackage('All');
    setServiceProvider('All');
    setPropertyName('All');
    setPostMonth('All');
    setCurrentPage(1);
  };

  // Dropdown options from Image 1
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

  // The 4 KPI cards from Image 1, styled using Image 2's visual cards & top-accent stripes
  const kpiCards = [
    {
      id: 'total_properties',
      title: 'Total Properties',
      value: '36',
      subtitle: 'Active properties',
      topBorderColor: '#7c3aed', // Purple accent from Image 2
      valueColor: '#7c3aed',
      badge: null,
    },
    {
      id: 'successful_submissions',
      title: 'Successful Submissions',
      value: '755',
      subtitle: 'Processed cleanly',
      topBorderColor: '#10b981', // Green accent from Image 2
      valueColor: '#16a34a',
      badge: {
        text: '83.43%',
        color: '#16a34a',
        bg: '#dcfce7',
      },
    },
    {
      id: 'error_submissions',
      title: 'Error Submissions',
      value: '150',
      subtitle: 'Exceptions flagged',
      topBorderColor: '#ef4444', // Red accent from Image 2
      valueColor: '#dc2626',
      badge: {
        text: '16.57%',
        color: '#dc2626',
        bg: '#fee2e2',
      },
    },
    {
      id: 'total_submissions',
      title: 'Total Submissions',
      value: '905',
      subtitle: 'MTD Total volume',
      topBorderColor: '#3b82f6', // Blue accent from Image 2
      valueColor: '#2563eb',
      badge: null,
    },
  ];

  // Formatted data for the 4 charts from Image 1
  const propertiesErrorsData = useMemo(() => {
    return PROPERTIES_HIGHEST_ERRORS.map((p) => ({
      name: p.name,
      value: p.count,
    }));
  }, []);

  const datasetAvgErrorsData = useMemo(() => {
    return DATASET_HIGHEST_AVG_ERRORS.map((d) => ({
      name: d.name,
      value: d.avg,
    }));
  }, []);

  const providerAccuracyData = useMemo(() => {
    return ACCURACY_BY_SERVICE_PROVIDER.map((p) => ({
      name: p.name,
      topPct: p.errorPct,
      bottomPct: p.successPct,
    }));
  }, []);

  // Filtered and sorted table records from Image 1
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
          Data Quality
        </h1>
      </div>

      {/* 2. Filter Row: Image 1 inputs styled with Image 2's clean white card, pill buttons & spacing */}
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
          {/* Apply / Search Button (Solid Orange Pill matching Image 2) */}
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

          {/* Reset / Clear Button (Outlined Orange Pill matching Image 2) */}
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

      {/* 3. 4 KPI Cards: Image 1 Values & Percentages with Image 2 Coloured Accent Tops */}
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

                {/* Percentage Badge (e.g. 83.43% green, 16.57% red) */}
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

      {/* 4. Chart Cards: 4 Charts from Image 1 in Image 2's clean white card styling with generous spacing */}
      <div className="row g-3">
        {/* Chart 1: Submissions by Post Month */}
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
                Submissions by Post Month
              </div>
              <div className="text-secondary" style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                Count and error volume · rolling 14 months (Sep-23 to Oct-24)
              </div>
            </div>

            <div className="flex-grow-1 d-flex flex-column justify-content-center pt-1">
              <ExactDualLineChart
                data={SUBMISSIONS_BY_POST_MONTH}
                title=""
                successLabel="# Success"
                errorsLabel="# Errors"
              />
            </div>
          </div>
        </div>

        {/* Chart 2: Accuracy by Service Provider */}
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
                Accuracy by Service Provider
              </div>
              <div className="text-secondary" style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                % Success vs % Errors across providers
              </div>
            </div>

            <div className="flex-grow-1 d-flex flex-column justify-content-center pt-1">
              <ExactStackedBarChart
                data={providerAccuracyData}
                title=""
                topLabel="% Errors"
                bottomLabel="% Success"
              />
            </div>
          </div>
        </div>

        {/* Chart 3: Properties with Highest Errors */}
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
                Properties with Highest Errors
              </div>
              <div className="text-secondary" style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                Ranked error frequency by property
              </div>
            </div>

            <div className="flex-grow-1 d-flex flex-column justify-content-center pt-1">
              <ExactHorizontalBarChart data={propertiesErrorsData} decimals={0} />
            </div>
          </div>
        </div>

        {/* Chart 4: Dataset with Highest Average Errors */}
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
                Dataset with Highest Average Errors
              </div>
              <div className="text-secondary" style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                Average error rate per submission dataset
              </div>
            </div>

            <div className="flex-grow-1 d-flex flex-column justify-content-center pt-1">
              <ExactHorizontalBarChart data={datasetAvgErrorsData} decimals={2} />
            </div>
          </div>
        </div>
      </div>

      {/* 5. Full-width Submissions Table retaining every column from Image 1 with Image 2 styling */}
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
              Submission Records
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
                  style={{ cursor: 'pointer', padding: '11px 14px' }}
                  onClick={() => {
                    if (sortField === 'days') setSortAsc(!sortAsc);
                    else {
                      setSortField('days');
                      setSortAsc(true);
                    }
                  }}
                >
                  <div className="d-flex align-items-center gap-1 fw-bold text-dark">
                    <span>Days</span>
                    <i className="bi bi-arrow-down-up" style={{ fontSize: '0.65rem' }}></i>
                  </div>
                </th>
                <th
                  scope="col"
                  style={{ cursor: 'pointer', padding: '11px 14px', textAlign: 'right' }}
                  onClick={() => {
                    if (sortField === 'errors') setSortAsc(!sortAsc);
                    else {
                      setSortField('errors');
                      setSortAsc(true);
                    }
                  }}
                >
                  <div className="d-flex align-items-center justify-content-end gap-1 fw-bold text-dark">
                    <span>Errors</span>
                    <i className="bi bi-arrow-down-up" style={{ fontSize: '0.65rem' }}></i>
                  </div>
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
                paginatedRecords.map((row) => (
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
                    <td className="text-secondary text-center">{row.days}</td>
                    <td className="text-end pe-3 fw-semibold" style={{ color: row.errors > 0 ? '#dc2626' : '#64748b' }}>
                      {row.errors}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
            {/* Total Footer Row matching Image 1 */}
            <tfoot>
              <tr style={{ backgroundColor: '#f8fafc', borderTop: '2px solid #e2e8f0' }}>
                <td colSpan={10} className="fw-bold ps-3 text-dark">
                  Total
                </td>
                <td className="fw-bold text-end pe-3 text-dark" style={{ fontSize: '0.85rem' }}>
                  456
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
