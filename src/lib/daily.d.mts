export function dayNumber(dateKey: string): number;
export function dailyIndex(dateKey: string, length: number, salt?: number): number;
export function scoreGuess(answer: string, guess: string): Array<'correct' | 'present' | 'absent'>;
