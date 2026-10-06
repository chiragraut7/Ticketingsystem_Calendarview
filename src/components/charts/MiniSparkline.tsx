import React from 'react';

interface MiniSparklineProps {
  data: number[];
  color?: string;
  fillColor?: string;
  width?: number;
  height?: number;
  type?: 'line' | 'bar';
}

export const MiniSparkline: React.FC<MiniSparklineProps> = ({
  data,
  color = '#2563eb',
  fillColor = 'rgba(37, 99, 235, 0.15)',
  width = 68,
  height = 28,
  type = 'line'
}) => {
  if (!data || data.length === 0) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const padding = 2;
  const innerWidth = width - padding * 2;
  const innerHeight = height - padding * 2;

  if (type === 'bar') {
    const barWidth = Math.max(3, (innerWidth / data.length) - 2);
    return (
      <svg width={width} height={height} className="d-block overflow-visible" style={{ verticalAlign: 'middle' }}>
        {data.map((val, idx) => {
          const barHeight = Math.max(3, ((val - min) / range) * innerHeight + 4);
          const x = padding + idx * (innerWidth / data.length);
          const y = height - padding - barHeight;
          return (
            <rect
              key={idx}
              x={x}
              y={y}
              width={barWidth}
              height={barHeight}
              fill={color}
              rx={1.5}
              opacity={idx === data.length - 1 ? 1 : 0.65}
            />
          );
        })}
      </svg>
    );
  }

  // Line type with area fill
  const points = data.map((val, idx) => {
    const x = padding + (idx / (data.length - 1)) * innerWidth;
    const y = height - padding - ((val - min) / range) * innerHeight;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });

  const pathD = `M ${points.join(' L ')}`;
  const areaD = `${pathD} L ${width - padding},${height} L ${padding},${height} Z`;

  return (
    <svg width={width} height={height} className="d-block overflow-visible" style={{ verticalAlign: 'middle' }}>
      <defs>
        <linearGradient id={`grad-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0.0" />
        </linearGradient>
      </defs>
      <path d={areaD} fill={`url(#grad-${color.replace('#', '')})`} />
      <path d={pathD} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* End point dot */}
      {data.length > 0 && (
        <circle
          cx={width - padding}
          cy={height - padding - ((data[data.length - 1] - min) / range) * innerHeight}
          r="2.5"
          fill={color}
          stroke="#ffffff"
          strokeWidth="1"
        />
      )}
    </svg>
  );
};
