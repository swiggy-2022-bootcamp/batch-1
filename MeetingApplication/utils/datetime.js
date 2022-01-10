/**
 * Utility function to get Date Object from date, starting_time and ending_time
 * @param {string} date_of_meeting - date of meeting MM/DD/YYYY
 * @param {string} start_time - [HH:MM] type
 * @param {string} end_tim - [HH:MM] type
 * @return {Date.object} - Starting time and ending time date objects
 */
const getDateTime = (date_of_meeting, start_time, end_time) => {
  let s = new Date(date_of_meeting);
  s.toLocaleString("en-US", {
    timeZone: "Asia/Kolkata",
  });
  let e = new Date(date_of_meeting);
  e.toLocaleString("en-US", {
    timeZone: "Asia/Kolkata",
  });
  let [s_hours, s_min] = [
    parseInt(start_time.split(":")[0]),
    parseInt(start_time.split(":")[1]),
  ];
  let [e_hours, e_min] = [
    parseInt(end_time.split(":")[0]),
    parseInt(end_time.split(":")[1]),
  ];
  // converting to localtime
  s.setHours(s_hours + 5, s_min + 30, 0);
  e.setHours(e_hours + 5, e_min + 30, 0);
  return { s, e };
};

module.exports = { getDateTime };
