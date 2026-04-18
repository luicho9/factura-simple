// Americas currencies missing a narrowSymbol in Intl (fall back to ISO code):
// PEN (Sol), VES (Bolívar), PAB (Balboa), HTG (Gourde),
// AWG (Florín), ANG (Guilder), SVC (Colón salvadoreño)
export function formatCurrency(value: number, currency: string) {
  try {
    return new Intl.NumberFormat("es-HN", {
      style: "currency",
      currency,
      currencyDisplay: "narrowSymbol",
    }).format(value);
  } catch {
    return `${currency} ${value.toFixed(2)}`;
  }
}

export function formatDate(date: Date | null | undefined) {
  if (!date) return "";
  const d = date instanceof Date ? date : new Date(date);
  if (Number.isNaN(d.getTime())) return "";
  return new Intl.DateTimeFormat("es-HN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(d);
}
