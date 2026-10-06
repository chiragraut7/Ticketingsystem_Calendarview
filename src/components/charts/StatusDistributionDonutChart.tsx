import React, { useState } from 'react';

export interface StatusDistributionItem {
  id: string;
  label: string;
  percentage: number;
  count: number;
  color: string;
}

interface StatusDistributionDonutChartProps {
  title?: string;
  subtitle?: string;
  items?: StatusDistributionItem[];
}

const DEFAULT_ITEMS: StatusDistributionItem[] = [
  { id: 'submitted_review', label: 'Submitted For Review', percentage: 36, count: 10, color: '#10b981' },
  { id: 'submitted_approval', label: 'Submitted For Approval', percentage: 21, count: 6, color: '#f59e0b' },
  { id: 'approved', label: 'Approved', percentage: 18, count: 5, color: '#3b82f6' },
  { id: 'new', label: 'New', percentage: 11, count: 3, color: '#ef4444' },
  { id: 'ready_payment', label: 'Ready For Payment', percentage: 11, count: 3, color: '#06b6d4' },
  { id: 'paid', label: 'Paid', percentage: 4, count: 1, color: '#6366f1' },
];

export const StatusDistributionDonutChart: React.FC<StatusDistributionDonutChartProps> = ({
  title = 'Invoice status distribution',
  subtitle = 'MTD · all received invoices',
  items = DEFAULT_ITEMS,
}) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // SVG Donut geometry
  const size = 160;
  const strokeWidth = 24;
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;

  // Calculate cumulative stroke dash offset for each segment
  let accumulatedPercent = 0;
  const segments = items.map((item) => {
    const strokeDasharray = `${(item.percentage / 100) * circumference} ${circumference}`;
    const strokeDashoffset = -((accumulatedPercent / 100) * circumference);
    accumulatedPercent += item.percentage;
    return {
      ...item,
      strokeDasharray,
      strokeDashoffset,
    };
  });

  return (
    <div className="report-card d-flex flex-column h-100">
      {/* Header */}
      <div className="mb-2">
        <div className="report-card-title">{title}</div>
        <div className="report-card-subtitle">{subtitle}</div>
      </div>

      {/* Donut & Legend Container */}
      <div className="d-flex align-items-center justify-content-between flex-grow-1 gap-3 py-1">
        {/* Left: Donut SVG */}
        <div className="position-relative d-flex align-items-center justify-content-center" style={{ width: size, height: size, flexShrink: 0 }}>
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            {/* Background ring */}
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="transparent"
              stroke="#f1f5f9"
              strokeWidth={strokeWidth}
            />

            {/* Colored segments */}
            {segments.map((seg) => {
              const isHovered = hoveredId === seg.id;
              return (
                <circle
                  key={seg.id}
                  cx={center}
                  cy={center}
                  r={radius}
                  fill="transparent"
                  stroke={seg.color}
                  strokeWidth={isHovered ? strokeWidth + 3 : strokeWidth}
                  strokeDasharray={seg.strokeDasharray}
                  strokeDashoffset={seg.strokeDashoffset}
                  transform={`rotate(-90 ${center} ${center})`}
                  style={{
                    transition: 'all 0.2s ease',
                    cursor: 'pointer',
                    opacity: hoveredId && !isHovered ? 0.6 : 1,
                  }}
                  onMouseEnter={() => setHoveredId(seg.id)}
                  onMouseLeave={() => setHoveredId(null)}
                />
              );
            })}
          </svg>

          {/* Center text on hover */}
          {hoveredId && (
            <div
              className="position-absolute text-center"
              style={{ pointerEvents: 'none', maxWidth: '80px' }}
            >
              {(() => {
                const active = items.find((i) => i.id === hoveredId);
                if (!active) return null;
                return (
                  <>
                    <div className="fw-bold" style={{ fontSize: '0.95rem', color: active.color }}>
                      {active.percentage}%
                    </div>
                    <div className="text-secondary small" style={{ fontSize: '0.62rem', lineHeight: 1.1 }}>
                      {active.count} items
                    </div>
                  </>
                );
              })()}
            </div>
          )}
        </div>

        {/* Right: Legend Breakdown List */}
        <div className="flex-grow-1 d-flex flex-column gap-1.5" style={{ minWidth: 0 }}>
          {items.map((item) => {
            const isHovered = hoveredId === item.id;
            return (
              <div
                key={item.id}
                className="d-flex align-items-center justify-content-between py-0.5 px-1 rounded"
                style={{
                  fontSize: '0.78rem',
                  cursor: 'pointer',
                  backgroundColor: isHovered ? '#f8fafc' : 'transparent',
                  transition: 'background-color 0.15s ease',
                }}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className="d-flex align-items-center gap-1.5 text-truncate me-2">
                  <span
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: '50%',
                      backgroundColor: item.color,
                      flexShrink: 0,
                    }}
                  />
                  <span className="text-dark text-truncate">{item.label}</span>
                  <span className="text-secondary small">{item.percentage}%</span>
                </div>
                <span className="fw-bold text-dark flex-shrink-0">{item.count}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
