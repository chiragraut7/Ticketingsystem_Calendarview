import React, { useState } from 'react';

interface HorizontalBarItem {
  name: string;
  value: number;
  formattedValue?: string;
  subtitle?: string;
}

interface HorizontalBarGraphProps {
  data: HorizontalBarItem[];
  color?: string;
  decimals?: number;
  valueSuffix?: string;
  maxScale?: number;
}

export const HorizontalBarGraph: React.FC<HorizontalBarGraphProps> = ({
  data,
  color = '#1e3a8a',
  decimals = 0,
  valueSuffix = '',
  maxScale
}) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const maxValue = maxScale ?? Math.max(...data.map(d => d.value), 1);

  return (
    <div className="d-flex flex-column gap-2 w-100">
      {data.map((item, idx) => {
        const pct = Math.min(100, Math.max(item.value > 0 ? 5 : 0, (item.value / maxValue) * 100));
        const isHovered = hoveredIdx === idx;
        const displayVal = item.formattedValue ?? (decimals > 0 ? item.value.toFixed(decimals) : item.value.toString());

        return (
          <div
            key={item.name}
            className="d-flex flex-column position-relative"
            style={{ gap: '3px', cursor: 'pointer' }}
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
          >
            {/* Header: Name on left, Single Crisp Value on right */}
            <div className="d-flex align-items-center justify-content-between">
              <span
                className="text-truncate fw-semibold"
                style={{
                  fontSize: '0.78rem',
                  color: isHovered ? '#0f172a' : '#334155',
                  maxWidth: '78%',
                  letterSpacing: '-0.1px'
                }}
                title={item.name}
              >
                {item.name}
              </span>
              <span
                className="fw-bold px-1.5 py-0.2 rounded"
                style={{
                  fontSize: '0.75rem',
                  color: isHovered ? '#1e3a8a' : '#0f172a',
                  backgroundColor: isHovered ? '#e0f2fe' : '#f1f5f9',
                  transition: 'all 0.15s ease'
                }}
              >
                {displayVal}{valueSuffix}
              </span>
            </div>

            {/* Track and Bar */}
            <div
              className="w-100 rounded-pill position-relative overflow-hidden"
              style={{
                height: '11px',
                backgroundColor: '#f1f5f9',
                border: '1px solid #e2e8f0'
              }}
            >
              <div
                className="h-100 rounded-pill"
                style={{
                  width: `${pct}%`,
                  background: isHovered
                    ? 'linear-gradient(90deg, #1d4ed8 0%, #3b82f6 100%)'
                    : `linear-gradient(90deg, ${color} 0%, #2563eb 100%)`,
                  transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1), filter 0.15s ease',
                  filter: isHovered ? 'brightness(1.05)' : 'none',
                  minWidth: item.value > 0 ? '6px' : '0'
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
