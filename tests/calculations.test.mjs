import test from 'node:test';import assert from 'node:assert/strict';
import {percentOf,percentageChange,vatExclusive,vatInclusive,monthlyLoanPayment,loanSchedule,depositInterest,daysBetween,ageOn} from '../src/lib/calculations.mjs';
test('percent',()=>{assert.equal(percentOf(1000,20),200);assert.equal(percentageChange(100,120),20);assert.equal(percentageChange(0,120),null)});
test('vat',()=>{assert.equal(vatExclusive(100,20).total,120);assert.ok(Math.abs(vatInclusive(120,20).base-100)<1e-8)});
test('loan',()=>{assert.equal(monthlyLoanPayment(1200,0,12),100);assert.ok(monthlyLoanPayment(100000,2,12)>0);assert.equal(monthlyLoanPayment(0,2,12),null);const schedule=loanSchedule(1200,0,12);assert.equal(schedule?.length,12);assert.equal(schedule?.at(-1)?.balance,0);assert.equal(schedule?.reduce((sum,row)=>sum+row.principal,0),1200)});
test('deposit',()=>{const r=depositInterest(10000,36.5,10,10);assert.ok(r);assert.ok(Math.abs(r.net-90)<1e-8)});
test('dates',()=>{assert.equal(daysBetween('2024-02-28','2024-03-01'),2);assert.equal(ageOn('2000-11-01','2026-10-23'),25);assert.equal(daysBetween('2024-02-30','2024-03-01'),null)});
