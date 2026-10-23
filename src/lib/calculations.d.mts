export function percentOf(amount: number, percent: number): number;
export function percentageChange(from: number, to: number): number | null;
export function vatExclusive(amount: number, rate: number): { vat: number; total: number };
export function vatInclusive(amount: number, rate: number): { base: number; vat: number };
export function monthlyLoanPayment(principal: number, monthlyRatePercent: number, months: number): number | null;
export function loanSchedule(principal: number, monthlyRatePercent: number, months: number): Array<{month:number;payment:number;principal:number;interest:number;balance:number}> | null;
export function depositInterest(principal: number, annualRatePercent: number, days: number, withholdingPercent?: number): {gross:number;tax:number;net:number;maturity:number}|null;
export function daysBetween(start: string, end: string): number | null;
export function ageOn(birth: string, onDate: string): number | null;
