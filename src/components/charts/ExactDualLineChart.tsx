import React, { useState } from 'react';

export interface DualLineDataPoint {
  month: string;
  success: number;
  errors: number;
}

interface ExactDualLineChartProps {
  data: DualLineDataPoint[];
  title?: string;
  successLabel?: string;
  errorsLabel?: string;
  line1Color?: string;
  line2Color?: string;
}

export const ExactDualLineChart: React.FC<ExactDualLineChartProps> = ({
  data,
  title = 'Submissions by Post Month',
  successLabel = '# Success',
  errorsLabel = '# Errors',
  line1Color = '#173e7d',
  line2Color = '#00a2e8',
}) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // SVG dimensions
  const width = 640;
  const height = 175;
  const paddingLeft = 24;
  const paddingRight = 24;
  const paddingTop = 26;
  const paddingBottom = 26;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const maxVal = Math.max(
    ...data.map((d) => Math.max(d.success, d.errors)),
    90
  ) * 1.12;

  const getX = (idx: number) => {
    if (data.length <= 1) return paddingLeft + chartWidth / 2;
    return paddingLeft + (idx / (data.length - 1)) * chartWidth;
  };

  const getY = (val: number) => {
    return paddingTop + chartHeight - (val / maxVal) * chartHeight;
  };

  const successPoints = data.map((d, i) => `${getX(i)},${getY(d.success)}`).join(' ');

  // For errors, if first item has 0 or undefined, handle gracefully
  const errorPoints = data.map((d, i) => `${getX(i)},${getY(d.errors)}`).join(' ');

  return (
    <div className="w-100 d-flex flex-column">
      {/* Header with Title and Legend matching image.png */}
      <div className="d-flex align-items-center justify-content-between mb-1">
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

        {/* Legend */}
        <div className="d-flex align-items-center gap-3" style={{ fontSize: '0.74rem' }}>
          <div className="d-flex align-items-center gap-1.5">
            <span
              style={{
                width: 10,
                height: 10,
                backgroundColor: line1Color,
                display: 'inline-block',
                borderRadius: '1px',
              }}
            />
            <span className="text-secondary fw-semibold">{successLabel}</span>
          </div>
          <div className="d-flex align-items-center gap-1.5">
            <span
              style={{
                width: 10,
                height: 10,
                backgroundColor: line2Color,
                display: 'inline-block',
                borderRadius: '1px',
              }}
            />
            <span className="text-secondary fw-semibold">{errorsLabel}</span>
          </div>
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="w-100 position-relative overflow-hidden">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-100"
          style={{ height: 'auto', maxHeight: '185px', overflow: 'visible' }}
          onMouseLeave={() => setHoveredIdx(null)}
        >
          {/* Baseline */}
          <line
            x1={paddingLeft}
            y1={height - paddingBottom}
            x2={width - paddingRight}
            y2={height - paddingBottom}
            stroke="#cbd5e1"
            strokeWidth="1"
          />

          {/* Hover guideline */}
          {hoveredIdx !== null && (
            <line
              x1={getX(hoveredIdx)}
              y1={paddingTop}
              x2={getX(hoveredIdx)}
              y2={height - paddingBottom}
              stroke="#94a3b8"
              strokeDasharray="2 2"
              strokeWidth="1"
            />
          )}

          {/* Success Line (Navy) */}
          <polyline
            fill="none"
            stroke={line1Color}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={successPoints}
          />

          {/* Errors Line (Cyan) */}
          <polyline
            fill="none"
            stroke={line2Color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={errorPoints}
          />

          {/* Points, Labels and Hit Areas */}
          {data.map((d, i) => {
            const x = getX(i);
            const ySuccess = getY(d.success);
            const yErrors = getY(d.errors);
            const isHovered = hoveredIdx === i;

            // Offset to prevent numbers collision if close
            const isVeryClose = Math.abs(ySuccess - yErrors) < 14;
            const successLabelOffset = isVeryClose && ySuccess > yErrors ? 12 : -6;
            const errorsLabelOffset = isVeryClose && yErrors > ySuccess ? 12 : -6;

            return (
              <g key={d.month}>
                {/* Hit Box for entire column */}
                <rect
                  x={x - chartWidth / (data.length * 2)}
                  y={0}
                  width={chartWidth / data.length}
                  height={height}
                  fill="transparent"
                  onMouseEnter={() => setHoveredIdx(i)}
                  style={{ cursor: 'pointer' }}
                />

                {/* Success Dot & Number */}
                <circle
                  cx={x}
                  cy={ySuccess}
                  r={isHovered ? 4.5 : 3}
                  fill={line1Color}
                  stroke="#ffffff"
                  strokeWidth="1"
                />
                <text
                  x={x}
                  y={ySuccess + successLabelOffset}
                  textAnchor="middle"
                  fontSize="8.5"
                  fill="#1e293b"
                  fontWeight="600"
                >
                  {d.success}
                </text>

                {/* Errors Dot & Number */}
                <circle
                  cx={x}
                  cy={yErrors}
                  r={isHovered ? 4 : 2.5}
                  fill={line2Color}
                  stroke="#ffffff"
                  strokeWidth="1"
                />
                <text
                  x={x}
                  y={yErrors + errorsLabelOffset}
                  textAnchor="middle"
                  fontSize="8.5"
                  fill="#0284c7"
                  fontWeight="600"
                >
                  {d.errors}
                </text>

                {/* X Axis Month Label */}
                <text
                  x={x}
                  y={height - 8}
                  textAnchor="middle"
                  fontSize="7.5"
                  fill={isHovered ? '#0f172a' : '#64748b'}
                  fontWeight={isHovered ? '700' : '500'}
                >
                  {d.month}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip Popup */}
        {hoveredIdx !== null && (
          <div
            className="position-absolute bg-dark text-white rounded px-2.5 py-1 shadow"
            style={{
              top: '4px',
              left: `${Math.min(85, Math.max(15, (getX(hoveredIdx) / width) * 100))}%`,
              transform: 'translateX(-50%)',
              pointerEvents: 'none',
              fontSize: '0.72rem',
              zIndex: 10,
              minWidth: '110px',
            }}
          >
            <div className="fw-bold border-bottom border-secondary pb-0.5 mb-1 text-center">
              {data[hoveredIdx].month}
            </div>
            <div className="d-flex justify-content-between align-items-center gap-2">
              <span className="text-secondary">{successLabel}:</span>
              <span className="fw-bold text-info">{data[hoveredIdx].success}</span>
            </div>
            <div className="d-flex justify-content-between align-items-center gap-2">
              <span className="text-secondary">{errorsLabel}:</span>
              <span className="fw-bold text-warning">{data[hoveredIdx].errors}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
