import React, { useState } from 'react';

interface NavbarProps {
  onToggleSidebar: () => void;
  onSearch: (query: string) => void;
  searchQuery: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar, onSearch, searchQuery }) => {
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [currentLang, setCurrentLang] = useState('English');

  return (
    <header className="navbar navbar-expand bg-white border-bottom sticky-top px-3 py-2" style={{ zIndex: 1020 }}>
      <div className="container-fluid d-flex align-items-center justify-content-between p-0">
        
        {/* Left: Hamburger & Brand */}
        <div className="d-flex align-items-center gap-3">
          <button
            className="btn btn-sm btn-light d-lg-none text-secondary border"
            onClick={onToggleSidebar}
            aria-label="Toggle navigation"
          >
            <i className="bi bi-list fs-5"></i>
          </button>

          <a href="#" className="navbar-brand d-flex align-items-center m-0 text-decoration-none">
            <span className="brand-logo-text">
              4see<sup className="brand-sup">®</sup>
            </span>
          </a>
        </div>

        {/* Right Controls: Language with icon, Notifications badge (1131), User badge (DA DAP Admin) */}
        <div className="d-flex align-items-center gap-3 ms-auto">
          
          {/* Language Selector: icon with A and 文 Chinese character */}
          <div className="position-relative">
            <button
              className="btn btn-sm btn-white border rounded px-2 py-1 text-dark d-flex align-items-center gap-2 bg-white"
              onClick={() => {
                setShowLangMenu(!showLangMenu);
                setShowNotifications(false);
                setShowUserMenu(false);
              }}
              style={{ fontSize: '0.8125rem' }}
            >
              <i className="bi bi-translate text-secondary"></i>
              <span className="fw-medium">{currentLang}</span>
              <i className="bi bi-chevron-down text-muted" style={{ fontSize: '0.65rem' }}></i>
            </button>
            {showLangMenu && (
              <div className="dropdown-menu dropdown-menu-end show position-absolute shadow-sm border py-1" style={{ minWidth: '130px' }}>
                {['English', 'Spanish', 'French', 'German'].map((lang) => (
                  <button
                    key={lang}
                    className={`dropdown-item small py-1 ${lang === currentLang ? 'active bg-light text-dark fw-bold' : ''}`}
                    onClick={() => {
                      setCurrentLang(lang);
                      setShowLangMenu(false);
                    }}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notifications: Orange badge with 1131 count */}
          <div className="position-relative">
            <button
              className="badge-notify-btn"
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowLangMenu(false);
                setShowUserMenu(false);
              }}
              aria-label="1131 Notifications"
              title="1,131 Notifications"
            >
              1131
            </button>

            {showNotifications && (
              <div className="dropdown-menu dropdown-menu-end show position-absolute shadow-lg border p-0" style={{ width: '320px' }}>
                <div className="p-2 border-bottom bg-light d-flex justify-content-between align-items-center">
                  <span className="fw-semibold small">Notifications Queue</span>
                  <span className="badge bg-warning text-dark small">1,131 Total</span>
                </div>
                <div className="list-group list-group-flush small" style={{ maxHeight: '250px', overflowY: 'auto' }}>
                  <div className="list-group-item list-group-item-action p-2">
                    <div className="text-danger fw-semibold">
                      <i className="bi bi-exclamation-triangle-fill me-1"></i> 91520F11418D139
                    </div>
                    <div className="text-muted" style={{ fontSize: '0.75rem' }}>
                      UK_PM_TS_Data_Anomylised uploaded for Sep, 2026.
                    </div>
                  </div>
                  <div className="list-group-item list-group-item-action p-2">
                    <div className="text-primary fw-semibold">
                      <i className="bi bi-arrow-repeat me-1"></i> 322IS20F28D243 Reopened
                    </div>
                    <div className="text-muted" style={{ fontSize: '0.75rem' }}>
                      Dataset_123 was Reopened By System.
                    </div>
                  </div>
                  <div className="list-group-item list-group-item-action p-2">
                    <div className="text-dark fw-semibold">
                      <i className="bi bi-shield-check me-1"></i> Seven Seas Report Package
                    </div>
                    <div className="text-muted" style={{ fontSize: '0.75rem' }}>
                      Submitted by CMS Settlement.
                    </div>
                  </div>
                </div>
                <div className="p-2 text-center border-top">
                  <button className="btn btn-link btn-sm text-decoration-none p-0 text-muted" onClick={() => setShowNotifications(false)}>
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Badge: Orange circle DA + DAP Admin / dap-sa@4seeanalytics.net */}
          <div className="position-relative">
            <button
              className="btn btn-sm btn-link text-decoration-none text-dark d-flex align-items-center gap-2 p-1"
              onClick={() => {
                setShowUserMenu(!showUserMenu);
                setShowLangMenu(false);
                setShowNotifications(false);
              }}
            >
              <div className="user-avatar-circle">
                DA
              </div>
              <div className="text-start d-none d-sm-block">
                <div className="fw-semibold text-dark" style={{ fontSize: '0.8125rem', lineHeight: '1.2' }}>
                  DAP Admin
                </div>
                <div className="text-muted" style={{ fontSize: '0.7rem', lineHeight: '1.1' }}>
                  dap-sa@4seeanalytics.net
                </div>
              </div>
            </button>

            {showUserMenu && (
              <div className="dropdown-menu dropdown-menu-end show position-absolute shadow-sm border py-1" style={{ minWidth: '220px' }}>
                <div className="px-3 py-2 border-bottom d-sm-none">
                  <div className="fw-semibold small">DAP Admin</div>
                  <div className="text-muted" style={{ fontSize: '0.7rem' }}>dap-sa@4seeanalytics.net</div>
                </div>
                <a className="dropdown-item small py-2" href="#profile" onClick={(e) => { e.preventDefault(); setShowUserMenu(false); }}>
                  <i className="bi bi-person me-2 text-secondary"></i> Admin Profile
                </a>
                <a className="dropdown-item small py-2" href="#settings" onClick={(e) => { e.preventDefault(); setShowUserMenu(false); }}>
                  <i className="bi bi-gear me-2 text-secondary"></i> System Settings
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item small py-2 text-danger" href="#logout" onClick={(e) => { e.preventDefault(); setShowUserMenu(false); }}>
                  <i className="bi bi-box-arrow-right me-2"></i> Sign Out
                </a>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};
