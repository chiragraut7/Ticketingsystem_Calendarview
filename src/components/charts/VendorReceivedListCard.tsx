import React from 'react';

export interface VendorReceivedItem {
  id: string;
  name: string;
  count: number | string;
  countColor?: string;
}

interface VendorReceivedListCardProps {
  title?: string;
  subtitle?: string;
  items?: VendorReceivedItem[];
}

const DEFAULT_VENDORS: VendorReceivedItem[] = [
  { id: '1', name: 'AlphaTech Solutions Pvt. Ltd.', count: 2 },
  { id: '2', name: 'Alpine Crest Services GmbH', count: 2 },
  { id: '3', name: 'Pinnacle Strategy Consulting LLC', count: 2 },
  { id: '4', name: 'SparkHub Private Limited', count: 2 },
  { id: '5', name: 'Sunrise services Ltd', count: 1 },
];

export const VendorReceivedListCard: React.FC<VendorReceivedListCardProps> = ({
  title = 'Invoice Received by vendor',
  subtitle,
  items = DEFAULT_VENDORS,
}) => {
  return (
    <div className="report-card d-flex flex-column h-100">
      <div className="mb-2">
        <div className="report-card-title">{title}</div>
        {subtitle && <div className="report-card-subtitle">{subtitle}</div>}
      </div>

      <div className="d-flex flex-column flex-grow-1 justify-content-around">
        {items.map((item) => (
          <div key={item.id} className="vendor-rank-row">
            <span className="vendor-rank-name text-truncate me-2">{item.name}</span>
            <span
              className="vendor-rank-count"
              style={{ color: item.countColor || '#10b981' }}
            >
              {item.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
