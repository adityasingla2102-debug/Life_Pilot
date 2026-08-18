import React, { useState, useEffect } from 'react';
import StatCard from './StatCard.jsx';

// ==========================================================
// SUBSCRIPTIONS MANAGEMENT COMPONENT (MODULE 3)
// ==========================================================
// Palette:
// Primary: #06A9C9 | Secondary: #2F8196 | Tertiary: #6176AC | Neutral: #747782
// ==========================================================

function Subscriptions() {
  // --------------------------------------------------------
  // 1. STATE MANAGEMENT
  // --------------------------------------------------------
  
  const [subscriptions, setSubscriptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [sortBy, setSortBy] = useState('renewalAsc');

  const [showModal, setShowModal] = useState(false);
  const [editingSubId, setEditingSubId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    category: 'Entertainment',
    price: '',
    billingCycle: 'Monthly',
    nextRenewal: '',
    status: 'Active',
    notes: ''
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

  const formatCurrency = (amount) => {
    const num = Number(amount) || 0;
    return '₹' + Math.round(num).toLocaleString('en-IN');
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

  const getDaysUntilRenewal = (dateString) => {
    if (!dateString) return null;
    const today = new Date(getTodayString());
    const renewal = new Date(dateString);
    const diffTime = renewal - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // --------------------------------------------------------
  // 3. LOCAL STORAGE INITIALIZATION (useEffect)
  // --------------------------------------------------------
  useEffect(() => {
    const savedData = localStorage.getItem('lifeadmin_subscriptions');
    if (savedData) {
      try {
        setSubscriptions(JSON.parse(savedData));
      } catch (e) {
        console.error("Failed to parse subscriptions from localStorage", e);
      }
    } else {
      const sampleSubscriptions = [
        {
          id: 1,
          name: "Spotify Premium",
          category: "Music",
          price: 119,
          billingCycle: "Monthly",
          nextRenewal: "2026-09-01",
          status: "Active",
          notes: "Student discount plan"
        },
        {
          id: 2,
          name: "Netflix",
          category: "Entertainment",
          price: 499,
          billingCycle: "Monthly",
          nextRenewal: "2026-08-27",
          status: "Active",
          notes: "Standard HD 2-screen plan"
        },
        {
          id: 3,
          name: "GitHub Copilot",
          category: "Software",
          price: 1000,
          billingCycle: "Yearly",
          nextRenewal: "2026-12-15",
          status: "Active",
          notes: "AI pair programmer"
        },
        {
          id: 4,
          name: "Google One (100GB)",
          category: "Cloud Storage",
          price: 1300,
          billingCycle: "Yearly",
          nextRenewal: "2026-11-20",
          status: "Active",
          notes: "Drive & Photos storage"
        },
        {
          id: 5,
          name: "Cult.fit Gym",
          category: "Fitness",
          price: 1200,
          billingCycle: "Monthly",
          nextRenewal: "2026-08-15",
          status: "Cancelled",
          notes: "Paused for semester exams"
        }
      ];
      setSubscriptions(sampleSubscriptions);
      localStorage.setItem('lifeadmin_subscriptions', JSON.stringify(sampleSubscriptions));
    }
  }, []);

  const saveSubscriptionsToStorage = (updatedSubs) => {
    setSubscriptions(updatedSubs);
    localStorage.setItem('lifeadmin_subscriptions', JSON.stringify(updatedSubs));
  };

  // --------------------------------------------------------
  // 4. FORM HANDLING & VALIDATION
  // --------------------------------------------------------

  const handleOpenAddModal = () => {
    setEditingSubId(null);
    setFormData({
      name: '',
      category: 'Entertainment',
      price: '',
      billingCycle: 'Monthly',
      nextRenewal: getTodayString(),
      status: 'Active',
      notes: ''
    });
    setFormErrors({});
    setShowModal(true);
  };

  const handleOpenEditModal = (sub) => {
    setEditingSubId(sub.id);
    setFormData({
      name: sub.name,
      category: sub.category,
      price: sub.price,
      billingCycle: sub.billingCycle,
      nextRenewal: sub.nextRenewal,
      status: sub.status,
      notes: sub.notes || ''
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
    if (!formData.name.trim()) {
      errors.name = 'Subscription name cannot be empty';
    }
    if (!formData.price || Number(formData.price) <= 0) {
      errors.price = 'Price must be greater than 0';
    }
    if (!formData.nextRenewal) {
      errors.nextRenewal = 'Next renewal date is required';
    }
    return errors;
  };

  const handleSaveSubscription = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    if (editingSubId) {
      const updatedSubs = subscriptions.map((s) => {
        if (s.id === editingSubId) {
          return {
            ...s,
            name: formData.name.trim(),
            category: formData.category,
            price: Number(formData.price),
            billingCycle: formData.billingCycle,
            nextRenewal: formData.nextRenewal,
            status: formData.status,
            notes: formData.notes.trim()
          };
        }
        return s;
      });
      saveSubscriptionsToStorage(updatedSubs);
    } else {
      const newSub = {
        id: Date.now(),
        name: formData.name.trim(),
        category: formData.category,
        price: Number(formData.price),
        billingCycle: formData.billingCycle,
        nextRenewal: formData.nextRenewal,
        status: formData.status,
        notes: formData.notes.trim()
      };
      const updatedSubs = [newSub, ...subscriptions];
      saveSubscriptionsToStorage(updatedSubs);
    }

    setShowModal(false);
  };

  // --------------------------------------------------------
  // 5. CRUD ACTION HANDLERS
  // --------------------------------------------------------

  const handleDeleteSubscription = (id) => {
    const updatedSubs = subscriptions.filter((s) => s.id !== id);
    saveSubscriptionsToStorage(updatedSubs);
    setDeleteConfirmId(null);
  };

  const handleToggleStatus = (id) => {
    const updatedSubs = subscriptions.map((s) => {
      if (s.id === id) {
        return {
          ...s,
          status: s.status === 'Active' ? 'Cancelled' : 'Active'
        };
      }
      return b = s;
    });
    saveSubscriptionsToStorage(updatedSubs);
  };

  // --------------------------------------------------------
  // 6. DASHBOARD CALCULATIONS
  // --------------------------------------------------------
  const totalSubscriptionsCount = subscriptions.length;
  const activeSubs = subscriptions.filter((s) => s.status === 'Active');
  const activeSubscriptionsCount = activeSubs.length;

  // Monthly Normalized Cost
  const totalMonthlyCost = activeSubs.reduce((sum, s) => {
    if (s.billingCycle === 'Monthly') {
      return sum + Number(s.price);
    } else {
      return sum + (Number(s.price) / 12);
    }
  }, 0);

  // Yearly Estimated Cost
  const totalYearlyCost = activeSubs.reduce((sum, s) => {
    if (s.billingCycle === 'Monthly') {
      return sum + (Number(s.price) * 12);
    } else {
      return sum + Number(s.price);
    }
  }, 0);

  // Renewals in next 14 days
  const upcomingRenewalsCount = activeSubs.filter((s) => {
    const days = getDaysUntilRenewal(s.nextRenewal);
    return days !== null && days >= 0 && days <= 14;
  }).length;

  // --------------------------------------------------------
  // 7. SEARCH, FILTER & SORT LOGIC
  // --------------------------------------------------------
  const filteredSubscriptions = subscriptions
    .filter((sub) => {
      const matchesSearch =
        sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (sub.notes && sub.notes.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory =
        selectedCategory === 'All' || sub.category === selectedCategory;

      const matchesStatus =
        selectedStatus === 'All' || sub.status === selectedStatus;

      return matchesSearch && matchesCategory && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'renewalAsc') {
        return a.nextRenewal.localeCompare(b.nextRenewal);
      } else if (sortBy === 'renewalDesc') {
        return b.nextRenewal.localeCompare(a.nextRenewal);
      } else if (sortBy === 'priceDesc') {
        return b.price - a.price;
      } else if (sortBy === 'priceAsc') {
        return a.price - b.price;
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

  const tableContainerStyle = {
    backgroundColor: "#ffffff",
    borderRadius: "14px",
    border: "1px solid #e2e4e8",
    boxShadow: "0 2px 8px rgba(47, 129, 150, 0.05)",
    overflowX: "auto"
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "left",
    fontSize: "14px"
  };

  const thStyle = {
    backgroundColor: "#f4f5f7",
    color: "#2F8196",
    fontWeight: "700",
    padding: "14px 18px",
    borderBottom: "1px solid #e2e4e8",
    fontSize: "13px",
    textTransform: "uppercase",
    letterSpacing: "0.5px"
  };

  const tdStyle = {
    padding: "16px 18px",
    borderBottom: "1px solid #f1f3f5",
    verticalAlign: "middle"
  };

  const actionBtnStyle = (color, bg) => ({
    backgroundColor: bg,
    color: color,
    border: "none",
    borderRadius: "8px",
    padding: "6px 10px",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
    marginRight: "6px"
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
    'Entertainment',
    'Music',
    'Software',
    'Fitness',
    'Education',
    'Cloud Storage',
    'Other'
  ];

  return (
    <div style={containerStyle}>
      {/* ----------------- PAGE HEADER ----------------- */}
      <div style={headerRowStyle}>
        <div>
          <h1 style={pageTitleStyle}>Subscriptions Management</h1>
          <p style={pageSubtitleStyle}>
            Track active memberships, monthly burn rate, yearly estimates, and upcoming renewals
          </p>
        </div>
        <button style={primaryButtonStyle} onClick={handleOpenAddModal}>
          <span>+ Add Subscription</span>
        </button>
      </div>

      {/* ----------------- STATS CARDS (NEW PALETTE) ----------------- */}
      <div style={statsGridStyle}>
        <StatCard
          title="Total Subscriptions"
          value={totalSubscriptionsCount}
          subtitle="All saved services"
          icon="📦"
          color="#06A9C9"
          bgColor="#e6f8fa"
        />
        <StatCard
          title="Active Subscriptions"
          value={activeSubscriptionsCount}
          subtitle={`${totalSubscriptionsCount - activeSubscriptionsCount} cancelled`}
          icon="⚡"
          color="#2F8196"
          bgColor="#eaf3f5"
        />
        <StatCard
          title="Monthly Cost"
          value={formatCurrency(totalMonthlyCost)}
          subtitle="Active monthly burn"
          icon="📅"
          color="#6176AC"
          bgColor="#edf0f8"
          badge="Normalized"
        />
        <StatCard
          title="Yearly Estimated"
          value={formatCurrency(totalYearlyCost)}
          subtitle="Annualized expenditure"
          icon="💰"
          color="#2F8196"
          bgColor="#eaf3f5"
        />
        <StatCard
          title="Upcoming Renewals"
          value={upcomingRenewalsCount}
          subtitle="In next 14 days"
          icon="🔔"
          color="#06A9C9"
          bgColor="#e6f8fa"
          badge={upcomingRenewalsCount > 0 ? "Soon" : "No Due"}
        />
      </div>

      {/* ----------------- CONTROLS / FILTERS ----------------- */}
      <div style={controlBarStyle}>
        <div style={inputGroupStyle}>
          <input
            type="text"
            placeholder="Search subscriptions by name or notes..."
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

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            style={selectStyle}
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active Only</option>
            <option value="Cancelled">Cancelled Only</option>
          </select>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "13px", color: "#747782", fontWeight: "600" }}>Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={selectStyle}
          >
            <option value="renewalAsc">Renewal Date (Earliest First)</option>
            <option value="renewalDesc">Renewal Date (Latest First)</option>
            <option value="priceDesc">Price (Highest First)</option>
            <option value="priceAsc">Price (Lowest First)</option>
          </select>
        </div>
      </div>

      {/* ----------------- SUBSCRIPTIONS TABLE ----------------- */}
      <div style={tableContainerStyle}>
        {filteredSubscriptions.length === 0 ? (
          <div style={{ padding: "48px 24px", textAlign: "center", color: "#747782" }}>
            <div style={{ fontSize: "40px", marginBottom: "12px" }}>🔍</div>
            <h3 style={{ fontSize: "16px", color: "#2F8196", margin: "0 0 6px 0" }}>No subscriptions found</h3>
            <p style={{ fontSize: "14px", margin: 0 }}>
              Try adjusting your search keywords or filters.
            </p>
          </div>
        ) : (
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Service Name</th>
                <th style={thStyle}>Category</th>
                <th style={thStyle}>Price & Cycle</th>
                <th style={thStyle}>Monthly Equivalent</th>
                <th style={thStyle}>Next Renewal</th>
                <th style={thStyle}>Status</th>
                <th style={{ ...thStyle, textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubscriptions.map((sub) => {
                const daysUntil = getDaysUntilRenewal(sub.nextRenewal);
                const isRenewingSoon = sub.status === 'Active' && daysUntil !== null && daysUntil >= 0 && daysUntil <= 7;
                const monthlyEq = sub.billingCycle === 'Monthly' ? sub.price : (sub.price / 12);

                return (
                  <tr key={sub.id} style={{ backgroundColor: "#ffffff" }}>
                    <td style={tdStyle}>
                      <div style={{ fontWeight: "600", color: "#1e232d" }}>{sub.name}</div>
                      {sub.notes && (
                        <div style={{ fontSize: "12px", color: "#747782", marginTop: "2px" }}>
                          {sub.notes}
                        </div>
                      )}
                    </td>

                    <td style={tdStyle}>
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
                        {sub.category}
                      </span>
                    </td>

                    <td style={tdStyle}>
                      <div style={{ fontWeight: "700", color: "#1e232d" }}>
                        {formatCurrency(sub.price)}
                        <span style={{ fontSize: "12px", fontWeight: "normal", color: "#747782" }}>
                          /{sub.billingCycle === 'Monthly' ? 'mo' : 'yr'}
                        </span>
                      </div>
                    </td>

                    <td style={tdStyle}>
                      <span style={{ color: "#6176AC", fontWeight: "600" }}>
                        {formatCurrency(monthlyEq)}/mo
                      </span>
                    </td>

                    <td style={tdStyle}>
                      <div style={{ color: isRenewingSoon ? "#06A9C9" : "#2F8196", fontWeight: isRenewingSoon ? "700" : "500" }}>
                        {formatDisplayDate(sub.nextRenewal)}
                      </div>
                      {isRenewingSoon && (
                        <span style={{ fontSize: "11px", color: "#06A9C9", fontWeight: "600" }}>
                          (In {daysUntil} {daysUntil === 1 ? 'day' : 'days'})
                        </span>
                      )}
                    </td>

                    <td style={tdStyle}>
                      {sub.status === 'Active' ? (
                        <span
                          style={{
                            backgroundColor: "#eaf3f5",
                            color: "#2F8196",
                            padding: "4px 10px",
                            borderRadius: "20px",
                            fontSize: "12px",
                            fontWeight: "600"
                          }}
                        >
                          ● Active
                        </span>
                      ) : (
                        <span
                          style={{
                            backgroundColor: "#f4f5f7",
                            color: "#747782",
                            padding: "4px 10px",
                            borderRadius: "20px",
                            fontSize: "12px",
                            fontWeight: "600"
                          }}
                        >
                          ○ Cancelled
                        </span>
                      )}
                    </td>

                    <td style={{ ...tdStyle, textAlign: "right", whiteSpace: "nowrap" }}>
                      <button
                        onClick={() => handleToggleStatus(sub.id)}
                        style={
                          sub.status === 'Active'
                            ? actionBtnStyle('#747782', '#f4f5f7')
                            : actionBtnStyle('#2F8196', '#eaf3f5')
                        }
                        title={sub.status === 'Active' ? "Cancel subscription" : "Reactivate subscription"}
                      >
                        {sub.status === 'Active' ? "Cancel" : "Reactivate"}
                      </button>

                      <button
                        onClick={() => handleOpenEditModal(sub)}
                        style={actionBtnStyle('#06A9C9', '#e6f8fa')}
                        title="Edit subscription"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => setDeleteConfirmId(sub.id)}
                        style={actionBtnStyle('#dc2626', '#fee2e2')}
                        title="Delete subscription"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* ----------------- ADD / EDIT MODAL ----------------- */}
      {showModal && (
        <div style={modalBackdropStyle}>
          <div style={modalBoxStyle}>
            <div style={modalHeaderStyle}>
              <h2 style={{ fontSize: "18px", fontWeight: "700", margin: 0, color: "#1e232d" }}>
                {editingSubId ? 'Edit Subscription' : 'Add New Subscription'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                style={{ background: "none", border: "none", fontSize: "18px", cursor: "pointer", color: "#747782" }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveSubscription} style={modalBodyStyle}>
              <div style={formGroupStyle}>
                <label style={labelStyle}>Subscription Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Netflix, Spotify, Amazon Prime"
                  style={inputStyle}
                />
                {formErrors.name && <div style={errorTextStyle}>{formErrors.name}</div>}
              </div>

              <div style={{ display: "flex", gap: "12px", marginBottom: "18px" }}>
                <div style={{ flex: 1 }}>
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

                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Billing Cycle</label>
                  <select
                    name="billingCycle"
                    value={formData.billingCycle}
                    onChange={handleInputChange}
                    style={inputStyle}
                  >
                    <option value="Monthly">Monthly</option>
                    <option value="Yearly">Yearly</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "flex", gap: "12px", marginBottom: "18px" }}>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>
                    Price ({formData.billingCycle === 'Monthly' ? '₹ / Month' : '₹ / Year'}) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="e.g. 199"
                    min="1"
                    style={inputStyle}
                  />
                  {formErrors.price && <div style={errorTextStyle}>{formErrors.price}</div>}
                </div>

                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Next Renewal Date *</label>
                  <input
                    type="date"
                    name="nextRenewal"
                    value={formData.nextRenewal}
                    onChange={handleInputChange}
                    style={inputStyle}
                  />
                  {formErrors.nextRenewal && <div style={errorTextStyle}>{formErrors.nextRenewal}</div>}
                </div>
              </div>

              <div style={formGroupStyle}>
                <label style={labelStyle}>Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  style={inputStyle}
                >
                  <option value="Active">Active</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div style={formGroupStyle}>
                <label style={labelStyle}>Notes (Optional)</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="e.g. Student plan, shared with family..."
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
                  {editingSubId ? 'Save Changes' : 'Add Subscription'}
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
              Delete Subscription?
            </h3>
            <p style={{ fontSize: "14px", color: "#747782", margin: "0 0 20px 0" }}>
              Are you sure you want to remove this subscription from tracking?
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
                onClick={() => handleDeleteSubscription(deleteConfirmId)}
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

export default Subscriptions;
