// src/lib/utils.js

/**
 * Function to conditionally join class names together.
 * This is often used to apply multiple CSS classes based on certain conditions.
 * 
 * @param  {...any} classes - Array of class names, where falsy values are ignored.
 * @returns {string} - A string of joined class names.
 */
export function cn(...classes) {
    return classes.filter(Boolean).join(' ');
  }
  
  // You can add more utility functions here as needed
  
  /**
   * Example utility function to capitalize the first letter of a string.
   * 
   * @param {string} str - The string to capitalize.
   * @returns {string} - The capitalized string.
   */
  export function capitalize(str) {
    if (typeof str !== 'string') {
      throw new Error('Expected a string');
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  
  /**
   * Example utility function to format a date to a readable string.
   * 
   * @param {Date} date - The date object to format.
   * @param {Object} options - Formatting options (e.g., { year: 'numeric', month: 'long', day: 'numeric' }).
   * @returns {string} - The formatted date string.
   */
  export function formatDate(date, options = {}) {
    if (!(date instanceof Date)) {
      throw new Error('Expected a Date object');
    }
    return new Intl.DateTimeFormat('en-US', options).format(date);
  }
  