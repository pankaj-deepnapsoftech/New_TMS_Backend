// utils/generateTicketId.js
export function generateTicketId() {
  const prefix = "TKT";  
  const timestamp = Date.now().toString(36).toUpperCase(); // short base36 time
  const random = Math.random().toString(36).substring(2, 6).toUpperCase(); 
  return `${prefix}-${timestamp}-${random}`;
}
