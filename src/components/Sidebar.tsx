import React, { useState } from 'react';

interface SidebarProps {
  activeView: string;
  onSelectView: (view: string) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  onSelectView,
  isOpenMobile,
  onCloseMobile,
  collapsed,
  onToggleCollapse
}) => {
  const [expandedMenus, setExpandedMenus] = useState<{ [key: string]: boolean }>({
    setup: false,
    reports: false,
    payables: false,
    admin: false,
    translations: false
  });

  const toggleSubmenu = (menuKey: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedMenus(prev => ({
      ...prev,
      [menuKey]: !prev[menuKey]
    }));
  };

  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'bi-speedometer2',
      hasSubmenu: false
    },
    {
      id: 'files',
      label: 'View Uploaded Files',
      icon: 'bi-folder-fill',
      hasSubmenu: false
    },
    {
      id: 'paymentBatch',
      label: 'Payment Batch',
      icon: 'bi-card-checklist',
      hasSubmenu: false
    },
    {
      id: 'dataQuality',
      label: 'Data Quality',
      icon: 'bi-patch-check-fill',
      hasSubmenu: false
    },
    {
      id: 'turnAroundTime',
      label: 'Turn Around Time',
      icon: 'bi-clock-history',
      hasSubmenu: false
    },
    {
      id: 'setup',
      label: 'Setup',
      icon: 'bi-gear',
      hasSubmenu: true,
      subItems: ['Entity Management', 'Service Providers', 'Datasets & Rules']
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: 'bi-bar-chart-line',
      hasSubmenu: true,
      subItems: ['Data Quality', 'Turn Around Time', 'Submission SLA Report', 'Aging Analysis', 'Audit Log']
    },
    {
      id: 'payables',
      label: 'Payables',
      icon: 'bi-file-earmark-text',
      hasSubmenu: true,
      subItems: ['Invoice Submissions', 'Approvals Queue']
    },
    {
      id: 'admin',
      label: 'Administration',
      icon: 'bi-shield-shaded',
      hasSubmenu: true,
      subItems: ['User Permissions', 'System Configuration']
    },
    {
      id: 'translations',
      label: 'Translations',
      icon: 'bi-layers',
      hasSubmenu: true,
      subItems: ['Language Bundles', 'Labels & Terminology']
    },
    {
      id: 'downloads',
      label: 'Downloads',
      icon: 'bi-download',
      hasSubmenu: false
    }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-lg-none"
          style={{ zIndex: 1040 }}
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`app-sidebar d-flex flex-column py-3 position-relative ${
          collapsed ? 'app-sidebar-collapsed' : ''
        } ${isOpenMobile ? 'position-fixed start-0 top-0 h-100 shadow-lg' : 'd-none d-lg-flex'}`}
        style={{
          zIndex: isOpenMobile ? 1045 : 1000
        }}
      >
        {/* Toggle Collapse Button on Right Edge (circle with < chevron) */}
        <button
          className="sidebar-collapse-toggle d-none d-lg-flex"
          onClick={onToggleCollapse}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          aria-label="Toggle sidebar width"
        >
          <i className={`bi bi-chevron-${collapsed ? 'right' : 'left'}`}></i>
        </button>

        {/* Mobile Header in Drawer */}
        <div className="d-flex align-items-center justify-content-between px-3 pb-3 mb-2 border-bottom d-lg-none">
          <span className="fw-bold fs-5 text-dark">4see®</span>
          <button className="btn btn-sm btn-light border-0" onClick={onCloseMobile}>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        {/* Navigation List */}
        <div className="flex-grow-1 overflow-y-auto">
          <nav className="nav flex-column gap-1 px-2">
            {navItems.map((item) => {
              const isActive = activeView === item.id;
              const isExpanded = expandedMenus[item.id];

              return (
                <div key={item.id}>
                  <div
                    className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
                    onClick={() => {
                      if (item.hasSubmenu) {
                        setExpandedMenus(prev => ({ ...prev, [item.id]: !prev[item.id] }));
                      } else {
                        onSelectView(item.id);
                        onCloseMobile();
                      }
                    }}
                    title={collapsed ? item.label : undefined}
                  >
                    <div className="d-flex align-items-center gap-2 text-truncate">
                      <i className={`bi ${item.icon} sidebar-icon ${isActive ? 'text-white' : 'text-secondary'}`}></i>
                      {!collapsed && <span className="text-truncate">{item.label}</span>}
                    </div>

                    {!collapsed && item.hasSubmenu && (
                      <i
                        className={`bi bi-chevron-${isExpanded ? 'down' : 'right'} ${
                          isActive ? 'text-white' : 'text-muted'
                        }`}
                        style={{ fontSize: '0.7rem' }}
                        onClick={(e) => toggleSubmenu(item.id, e)}
                      ></i>
                    )}
                  </div>

                  {/* Submenu Items */}
                  {!collapsed && item.hasSubmenu && isExpanded && item.subItems && (
                    <div className="ps-4 pe-2 py-1 ms-2 border-start">
                      {item.subItems.map((sub, idx) => (
                        <a
                          key={idx}
                          href="#"
                          className="d-block py-1 px-2 text-decoration-none text-muted small rounded hover-bg-light"
                          style={{ fontSize: '0.75rem' }}
                          onClick={(e) => {
                            e.preventDefault();
                            if (sub === 'Data Quality') {
                              onSelectView('dataQuality');
                            } else if (sub === 'Turn Around Time') {
                              onSelectView('turnAroundTime');
                            } else {
                              onSelectView(item.id);
                            }
                            onCloseMobile();
                          }}
                        >
                          {sub}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        {/* Footer info (only if expanded) */}
        {!collapsed && (
          <div className="px-3 pt-3 border-top mt-auto text-muted" style={{ fontSize: '0.7rem' }}>
            <div className="text-secondary fw-semibold">DAP Enterprise</div>
            <div>v2.6.4</div>
          </div>
        )}
      </aside>
    </>
  );
};
