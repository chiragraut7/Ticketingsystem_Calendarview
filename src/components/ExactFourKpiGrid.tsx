import React from 'react';

export interface ExactKpiCardItem {
  id: string;
  title: string;
  value: string | number;
  percentageBadge?: {
    value: string;
    type: 'success' | 'danger';
  };
}

interface ExactFourKpiGridProps {
  cards: ExactKpiCardItem[];
}

export const ExactFourKpiGrid: React.FC<ExactFourKpiGridProps> = ({ cards }) => {
  return (
    <div className="row g-3 mb-3">
      {cards.map((card) => (
        <div key={card.id} className="col-12 col-sm-6 col-lg-3">
          <div
            className="bg-white rounded-3 p-3 d-flex flex-column justify-content-between position-relative h-100 shadow-sm"
            style={{
              border: '1px solid #e2e8f0',
              minHeight: '100px',
            }}
          >
            {/* Title Centered in Orange */}
            <div
              className="text-center fw-semibold text-truncate"
              style={{
                fontSize: '0.85rem',
                color: '#c2410c',
                letterSpacing: '-0.1px',
              }}
            >
              {card.title}
            </div>

            {/* Big Centered Number */}
            <div
              className="text-center fw-bold text-dark my-1"
              style={{
                fontSize: '1.9rem',
                lineHeight: 1.1,
              }}
            >
              {card.value}
            </div>

            {/* Bottom-right percentage badge if present */}
            <div className="d-flex justify-content-end align-items-center" style={{ minHeight: '16px' }}>
              {card.percentageBadge && (
                <span
                  className="fw-bold"
                  style={{
                    fontSize: '0.78rem',
                    color: card.percentageBadge.type === 'success' ? '#16a34a' : '#dc2626',
                  }}
                >
                  {card.percentageBadge.value}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
