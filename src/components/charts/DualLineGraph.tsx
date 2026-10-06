import React, { useState } from 'react';

export interface DualLinePoint {
  label: string; // e.g. "Sep-23"
  value1: number; // e.g. Success or On-Time
  value2: number; // e.g. Errors or Delayed
}

interface DualLineGraphProps {
  data: DualLinePoint[];
  line1Label: string;
  line2Label: string;
  line1Color?: string;
  line2Color?: string;
  height?: number;
}

export const DualLineGraph: React.FC<DualLineGraphProps> = ({
  data,
  line1Label,
  line2Label,
  line1Color = '#1e3a8a',
  line2Color = '#0284c7',
  height = 145
}) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const paddingLeft = 24;
  const paddingRight = 24;
  const paddingTop = 24;
  const paddingBottom = 26;
  const width = 620;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const maxVal = Math.max(...data.map(d => Math.max(d.value1, d.value2)), 10) * 1.15;

  const getX = (idx: number) => {
    if (data.length <= 1) return paddingLeft + chartWidth / 2;
    return paddingLeft + (idx / (data.length - 1)) * chartWidth;
  };

  const getY = (val: number) => {
    return height - paddingBottom - (val / maxVal) * chartHeight;
  };

  const points1 = data.map((d, i) => `${getX(i)},${getY(d.value1)}`).join(' ');
  const points2 = data.map((d, i) => `${getX(i)},${getY(d.value2)}`).join(' ');

  // SVG Area paths
  const area1 = `${points1} ${getX(data.length - 1)},${height - paddingBottom} ${getX(0)},${height - paddingBottom}`;
  const area2 = `${points2} ${getX(data.length - 1)},${height - paddingBottom} ${getX(0)},${height - paddingBottom}`;

  return (
    <div className="w-100 position-relative">
      <div className="overflow-x-auto w-100">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-100"
          style={{ minWidth: '480px', height: `${height}px`, overflow: 'visible' }}
          onMouseLeave={() => setHoveredIdx(null)}
        >
          <defs>
            <linearGradient id="line1AreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={line1Color} stopOpacity="0.12" />
              <stop offset="100%" stopColor={line1Color} stopOpacity="0.01" />
            </linearGradient>
            <linearGradient id="line2AreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={line2Color} stopOpacity="0.15" />
              <stop offset="100%" stopColor={line2Color} stopOpacity="0.01" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line x1={paddingLeft} y1={paddingTop} x2={width - paddingRight} y2={paddingTop} stroke="#f1f5f9" strokeDasharray="3 3" />
          <line x1={paddingLeft} y1={paddingTop + chartHeight * 0.5} x2={width - paddingRight} y2={paddingTop + chartHeight * 0.5} stroke="#f1f5f9" strokeDasharray="3 3" />
          <line x1={paddingLeft} y1={height - paddingBottom} x2={width - paddingRight} y2={height - paddingBottom} stroke="#e2e8f0" strokeWidth="1" />

          {/* Area Fills */}
          <polygon points={area1} fill="url(#line1AreaGrad)" />
          <polygon points={area2} fill="url(#line2AreaGrad)" />

          {/* Active Hover Guide Line */}
          {hoveredIdx !== null && (
            <line
              x1={getX(hoveredIdx)}
              y1={paddingTop}
              x2={getX(hoveredIdx)}
              y2={height - paddingBottom}
              stroke="#cbd5e1"
              strokeDasharray="2 2"
              strokeWidth="1.5"
            />
          )}

          {/* Line 1 */}
          <polyline
            fill="none"
            stroke={line1Color}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={points1}
          />

          {/* Line 2 */}
          <polyline
            fill="none"
            stroke={line2Color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={points2}
          />

          {/* Points, Labels and Hit Areas */}
          {data.map((d, i) => {
            const x = getX(i);
            const y1 = getY(d.value1);
            const y2 = getY(d.value2);
            const isHovered = hoveredIdx === i;

            // Collision avoidance for numbers
            const diff = Math.abs(y1 - y2);
            const label1Offset = diff < 16 ? (y1 < y2 ? -8 : 12) : -6;
            const label2Offset = diff < 16 ? (y2 < y1 ? -8 : 12) : -6;

            return (
              <g key={d.label}>
                {/* Hit Box */}
                <rect
                  x={x - chartWidth / (data.length * 2)}
                  y={0}
                  width={chartWidth / data.length}
                  height={height}
                  fill="transparent"
                  onMouseEnter={() => setHoveredIdx(i)}
                  style={{ cursor: 'pointer' }}
                />

                {/* Point 1 */}
                <circle
                  cx={x}
                  cy={y1}
                  r={isHovered ? 4.5 : 3}
                  fill={line1Color}
                  stroke="#ffffff"
                  strokeWidth="1.5"
                />
                <text
                  x={x}
                  y={y1 + label1Offset}
                  textAnchor="middle"
                  fontSize="8"
                  fill="#0f172a"
                  fontWeight="700"
                >
                  {d.value1}
                </text>

                {/* Point 2 */}
                <circle
                  cx={x}
                  cy={y2}
                  r={isHovered ? 4 : 2.5}
                  fill={line2Color}
                  stroke="#ffffff"
                  strokeWidth="1.5"
                />
                <text
                  x={x}
                  y={y2 + label2Offset}
                  textAnchor="middle"
                  fontSize="8"
                  fill="#0284c7"
                  fontWeight="700"
                >
                  {d.value2}
                </text>

                {/* X-axis Month Label */}
                <text
                  x={x}
                  y={height - 8}
                  textAnchor="middle"
                  fontSize="8"
                  fill={isHovered ? '#0f172a' : '#64748b'}
                  fontWeight={isHovered ? '700' : '500'}
                >
                  {d.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Floating Hover Tooltip */}
      {hoveredIdx !== null && (
        <div
          className="position-absolute bg-dark text-white rounded-2 px-2.5 py-1 shadow-lg"
          style={{
            top: '6px',
            left: `${Math.min(84, Math.max(16, (getX(hoveredIdx) / width) * 100))}%`,
            transform: 'translateX(-50%)',
            pointerEvents: 'none',
            fontSize: '0.72rem',
            zIndex: 10
          }}
        >
          <div className="fw-bold border-bottom border-secondary pb-0.5 mb-1 text-center" style={{ fontSize: '0.7rem' }}>
            {data[hoveredIdx].label}
          </div>
          <div className="d-flex align-items-center gap-2">
            <span style={{ color: '#60a5fa' }}>●</span>
            <span>{line1Label}: <strong>{data[hoveredIdx].value1}</strong></span>
          </div>
          <div className="d-flex align-items-center gap-2">
            <span style={{ color: '#38bdf8' }}>●</span>
            <span>{line2Label}: <strong>{data[hoveredIdx].value2}</strong></span>
          </div>
        </div>
      )}
    </div>
  );
};
