import React from 'react';

export interface ReportKpiCardData {
  id: string;
  title: string;
  value: string | number;
  subtitle: string;
  topBorderClass: string; // e.g. 'border-top-purple', 'border-top-orange', 'border-top-green', etc.
  valueColor: string;
}

interface ReportKpiGridProps {
  cards: ReportKpiCardData[];
}

export const ReportKpiGrid: React.FC<ReportKpiGridProps> = ({ cards }) => {
  return (
    <div className="row g-2 mb-3">
      {cards.map((card) => (
        <div key={card.id} className="col-6 col-sm-6 col-md-4 col-lg-2-4">
          <div className={`report-kpi-card ${card.topBorderClass}`}>
            <div className="report-kpi-title">{card.title}</div>
            <div className="report-kpi-value" style={{ color: card.valueColor }}>
              {card.value}
            </div>
            <div className="report-kpi-subtitle">{card.subtitle}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
