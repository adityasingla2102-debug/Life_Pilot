import React, { useState } from 'react';
import BillCard from './BillCard.jsx';

// ==========================================================
// BILLS MODULE COMPONENT (PERSON 3 — PART 2: ADD BILL FORM)
// ==========================================================
// Technology: 100% Pure React JSX + Inline Styles
// Focus: Simple Controlled "Add Bill" Form with Validation
// ==========================================================

function Bills() {
  // --------------------------------------------------------
  // 1. STATE (Initial bills array)
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
    }
  ]);

  // State to control form visibility
  const [showForm, setShowForm] = useState(false);

  // State for error message
  const [errorMessage, setErrorMessage] = useState("");

  // Controlled component state for the new bill form
  const [newBill, setNewBill] = useState({
    name: "",
    category: "",
    amount: "",
    dueDate: "",
    status: "Pending",
    recurring: false,
    notes: ""
  });

  // --------------------------------------------------------
  // 2. FORM CHANGE HANDLER (Simple controlled input handler)
  // --------------------------------------------------------
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewBill({
      ...newBill,
      [name]: type === "checkbox" ? checked : value
    });
  };

  // --------------------------------------------------------
  // 3. FORM SUBMIT HANDLER (Validation + Add Bill + Reset)
  // --------------------------------------------------------
  const handleSubmit = (e) => {
    // 1. Prevent default page reload
    e.preventDefault();

    // 2. Check basic validation
    if (!newBill.name.trim()) {
      setErrorMessage("Bill name cannot be empty.");
      return;
    }

    if (!newBill.amount || Number(newBill.amount) <= 0) {
      setErrorMessage("Amount must be greater than 0.");
      return;
    }

    if (!newBill.dueDate) {
      setErrorMessage("Due date is required.");
      return;
    }

    // 3. Create a new bill object
    const createdBill = {
      id: Date.now(), // Simple unique ID using timestamp
      name: newBill.name.trim(),
      category: newBill.category.trim() || "General",
      amount: Number(newBill.amount),
      dueDate: newBill.dueDate,
      status: newBill.status || "Pending",
      recurring: Boolean(newBill.recurring),
      notes: newBill.notes.trim()
    };

    // 4. Add new bill to bills array
    setBills([...bills, createdBill]);

    // 5. Clear error message & reset form fields
    setErrorMessage("");
    setNewBill({
      name: "",
      category: "",
      amount: "",
      dueDate: "",
      status: "Pending",
      recurring: false,
      notes: ""
    });

    // 6. Close the form
    setShowForm(false);
  };

  // --------------------------------------------------------
  // 4. INLINE STYLES (Pure React CSS-in-JS)
  // --------------------------------------------------------
  const pageContainerStyle = {
    padding: "32px 36px",
    backgroundColor: "#faf9f5",
    minHeight: "100%",
    fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
    color: "#1e293b"
  };

  const headerRowStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "28px",
    flexWrap: "wrap",
    gap: "16px"
  };

  const titleStyle = {
    fontSize: "28px",
    fontWeight: "800",
    color: "#1e293b",
    margin: 0,
    letterSpacing: "-0.5px"
  };

  const subtitleStyle = {
    fontSize: "14px",
    color: "#64748b",
    margin: "6px 0 0 0"
  };

  const addBtnStyle = {
    backgroundColor: "#f59e0b",
    color: "#ffffff",
    border: "none",
    borderRadius: "10px",
    padding: "12px 22px",
    fontSize: "14px",
    fontWeight: "700",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    boxShadow: "0 2px 8px rgba(245, 158, 11, 0.3)"
  };

  const formCardStyle = {
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    padding: "24px",
    marginBottom: "32px",
    border: "1px solid #edebe4",
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.05)"
  };

  const formTitleStyle = {
    fontSize: "18px",
    fontWeight: "700",
    color: "#0f172a",
    margin: "0 0 16px 0",
    borderBottom: "1px solid #f1f0ea",
    paddingBottom: "12px"
  };

  const labelStyle = {
    display: "block",
    fontSize: "13px",
    fontWeight: "600",
    color: "#334155",
    marginBottom: "6px"
  };

  const inputStyle = {
    width: "100%",
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid #cbd5e1",
    fontSize: "14px",
    boxSizing: "border-box",
    marginBottom: "16px",
    outline: "none",
    backgroundColor: "#ffffff"
  };

  const errorBoxStyle = {
    backgroundColor: "#fef2f2",
    color: "#b91c1c",
    border: "1px solid #fecaca",
    padding: "10px 14px",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: "600",
    marginBottom: "16px"
  };

  const gridRowStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px"
  };

  const billsGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: "20px"
  };

  return (
    <div style={pageContainerStyle}>
      {/* ----------------- 1. PAGE HEADER & ADD BILL BUTTON ----------------- */}
      <div style={headerRowStyle}>
        <div>
          <h1 style={titleStyle}>Bills</h1>
          <p style={subtitleStyle}>Manage and track your upcoming bill payments.</p>
        </div>

        {/* Add Bill Button to toggle form */}
        <button
          style={addBtnStyle}
          onClick={() => {
            setShowForm(!showForm);
            setErrorMessage("");
          }}
        >
          <span style={{ fontSize: "16px", fontWeight: "bold" }}>
            {showForm ? "✕" : "+"}
          </span>
          <span>{showForm ? "Close Form" : "Add Bill"}</span>
        </button>
      </div>

      {/* ----------------- 2. ADD BILL FORM (CONTROLLED COMPONENT) ----------------- */}
      {showForm && (
        <div style={formCardStyle}>
          <h2 style={formTitleStyle}>Add New Bill</h2>

          {/* Validation Error Message */}
          {errorMessage && (
            <div style={errorBoxStyle}>
              ⚠️ {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Bill Name */}
            <div>
              <label style={labelStyle}>Bill Name *</label>
              <input
                type="text"
                name="name"
                placeholder="e.g. Electricity Bill, Wifi, Rent"
                value={newBill.name}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            {/* Category & Amount */}
            <div style={gridRowStyle}>
              <div>
                <label style={labelStyle}>Category</label>
                <input
                  type="text"
                  name="category"
                  placeholder="e.g. Utilities, Housing, Internet"
                  value={newBill.category}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Amount (₹) *</label>
                <input
                  type="number"
                  name="amount"
                  placeholder="e.g. 2500"
                  value={newBill.amount}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </div>
            </div>

            {/* Due Date & Status */}
            <div style={gridRowStyle}>
              <div>
                <label style={labelStyle}>Due Date *</label>
                <input
                  type="date"
                  name="dueDate"
                  value={newBill.dueDate}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Status</label>
                <select
                  name="status"
                  value={newBill.status}
                  onChange={handleChange}
                  style={inputStyle}
                >
                  <option value="Pending">Pending</option>
                  <option value="Paid">Paid</option>
                  <option value="Overdue">Overdue</option>
                </select>
              </div>
            </div>

            {/* Recurring Checkbox */}
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "13px", color: "#334155", fontWeight: "600" }}>
                <input
                  type="checkbox"
                  name="recurring"
                  checked={newBill.recurring}
                  onChange={handleChange}
                />
                <span>This is a recurring bill</span>
              </label>
            </div>

            {/* Notes */}
            <div>
              <label style={labelStyle}>Notes</label>
              <textarea
                name="notes"
                rows="3"
                placeholder="Optional notes or remarks..."
                value={newBill.notes}
                onChange={handleChange}
                style={{ ...inputStyle, resize: "vertical" }}
              />
            </div>

            {/* Form Action Buttons */}
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "10px" }}>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setErrorMessage("");
                }}
                style={{
                  padding: "10px 18px",
                  borderRadius: "8px",
                  border: "1px solid #cbd5e1",
                  backgroundColor: "#ffffff",
                  color: "#475569",
                  fontSize: "13px",
                  fontWeight: "600",
                  cursor: "pointer"
                }}
              >
                Cancel
              </button>

              <button
                type="submit"
                style={{
                  padding: "10px 22px",
                  borderRadius: "8px",
                  border: "none",
                  backgroundColor: "#f59e0b",
                  color: "#ffffff",
                  fontSize: "13px",
                  fontWeight: "700",
                  cursor: "pointer",
                  boxShadow: "0 2px 6px rgba(245, 158, 11, 0.3)"
                }}
              >
                Save Bill
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ----------------- 3. BILLS LIST / GRID ----------------- */}
      <div style={{ marginBottom: "16px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#1e293b", margin: 0 }}>
          Bills List ({bills.length})
        </h2>
      </div>

      <div style={billsGridStyle}>
        {bills.map((bill) => (
          <BillCard key={bill.id} bill={bill} />
        ))}
      </div>
    </div>
  );
}

export default Bills;
