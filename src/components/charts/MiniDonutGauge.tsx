import React from 'react';

interface MiniDonutGaugeProps {
  percentage: number;
  color?: string;
  bgColor?: string;
  size?: number;
  strokeWidth?: number;
  label?: string;
}

export const MiniDonutGauge: React.FC<MiniDonutGaugeProps> = ({
  percentage,
  color = '#16a34a',
  bgColor = '#e2e8f0',
  size = 38,
  strokeWidth = 4,
  label
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (Math.min(100, Math.max(0, percentage)) / 100) * circumference;

  return (
    <div className="d-inline-flex align-items-center gap-1.5" style={{ lineHeight: 1 }}>
      <div className="position-relative d-inline-flex align-items-center justify-content-center" style={{ width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke={bgColor}
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 0.5s ease' }}
          />
        </svg>
        <span
          className="position-absolute fw-bold"
          style={{
            fontSize: size < 36 ? '0.62rem' : '0.68rem',
            color: color,
            letterSpacing: '-0.3px'
          }}
        >
          {Math.round(percentage)}%
        </span>
      </div>
      {label && <span className="small text-secondary fw-medium" style={{ fontSize: '0.72rem' }}>{label}</span>}
    </div>
  );
};
