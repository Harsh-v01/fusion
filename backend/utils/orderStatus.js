
const ALLOWED_STATUSES = [
  "Pending",
  "Preparing",
  "Ready",
  "Completed",
  "Cancelled"
];

function isValidStatus(status) {
  return ALLOWED_STATUSES.includes(status);
}

module.exports = {
  ALLOWED_STATUSES,
  isValidStatus
};
