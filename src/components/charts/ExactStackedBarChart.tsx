import React, { useState } from 'react';

export interface ExactStackedBarItem {
  name: string;
  topPct: number; // e.g. % Errors
  bottomPct: number; // e.g. % Success
}

interface ExactStackedBarChartProps {
  data: ExactStackedBarItem[];
  title?: string;
  topLabel?: string;
  bottomLabel?: string;
  topColor?: string;
  bottomColor?: string;
}

export const ExactStackedBarChart: React.FC<ExactStackedBarChartProps> = ({
  data,
  title = 'Accuracy by Service Provider',
  topLabel = '% Errors',
  bottomLabel = '% Success',
  topColor = '#00a2e8',
  bottomColor = '#173e7d',
}) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Height of the stacked bars
  const barHeight = 115;

  return (
    <div className="w-100 d-flex flex-column">
      {/* Header with Title and Legend */}
      <div className="d-flex align-items-center justify-content-between mb-2">
        <span
          className="fw-bold"
          style={{
            fontSize: '0.9rem',
            color: '#c2410c',
            letterSpacing: '-0.2px',
          }}
        >
          {title}
        </span>

        {/* Legend matching image.png */}
        <div className="d-flex align-items-center gap-3" style={{ fontSize: '0.74rem' }}>
          <div className="d-flex align-items-center gap-1.5">
            <span
              style={{
                width: 10,
                height: 10,
                backgroundColor: bottomColor,
                display: 'inline-block',
                borderRadius: '1px',
              }}
            />
            <span className="text-secondary fw-semibold">{bottomLabel}</span>
          </div>
          <div className="d-flex align-items-center gap-1.5">
            <span
              style={{
                width: 10,
                height: 10,
                backgroundColor: topColor,
                display: 'inline-block',
                borderRadius: '1px',
              }}
            />
            <span className="text-secondary fw-semibold">{topLabel}</span>
          </div>
        </div>
      </div>

      {/* Stacked Bars Row */}
      <div className="d-flex align-items-end justify-content-between gap-2 pt-2 px-1">
        {data.map((item, idx) => {
          const isHovered = hoveredIdx === idx;
          const topH = Math.round((item.topPct / 100) * barHeight);
          const bottomH = barHeight - topH;

          // Split name into 2 lines for clean rendering
          const nameParts = item.name.split(' ');
          let line1 = item.name;
          let line2 = '';
          if (nameParts.length >= 3) {
            line1 = nameParts.slice(0, nameParts.length - 1).join(' ');
            line2 = nameParts[nameParts.length - 1];
          } else if (nameParts.length === 2) {
            line1 = nameParts[0];
            line2 = nameParts[1];
          }

          return (
            <div
              key={item.name}
              className="d-flex flex-column align-items-center flex-grow-1"
              style={{ minWidth: 0, cursor: 'pointer' }}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              {/* Stacked Bar Pillar */}
              <div
                className="d-flex flex-column w-100 overflow-hidden"
                style={{
                  height: `${barHeight}px`,
                  maxWidth: '56px',
                  backgroundColor: '#f1f5f9',
                  borderRadius: '2px',
                  transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                  transform: isHovered ? 'scaleY(1.02)' : 'none',
                  boxShadow: isHovered ? '0 2px 8px rgba(0,0,0,0.15)' : 'none',
                }}
              >
                {/* Top Segment (% Errors, Cyan) */}
                {topH > 0 && (
                  <div
                    className="d-flex align-items-center justify-content-center text-white"
                    style={{
                      height: `${topH}px`,
                      backgroundColor: topColor,
                      fontSize: '0.68rem',
                      fontWeight: 600,
                      lineHeight: 1,
                    }}
                  >
                    {item.topPct >= 12 ? `${item.topPct.toFixed(2)}%` : ''}
                  </div>
                )}

                {/* Bottom Segment (% Success, Navy) */}
                <div
                  className="d-flex align-items-center justify-content-center text-white flex-grow-1"
                  style={{
                    height: `${bottomH}px`,
                    backgroundColor: bottomColor,
                    fontSize: '0.68rem',
                    fontWeight: 600,
                    lineHeight: 1,
                  }}
                >
                  {item.bottomPct >= 12 ? `${item.bottomPct.toFixed(2)}%` : ''}
                </div>
              </div>

              {/* Provider Name underneath bar */}
              <div
                className="text-center mt-2 text-secondary"
                style={{
                  fontSize: '0.68rem',
                  lineHeight: '1.15',
                  height: '28px',
                  maxWidth: '75px',
                  fontWeight: isHovered ? 600 : 400,
                  color: isHovered ? '#0f172a' : '#64748b',
                }}
              >
                <div>{line1}</div>
                {line2 && <div>{line2}</div>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
