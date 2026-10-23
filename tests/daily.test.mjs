import test from 'node:test';
import assert from 'node:assert/strict';
import { dailyIndex, dayNumber, scoreGuess } from '../src/lib/daily.mjs';

test('daily selection is stable and bounded', () => {
  assert.equal(dayNumber('1970-01-01'), 0);
  assert.equal(dailyIndex('2026-10-23', 7), dailyIndex('2026-10-23', 7));
  assert.ok(dailyIndex('2026-10-23', 7) < 7);
  assert.throws(() => dailyIndex('2026-10-23', 0));
});

test('word scoring handles duplicate letters', () => {
  assert.deepEqual(scoreGuess('KALEM', 'KALEM'), ['correct', 'correct', 'correct', 'correct', 'correct']);
  assert.deepEqual(scoreGuess('KALEM', 'MASAL'), ['present', 'correct', 'absent', 'absent', 'present']);
  assert.deepEqual(scoreGuess('KALEM', 'AAAAA'), ['absent', 'correct', 'absent', 'absent', 'absent']);
});
