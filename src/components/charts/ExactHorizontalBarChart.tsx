import React, { useState } from 'react';

export interface ExactHorizontalBarItem {
  name: string;
  value: number;
  formattedValue?: string;
}

interface ExactHorizontalBarChartProps {
  data: ExactHorizontalBarItem[];
  color?: string;
  decimals?: number;
  valueSuffix?: string;
  maxScale?: number;
}

export const ExactHorizontalBarChart: React.FC<ExactHorizontalBarChartProps> = ({
  data,
  color = '#173e7d',
  decimals = 0,
  valueSuffix = '',
  maxScale,
}) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const maxValue = maxScale ?? Math.max(...data.map((d) => d.value), 1);

  return (
    <div className="d-flex flex-column justify-content-between h-100 py-1" style={{ minHeight: '340px' }}>
      {data.map((item, idx) => {
        const isHovered = hoveredIdx === idx;
        const pct = Math.min(100, Math.max(item.value > 0 ? 4 : 0, (item.value / maxValue) * 100));
        const displayVal =
          item.formattedValue ??
          (decimals > 0 ? item.value.toFixed(decimals) : item.value.toString());

        return (
          <div
            key={item.name}
            className="d-flex align-items-center py-2"
            style={{
              cursor: 'pointer',
              transition: 'background-color 0.15s ease',
              borderRadius: '4px',
              paddingLeft: '4px',
              paddingRight: '4px',
              backgroundColor: isHovered ? '#f8fafc' : 'transparent',
            }}
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
          >
            {/* Left Label */}
            <div
              className="text-dark pe-2 text-end text-sm-start"
              style={{
                width: '110px',
                minWidth: '100px',
                fontSize: '0.78rem',
                lineHeight: '1.25',
                color: isHovered ? '#0f172a' : '#334155',
                fontWeight: 500,
              }}
              title={item.name}
            >
              {item.name}
            </div>

            {/* Bar Track & Fill */}
            <div className="flex-grow-1 d-flex align-items-center me-2">
              <div
                className="w-100 position-relative"
                style={{
                  height: '34px',
                  backgroundColor: '#f1f5f9',
                  borderRadius: '2px',
                }}
              >
                <div
                  style={{
                    width: `${pct}%`,
                    height: '100%',
                    backgroundColor: isHovered ? '#1d4ed8' : color,
                    borderRadius: '2px',
                    transition: 'width 0.4s ease, background-color 0.15s ease',
                  }}
                />
              </div>
            </div>

            {/* Right Value Label */}
            <div
              className="text-start"
              style={{
                width: '38px',
                minWidth: '34px',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: isHovered ? '#1d4ed8' : '#334155',
              }}
            >
              {displayVal}
              {valueSuffix}
            </div>
          </div>
        );
      })}
    </div>
  );
};
