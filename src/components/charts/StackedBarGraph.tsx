import React, { useState } from 'react';

export interface StackedBarItem {
  name: string;
  shortName?: string;
  segment1Pct: number; // e.g. Success % or On-Time %
  segment2Pct: number; // e.g. Error % or Delayed %
}

interface StackedBarGraphProps {
  data: StackedBarItem[];
  segment1Label: string;
  segment2Label: string;
  segment1Color?: string;
  segment2Color?: string;
  height?: number;
}

export const StackedBarGraph: React.FC<StackedBarGraphProps> = ({
  data,
  segment1Label,
  segment2Label,
  segment1Color = '#1e3a8a',
  segment2Color = '#0284c7',
  height = 110
}) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Helper to get clean compact label
  const getShortName = (name: string, custom?: string) => {
    if (custom) return custom;
    if (name.includes('Skybridge')) return 'Skybridge';
    if (name.includes('Shamrock')) return 'Shamrock';
    if (name.includes('Old Orleans')) return 'Old Orleans';
    if (name.includes('Phoenix Peak')) return 'Phoenix Peak';
    if (name.includes('CS Service')) return 'CS Provider';
    if (name.includes('S cop')) return 'S cop';
    return name.replace('Service Provider', '').trim();
  };

  return (
    <div className="w-100 position-relative">
      <div className="d-flex align-items-end justify-content-between gap-2.5 pt-1 pb-1">
        {data.map((item, idx) => {
          const isHovered = hoveredIdx === idx;
          const seg2Height = Math.max(item.segment2Pct > 0 ? 8 : 0, Math.round((item.segment2Pct / 100) * height));
          const seg1Height = Math.max(item.segment1Pct > 0 ? 8 : 0, Math.round((item.segment1Pct / 100) * height));
          const label = getShortName(item.name, item.shortName);

          return (
            <div
              key={item.name}
              className="d-flex flex-column align-items-center flex-grow-1"
              style={{ minWidth: 0, cursor: 'pointer' }}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              {/* Stacked bar cylinder */}
              <div
                className="d-flex flex-column w-100 rounded-2 overflow-hidden"
                style={{
                  height: `${height}px`,
                  backgroundColor: '#f1f5f9',
                  border: isHovered ? '1px solid #0284c7' : '1px solid #e2e8f0',
                  transform: isHovered ? 'scaleY(1.03)' : 'none',
                  transition: 'all 0.2s ease',
                  boxShadow: isHovered ? '0 4px 10px rgba(2, 132, 199, 0.25)' : 'none'
                }}
              >
                {/* Top Segment: Segment 2 (Errors / Delayed) */}
                {item.segment2Pct > 0 && (
                  <div
                    className="d-flex align-items-center justify-content-center text-white"
                    style={{
                      height: `${seg2Height}px`,
                      backgroundColor: segment2Color,
                      fontSize: '0.66rem',
                      fontWeight: '700',
                      transition: 'background-color 0.2s ease',
                      borderBottom: '1px solid rgba(255,255,255,0.2)'
                    }}
                  >
                    {item.segment2Pct > 14 ? `${item.segment2Pct.toFixed(1)}%` : ''}
                  </div>
                )}

                {/* Bottom Segment: Segment 1 (Success / On-Time) */}
                <div
                  className="d-flex align-items-center justify-content-center text-white flex-grow-1"
                  style={{
                    height: `${seg1Height}px`,
                    backgroundColor: segment1Color,
                    fontSize: '0.66rem',
                    fontWeight: '700',
                    transition: 'background-color 0.2s ease'
                  }}
                >
                  {item.segment1Pct > 14 ? `${item.segment1Pct.toFixed(1)}%` : ''}
                </div>
              </div>

              {/* Provider Name - Clean & Unbroken */}
              <div
                className="text-center mt-1.5 fw-semibold text-truncate w-100"
                style={{
                  fontSize: '0.7rem',
                  color: isHovered ? '#0f172a' : '#475569',
                  transition: 'color 0.15s ease'
                }}
                title={item.name}
              >
                {label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Hover Tooltip */}
      {hoveredIdx !== null && (
        <div
          className="position-absolute bg-dark text-white rounded-2 px-2.5 py-1.5 shadow-lg"
          style={{
            top: '-15px',
            left: `${((hoveredIdx + 0.5) / data.length) * 100}%`,
            transform: 'translateX(-50%)',
            pointerEvents: 'none',
            fontSize: '0.72rem',
            zIndex: 10,
            whiteSpace: 'nowrap'
          }}
        >
          <div className="fw-bold border-bottom border-secondary pb-0.5 mb-1">{data[hoveredIdx].name}</div>
          <div className="d-flex align-items-center gap-2">
            <span style={{ color: '#38bdf8' }}>●</span>
            <span>{segment2Label}: <strong>{data[hoveredIdx].segment2Pct.toFixed(1)}%</strong></span>
          </div>
          <div className="d-flex align-items-center gap-2">
            <span style={{ color: '#60a5fa' }}>●</span>
            <span>{segment1Label}: <strong>{data[hoveredIdx].segment1Pct.toFixed(1)}%</strong></span>
          </div>
        </div>
      )}
    </div>
  );
};
