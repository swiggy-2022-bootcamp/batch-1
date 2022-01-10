/**
 * Utility function to get Date Object from date, starting_time and ending_time
 * @param {string} date_of_meeting - date of meeting
 * @param {string} start_time - [HH:MM] type
 * @param {string} end_tim - [HH:MM] type
 * @return {Date.object} - Starting time and ending time date objects
 */
const getDateTime = (date_of_meeting, start_time, end_time) => {
  let s = new Date(date_of_meeting);
  let e = new Date(date_of_meeting);
  let [s_hours, s_min] = start_time.split(":");
  let [e_hours, e_min] = end_time.split(":");
  s.setHours(s_hours, s_min, 0);
  e.setHours(e_hours, e_min, 0);
  return { s, e };
};

module.exports = { getDateTime };
