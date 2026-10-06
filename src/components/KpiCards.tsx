import React from 'react';
import { KPI_METRICS } from '../data/mockData';

interface KpiCardsProps {
  activeStatusFilter: string | null;
  onFilterByStatus: (status: string | null) => void;
}

export const KpiCards: React.FC<KpiCardsProps> = ({ activeStatusFilter, onFilterByStatus }) => {
  const cards = [
    {
      id: 'new',
      count: KPI_METRICS.newSubmissions, // 573
      label: 'New Submission',
      icon: 'bi-file-earmark-text',
      wrapperClass: 'kpi-card-blue',
      iconBoxClass: 'kpi-icon-blue'
    },
    {
      id: 'in-progress',
      count: KPI_METRICS.inProgress, // 226
      label: 'In-Progress',
      icon: 'bi-clock',
      wrapperClass: 'kpi-card-orange',
      iconBoxClass: 'kpi-icon-orange'
    },
    {
      id: 'completed',
      count: KPI_METRICS.completedClosed, // 175
      label: 'Completed / Closed',
      icon: 'bi-file-earmark-check',
      wrapperClass: 'kpi-card-green',
      iconBoxClass: 'kpi-icon-green'
    },
    {
      id: 'reopened',
      count: KPI_METRICS.reopened, // 125
      label: 'Reopened',
      icon: 'bi-file-earmark-excel',
      wrapperClass: 'kpi-card-pink',
      iconBoxClass: 'kpi-icon-pink'
    }
  ];

  return (
    <div className="row g-2 mb-2.5">
      {cards.map((card) => {
        const isSelected = activeStatusFilter === card.id;

        return (
          <div key={card.id} className="col-12 col-sm-6 col-xl-3">
            <div
              className={`kpi-banner-card ${card.wrapperClass} ${
                isSelected ? 'active-kpi-filter' : ''
              } d-flex align-items-center justify-content-between p-2.5`}
              onClick={() => onFilterByStatus(isSelected ? null : card.id)}
              role="button"
              tabIndex={0}
              title={`Click to filter by ${card.label}`}
              style={{ cursor: 'pointer', minHeight: '62px' }}
            >
              {/* Left: Icon & Label */}
              <div className="d-flex align-items-center gap-2">
                <div className={`kpi-icon-pill ${card.iconBoxClass}`} style={{ width: '38px', height: '38px', fontSize: '1.1rem', flexShrink: 0 }}>
                  <i className={`bi ${card.icon}`}></i>
                </div>
                <div className="kpi-label-text" style={{ fontSize: '0.85rem' }}>
                  {card.label}
                </div>
              </div>

              {/* Right: Metric Count */}
              <div className="kpi-number-text" style={{ fontSize: '1.45rem' }}>
                {card.count}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
