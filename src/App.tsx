import React, { useState, useMemo } from 'react';
import { INITIAL_SUBMISSIONS } from './data/mockData';
import { Submission, SubmissionStatus } from './types';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { KpiCards } from './components/KpiCards';
import { CalendarView } from './components/CalendarView';
import { SubmissionsTable } from './components/SubmissionsTable';
import { EventModal } from './components/EventModal';
import { NewSubmissionModal } from './components/NewSubmissionModal';
import { DayEventsModal } from './components/DayEventsModal';
import { UploadedFilesView } from './components/UploadedFilesView';
import { DataQualityView } from './components/DataQualityView';
import { TurnAroundTimeView } from './components/TurnAroundTimeView';

export default function App() {
  const [submissions, setSubmissions] = useState<Submission[]>(INITIAL_SUBMISSIONS);
  // Default selected date is September 24, 2026 as in the current theme screenshot
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [activeStatusFilter, setActiveStatusFilter] = useState<string | null>(null);
  const [globalSearch, setGlobalSearch] = useState('');
  const [activeSidebarView, setActiveSidebarView] = useState('files'); // Default to 'files' or 'dashboard'
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Modals state
  const [selectedSubmissionForModal, setSelectedSubmissionForModal] = useState<Submission | null>(null);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [newModalPresetDate, setNewModalPresetDate] = useState<string | undefined>(undefined);
  const [dayModalState, setDayModalState] = useState<{
    isOpen: boolean;
    date: string | null;
    submissions: Submission[];
  }>({
    isOpen: false,
    date: null,
    submissions: []
  });

  // Filter submissions by status or global search
  const displayedSubmissions = useMemo(() => {
    let result = [...submissions];

    if (globalSearch.trim()) {
      const q = globalSearch.toLowerCase();
      result = result.filter(
        s =>
          s.refId.toLowerCase().includes(q) ||
          s.submissionNumber.toLowerCase().includes(q) ||
          s.title.toLowerCase().includes(q) ||
          s.serviceProvider.toLowerCase().includes(q) ||
          s.entityName.toLowerCase().includes(q) ||
          s.propertyName.toLowerCase().includes(q) ||
          s.dataset.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q)
      );
    }

    if (activeStatusFilter) {
      if (activeStatusFilter === 'new') {
        result = result.filter(s => s.status === 'new' || s.status === 'upcoming');
      } else if (activeStatusFilter === 'in-progress') {
        result = result.filter(s => s.status === 'in-progress' || s.status === 'duesoon');
      } else if (activeStatusFilter === 'completed') {
        result = result.filter(s => s.status === 'completed');
      } else if (activeStatusFilter === 'reopened') {
        result = result.filter(s => s.status === 'reopened' || s.status === 'reopened_by_system' || s.status === 'overdue');
      }
    }

    return result;
  }, [submissions, globalSearch, activeStatusFilter]);

  // Handlers for CRUD
  const handleSaveSubmission = (updated: Submission) => {
    setSubmissions(prev => prev.map(s => (s.id === updated.id ? updated : s)));
  };

  const handleAddSubmission = (newSub: Submission) => {
    setSubmissions(prev => [newSub, ...prev]);
    setSelectedDate(newSub.dueDate);
  };

  const handleDeleteSubmission = (id: string) => {
    setSubmissions(prev => prev.filter(s => s.id !== id));
  };

  const handleUpdateStatus = (id: string, newStatus: SubmissionStatus) => {
    setSubmissions(prev =>
      prev.map(s => {
        if (s.id === id) {
          const actionMsg = `Updated status to ${newStatus.toUpperCase()}`;
          return {
            ...s,
            status: newStatus,
            history: [
              {
                user: 'DAP Admin',
                action: actionMsg,
                timestamp: new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })
              },
              ...(s.history || [])
            ]
          };
        }
        return s;
      })
    );
  };

  const handleOpenNewSubmission = (presetDate?: string) => {
    setNewModalPresetDate(presetDate || selectedDate || '2026-09-24');
    setIsNewModalOpen(true);
  };

  const handleShowDayEvents = (date: string, daySubmissions: Submission[]) => {
    setDayModalState({
      isOpen: true,
      date,
      submissions: daySubmissions
    });
  };

  return (
    <div className="d-flex flex-column min-vh-100 theme-page-bg">
      
      {/* Top Navbar */}
      <Navbar
        onToggleSidebar={() => setIsMobileSidebarOpen(prev => !prev)}
        searchQuery={globalSearch}
        onSearch={setGlobalSearch}
      />

      {/* Main Layout Container */}
      <div className="d-flex flex-grow-1 position-relative">
        
        {/* Left Sidebar */}
        <Sidebar
          activeView={activeSidebarView}
          onSelectView={setActiveSidebarView}
          isOpenMobile={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
          collapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(prev => !prev)}
        />

        {/* Content Area */}
        <main className="flex-grow-1 p-2.5 p-md-3 main-content-wrapper" style={{ minWidth: 0 }}>
          <div className="container-fluid p-0" style={{ maxWidth: '1600px', margin: '0 auto' }}>
            
            {/* Breadcrumb Navigation */}
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-2">
              <nav aria-label="breadcrumb">
                <div className="theme-breadcrumb-box">
                  <i className="bi bi-house-door text-secondary me-1"></i>
                  <a
                    href="#"
                    className="text-decoration-none text-secondary"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveSidebarView('files');
                    }}
                  >
                    Home
                  </a>
                  <i className="bi bi-chevron-right text-muted mx-1" style={{ fontSize: '0.65rem' }}></i>
                  {activeSidebarView === 'dataQuality' ? (
                    <>
                      <span className="text-secondary small">Reports</span>
                      <i className="bi bi-chevron-right text-muted mx-1" style={{ fontSize: '0.65rem' }}></i>
                      <span className="theme-breadcrumb-pill">Data Quality</span>
                    </>
                  ) : activeSidebarView === 'turnAroundTime' ? (
                    <>
                      <span className="text-secondary small">Reports</span>
                      <i className="bi bi-chevron-right text-muted mx-1" style={{ fontSize: '0.65rem' }}></i>
                      <span className="theme-breadcrumb-pill">Turn Around Time</span>
                    </>
                  ) : (
                    <span className="theme-breadcrumb-pill">Uploaded Files</span>
                  )}
                </div>
              </nav>
            </div>

            {/* View Switching Logic */}
            {activeSidebarView === 'dataQuality' ? (
              <DataQualityView />
            ) : activeSidebarView === 'turnAroundTime' ? (
              <TurnAroundTimeView />
            ) : (
              <>
                {/* 4 Metric KPI Cards matching screenshot:
                    573 New Submission | 226 In-Progress | 175 Completed/Closed | 125 Reopened
                */}
                <KpiCards
                  activeStatusFilter={activeStatusFilter}
                  onFilterByStatus={setActiveStatusFilter}
                />

                {/* Calendar View with Month & Week Dropdowns */}
                <CalendarView
                  submissions={displayedSubmissions}
                  selectedDate={selectedDate}
                  onSelectDate={(date) => setSelectedDate(date)}
                  onSelectEvent={(sub) => setSelectedSubmissionForModal(sub)}
                  onShowDayEvents={handleShowDayEvents}
                  onAddNewSubmission={handleOpenNewSubmission}
                />

                {/* Submissions Table with Orange Header matching theme */}
                <SubmissionsTable
                  submissions={displayedSubmissions}
                  selectedDate={selectedDate}
                  onClearDateFilter={() => setSelectedDate(null)}
                  onSelectEvent={(sub) => setSelectedSubmissionForModal(sub)}
                  onUpdateStatus={handleUpdateStatus}
                  onDeleteSubmission={handleDeleteSubmission}
                />
              </>
            )}

            {/* Subtle activation status text from screenshot */}
            <div className="text-end text-muted small pe-2 mt-4 opacity-50" style={{ fontSize: '0.72rem' }}>
              Activate Windows
              <div style={{ fontSize: '0.65rem' }}>Go to Settings to activate Windows.</div>
            </div>

          </div>
        </main>

      </div>

      {/* MODAL 1: Event Details & Edit Modal */}
      <EventModal
        isOpen={Boolean(selectedSubmissionForModal)}
        submission={selectedSubmissionForModal}
        onClose={() => setSelectedSubmissionForModal(null)}
        onSave={handleSaveSubmission}
        onDelete={handleDeleteSubmission}
      />

      {/* MODAL 2: Create New Submission Modal */}
      <NewSubmissionModal
        isOpen={isNewModalOpen}
        initialDate={newModalPresetDate}
        onClose={() => setIsNewModalOpen(false)}
        onAdd={handleAddSubmission}
      />

      {/* MODAL 3: Day Events Overview Modal (from +N more) */}
      <DayEventsModal
        isOpen={dayModalState.isOpen}
        date={dayModalState.date}
        submissions={dayModalState.submissions}
        onClose={() => setDayModalState(prev => ({ ...prev, isOpen: false }))}
        onSelectEvent={(sub) => {
          setDayModalState(prev => ({ ...prev, isOpen: false }));
          setSelectedSubmissionForModal(sub);
        }}
        onAddNewEvent={(date) => {
          handleOpenNewSubmission(date);
        }}
      />

    </div>
  );
}
