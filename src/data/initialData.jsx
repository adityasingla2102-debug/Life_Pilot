// Sample initial data for Person 2 (Documents, Vehicles, Warranties)

export const INITIAL_DOCUMENTS = [
  {
    id: 1,
    name: "Driving Licence",
    type: "Identity",
    issueDate: "2020-01-10",
    expiryDate: "2026-09-15",
    notes: "Personal driving licence for light motor vehicles"
  }
];

export const INITIAL_VEHICLES = [
  {
    id: 1,
    name: "Honda City",
    vehicleNumber: "KA01AB1234",
    type: "Car",
    purchaseDate: "2022-06-10",
    serviceDate: "2026-08-25",
    insuranceExpiry: "2027-01-10",
    pucExpiry: "2026-09-01"
  }
];

export const INITIAL_WARRANTIES = [
  {
    id: 1,
    productName: "MacBook Air M1 Laptop",
    category: "Electronics",
    purchaseDate: "2024-08-10",
    warrantyExpiry: "2027-08-10",
    seller: "Apple Store",
    notes: "3-year extended warranty plan"
  }
];

// Helper function to calculate expiry status (Valid, Expiring Soon, Expired)
export const getExpiryStatus = (expiryDateStr) => {
  if (!expiryDateStr) return "VALID";
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const expDate = new Date(expiryDateStr);
  expDate.setHours(0, 0, 0, 0);

  if (expDate < today) {
    return "EXPIRED";
  }

  const diffTime = expDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays <= 30) {
    return "EXPIRING SOON";
  }

  return "VALID";
};
