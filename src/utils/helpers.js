// Utility functions for safe data handling

/**
 * Safely parse a currency amount string to a number
 * @param {string|number} amount - The amount string (e.g., "₹1,234.56")
 * @returns {number} - The parsed number
 */
export const parseCurrency = (amount) => {
  if (typeof amount === 'number') return amount;
  if (!amount) return 0;
  
  const numericAmount = parseFloat(amount.toString().replace(/[₹,]/g, '')) || 0;
  return numericAmount;
};

/**
 * Safely get array length
 * @param {Array} array - The array to check
 * @returns {number} - The length of the array or 0
 */
export const safeArrayLength = (array) => {
  return Array.isArray(array) ? array.length : 0;
};

/**
 * Safely map over an array
 * @param {Array} array - The array to map over
 * @param {Function} callback - The mapping function
 * @returns {Array} - The mapped array or empty array
 */
export const safeMap = (array, callback) => {
  return Array.isArray(array) ? array.map(callback) : [];
};

/**
 * Safely reduce an array
 * @param {Array} array - The array to reduce
 * @param {Function} callback - The reduction function
 * @param {*} initialValue - The initial value
 * @returns {*} - The reduced value or initial value
 */
export const safeReduce = (array, callback, initialValue = 0) => {
  return Array.isArray(array) ? array.reduce(callback, initialValue) : initialValue;
};

/**
 * Safely get a property from an object
 * @param {Object} obj - The object
 * @param {string} path - The property path (e.g., 'user.name')
 * @param {*} defaultValue - The default value if property doesn't exist
 * @returns {*} - The property value or default value
 */
export const safeGet = (obj, path, defaultValue = null) => {
  if (!obj || typeof obj !== 'object') return defaultValue;
  
  const keys = path.split('.');
  let current = obj;
  
  for (const key of keys) {
    if (current === null || current === undefined || !(key in current)) {
      return defaultValue;
    }
    current = current[key];
  }
  
  return current;
};

/**
 * Format currency amount
 * @param {number|string} amount - The amount to format
 * @returns {string} - Formatted currency string
 */
export const formatCurrency = (amount) => {
  const numericAmount = parseCurrency(amount);
  return `₹${numericAmount.toFixed(2)}`;
};
