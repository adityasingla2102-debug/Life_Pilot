import React, { useState } from 'react';

function App() {
  // ==========================================
  // 1. STATE MANAGEMENT
  // ==========================================
  
  // Bills data state
  const [bills, setBills] = useState([
    {
      id: 1,
      name: "Electricity Bill",
      category: "Utilities",
      amount: 2450,
      dueDate: "2026-08-25",
      status: "Pending"
    },
    {
      id: 2,
      name: "Fiber Broadband",
      category: "Internet",
      amount: 999,
      dueDate: "2026-08-10",
      status: "Paid"
    },
    {
      id: 3,
      name: "House Rent",
      category: "Housing",
      amount: 12000,
      dueDate: "2026-08-01",
      status: "Overdue"
    }
  ]);

  // Form handling states
  const [editingBillId, setEditingBillId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    amount: "",
    dueDate: "",
    status: "Pending"
  });

  // UI state for hover effects
  const [hoveredCardId, setHoveredCardId] = useState(null);
  const [hoveredBtnId, setHoveredBtnId] = useState(null);

  // Active view state
  const [activeView, setActiveView] = useState("Bills");

  // Subscriptions data state
  const [subscriptions, setSubscriptions] = useState([
    {
      id: 1,
      name: "Spotify",
      category: "Music",
      price: 119,
      billingCycle: "Monthly",
      nextRenewal: "2026-09-01",
      status: "Active",
      notes: "Premium plan"
    },
    {
      id: 2,
      name: "Netflix",
      category: "Entertainment",
      price: 499,
      billingCycle: "Monthly",
      nextRenewal: "2026-08-25",
      status: "Active",
      notes: "Standard plan"
    },
    {
      id: 3,
      name: "Adobe Creative Cloud",
      category: "Software",
      price: 4230,
      billingCycle: "Yearly",
      nextRenewal: "2027-01-15",
      status: "Cancelled",
      notes: "Too expensive"
    }
  ]);

  // ==========================================
  // 2. DERIVED DATA (STATISTICS)
  // ==========================================
  const totalBills = bills.length;
  const pendingCount = bills.filter(bill => bill.status === "Pending").length;
  const paidCount = bills.filter(bill => bill.status === "Paid").length;
  const overdueCount = bills.filter(bill => bill.status === "Overdue").length;
  const currentMonthSpending = bills
    .filter(bill => bill.status === "Paid")
    .reduce((sum, bill) => sum + Number(bill.amount), 0);

  // Subscriptions Statistics
  const totalSubscriptions = subscriptions.length;
  const activeSubscriptionsCount = subscriptions.filter(sub => sub.status === "Active").length;
  const monthlySpending = subscriptions
    .filter(sub => sub.status === "Active" && sub.billingCycle === "Monthly")
    .reduce((sum, sub) => sum + Number(sub.price), 0);
  const upcomingRenewalsCount = subscriptions.filter(sub => sub.status === "Active").length;

  // ==========================================
  // 3. CRUD HANDLERS
  // ==========================================
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveBill = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.amount || !formData.dueDate) {
      alert("Please fill out Name, Amount, and Due Date.");
      return;
    }

    if (editingBillId !== null) {
      // UPDATE: Use map() to update the bill with the matching ID
      setBills(
        bills.map((bill) =>
          bill.id === editingBillId
            ? { ...formData, id: editingBillId, amount: Number(formData.amount) }
            : bill
        )
      );
      setEditingBillId(null);
    } else {
      // CREATE: Spread operator to add a new bill
      const newBill = {
        ...formData,
        id: Date.now(),
        amount: Number(formData.amount)
      };
      setBills([...bills, newBill]);
    }

    // Reset form
    setFormData({
      name: "",
      category: "",
      amount: "",
      dueDate: "",
      status: "Pending"
    });
  };

  const handleEditBill = (bill) => {
    setEditingBillId(bill.id);
    setFormData({
      name: bill.name,
      category: bill.category,
      amount: bill.amount,
      dueDate: bill.dueDate,
      status: bill.status
    });
  };

  const handleDeleteBill = (id) => {
    // DELETE: Use filter() to keep all bills EXCEPT the one being deleted
    setBills(bills.filter((bill) => bill.id !== id));
  };

  const handleCancelEdit = () => {
    setEditingBillId(null);
    setFormData({
      name: "",
      category: "",
      amount: "",
      dueDate: "",
      status: "Pending"
    });
  };

  // ==========================================
  // 4. INLINE STYLES (UI REDESIGN)
  // ==========================================
  
  const colors = {
    bgCream: "#F7F5EF",
    cardWhite: "#FFFFFF",
    textMain: "#1F2937",
    textMuted: "#6B7280",
    primary: "#111827",
    border: "#E5E7EB",
    paidBg: "#D1FAE5", paidText: "#065F46",
    pendingBg: "#FEF3C7", pendingText: "#92400E",
    overdueBg: "#FEE2E2", overdueText: "#991B1B",
    btnEdit: "#F3F4F6", btnEditHover: "#E5E7EB",
    btnDelete: "#FEE2E2", btnDeleteHover: "#FECACA"
  };

  const layoutStyle = {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: colors.bgCream,
    fontFamily: "'Inter', -apple-system, sans-serif",
    color: colors.textMain
  };

  const sidebarStyle = {
    width: "260px",
    backgroundColor: colors.cardWhite,
    borderRight: `1px solid ${colors.border}`,
    padding: "30px",
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  };

  const navItemStyle = (isActive) => ({
    padding: "12px 16px",
    borderRadius: "12px",
    backgroundColor: isActive ? colors.primary : "transparent",
    color: isActive ? "#FFF" : colors.textMuted,
    fontWeight: isActive ? "600" : "500",
    cursor: "pointer"
  });

  const mainContentStyle = {
    flex: 1,
    padding: "40px 50px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "30px"
  };

  const cardBaseStyle = {
    backgroundColor: colors.cardWhite,
    borderRadius: "24px",
    padding: "24px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.03)",
    border: `1px solid ${colors.border}`,
    transition: "box-shadow 0.3s ease, transform 0.3s ease"
  };

  const statCardStyle = {
    ...cardBaseStyle,
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  };
  
  const getBadgeStyle = (status) => {
    let bg, color;
    if (status === "Paid") { bg = colors.paidBg; color = colors.paidText; }
    else if (status === "Pending") { bg = colors.pendingBg; color = colors.pendingText; }
    else { bg = colors.overdueBg; color = colors.overdueText; }
    
    return {
      backgroundColor: bg,
      color: color,
      padding: "6px 14px",
      borderRadius: "20px",
      fontSize: "12px",
      fontWeight: "700",
      display: "inline-block"
    };
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    borderRadius: "12px",
    border: `1px solid ${colors.border}`,
    fontSize: "14px",
    boxSizing: "border-box",
    backgroundColor: colors.bgCream,
    outline: "none",
    marginBottom: "16px"
  };

  const labelStyle = {
    display: "block",
    fontSize: "13px",
    fontWeight: "600",
    color: colors.textMuted,
    marginBottom: "6px"
  };

  return (
    <div style={layoutStyle}>
      {/* ---------------- SIDEBAR ---------------- */}
      <div style={sidebarStyle}>
        <div style={{ fontSize: "24px", fontWeight: "800", marginBottom: "40px", display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{width: "32px", height: "32px", backgroundColor: colors.primary, borderRadius: "8px"}}></div>
          LifeAdmin
        </div>
        <div style={navItemStyle(activeView === "Dashboard")} onClick={() => setActiveView("Dashboard")}>Dashboard</div>
        <div style={navItemStyle(activeView === "Bills")} onClick={() => setActiveView("Bills")}>Bills</div>
        <div style={navItemStyle(activeView === "Subscriptions")} onClick={() => setActiveView("Subscriptions")}>Subscriptions</div>
        <div style={navItemStyle(activeView === "Appointments")} onClick={() => setActiveView("Appointments")}>Appointments</div>
        <div style={navItemStyle(activeView === "Documents")} onClick={() => setActiveView("Documents")}>Documents</div>
        <div style={{marginTop: "auto", ...navItemStyle(activeView === "Settings")}} onClick={() => setActiveView("Settings")}>Settings</div>
      </div>

      {/* ---------------- MAIN CONTENT ---------------- */}
      <div style={mainContentStyle}>
        {activeView === "Bills" && (
          <>
        {/* Top Welcome Section */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <h1 style={{ fontSize: "32px", fontWeight: "700", margin: "0 0 8px 0" }}>Bills Dashboard</h1>
            <p style={{ color: colors.textMuted, margin: 0 }}>Manage your finances and track due dates.</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ color: colors.textMuted, margin: "0 0 4px 0", fontSize: "14px", fontWeight: "600" }}>Current Month Spending</p>
            <div style={{ fontSize: "28px", fontWeight: "800" }}>₹{currentMonthSpending.toLocaleString()}</div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div style={{ display: "flex", gap: "20px" }}>
          <div style={statCardStyle}>
            <div style={{ color: colors.textMuted, fontSize: "14px", fontWeight: "600", marginBottom: "8px" }}>Total Bills</div>
            <div style={{ fontSize: "36px", fontWeight: "800" }}>{totalBills}</div>
          </div>
          <div style={statCardStyle}>
            <div style={{ color: colors.pendingText, fontSize: "14px", fontWeight: "600", marginBottom: "8px" }}>Pending</div>
            <div style={{ fontSize: "36px", fontWeight: "800" }}>{pendingCount}</div>
          </div>
          <div style={statCardStyle}>
            <div style={{ color: colors.paidText, fontSize: "14px", fontWeight: "600", marginBottom: "8px" }}>Paid</div>
            <div style={{ fontSize: "36px", fontWeight: "800" }}>{paidCount}</div>
          </div>
          <div style={statCardStyle}>
            <div style={{ color: colors.overdueText, fontSize: "14px", fontWeight: "600", marginBottom: "8px" }}>Overdue</div>
            <div style={{ fontSize: "36px", fontWeight: "800" }}>{overdueCount}</div>
          </div>
        </div>

        {/* Two Column Layout for List and Form */}
        <div style={{ display: "flex", gap: "30px", alignItems: "flex-start" }}>
          
          {/* Bills List Section */}
          <div style={{ flex: 2, display: "flex", flexDirection: "column", gap: "16px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "700", margin: "0" }}>Your Bills</h2>
            
            {bills.length === 0 ? (
              <p style={{ color: colors.textMuted }}>No bills added yet.</p>
            ) : (
              bills.map((bill) => (
                <div 
                  key={bill.id} 
                  onMouseEnter={() => setHoveredCardId(bill.id)}
                  onMouseLeave={() => setHoveredCardId(null)}
                  style={{
                    ...cardBaseStyle,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "20px 24px",
                    boxShadow: hoveredCardId === bill.id ? "0 12px 30px rgba(0,0,0,0.06)" : cardBaseStyle.boxShadow,
                    transform: hoveredCardId === bill.id ? "translateY(-2px)" : "none"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                    <div style={{ width: "48px", height: "48px", borderRadius: "14px", backgroundColor: colors.bgCream, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" }}>📄</div>
                    <div>
                      <div style={{ fontSize: "16px", fontWeight: "700", marginBottom: "4px" }}>{bill.name}</div>
                      <div style={{ fontSize: "13px", color: colors.textMuted }}>{bill.category} • Due: {bill.dueDate}</div>
                    </div>
                  </div>
                  
                  <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
                    <div style={{ fontSize: "18px", fontWeight: "700" }}>₹{bill.amount.toLocaleString()}</div>
                    <div style={getBadgeStyle(bill.status)}>{bill.status}</div>
                    
                    {/* Action Buttons */}
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button 
                        onClick={() => handleEditBill(bill)}
                        onMouseEnter={() => setHoveredBtnId(`edit-${bill.id}`)}
                        onMouseLeave={() => setHoveredBtnId(null)}
                        style={{
                          backgroundColor: hoveredBtnId === `edit-${bill.id}` ? colors.btnEditHover : colors.btnEdit,
                          color: colors.textMain,
                          border: "none",
                          padding: "8px 16px",
                          borderRadius: "20px",
                          fontSize: "13px",
                          fontWeight: "600",
                          cursor: "pointer",
                          transition: "background 0.2s"
                        }}
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteBill(bill.id)}
                        onMouseEnter={() => setHoveredBtnId(`del-${bill.id}`)}
                        onMouseLeave={() => setHoveredBtnId(null)}
                        style={{
                          backgroundColor: hoveredBtnId === `del-${bill.id}` ? colors.btnDeleteHover : colors.btnDelete,
                          color: colors.overdueText,
                          border: "none",
                          padding: "8px 16px",
                          borderRadius: "20px",
                          fontSize: "13px",
                          fontWeight: "600",
                          cursor: "pointer",
                          transition: "background 0.2s"
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Add/Edit Bill Form Section */}
          <div style={{ flex: 1 }}>
            <div style={{ ...cardBaseStyle, position: "sticky", top: "40px" }}>
              <h2 style={{ fontSize: "20px", fontWeight: "700", margin: "0 0 20px 0" }}>{editingBillId ? "Edit Bill" : "Add New Bill"}</h2>
              
              <form onSubmit={handleSaveBill}>
                <div>
                  <label style={labelStyle}>Bill Name</label>
                  <input 
                    type="text" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleInputChange}
                    placeholder="e.g., Electricity"
                    style={inputStyle} 
                    required 
                  />
                </div>
                
                <div>
                  <label style={labelStyle}>Category</label>
                  <input 
                    type="text" 
                    name="category" 
                    value={formData.category} 
                    onChange={handleInputChange}
                    placeholder="e.g., Utilities"
                    style={inputStyle} 
                  />
                </div>

                <div>
                  <label style={labelStyle}>Amount (₹)</label>
                  <input 
                    type="number" 
                    name="amount" 
                    value={formData.amount} 
                    onChange={handleInputChange}
                    placeholder="e.g., 2000"
                    style={inputStyle} 
                    required 
                  />
                </div>

                <div>
                  <label style={labelStyle}>Due Date</label>
                  <input 
                    type="date" 
                    name="dueDate" 
                    value={formData.dueDate} 
                    onChange={handleInputChange}
                    style={inputStyle} 
                    required 
                  />
                </div>

                <div>
                  <label style={labelStyle}>Status</label>
                  <select 
                    name="status" 
                    value={formData.status} 
                    onChange={handleInputChange}
                    style={{ ...inputStyle, cursor: "pointer" }}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Paid">Paid</option>
                    <option value="Overdue">Overdue</option>
                  </select>
                </div>

                <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                  <button 
                    type="submit" 
                    style={{
                      flex: 1,
                      backgroundColor: colors.primary,
                      color: "#FFF",
                      border: "none",
                      padding: "14px",
                      borderRadius: "20px",
                      fontSize: "14px",
                      fontWeight: "700",
                      cursor: "pointer",
                      boxShadow: "0 4px 12px rgba(17,24,39,0.2)"
                    }}
                  >
                    {editingBillId ? "Update Bill" : "Save Bill"}
                  </button>
                  
                  {editingBillId && (
                    <button 
                      type="button" 
                      onClick={handleCancelEdit}
                      style={{
                        backgroundColor: colors.btnEdit,
                        color: colors.textMain,
                        border: "none",
                        padding: "14px 20px",
                        borderRadius: "20px",
                        fontSize: "14px",
                        fontWeight: "600",
                        cursor: "pointer"
                      }}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
          
        </div>
          </>
        )}

        {activeView === "Subscriptions" && (
          <>
            {/* Top Welcome Section */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
              <div>
                <h1 style={{ fontSize: "32px", fontWeight: "700", margin: "0 0 8px 0" }}>Subscriptions</h1>
                <p style={{ color: colors.textMuted, margin: 0 }}>Keep track of your recurring expenses.</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <button 
                  style={{
                    backgroundColor: colors.primary,
                    color: "#FFF",
                    border: "none",
                    padding: "14px 24px",
                    borderRadius: "20px",
                    fontSize: "14px",
                    fontWeight: "700",
                    cursor: "pointer",
                    boxShadow: "0 4px 12px rgba(17,24,39,0.2)"
                  }}
                >
                  Add Subscription
                </button>
              </div>
            </div>

            {/* Statistics Cards */}
            <div style={{ display: "flex", gap: "20px" }}>
              <div style={statCardStyle}>
                <div style={{ color: colors.textMuted, fontSize: "14px", fontWeight: "600", marginBottom: "8px" }}>Total Subscriptions</div>
                <div style={{ fontSize: "36px", fontWeight: "800" }}>{totalSubscriptions}</div>
              </div>
              <div style={statCardStyle}>
                <div style={{ color: colors.paidText, fontSize: "14px", fontWeight: "600", marginBottom: "8px" }}>Active Subscriptions</div>
                <div style={{ fontSize: "36px", fontWeight: "800" }}>{activeSubscriptionsCount}</div>
              </div>
              <div style={statCardStyle}>
                <div style={{ color: colors.pendingText, fontSize: "14px", fontWeight: "600", marginBottom: "8px" }}>Monthly Spending</div>
                <div style={{ fontSize: "36px", fontWeight: "800" }}>₹{monthlySpending.toLocaleString()}</div>
              </div>
              <div style={statCardStyle}>
                <div style={{ color: colors.textMuted, fontSize: "14px", fontWeight: "600", marginBottom: "8px" }}>Upcoming Renewals</div>
                <div style={{ fontSize: "36px", fontWeight: "800" }}>{upcomingRenewalsCount}</div>
              </div>
            </div>

            {/* Subscriptions List Section */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <h2 style={{ fontSize: "20px", fontWeight: "700", margin: "0" }}>Your Subscriptions</h2>
              
              {subscriptions.length === 0 ? (
                <p style={{ color: colors.textMuted }}>No subscriptions added yet.</p>
              ) : (
                subscriptions.map((sub) => (
                  <div 
                    key={sub.id} 
                    onMouseEnter={() => setHoveredCardId(`sub-${sub.id}`)}
                    onMouseLeave={() => setHoveredCardId(null)}
                    style={{
                      ...cardBaseStyle,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "20px 24px",
                      boxShadow: hoveredCardId === `sub-${sub.id}` ? "0 12px 30px rgba(0,0,0,0.06)" : cardBaseStyle.boxShadow,
                      transform: hoveredCardId === `sub-${sub.id}` ? "translateY(-2px)" : "none"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                      <div style={{ width: "48px", height: "48px", borderRadius: "14px", backgroundColor: colors.bgCream, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" }}>🔄</div>
                      <div>
                        <div style={{ fontSize: "16px", fontWeight: "700", marginBottom: "4px" }}>{sub.name}</div>
                        <div style={{ fontSize: "13px", color: colors.textMuted }}>{sub.category} • Next Renewal: {sub.nextRenewal}</div>
                      </div>
                    </div>
                    
                    <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: "18px", fontWeight: "700" }}>₹{sub.price.toLocaleString()}</div>
                        <div style={{ fontSize: "13px", color: colors.textMuted }}>{sub.billingCycle}</div>
                      </div>
                      
                      <div style={{
                        backgroundColor: sub.status === "Active" ? colors.paidBg : colors.overdueBg,
                        color: sub.status === "Active" ? colors.paidText : colors.overdueText,
                        padding: "6px 14px",
                        borderRadius: "20px",
                        fontSize: "12px",
                        fontWeight: "700",
                        display: "inline-block"
                      }}>
                        {sub.status}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
