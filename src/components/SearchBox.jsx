import React from 'react';

export default function SearchBox({ value, onChange, placeholder = "Search..." }) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={{
        width: '100%',
        maxWidth: '480px',
        height: '48px',
        padding: '0 20px',
        borderRadius: '9999px',
        border: '1px solid #E5E3DA',
        backgroundColor: '#FFFFFF',
        outline: 'none',
        fontSize: '0.9rem',
        color: '#222222',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.02)',
        boxSizing: 'border-box'
      }}
    />
  );
}
