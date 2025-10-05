export type Currency = 'EUR' | 'USD' | 'GBP';

export const rates: Record<Currency, number> = { EUR: 1, USD: 1.08, GBP: 0.85 };

export const currencySymbols: Record<Currency, string> = {
  EUR: '€',
  USD: '$',
  GBP: '£',
};

/** cents(EUR) -> cents(target currency) */
export function convertCents(centsEUR: number, target: Currency) {
  const fx = rates[target];
  return Math.round(centsEUR * fx);
}

export function formatMoney(
  cents: number,
  currency: Currency,
  locale = 'en-US'
) {
  const rate = rates[currency];
  const value = (cents * rate) / 100;
  const isZero = value === 0;
  return new Intl.NumberFormat(locale, {
    style: 'decimal',
    minimumFractionDigits: isZero ? 0 : 2,
    maximumFractionDigits: isZero ? 0 : 2,
  }).format(value);
}
