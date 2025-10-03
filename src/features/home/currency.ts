export type Currency = "EUR" | "USD" | "GBP";

export const rates: Record<Currency, number> = { EUR: 1, USD: 1.08, GBP: 0.85 };

/** cents(EUR) -> cents(target currency) */
export function convertCents(centsEUR: number, target: Currency) {
  const fx = rates[target];

  return Math.round(centsEUR * fx);
}

export function formatMoney(
  cents: number,
  currency: Currency,
  locale = "en-US"
) {
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(
    cents / 100
  );
}
