import React, { useState } from 'react';
import BillCard from './BillCard.jsx';

// ==========================================================
// BILLS MODULE COMPONENT (PERSON 3 — EVALUATION 1)
// ==========================================================
// Technology: 100% Pure React JSX + Inline Styles
// Features:
// 1. Header with Title, Subtitle, and "Add Bill" Button
// 2. 4 Summary Metric / Stat Cards (Total, Pending, Paid, Overdue)
// 3. Search & Filter Bar (Search by text + Status Pills)
// 4. Bills Grid rendering BillCard components
// 5. Interactive "Add Bill" Modal Form with full validation
// 6. Interactive Status Toggling (Mark Paid / Pending) & Deletion
// ==========================================================

function Bills() {
  // --------------------------------------------------------
  // 1. STATE MANAGEMENT (Pure React useState)
  // --------------------------------------------------------
  const [bills, setBills] = useState([
    {
      id: 1,
      name: "Electricity Bill",
      category: "Utilities",
      amount: 2450,
      dueDate: "2026-08-25",
      status: "Pending",
      recurring: true,
      notes: "State Electricity Board payment due by month end"
    },
    {
      id: 2,
      name: "Fiber Broadband",
      category: "Internet",
      amount: 999,
      dueDate: "2026-08-10",
      status: "Paid",
      recurring: true,
      notes: "Airtel 200Mbps unlimited high-speed broadband"
    },
    {
      id: 3,
      name: "House Rent",
      category: "Housing",
      amount: 12000,
      dueDate: "2026-08-01",
      status: "Overdue",
      recurring: true,
      notes: "Monthly apartment rent payment to landlord"
    },
    {
      id: 4,
      name: "Piped Gas Connection",
      category: "Utilities",
      amount: 680,
      dueDate: "2026-08-28",
      status: "Pending",
      recurring: true,
      notes: "PNG monthly usage invoice"
    },
    {
      id: 5,
      name: "Mobile Postpaid",
      category: "Telecom",
      amount: 599,
      dueDate: "2026-08-15",
      status: "Paid",
      recurring: true,
      notes: "Jio family postpaid plan"
    }
  ]);

  // UI state for search, filter, and add modal
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State for new bill
  const [newBill, setNewBill] = useState({
    name: '',
    category: 'Utilities',
    amount: '',
    dueDate: '',
    status: 'Pending',
    recurring: false,
    notes: ''
  });

  // --------------------------------------------------------
  // 2. DERIVED STATS & FILTERING
  // --------------------------------------------------------
  const totalBillsCount = bills.length;
  const pendingCount = bills.filter(b => b.status === 'Pending').length;
  const paidCount = bills.filter(b => b.status === 'Paid').length;
  const overdueCount = bills.filter(b => b.status === 'Overdue').length;

  const totalPendingAmount = bills
    .filter(b => b.status === 'Pending' || b.status === 'Overdue')
    .reduce((sum, b) => sum + Number(b.amount || 0), 0);

  // Filter bills by search query and active status tab
  const filteredBills = bills.filter((bill) => {
    const matchesFilter = filterStatus === 'All' || bill.status === filterStatus;
    const matchesSearch =
      bill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bill.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (bill.notes && bill.notes.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  // --------------------------------------------------------
  // 3. ACTION HANDLERS
  // --------------------------------------------------------
  const handleToggleStatus = (id) => {
    setBills(prev =>
      prev.map(bill => {
        if (bill.id === id) {
          const nextStatus = bill.status === 'Paid' ? 'Pending' : 'Paid';
          return { ...bill, status: nextStatus };
        }
        return bill;
      })
    );
  };

  const handleDeleteBill = (id) => {
    if (window.confirm('Are you sure you want to remove this bill?')) {
      setBills(prev => prev.filter(bill => bill.id !== id));
    }
  };

  const handleAddBillSubmit = (e) => {
    e.preventDefault();
    if (!newBill.name.trim() || !newBill.amount || !newBill.dueDate) {
      alert('Please fill in all required fields (Name, Amount, Due Date).');
      return;
    }

    const createdBill = {
      id: Date.now(),
      name: newBill.name.trim(),
      category: newBill.category,
      amount: parseFloat(newBill.amount),
      dueDate: newBill.dueDate,
      status: newBill.status,
      recurring: newBill.recurring,
      notes: newBill.notes.trim()
    };

    setBills([createdBill, ...bills]);
    setNewBill({
      name: '',
      category: 'Utilities',
      amount: '',
      dueDate: '',
      status: 'Pending',
      recurring: false,
      notes: ''
    });
    setShowAddModal(false);
  };

  // Format currency
  const formatCurrency = (val) => {
    return '₹' + Number(val || 0).toLocaleString('en-IN');
  };

  // --------------------------------------------------------
  // 4. INLINE STYLES
  // --------------------------------------------------------
  const pageContainerStyle = {
    padding: '32px 36px',
    backgroundColor: '#faf9f5',
    minHeight: '100%',
    fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
    color: '#1e293b'
  };

  const headerRowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '28px',
    flexWrap: 'wrap',
    gap: '16px'
  };

  const titleStyle = {
    fontSize: '28px',
    fontWeight: '800',
    color: '#1e293b',
    margin: 0,
    letterSpacing: '-0.5px'
  };

  const subtitleStyle = {
    fontSize: '14px',
    color: '#64748b',
    margin: '6px 0 0 0'
  };

  const addBtnStyle = {
    backgroundColor: '#f59e0b',
    color: '#ffffff',
    border: 'none',
    borderRadius: '10px',
    padding: '12px 22px',
    fontSize: '14px',
    fontWeight: '700',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    boxShadow: '0 2px 8px rgba(245, 158, 11, 0.3)',
    transition: 'all 0.15s ease'
  };

  // Stats Grid
  const statsGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
    gap: '16px',
    marginBottom: '32px'
  };

  const statCardStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '14px',
    padding: '20px 22px',
    border: '1px solid #edebe4',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  };

  const statHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px'
  };

  const statLabelStyle = {
    fontSize: '12px',
    fontWeight: '700',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  };

  const statIconStyle = (bg, textColor) => ({
    width: '38px',
    height: '38px',
    borderRadius: '10px',
    backgroundColor: bg,
    color: textColor,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
    fontWeight: 'bold'
  });

  const statValueStyle = {
    fontSize: '26px',
    fontWeight: '800',
    color: '#0f172a',
    margin: 0
  };

  const statSubtextStyle = {
    fontSize: '12px',
    color: '#94a3b8',
    margin: '4px 0 0 0'
  };

  // Toolbar & Filters
  const toolbarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '16px',
    backgroundColor: '#ffffff',
    padding: '16px 20px',
    borderRadius: '14px',
    border: '1px solid #edebe4',
    marginBottom: '24px'
  };

  const filterTabsStyle = {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap'
  };

  const filterTabBtnStyle = (isActive) => ({
    padding: '8px 16px',
    fontSize: '13px',
    fontWeight: isActive ? '700' : '500',
    borderRadius: '8px',
    border: isActive ? '1px solid #f59e0b' : '1px solid #e2e4e8',
    backgroundColor: isActive ? '#fef3c7' : '#ffffff',
    color: isActive ? '#92400e' : '#475569',
    cursor: 'pointer'
  });

  const searchInputStyle = {
    padding: '9px 14px',
    borderRadius: '8px',
    border: '1px solid #d1d5db',
    fontSize: '13px',
    outline: 'none',
    width: '240px',
    backgroundColor: '#faf9f5'
  };

  // Bills Grid
  const billsGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '20px'
  };

  const emptyStateStyle = {
    textAlign: 'center',
    padding: '48px 20px',
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    border: '1px dashed #d1d5db',
    color: '#64748b'
  };

  // Modal Styles
  const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px'
  };

  const modalContainerStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '28px',
    width: '100%',
    maxWidth: '520px',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    maxHeight: '90vh',
    overflowY: 'auto'
  };

  const inputLabelStyle = {
    display: 'block',
    fontSize: '13px',
    fontWeight: '600',
    color: '#334155',
    marginBottom: '6px'
  };

  const formInputStyle = {
    width: '100%',
    padding: '10px 12px',
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
    fontSize: '14px',
    boxSizing: 'border-box',
    marginBottom: '16px',
    outline: 'none'
  };

  return (
    <div style={pageContainerStyle}>
      {/* ----------------- 1. PAGE HEADER & ADD BILL BUTTON ----------------- */}
      <div style={headerRowStyle}>
        <div>
          <h1 style={titleStyle}>Bills Management</h1>
          <p style={subtitleStyle}>Track, organize, and settle your recurring and one-time bills on schedule.</p>
        </div>

        <button
          style={addBtnStyle}
          onClick={() => setShowAddModal(true)}
        >
          <span style={{ fontSize: '16px', fontWeight: 'bold' }}>+</span>
          <span>Add New Bill</span>
        </button>
      </div>

      {/* ----------------- 2. FOUR KPI STAT CARDS ----------------- */}
      <div style={statsGridStyle}>
        {/* Total Bills Card */}
        <div style={statCardStyle}>
          <div style={statHeaderStyle}>
            <span style={statLabelStyle}>Total Bills</span>
            <div style={statIconStyle('#fef3c7', '#d97706')}>📄</div>
          </div>
          <div>
            <h3 style={statValueStyle}>{totalBillsCount}</h3>
            <p style={statSubtextStyle}>All registered bills</p>
          </div>
        </div>

        {/* Pending Card */}
        <div style={statCardStyle}>
          <div style={statHeaderStyle}>
            <span style={statLabelStyle}>Pending</span>
            <div style={statIconStyle('#fefce8', '#ca8a04')}>⏳</div>
          </div>
          <div>
            <h3 style={statValueStyle}>{pendingCount}</h3>
            <p style={statSubtextStyle}>Upcoming due bills</p>
          </div>
        </div>

        {/* Paid Card */}
        <div style={statCardStyle}>
          <div style={statHeaderStyle}>
            <span style={statLabelStyle}>Paid</span>
            <div style={statIconStyle('#ecfdf5', '#16a34a')}>✅</div>
          </div>
          <div>
            <h3 style={statValueStyle}>{paidCount}</h3>
            <p style={statSubtextStyle}>Settled this cycle</p>
          </div>
        </div>

        {/* Overdue Card */}
        <div style={statCardStyle}>
          <div style={statHeaderStyle}>
            <span style={statLabelStyle}>Overdue</span>
            <div style={statIconStyle('#fef2f2', '#dc2626')}>⚠️</div>
          </div>
          <div>
            <h3 style={statValueStyle}>{overdueCount}</h3>
            <p style={statSubtextStyle}>Needs quick attention</p>
          </div>
        </div>
      </div>

      {/* ----------------- 3. SEARCH & STATUS FILTER TOOLBAR ----------------- */}
      <div style={toolbarStyle}>
        {/* Filter Pills */}
        <div style={filterTabsStyle}>
          {['All', 'Pending', 'Paid', 'Overdue'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilterStatus(tab)}
              style={filterTabBtnStyle(filterStatus === tab)}
            >
              {tab === 'All' ? `All (${bills.length})` : tab}
            </button>
          ))}
        </div>

        {/* Search & Pending Summary */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '13px', color: '#64748b' }}>
            Pending Balance: <strong style={{ color: '#0f172a' }}>{formatCurrency(totalPendingAmount)}</strong>
          </span>
          <input
            type="text"
            placeholder="🔍 Search bills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={searchInputStyle}
          />
        </div>
      </div>

      {/* ----------------- 4. BILLS LIST / GRID ----------------- */}
      {filteredBills.length === 0 ? (
        <div style={emptyStateStyle}>
          <div style={{ fontSize: '36px', marginBottom: '10px' }}>🧾</div>
          <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#334155', margin: '0 0 6px 0' }}>No bills found</h3>
          <p style={{ fontSize: '13px', margin: 0 }}>
            {searchTerm || filterStatus !== 'All'
              ? 'Try adjusting your search query or filter criteria.'
              : 'Click "+ Add New Bill" above to add your first bill.'}
          </p>
        </div>
      ) : (
        <div style={billsGridStyle}>
          {filteredBills.map((bill) => (
            <BillCard
              key={bill.id}
              bill={bill}
              onToggleStatus={handleToggleStatus}
              onDelete={handleDeleteBill}
            />
          ))}
        </div>
      )}

      {/* ----------------- 5. ADD BILL MODAL (PURE JSX + INLINE STYLES) ----------------- */}
      {showAddModal && (
        <div style={modalOverlayStyle} onClick={() => setShowAddModal(false)}>
          <div style={modalContainerStyle} onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '700', margin: 0, color: '#0f172a' }}>
                Add New Bill
              </h2>
              <button
                onClick={() => setShowAddModal(false)}
                style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#64748b' }}
              >
                ✕
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleAddBillSubmit}>
              <div>
                <label style={inputLabelStyle}>Bill Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Electricity Bill, Wifi, Gym"
                  value={newBill.name}
                  onChange={(e) => setNewBill({ ...newBill, name: e.target.value })}
                  style={formInputStyle}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={inputLabelStyle}>Category</label>
                  <select
                    value={newBill.category}
                    onChange={(e) => setNewBill({ ...newBill, category: e.target.value })}
                    style={formInputStyle}
                  >
                    <option value="Utilities">Utilities</option>
                    <option value="Internet">Internet</option>
                    <option value="Housing">Housing</option>
                    <option value="Telecom">Telecom</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="Insurance">Insurance</option>
                    <option value="Education">Education</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label style={inputLabelStyle}>Amount (₹) *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    placeholder="e.g. 1500"
                    value={newBill.amount}
                    onChange={(e) => setNewBill({ ...newBill, amount: e.target.value })}
                    style={formInputStyle}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={inputLabelStyle}>Due Date *</label>
                  <input
                    type="date"
                    required
                    value={newBill.dueDate}
                    onChange={(e) => setNewBill({ ...newBill, dueDate: e.target.value })}
                    style={formInputStyle}
                  />
                </div>

                <div>
                  <label style={inputLabelStyle}>Status</label>
                  <select
                    value={newBill.status}
                    onChange={(e) => setNewBill({ ...newBill, status: e.target.value })}
                    style={formInputStyle}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Paid">Paid</option>
                    <option value="Overdue">Overdue</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', color: '#334155' }}>
                  <input
                    type="checkbox"
                    checked={newBill.recurring}
                    onChange={(e) => setNewBill({ ...newBill, recurring: e.target.checked })}
                  />
                  <span>This is a recurring monthly bill</span>
                </label>
              </div>

              <div>
                <label style={inputLabelStyle}>Notes (Optional)</label>
                <textarea
                  rows="3"
                  placeholder="Additional remarks or payment details..."
                  value={newBill.notes}
                  onChange={(e) => setNewBill({ ...newBill, notes: e.target.value })}
                  style={{ ...formInputStyle, resize: 'vertical' }}
                />
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  style={{
                    padding: '10px 18px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    backgroundColor: '#ffffff',
                    color: '#475569',
                    fontSize: '13px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  style={{
                    padding: '10px 22px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: '#f59e0b',
                    color: '#ffffff',
                    fontSize: '13px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    boxShadow: '0 2px 6px rgba(245, 158, 11, 0.3)'
                  }}
                >
                  Add Bill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Bills;
