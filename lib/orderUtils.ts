const CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export function generateOrderId(): string {
  const d = new Date();
  const date = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  const random = Array.from(
    { length: 5 },
    () => CHARS[Math.floor(Math.random() * CHARS.length)],
  ).join("");
  return `VCB-${date}-${random}`;
}

// Strip special characters so the string is safe as bank transfer content.
// e.g. "VCB-20240101-ABCDE" → "VCB20240101ABCDE"
export function toTransferContent(orderId: string): string {
  return orderId.replace(/[^A-Z0-9]/gi, "");
}
