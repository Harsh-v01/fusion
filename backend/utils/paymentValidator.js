
const ALLOWED_PAYMENT_METHODS = [
  "Cash",
  "UPI",
  "Card",
  "Other"
];

const ALLOWED_PAYMENT_STATUSES = [
  "Pending",
  "Paid",
  "Failed",
  "Refunded"
];

function isValidPaymentMethod(method) {
  return ALLOWED_PAYMENT_METHODS.includes(method);
}

function isValidPaymentStatus(status) {
  return ALLOWED_PAYMENT_STATUSES.includes(status);
}

module.exports = {
  ALLOWED_PAYMENT_METHODS,
  ALLOWED_PAYMENT_STATUSES,
  isValidPaymentMethod,
  isValidPaymentStatus
};
