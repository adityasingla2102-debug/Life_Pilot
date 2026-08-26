import React from 'react';


// ==========================================================

function BillCard({ bill, onToggleStatus, onDelete }) {
  const { id, name, category, amount, dueDate, status, recurring, notes } = bill;

  // Format currency for clean presentation (e.g. ₹2,450)
  const formatCurrency = (val) => {
    const num = Number(val) || 0;
    return '₹' + num.toLocaleString('en-IN');
  };

  // Format date to a human-readable string (e.g. "25 Aug 2026")
  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      const monthNames = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ];
      const monthIndex = parseInt(parts[1], 10) - 1;
      return `${parseInt(parts[2], 10)} ${monthNames[monthIndex]} ${parts[0]}`;
    }
    return dateStr;
  };

  // Helper function to return conditional style for status badge
  const getStatusBadgeStyle = (statusVal) => {
    switch (statusVal) {
      case 'Paid':
        return {
          backgroundColor: '#ecfdf5',
          color: '#15803d',
          borderColor: '#bbf7d0',
          dotColor: '#22c55e',
          label: 'Paid'
        };
      case 'Pending':
        return {
          backgroundColor: '#fefce8',
          color: '#a16207',
          borderColor: '#fef08a',
          dotColor: '#eab308',
          label: 'Pending'
        };
      case 'Overdue':
        return {
          backgroundColor: '#fef2f2',
          color: '#b91c1c',
          borderColor: '#fecaca',
          dotColor: '#ef4444',
          label: 'Overdue'
        };
      default:
        return {
          backgroundColor: '#f3f4f6',
          color: '#4b5563',
          borderColor: '#e5e7eb',
          dotColor: '#9ca3af',
          label: statusVal || 'Unknown'
        };
    }
  };

  const statusStyle = getStatusBadgeStyle(status);

  // Card container styling
  const cardStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '22px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.04)',
    border: '1px solid #edebe4',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: '14px',
    position: 'relative'
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '12px'
  };

  const titleStyle = {
    fontSize: '17px',
    fontWeight: '700',
    color: '#1e293b',
    margin: '0 0 6px 0',
    lineHeight: 1.3
  };

  const categoryBadgeStyle = {
    display: 'inline-block',
    fontSize: '12px',
    fontWeight: '500',
    color: '#64748b',
    backgroundColor: '#f8f7f2',
    border: '1px solid #e7e5dc',
    padding: '3px 9px',
    borderRadius: '6px'
  };

  const badgeStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '12px',
    fontWeight: '600',
    padding: '4px 10px',
    borderRadius: '20px',
    backgroundColor: statusStyle.backgroundColor,
    color: statusStyle.color,
    border: `1px solid ${statusStyle.borderColor}`,
    whiteSpace: 'nowrap'
  };

  const amountRowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingTop: '12px',
    borderTop: '1px solid #f4f2eb',
    marginTop: '6px'
  };

  const amountStyle = {
    fontSize: '22px',
    fontWeight: '700',
    color: '#0f172a',
    margin: '4px 0 0 0'
  };

  const dueDateStyle = {
    fontSize: '13px',
    fontWeight: '600',
    color: status === 'Overdue' ? '#dc2626' : '#475569',
    margin: '4px 0 0 0'
  };

  const notesStyle = {
    fontSize: '12px',
    color: '#64748b',
    backgroundColor: '#faf9f5',
    padding: '8px 12px',
    borderRadius: '8px',
    border: '1px dashed #e8e6de',
    lineHeight: 1.4,
    margin: '10px 0 0 0'
  };

  const actionsRowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '12px',
    borderTop: '1px solid #f8f7f2',
    marginTop: '4px',
    gap: '8px'
  };

  const toggleBtnStyle = {
    padding: '6px 14px',
    fontSize: '12px',
    fontWeight: '600',
    borderRadius: '8px',
    border: status === 'Paid' ? '1px solid #d1d5db' : '1px solid #16a34a',
    backgroundColor: status === 'Paid' ? '#f9fafb' : '#16a34a',
    color: status === 'Paid' ? '#4b5563' : '#ffffff',
    cursor: 'pointer'
  };

  const deleteBtnStyle = {
    padding: '6px 12px',
    fontSize: '12px',
    fontWeight: '500',
    borderRadius: '8px',
    border: '1px solid #fee2e2',
    backgroundColor: '#fff5f5',
    color: '#dc2626',
    cursor: 'pointer'
  };

  return (
    <div style={cardStyle}>
      <div>
        {/* Top Header: Bill Name, Category & Status Badge */}
        <div style={headerStyle}>
          <div>
            <h3 style={titleStyle}>{name}</h3>
            <span style={categoryBadgeStyle}>📁 {category}</span>
          </div>

          {/* Conditional Status Badge */}
          <span style={badgeStyle}>
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: statusStyle.dotColor,
                display: 'inline-block'
              }}
            />
            {statusStyle.label}
          </span>
        </div>

        {/* Notes (if available) */}
        {notes && (
          <div style={notesStyle}>
            💬 {notes}
          </div>
        )}
      </div>

      {/* Middle Section: Amount & Due Date */}
      <div>
        <div style={amountRowStyle}>
          <div>
            <span style={{ fontSize: '11px', color: '#94a3b8', display: 'block', textTransform: 'uppercase', fontWeight: '600', letterSpacing: '0.5px' }}>
              Amount Due
            </span>
            <p style={amountStyle}>{formatCurrency(amount)}</p>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '11px', color: '#94a3b8', display: 'block', textTransform: 'uppercase', fontWeight: '600', letterSpacing: '0.5px' }}>
              Due Date
            </span>
            <p style={dueDateStyle}>
              📅 {formatDate(dueDate)}
            </p>
          </div>
        </div>

        {/* Recurring indicator */}
        {recurring && (
          <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: '#854d0e', fontWeight: '500' }}>
            <span>🔄 Recurring Monthly Bill</span>
          </div>
        )}
      </div>

      {/* Bottom Actions Row */}
      {(onToggleStatus || onDelete) && (
        <div style={actionsRowStyle}>
          {onToggleStatus && (
            <button
              onClick={() => onToggleStatus(id)}
              style={toggleBtnStyle}
            >
              {status === 'Paid' ? 'Mark as Pending' : '✓ Mark as Paid'}
            </button>
          )}

          {onDelete && (
            <button
              onClick={() => onDelete(id)}
              style={deleteBtnStyle}
              title="Delete Bill"
            >
              🗑️ Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default BillCard;

