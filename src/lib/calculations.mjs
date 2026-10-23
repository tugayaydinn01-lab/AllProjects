/** Pure calculation functions; rates are user inputs, not live financial offers. */
export function percentOf(amount, percent) { return amount * percent / 100; }
export function percentageChange(from, to) { if (from === 0) return null; return (to - from) / Math.abs(from) * 100; }
export function vatExclusive(amount, rate) { return { vat: amount * rate / 100, total: amount * (1 + rate / 100) }; }
export function vatInclusive(amount, rate) { const base = amount / (1 + rate / 100); return { base, vat: amount - base }; }
export function monthlyLoanPayment(principal, monthlyRatePercent, months) {
  if (principal <= 0 || months < 1 || !Number.isInteger(months) || monthlyRatePercent < 0) return null;
  const r = monthlyRatePercent / 100;
  return r === 0 ? principal / months : principal * r / (1 - Math.pow(1 + r, -months));
}
export function loanSchedule(principal, monthlyRatePercent, months) {
  const payment = monthlyLoanPayment(principal, monthlyRatePercent, months);
  if (payment === null || !Number.isFinite(payment)) return null;
  const rate = monthlyRatePercent / 100;
  let balance = principal;
  return Array.from({ length: months }, (_, index) => {
    const interest = balance * rate;
    const principalPaid = index === months - 1 ? balance : Math.min(payment - interest, balance);
    balance = Math.max(0, balance - principalPaid);
    return {
      month: index + 1,
      payment: principalPaid + interest,
      principal: principalPaid,
      interest,
      balance,
    };
  });
}
export function depositInterest(principal, annualRatePercent, days, withholdingPercent = 0) {
  if (principal < 0 || annualRatePercent < 0 || days < 0 || withholdingPercent < 0 || withholdingPercent > 100) return null;
  const gross = principal * annualRatePercent / 100 * days / 365;
  const tax = gross * withholdingPercent / 100;
  return { gross, tax, net: gross - tax, maturity: principal + gross - tax };
}
function utcDate(dateString) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateString)) return null;
  const [y,m,d] = dateString.split('-').map(Number);
  const date = new Date(Date.UTC(y,m-1,d));
  return date.getUTCFullYear()===y && date.getUTCMonth()===m-1 && date.getUTCDate()===d ? date : null;
}
export function daysBetween(start, end) {
  const a=utcDate(start), b=utcDate(end);
  return a && b ? Math.round((b.getTime()-a.getTime())/86400000) : null;
}
export function ageOn(birth, onDate) {
  const b=utcDate(birth), o=utcDate(onDate);
  if (!b || !o || b>o) return null;
  let years=o.getUTCFullYear()-b.getUTCFullYear();
  if (o.getUTCMonth()<b.getUTCMonth() || (o.getUTCMonth()===b.getUTCMonth() && o.getUTCDate()<b.getUTCDate())) years--;
  return years;
}
