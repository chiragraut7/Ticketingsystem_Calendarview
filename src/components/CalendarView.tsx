import React, { useState } from 'react';
import { Submission, CalendarViewType } from '../types';

interface CalendarViewProps {
  submissions: Submission[];
  selectedDate: string | null;
  onSelectDate: (date: string | null) => void;
  onSelectEvent: (submission: Submission) => void;
  onShowDayEvents: (date: string, daySubmissions: Submission[]) => void;
  onAddNewSubmission: (presetDate?: string) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  submissions,
  selectedDate,
  onSelectDate,
  onSelectEvent,
  onShowDayEvents,
  onAddNewSubmission
}) => {
  // Base year and month - default to September 2026 as in the current theme screenshot
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(8); // 0-indexed: 8 = September
  const [selectedWeek, setSelectedWeek] = useState<number>(4); // Week 4 of September (where Sep 24 is)
  const [viewType, setViewType] = useState<CalendarViewType>('month');

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonth(prev => prev + 1);
    }
  };

  const handleToday = () => {
    setCurrentYear(2026);
    setCurrentMonth(8); // September 2026
    setSelectedWeek(4);
    onSelectDate('2026-09-24');
  };

  // Helper to calculate weeks in the current month for Week dropdown
  const getWeeksInMonth = () => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const totalDays = lastDay.getDate();

    const weeks = [];
    let currentStart = 1;
    let weekIndex = 1;

    while (currentStart <= totalDays) {
      const end = Math.min(currentStart + 6, totalDays);
      weeks.push({
        weekNum: weekIndex,
        label: `Week ${weekIndex} (${currentStart} - ${end} ${monthNames[currentMonth].slice(0, 3)})`,
        startDay: currentStart,
        endDay: end
      });
      currentStart += 7;
      weekIndex++;
    }

    return weeks;
  };

  const weeksList = getWeeksInMonth();

  // Generate calendar grid for month (Monday start)
  const getDaysArray = () => {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);

    // In JS, getDay(): 0 is Sunday, 1 is Monday ... 6 is Saturday
    let startingDayOfWeek = firstDayOfMonth.getDay() - 1;
    if (startingDayOfWeek === -1) startingDayOfWeek = 6;

    const daysInCurrentMonth = lastDayOfMonth.getDate();
    const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

    const days = [];

    // Prev month days
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const dayNum = daysInPrevMonth - i;
      const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
      const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
      const dateStr = `${prevYear}-${String(prevMonth + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
      days.push({
        dayNumber: dayNum,
        dateStr,
        isCurrentMonth: false
      });
    }

    // Current month days
    for (let i = 1; i <= daysInCurrentMonth; i++) {
      const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      days.push({
        dayNumber: i,
        dateStr,
        isCurrentMonth: true
      });
    }

    // Next month days to fill 35 or 42 cells
    const totalCells = days.length > 35 ? 42 : 35;
    const remainingDays = totalCells - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
      const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;
      const dateStr = `${nextYear}-${String(nextMonth + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      days.push({
        dayNumber: i,
        dateStr,
        isCurrentMonth: false
      });
    }

    return days;
  };

  const daysGrid = getDaysArray();

  // Helper to group submissions by date
  const getSubmissionsForDate = (dateStr: string) => {
    return submissions.filter(s => s.dueDate === dateStr);
  };

  // Get active week days for week view
  const currentWeekInfo = weeksList.find(w => w.weekNum === selectedWeek) || weeksList[0] || { startDay: 1, endDay: 7 };
  const weekDays = [];
  if (currentWeekInfo) {
    for (let d = currentWeekInfo.startDay; d <= currentWeekInfo.endDay; d++) {
      const dateObj = new Date(currentYear, currentMonth, d);
      const dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][dateObj.getDay()];
      const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      weekDays.push({
        dateStr,
        dayNumber: d,
        dayName,
        label: `${dayName} (${String(d).padStart(2, '0')} ${monthNames[currentMonth].slice(0, 3)})`
      });
    }
  }

  return (
    <div className="calendar-card mb-2.5">
      {/* Calendar Top Toolbar with Month Dropdown & Week Dropdown */}
      <div className="calendar-toolbar p-2.5 px-3 border-bottom bg-white rounded-top d-flex flex-wrap align-items-center justify-content-between gap-2.5">
        
        {/* Left Section: Period Navigation & Dropdowns */}
        <div className="d-flex flex-wrap align-items-center gap-2">
          
          {/* Previous / Next Month Navigation */}
          <div className="cal-nav-group d-flex align-items-center bg-light rounded border p-0.5">
            <button
              type="button"
              className="cal-nav-icon-btn"
              onClick={handlePrevMonth}
              title="Previous month"
              aria-label="Previous month"
            >
              <i className="bi bi-chevron-left"></i>
            </button>
            <button
              type="button"
              className="cal-nav-icon-btn border-start"
              onClick={handleNextMonth}
              title="Next month"
              aria-label="Next month"
            >
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>

          {/* Month & Year Dropdown Combo Box */}
          <div className="cal-selector-pill d-flex align-items-center bg-white border rounded px-2 py-1 shadow-2xs">
            <i className="bi bi-calendar3 text-orange me-2" style={{ fontSize: '0.9rem' }}></i>
            <select
              className="cal-clean-select fw-semibold text-dark me-1"
              value={currentMonth}
              onChange={(e) => setCurrentMonth(Number(e.target.value))}
              aria-label="Select month"
            >
              {monthNames.map((name, idx) => (
                <option key={idx} value={idx}>
                  {name}
                </option>
              ))}
            </select>

            <span className="text-muted opacity-50 me-1">|</span>

            <select
              className="cal-clean-select fw-bold text-dark"
              value={currentYear}
              onChange={(e) => setCurrentYear(Number(e.target.value))}
              aria-label="Select year"
            >
              {[2024, 2025, 2026, 2027].map((yr) => (
                <option key={yr} value={yr}>
                  {yr}
                </option>
              ))}
            </select>
          </div>

          {/* Week Dropdown Box */}
          <div className="cal-selector-pill d-flex align-items-center bg-white border rounded px-2 py-1 shadow-2xs">
            <i className="bi bi-calendar2-week text-secondary me-2" style={{ fontSize: '0.85rem' }}></i>
            <span className="text-secondary small fw-medium me-1">Week:</span>
            <select
              className="cal-clean-select text-secondary fw-medium"
              value={selectedWeek}
              onChange={(e) => {
                const w = Number(e.target.value);
                setSelectedWeek(w);
                if (viewType !== 'week') {
                  setViewType('week');
                }
              }}
              style={{ minWidth: '150px' }}
              aria-label="Select week"
            >
              {weeksList.map((w) => (
                <option key={w.weekNum} value={w.weekNum}>
                  {w.label}
                </option>
              ))}
            </select>
          </div>

          {/* Today Jump Button */}
          <button
            type="button"
            className="btn btn-sm btn-light border fw-semibold text-secondary px-3 cal-today-btn"
            onClick={handleToday}
            title="Jump to current period (Sep 2026)"
          >
            Today
          </button>
        </div>

        {/* Right Section: Status Legend & View Switcher */}
        <div className="d-flex flex-wrap align-items-center gap-3 ms-auto">
          
          {/* Status Dots Legend Capsule */}
          <div className="cal-legend-capsule d-none d-lg-flex align-items-center">
            <div className="cal-legend-item">
              <span className="legend-dot dot-new"></span>
              <span>New</span>
            </div>
            <span className="cal-legend-divider"></span>
            <div className="cal-legend-item">
              <span className="legend-dot dot-in-progress"></span>
              <span>In-Progress</span>
            </div>
            <span className="cal-legend-divider"></span>
            <div className="cal-legend-item">
              <span className="legend-dot dot-completed"></span>
              <span>Completed</span>
            </div>
            <span className="cal-legend-divider"></span>
            <div className="cal-legend-item">
              <span className="legend-dot dot-reopened"></span>
              <span>Reopened</span>
            </div>
          </div>

          {/* View Mode Segmented Control (Month / Week) */}
          <div className="d-flex align-items-center gap-2">
            <div className="cal-segmented-control d-flex p-1 bg-light border rounded">
              <button
                type="button"
                className={`cal-segment-btn ${viewType === 'month' ? 'active' : ''}`}
                onClick={() => setViewType('month')}
              >
                Month
              </button>
              <button
                type="button"
                className={`cal-segment-btn ${viewType === 'week' ? 'active' : ''}`}
                onClick={() => setViewType('week')}
              >
                Week
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Month View Grid */}
      {viewType === 'month' && (
        <div className="calendar-view-container overflow-hidden">
          {/* Day of Week Headers */}
          <div className="calendar-header-row">
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
            <div>Sun</div>
            </div>

          {/* Days Grid */}
          <div className="calendar-grid">
            {daysGrid.map((day) => {
              const daySubmissions = getSubmissionsForDate(day.dateStr);
              const isSelected = selectedDate === day.dateStr;
              const displayLimit = 2;
              const visibleSubmissions = daySubmissions.slice(0, displayLimit);
              const remainingCount = daySubmissions.length - displayLimit;

              return (
                <div
                  key={day.dateStr}
                  className={`calendar-cell ${!day.isCurrentMonth ? 'different-month' : ''} ${
                    isSelected ? 'selected-day' : ''
                  }`}
                  onClick={() => onSelectDate(day.dateStr)}
                  onDoubleClick={() => onAddNewSubmission(day.dateStr)}
                  title={`Click to filter table, double-click to add submission on ${day.dateStr}`}
                >
                  <div className="d-flex justify-content-between align-items-center cal-cell-header">
                    <span className="day-number">{day.dayNumber}</span>
                    <div className="d-flex align-items-center gap-1">
                      {daySubmissions.length > 0 && (
                        <span className="d-none d-md-inline-block text-muted small-item-count">
                          {daySubmissions.length}
                        </span>
                      )}
                      <button
                        type="button"
                        className="btn btn-sm btn-icon-round cal-cell-add-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddNewSubmission(day.dateStr);
                        }}
                        title={`Add submission on ${day.dateStr}`}
                        aria-label={`Add submission on ${day.dateStr}`}
                      >
                        <i className="bi bi-plus-lg"></i>
                      </button>
                    </div>
                  </div>

                  {/* Submission Badges */}
                  <div className="mt-1">
                    {visibleSubmissions.map((sub) => (
                      <div
                        key={sub.id}
                        className={`calendar-event-badge badge-${sub.status || 'new'}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectEvent(sub);
                        }}
                        title={`${sub.refId} ${sub.title} (${sub.status})`}
                      >
                        <span className="fw-semibold me-1">{sub.refId}</span>
                        <span className="text-truncate">{sub.title}</span>
                      </div>
                    ))}

                    {/* +N more link */}
                    {remainingCount > 0 && (
                      <div
                        className="calendar-more-badge"
                        onClick={(e) => {
                          e.stopPropagation();
                          onShowDayEvents(day.dateStr, daySubmissions);
                        }}
                      >
                        +{remainingCount} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Week View */}
      {viewType === 'week' && (
        <div className="p-3 bg-white">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <h6 className="fw-bold m-0 text-dark">
              Week {selectedWeek}: {monthNames[currentMonth]} {currentWeekInfo.startDay} - {currentWeekInfo.endDay}, {currentYear}
            </h6>
            <span className="text-muted small">Showing {weekDays.length} days</span>
          </div>

          <div className="row g-2">
            {weekDays.map((day) => {
              const daySubs = getSubmissionsForDate(day.dateStr);
              const isSelected = selectedDate === day.dateStr;

              return (
                <div key={day.dateStr} className="col-12 col-md">
                  <div
                    className={`p-2 border rounded h-100 cursor-pointer ${
                      isSelected ? 'border-primary bg-light-subtle ring-1' : 'bg-white'
                    }`}
                    onClick={() => onSelectDate(day.dateStr)}
                    style={{ minHeight: '160px' }}
                  >
                    <div className="d-flex justify-content-between align-items-center border-bottom pb-1 mb-2">
                      <span className="fw-bold small text-dark">{day.label}</span>
                      {daySubs.length > 0 && (
                        <span className="badge bg-secondary-subtle text-secondary font-monospace" style={{ fontSize: '0.65rem' }}>
                          {daySubs.length}
                        </span>
                      )}
                    </div>

                    {daySubs.length === 0 ? (
                      <div className="text-muted small fst-italic py-2">No tasks</div>
                    ) : (
                      daySubs.map(s => (
                        <div
                          key={s.id}
                          className={`calendar-event-badge badge-${s.status || 'new'} mb-1 p-1`}
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectEvent(s);
                          }}
                        >
                          <div className="fw-bold text-truncate">{s.refId}</div>
                          <div className="text-truncate" style={{ fontSize: '0.68rem' }}>{s.title}</div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
