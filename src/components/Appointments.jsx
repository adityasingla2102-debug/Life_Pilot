import React, { useState, useEffect } from 'react';
import StatCard from './StatCard.jsx';

// ==========================================================
// APPOINTMENTS MANAGEMENT COMPONENT (MODULE 3)
// ==========================================================
// Palette:
// Primary: #06A9C9 | Secondary: #2F8196 | Tertiary: #6176AC | Neutral: #747782
// ==========================================================

function Appointments() {
  // --------------------------------------------------------
  // 1. STATE MANAGEMENT
  // --------------------------------------------------------
  
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeSectionTab, setActiveSectionTab] = useState('all');
  const [sortBy, setSortBy] = useState('dateAsc');

  const [showModal, setShowModal] = useState(false);
  const [editingApptId, setEditingApptId] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Doctor',
    date: '',
    time: '10:00',
    location: '',
    notes: '',
    status: 'Upcoming'
  });

  const [formErrors, setFormErrors] = useState({});
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // --------------------------------------------------------
  // 2. HELPER FUNCTIONS
  // --------------------------------------------------------

  const getTodayString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formatDisplayDate = (dateString) => {
    if (!dateString) return 'N/A';
    const parts = dateString.split('-');
    if (parts.length === 3) {
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const monthIndex = parseInt(parts[1], 10) - 1;
      return `${parseInt(parts[2], 10)} ${monthNames[monthIndex]} ${parts[0]}`;
    }
    return dateString;
  };

  const formatDisplayTime = (timeString) => {
    if (!timeString) return '';
    const parts = timeString.split(':');
    if (parts.length >= 2) {
      let hours = parseInt(parts[0], 10);
      const minutes = parts[1];
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;
      return `${hours}:${minutes} ${ampm}`;
    }
    return timeString;
  };

  // --------------------------------------------------------
  // 3. LOCAL STORAGE INITIALIZATION (useEffect)
  // --------------------------------------------------------
  useEffect(() => {
    const savedData = localStorage.getItem('lifeadmin_appointments');
    if (savedData) {
      try {
        setAppointments(JSON.parse(savedData));
      } catch (e) {
        console.error("Failed to parse appointments from localStorage", e);
      }
    } else {
      const sampleAppointments = [
        {
          id: 1,
          title: "Dental Cleaning & Checkup",
          category: "Dentist",
          date: "2026-08-28",
          time: "11:00",
          location: "City Dental Clinic, Sector 14",
          notes: "Regular 6-month cleaning",
          status: "Upcoming"
        },
        {
          id: 2,
          title: "College Project Viva Review",
          category: "College",
          date: getTodayString(),
          time: "14:30",
          location: "Lab 302, CS Department",
          notes: "Demonstrate Module 3 features to project guide",
          status: "Upcoming"
        },
        {
          id: 3,
          title: "Bank Locker Verification",
          category: "Bank",
          date: "2026-08-22",
          time: "10:30",
          location: "SBI Main Branch",
          notes: "Carry original identity documents",
          status: "Upcoming"
        },
        {
          id: 4,
          title: "Two-Wheeler Service",
          category: "Service Center",
          date: "2026-08-05",
          time: "09:00",
          location: "Authorized Honda Workshop",
          notes: "Routine 5000km engine maintenance",
          status: "Completed"
        }
      ];
      setAppointments(sampleAppointments);
      localStorage.setItem('lifeadmin_appointments', JSON.stringify(sampleAppointments));
    }
  }, []);

  const saveAppointmentsToStorage = (updatedAppts) => {
    setAppointments(updatedAppts);
    localStorage.setItem('lifeadmin_appointments', JSON.stringify(updatedAppts));
  };

  // --------------------------------------------------------
  // 4. FORM HANDLING & VALIDATION
  // --------------------------------------------------------

  const handleOpenAddModal = () => {
    setEditingApptId(null);
    setFormData({
      title: '',
      category: 'Doctor',
      date: getTodayString(),
      time: '10:00',
      location: '',
      notes: '',
      status: 'Upcoming'
    });
    setFormErrors({});
    setShowModal(true);
  };

  const handleOpenEditModal = (appt) => {
    setEditingApptId(appt.id);
    setFormData({
      title: appt.title,
      category: appt.category,
      date: appt.date,
      time: appt.time,
      location: appt.location || '',
      notes: appt.notes || '',
      status: appt.status
    });
    setFormErrors({});
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null
      });
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.title.trim()) {
      errors.title = 'Title cannot be empty';
    }
    if (!formData.date) {
      errors.date = 'Date is required';
    }
    if (!formData.time) {
      errors.time = 'Time is required';
    }
    return errors;
  };

  const handleSaveAppointment = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    if (editingApptId) {
      const updatedAppts = appointments.map((a) => {
        if (a.id === editingApptId) {
          return {
            ...a,
            title: formData.title.trim(),
            category: formData.category,
            date: formData.date,
            time: formData.time,
            location: formData.location.trim(),
            notes: formData.notes.trim(),
            status: formData.status
          };
        }
        return a;
      });
      saveAppointmentsToStorage(updatedAppts);
    } else {
      const newAppt = {
        id: Date.now(),
        title: formData.title.trim(),
        category: formData.category,
        date: formData.date,
        time: formData.time,
        location: formData.location.trim(),
        notes: formData.notes.trim(),
        status: formData.status
      };
      const updatedAppts = [newAppt, ...appointments];
      saveAppointmentsToStorage(updatedAppts);
    }

    setShowModal(false);
  };

  // --------------------------------------------------------
  // 5. CRUD ACTION HANDLERS
  // --------------------------------------------------------

  const handleDeleteAppointment = (id) => {
    const updatedAppts = appointments.filter((a) => a.id !== id);
    saveAppointmentsToStorage(updatedAppts);
    setDeleteConfirmId(null);
  };

  const handleToggleStatus = (id) => {
    const updatedAppts = appointments.map((a) => {
      if (a.id === id) {
        return {
          ...a,
          status: a.status === 'Completed' ? 'Upcoming' : 'Completed'
        };
      }
      return a;
    });
    saveAppointmentsToStorage(updatedAppts);
  };

  // --------------------------------------------------------
  // 6. DASHBOARD CALCULATIONS
  // --------------------------------------------------------
  const todayStr = getTodayString();
  const totalAppointmentsCount = appointments.length;

  const todayAppointments = appointments.filter(
    (a) => a.date === todayStr && a.status !== 'Completed'
  );
  
  const upcomingAppointments = appointments.filter(
    (a) => a.date > todayStr && a.status !== 'Completed'
  );

  const completedAppointments = appointments.filter(
    (a) => a.status === 'Completed'
  );

  // --------------------------------------------------------
  // 7. SEARCH, FILTER & SORT LOGIC
  // --------------------------------------------------------
  const filteredAppointments = appointments
    .filter((appt) => {
      const matchesSearch =
        appt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appt.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (appt.location && appt.location.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (appt.notes && appt.notes.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory =
        selectedCategory === 'All' || appt.category === selectedCategory;

      let matchesTab = true;
      if (activeSectionTab === 'today') {
        matchesTab = appt.date === todayStr && appt.status !== 'Completed';
      } else if (activeSectionTab === 'upcoming') {
        matchesTab = appt.date > todayStr && appt.status !== 'Completed';
      } else if (activeSectionTab === 'completed') {
        matchesTab = appt.status === 'Completed';
      }

      return matchesSearch && matchesCategory && matchesTab;
    })
    .sort((a, b) => {
      if (sortBy === 'dateAsc') {
        const dateTimeA = `${a.date} ${a.time}`;
        const dateTimeB = `${b.date} ${b.time}`;
        return dateTimeA.localeCompare(dateTimeB);
      } else if (sortBy === 'dateDesc') {
        const dateTimeA = `${a.date} ${a.time}`;
        const dateTimeB = `${b.date} ${b.time}`;
        return dateTimeB.localeCompare(dateTimeA);
      } else if (sortBy === 'titleAsc') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

  // --------------------------------------------------------
  // 8. INLINE STYLES (PALETTE THEMED)
  // --------------------------------------------------------
  const containerStyle = {
    padding: "24px",
    maxWidth: "1280px",
    margin: "0 auto",
    fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
    color: "#1e232d"
  };

  const headerRowStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
    flexWrap: "wrap",
    gap: "16px"
  };

  const pageTitleStyle = {
    fontSize: "28px",
    fontWeight: "700",
    color: "#1e232d",
    margin: 0
  };

  const pageSubtitleStyle = {
    fontSize: "14px",
    color: "#747782",
    marginTop: "4px"
  };

  // Primary Action Button (#06A9C9)
  const primaryButtonStyle = {
    backgroundColor: "#06A9C9",
    color: "#ffffff",
    border: "none",
    borderRadius: "10px",
    padding: "10px 20px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    boxShadow: "0 2px 8px rgba(6, 169, 201, 0.3)"
  };

  const statsGridStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: "16px",
    marginBottom: "28px"
  };

  const tabBarStyle = {
    display: "flex",
    gap: "8px",
    marginBottom: "20px",
    borderBottom: "1px solid #e2e4e8",
    paddingBottom: "8px",
    overflowX: "auto"
  };

  const tabButtonStyle = (isActive) => ({
    padding: "8px 16px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: isActive ? "#06A9C9" : "transparent",
    color: isActive ? "#ffffff" : "#747782",
    fontWeight: "600",
    fontSize: "14px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    transition: "all 0.2s ease"
  });

  const tabBadgeStyle = (isActive) => ({
    backgroundColor: isActive ? "rgba(255, 255, 255, 0.25)" : "#e2e4e8",
    color: isActive ? "#ffffff" : "#2F8196",
    padding: "2px 8px",
    borderRadius: "12px",
    fontSize: "11px",
    fontWeight: "700"
  });

  const controlBarStyle = {
    backgroundColor: "#ffffff",
    padding: "16px 20px",
    borderRadius: "12px",
    border: "1px solid #e2e4e8",
    boxShadow: "0 1px 4px rgba(47, 129, 150, 0.05)",
    marginBottom: "20px",
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
    alignItems: "center",
    justifyContent: "space-between"
  };

  const inputGroupStyle = {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
    flex: "1 1 500px"
  };

  const searchInputStyle = {
    flex: "1 1 200px",
    padding: "10px 14px",
    borderRadius: "8px",
    border: "1px solid #cbd0d8",
    fontSize: "14px",
    outline: "none"
  };

  const selectStyle = {
    padding: "10px 14px",
    borderRadius: "8px",
    border: "1px solid #cbd0d8",
    fontSize: "14px",
    backgroundColor: "#ffffff",
    outline: "none",
    cursor: "pointer"
  };

  const cardsGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: "16px"
  };

  const apptCardStyle = {
    backgroundColor: "#ffffff",
    borderRadius: "14px",
    padding: "20px",
    border: "1px solid #e2e4e8",
    boxShadow: "0 2px 6px rgba(47, 129, 150, 0.06)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  };

  const actionBtnStyle = (color, bg) => ({
    backgroundColor: bg,
    color: color,
    border: "none",
    borderRadius: "8px",
    padding: "6px 12px",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: "4px"
  });

  const modalBackdropStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(30, 35, 45, 0.5)",
    backdropFilter: "blur(4px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    padding: "16px"
  };

  const modalBoxStyle = {
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    width: "100%",
    maxWidth: "520px",
    boxShadow: "0 20px 25px -5px rgba(47, 129, 150, 0.15)",
    overflow: "hidden"
  };

  const modalHeaderStyle = {
    padding: "20px 24px",
    borderBottom: "1px solid #e2e4e8",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  };

  const modalBodyStyle = {
    padding: "24px"
  };

  const formGroupStyle = {
    marginBottom: "18px"
  };

  const labelStyle = {
    display: "block",
    fontSize: "13px",
    fontWeight: "600",
    color: "#2F8196",
    marginBottom: "6px"
  };

  const inputStyle = {
    width: "100%",
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid #cbd0d8",
    fontSize: "14px",
    boxSizing: "border-box",
    outline: "none"
  };

  const errorTextStyle = {
    fontSize: "12px",
    color: "#dc2626",
    marginTop: "4px"
  };

  const categories = [
    'Doctor',
    'Dentist',
    'Bank',
    'Service Center',
    'College',
    'Work',
    'Personal',
    'Other'
  ];

  return (
    <div style={containerStyle}>
      {/* ----------------- PAGE HEADER ----------------- */}
      <div style={headerRowStyle}>
        <div>
          <h1 style={pageTitleStyle}>Appointments Management</h1>
          <p style={pageSubtitleStyle}>
            Organize personal appointments, meetings, doctor visits, and campus reviews
          </p>
        </div>
        <button style={primaryButtonStyle} onClick={handleOpenAddModal}>
          <span>+ Add Appointment</span>
        </button>
      </div>

      {/* ----------------- STATS CARDS (NEW PALETTE) ----------------- */}
      <div style={statsGridStyle}>
        <StatCard
          title="Total Appointments"
          value={totalAppointmentsCount}
          subtitle="All scheduled entries"
          icon="🗓️"
          color="#06A9C9"
          bgColor="#e6f8fa"
        />
        <StatCard
          title="Today's Schedule"
          value={todayAppointments.length}
          subtitle="Scheduled for today"
          icon="📍"
          color="#2F8196"
          bgColor="#eaf3f5"
          badge={todayAppointments.length > 0 ? "Today" : "Free"}
        />
        <StatCard
          title="Upcoming Appointments"
          value={upcomingAppointments.length}
          subtitle="Future schedule"
          icon="⏳"
          color="#6176AC"
          bgColor="#edf0f8"
        />
        <StatCard
          title="Completed"
          value={completedAppointments.length}
          subtitle="Past meetings done"
          icon="✅"
          color="#2F8196"
          bgColor="#eaf3f5"
        />
      </div>

      {/* ----------------- SECTION TABS ----------------- */}
      <div style={tabBarStyle}>
        <button
          style={tabButtonStyle(activeSectionTab === 'all')}
          onClick={() => setActiveSectionTab('all')}
        >
          All Appointments
          <span style={tabBadgeStyle(activeSectionTab === 'all')}>
            {totalAppointmentsCount}
          </span>
        </button>
        <button
          style={tabButtonStyle(activeSectionTab === 'today')}
          onClick={() => setActiveSectionTab('today')}
        >
          Today's Appointments
          <span style={tabBadgeStyle(activeSectionTab === 'today')}>
            {todayAppointments.length}
          </span>
        </button>
        <button
          style={tabButtonStyle(activeSectionTab === 'upcoming')}
          onClick={() => setActiveSectionTab('upcoming')}
        >
          Upcoming Appointments
          <span style={tabBadgeStyle(activeSectionTab === 'upcoming')}>
            {upcomingAppointments.length}
          </span>
        </button>
        <button
          style={tabButtonStyle(activeSectionTab === 'completed')}
          onClick={() => setActiveSectionTab('completed')}
        >
          Completed Appointments
          <span style={tabBadgeStyle(activeSectionTab === 'completed')}>
            {completedAppointments.length}
          </span>
        </button>
      </div>

      {/* ----------------- CONTROLS / FILTERS ----------------- */}
      <div style={controlBarStyle}>
        <div style={inputGroupStyle}>
          <input
            type="text"
            placeholder="Search by title, location, or notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={searchInputStyle}
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={selectStyle}
          >
            <option value="All">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "13px", color: "#747782", fontWeight: "600" }}>Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={selectStyle}
          >
            <option value="dateAsc">Date & Time (Earliest First)</option>
            <option value="dateDesc">Date & Time (Latest First)</option>
            <option value="titleAsc">Title (Alphabetical)</option>
          </select>
        </div>
      </div>

      {/* ----------------- APPOINTMENTS CARDS GRID ----------------- */}
      {filteredAppointments.length === 0 ? (
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "14px",
            border: "1px solid #e2e4e8",
            padding: "48px 24px",
            textAlign: "center",
            color: "#747782"
          }}
        >
          <div style={{ fontSize: "40px", marginBottom: "12px" }}>📅</div>
          <h3 style={{ fontSize: "16px", color: "#2F8196", margin: "0 0 6px 0" }}>No appointments found</h3>
          <p style={{ fontSize: "14px", margin: 0 }}>
            {activeSectionTab !== 'all'
              ? `No entries in the "${activeSectionTab}" tab.`
              : 'Try changing your search query or filters.'}
          </p>
        </div>
      ) : (
        <div style={cardsGridStyle}>
          {filteredAppointments.map((appt) => {
            const isToday = appt.date === todayStr && appt.status !== 'Completed';
            const isCompleted = appt.status === 'Completed';

            return (
              <div
                key={appt.id}
                style={{
                  ...apptCardStyle,
                  borderLeft: isToday
                    ? "4px solid #06A9C9"
                    : isCompleted
                    ? "4px solid #2F8196"
                    : "4px solid #6176AC"
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "12px"
                    }}
                  >
                    <span
                      style={{
                        backgroundColor: "#eaf3f5",
                        color: "#2F8196",
                        padding: "3px 8px",
                        borderRadius: "6px",
                        fontSize: "12px",
                        fontWeight: "600"
                      }}
                    >
                      {appt.category}
                    </span>

                    {isCompleted ? (
                      <span
                        style={{
                          backgroundColor: "#dcfce7",
                          color: "#16a34a",
                          padding: "3px 10px",
                          borderRadius: "20px",
                          fontSize: "12px",
                          fontWeight: "600"
                        }}
                      >
                        ✓ Completed
                      </span>
                    ) : isToday ? (
                      <span
                        style={{
                          backgroundColor: "#e6f8fa",
                          color: "#06A9C9",
                          padding: "3px 10px",
                          borderRadius: "20px",
                          fontSize: "12px",
                          fontWeight: "700"
                        }}
                      >
                        ● Today
                      </span>
                    ) : (
                      <span
                        style={{
                          backgroundColor: "#edf0f8",
                          color: "#6176AC",
                          padding: "3px 10px",
                          borderRadius: "20px",
                          fontSize: "12px",
                          fontWeight: "600"
                        }}
                      >
                        ⏳ Upcoming
                      </span>
                    )}
                  </div>

                  <h3
                    style={{
                      fontSize: "16px",
                      fontWeight: "700",
                      color: "#1e232d",
                      margin: "0 0 10px 0",
                      textDecoration: isCompleted ? "line-through" : "none",
                      opacity: isCompleted ? 0.75 : 1
                    }}
                  >
                    {appt.title}
                  </h3>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      fontSize: "13px",
                      color: "#2F8196",
                      marginBottom: "8px",
                      fontWeight: "500"
                    }}
                  >
                    <div>📅 {formatDisplayDate(appt.date)}</div>
                    <div>⏰ {formatDisplayTime(appt.time)}</div>
                  </div>

                  {appt.location && (
                    <div
                      style={{
                        fontSize: "13px",
                        color: "#747782",
                        marginBottom: "8px",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px"
                      }}
                    >
                      <span>📍</span>
                      <span>{appt.location}</span>
                    </div>
                  )}

                  {appt.notes && (
                    <p
                      style={{
                        fontSize: "12px",
                        color: "#747782",
                        backgroundColor: "#f4f5f7",
                        padding: "8px 10px",
                        borderRadius: "6px",
                        margin: "10px 0 0 0",
                        borderLeft: "2px solid #cbd0d8"
                      }}
                    >
                      {appt.notes}
                    </p>
                  )}
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "18px",
                    paddingTop: "12px",
                    borderTop: "1px solid #f1f3f5"
                  }}
                >
                  <button
                    onClick={() => handleToggleStatus(appt.id)}
                    style={
                      isCompleted
                        ? actionBtnStyle('#d97706', '#fef3c7')
                        : actionBtnStyle('#2F8196', '#eaf3f5')
                    }
                  >
                    {isCompleted ? "Mark Upcoming" : "✓ Mark Done"}
                  </button>

                  <div style={{ display: "flex", gap: "6px" }}>
                    <button
                      onClick={() => handleOpenEditModal(appt)}
                      style={actionBtnStyle('#06A9C9', '#e6f8fa')}
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => setDeleteConfirmId(appt.id)}
                      style={actionBtnStyle('#dc2626', '#fee2e2')}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ----------------- ADD / EDIT MODAL ----------------- */}
      {showModal && (
        <div style={modalBackdropStyle}>
          <div style={modalBoxStyle}>
            <div style={modalHeaderStyle}>
              <h2 style={{ fontSize: "18px", fontWeight: "700", margin: 0, color: "#1e232d" }}>
                {editingApptId ? 'Edit Appointment' : 'Add New Appointment'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                style={{ background: "none", border: "none", fontSize: "18px", cursor: "pointer", color: "#747782" }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveAppointment} style={modalBodyStyle}>
              <div style={formGroupStyle}>
                <label style={labelStyle}>Appointment Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g. Doctor Consultation, Bank KYC"
                  style={inputStyle}
                />
                {formErrors.title && <div style={errorTextStyle}>{formErrors.title}</div>}
              </div>

              <div style={formGroupStyle}>
                <label style={labelStyle}>Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  style={inputStyle}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div style={{ display: "flex", gap: "12px", marginBottom: "18px" }}>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Date *</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    style={inputStyle}
                  />
                  {formErrors.date && <div style={errorTextStyle}>{formErrors.date}</div>}
                </div>

                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Time *</label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    style={inputStyle}
                  />
                  {formErrors.time && <div style={errorTextStyle}>{formErrors.time}</div>}
                </div>
              </div>

              <div style={formGroupStyle}>
                <label style={labelStyle}>Location / Venue</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="e.g. Apollo Hospital, Room 102"
                  style={inputStyle}
                />
              </div>

              <div style={formGroupStyle}>
                <label style={labelStyle}>Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  style={inputStyle}
                >
                  <option value="Upcoming">Upcoming</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div style={formGroupStyle}>
                <label style={labelStyle}>Notes (Optional)</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="e.g. Doctor's previous prescription, documents required..."
                  rows="2"
                  style={{ ...inputStyle, resize: "vertical" }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "24px" }}>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  style={{
                    backgroundColor: "#f4f5f7",
                    color: "#747782",
                    border: "none",
                    padding: "10px 18px",
                    borderRadius: "8px",
                    fontWeight: "600",
                    cursor: "pointer"
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    backgroundColor: "#06A9C9",
                    color: "#ffffff",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "8px",
                    fontWeight: "600",
                    cursor: "pointer",
                    boxShadow: "0 2px 6px rgba(6, 169, 201, 0.25)"
                  }}
                >
                  {editingApptId ? 'Save Changes' : 'Add Appointment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ----------------- DELETE CONFIRMATION MODAL ----------------- */}
      {deleteConfirmId && (
        <div style={modalBackdropStyle}>
          <div style={{ ...modalBoxStyle, maxWidth: "400px", padding: "24px", textAlign: "center" }}>
            <div style={{ fontSize: "36px", marginBottom: "12px" }}>🗑️</div>
            <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#1e232d", margin: "0 0 8px 0" }}>
              Delete Appointment?
            </h3>
            <p style={{ fontSize: "14px", color: "#747782", margin: "0 0 20px 0" }}>
              Are you sure you want to remove this appointment?
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "12px" }}>
              <button
                onClick={() => setDeleteConfirmId(null)}
                style={{
                  backgroundColor: "#f4f5f7",
                  color: "#747782",
                  border: "none",
                  padding: "10px 18px",
                  borderRadius: "8px",
                  fontWeight: "600",
                  cursor: "pointer"
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteAppointment(deleteConfirmId)}
                style={{
                  backgroundColor: "#dc2626",
                  color: "#ffffff",
                  border: "none",
                  padding: "10px 18px",
                  borderRadius: "8px",
                  fontWeight: "600",
                  cursor: "pointer"
                }}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Appointments;
