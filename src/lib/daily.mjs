const DAY_MS = 86_400_000;

export function dayNumber(dateKey) {
  const parsed = Date.parse(`${dateKey}T00:00:00Z`);
  if (!Number.isFinite(parsed)) throw new Error('Geçersiz gün anahtarı');
  return Math.floor(parsed / DAY_MS);
}

export function dailyIndex(dateKey, length, salt = 0) {
  if (!Number.isInteger(length) || length < 1) throw new Error('Liste boş olamaz');
  return Math.abs(dayNumber(dateKey) + salt) % length;
}

export function scoreGuess(answer, guess) {
  const target = Array.from(answer.toLocaleUpperCase('tr-TR'));
  const input = Array.from(guess.toLocaleUpperCase('tr-TR'));
  const scores = input.map(() => 'absent');
  const remaining = new Map();

  target.forEach((letter, index) => {
    if (input[index] === letter) scores[index] = 'correct';
    else remaining.set(letter, (remaining.get(letter) || 0) + 1);
  });
  input.forEach((letter, index) => {
    if (scores[index] === 'correct') return;
    const count = remaining.get(letter) || 0;
    if (count > 0) {
      scores[index] = 'present';
      remaining.set(letter, count - 1);
    }
  });
  return scores;
}
