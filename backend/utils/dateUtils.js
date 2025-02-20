/**
 * Converts a time with timezone offset to a 12-hour format (hh:mm AM/PM).
 * @param {string} datetime - The time string in the format 'HH:mm:ss±HH:MM' (e.g., '20:30:00-08:00').
 * @returns {string} The formatted time in 12-hour format (e.g., '8:30 PM').
 */
 const convertToNormalTime = (datetime) => {
    const date = new Date(`1970-01-01T${datetime}`);
    
    const options = { hour: '2-digit', minute: '2-digit', hour12: true };
    return date.toLocaleTimeString('en-US', options);
};

module.exports = { convertToNormalTime };
