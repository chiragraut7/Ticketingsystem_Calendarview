import React, { useState } from 'react';

export interface MonthlyVolumeDataPoint {
  month: string;
  count: number;
  valueK: number;
}

interface MonthlyVolumeValueChartProps {
  title?: string;
  subtitle?: string;
  countLabel?: string;
  valueLabel?: string;
  leftAxisTitle?: string;
  rightAxisTitle?: string;
  maxCountOverride?: number;
  maxValueOverride?: number;
  valuePrefix?: string;
  valueSuffix?: string;
  data?: MonthlyVolumeDataPoint[];
}

const DEFAULT_DATA: MonthlyVolumeDataPoint[] = [
  { month: 'Apr', count: 75, valueK: 15 },
  { month: 'May', count: 85, valueK: 18 },
  { month: 'Jun', count: 90, valueK: 12 },
  { month: 'Jul', count: 110, valueK: 20 },
  { month: 'Aug', count: 105, valueK: 14 },
  { month: 'Sep', count: 120, valueK: 16 },
];

export const MonthlyVolumeValueChart: React.FC<MonthlyVolumeValueChartProps> = ({
  title = 'Monthly submission volume & errors',
  subtitle = 'Count and error volume · rolling 6 months',
  countLabel = 'Count',
  valueLabel = 'Errors',
  leftAxisTitle,
  rightAxisTitle,
  maxCountOverride,
  maxValueOverride,
  valuePrefix = '',
  valueSuffix = '',
  data = DEFAULT_DATA,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Chart dimensions & scaling
  const chartWidth = 360;
  const chartHeight = 200;
  const paddingLeft = 36;
  const paddingRight = 44;
  const paddingTop = 15;
  const paddingBottom = 30;

  const innerWidth = chartWidth - paddingLeft - paddingRight;
  const innerHeight = chartHeight - paddingTop - paddingBottom;

  // Compute nice max scale
  const rawMaxCount = Math.max(...data.map(d => d.count), 10);
  const maxCount = maxCountOverride || (rawMaxCount <= 10 ? 10 : Math.ceil(rawMaxCount / 20) * 20);

  const rawMaxValue = Math.max(...data.map(d => d.valueK), 10);
  const maxValue = maxValueOverride || (rawMaxValue <= 10 ? 10 : Math.ceil(rawMaxValue / 5) * 5);

  const numTicks = 5;
  const yCountTicks = Array.from({ length: numTicks + 1 }, (_, i) => Math.round((maxCount / numTicks) * i));
  const yValueTicks = Array.from({ length: numTicks + 1 }, (_, i) => Math.round((maxValue / numTicks) * i));

  const groupWidth = innerWidth / data.length;
  const barWidth = 11;
  const barGap = 3;

  return (
    <div className="report-card d-flex flex-column h-100">
      {/* Header */}
      <div className="d-flex align-items-start justify-content-between mb-1">
        <div>
          <div className="report-card-title">{title}</div>
          <div className="report-card-subtitle">{subtitle}</div>
        </div>

        {/* Legend */}
        <div className="d-flex align-items-center gap-2.5 pt-1" style={{ fontSize: '0.74rem' }}>
          <div className="d-flex align-items-center gap-1.5 text-secondary">
            <span
              style={{
                width: 16,
                height: 9,
                backgroundColor: '#93c5fd',
                borderRadius: 2,
                display: 'inline-block',
              }}
            />
            <span className="fw-medium">{countLabel}</span>
          </div>
          <div className="d-flex align-items-center gap-1.5 text-secondary">
            <span
              style={{
                width: 16,
                height: 9,
                backgroundColor: '#3b82f6',
                borderRadius: 2,
                display: 'inline-block',
              }}
            />
            <span className="fw-medium">{valueLabel}</span>
          </div>
        </div>
      </div>

      {/* Chart SVG */}
      <div className="w-100 flex-grow-1 position-relative" style={{ minHeight: 220 }}>
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="w-100 h-100"
          style={{ overflow: 'visible', maxHeight: '240px' }}
        >
          {/* Horizontal gridlines */}
          {yCountTicks.map((tick, i) => {
            const y = paddingTop + innerHeight - (tick / maxCount) * innerHeight;
            return (
              <g key={`grid-${tick}-${i}`}>
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={chartWidth - paddingRight}
                  y2={y}
                  stroke="#e2e8f0"
                  strokeWidth={tick === 0 ? 1.5 : 0.8}
                />
                {/* Left Y Axis labels */}
                <text
                  x={paddingLeft - 6}
                  y={y + 3.5}
                  textAnchor="end"
                  fontSize={8.5}
                  fill="#64748b"
                >
                  {tick}
                </text>
              </g>
            );
          })}

          {/* Right Y Axis labels */}
          {yValueTicks.map((val, i) => {
            const y = paddingTop + innerHeight - (val / maxValue) * innerHeight;
            return (
              <text
                key={`val-${val}-${i}`}
                x={chartWidth - paddingRight + 6}
                y={y + 3.5}
                textAnchor="start"
                fontSize={8.5}
                fill="#64748b"
              >
                {valuePrefix}{val}{valueSuffix}
              </text>
            );
          })}

          {/* Axis Titles (Rotated) */}
          <text
            x={-(paddingTop + innerHeight / 2)}
            y={10}
            transform="rotate(-90)"
            textAnchor="middle"
            fontSize={7.5}
            fill="#94a3b8"
          >
            {leftAxisTitle || countLabel}
          </text>
          <text
            x={paddingTop + innerHeight / 2}
            y={-(chartWidth - 5)}
            transform="rotate(90)"
            textAnchor="middle"
            fontSize={7.5}
            fill="#94a3b8"
          >
            {rightAxisTitle || valueLabel}
          </text>

          {/* Month Bars */}
          {data.map((item, idx) => {
            const groupX = paddingLeft + idx * groupWidth;
            const centerX = groupX + groupWidth / 2;

            const countBarHeight = item.count > 0 ? (item.count / maxCount) * innerHeight : 0;
            const countBarY = paddingTop + innerHeight - countBarHeight;

            const valueBarHeight = item.valueK > 0 ? (item.valueK / maxValue) * innerHeight : 0;
            const valueBarY = paddingTop + innerHeight - valueBarHeight;

            const isHovered = hoveredIndex === idx;

            return (
              <g
                key={item.month}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{ cursor: 'pointer' }}
              >
                {/* Background highlight on hover */}
                {isHovered && (
                  <rect
                    x={groupX}
                    y={paddingTop}
                    width={groupWidth}
                    height={innerHeight}
                    fill="rgba(241, 245, 249, 0.6)"
                    rx={3}
                  />
                )}

                {/* Left bar: Count (Light blue #93c5fd) */}
                {item.count > 0 && (
                  <rect
                    x={centerX - barWidth - barGap / 2}
                    y={countBarY}
                    width={barWidth}
                    height={countBarHeight}
                    fill="#93c5fd"
                    rx={1.5}
                  />
                )}

                {/* Right bar: Value/Error (Darker blue #3b82f6) */}
                {item.valueK > 0 && (
                  <rect
                    x={centerX + barGap / 2}
                    y={valueBarY}
                    width={barWidth}
                    height={valueBarHeight}
                    fill="#3b82f6"
                    rx={1.5}
                  />
                )}

                {/* X-Axis Month Label */}
                <text
                  x={centerX}
                  y={chartHeight - 10}
                  textAnchor="middle"
                  fontSize={9}
                  fill={isHovered ? '#0f172a' : '#64748b'}
                  fontWeight={isHovered ? 600 : 500}
                >
                  {item.month}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip Popup */}
        {hoveredIndex !== null && data[hoveredIndex] && (
          <div
            className="position-absolute bg-dark text-white rounded px-2.5 py-1.5 shadow"
            style={{
              top: 15,
              left: Math.min(
                Math.max(
                  paddingLeft + hoveredIndex * groupWidth + groupWidth / 2 - 50,
                  10
                ),
                chartWidth - 110
              ),
              fontSize: '0.74rem',
              pointerEvents: 'none',
              zIndex: 10,
              minWidth: '110px',
            }}
          >
            <div className="fw-bold mb-1 border-bottom border-secondary pb-0.5">
              {data[hoveredIndex].month}
            </div>
            <div className="d-flex justify-content-between align-items-center gap-2">
              <span className="text-secondary">{countLabel}:</span>
              <span className="fw-semibold text-info">{data[hoveredIndex].count}</span>
            </div>
            <div className="d-flex justify-content-between align-items-center gap-2">
              <span className="text-secondary">{valueLabel}:</span>
              <span className="fw-semibold text-primary">{valuePrefix}{data[hoveredIndex].valueK}{valueSuffix}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
