
function calculateOrder(items) {
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error("An order must contain at least one item.");
  }

  const calculatedItems = items.map((item) => {
    if (!Number.isInteger(item.quantity) || item.quantity <= 0) {
      throw new Error("Quantity must be a positive whole number.");
    }

    if (
      typeof item.unitPrice !== "number" ||
      !Number.isFinite(item.unitPrice) ||
      item.unitPrice < 0
    ) {
      throw new Error("Price must be a valid non-negative number.");
    }

    const lineTotal = Math.round(
      item.quantity * item.unitPrice * 100
    ) / 100;

    return {
      productId: item.productId,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      lineTotal
    };
  });

  const totalAmount = Math.round(
    calculatedItems.reduce(
      (sum, item) => sum + Math.round(item.lineTotal * 100),
      0
    )
  ) / 100;

  return {
    items: calculatedItems,
    totalAmount
  };
}

module.exports = { calculateOrder };
