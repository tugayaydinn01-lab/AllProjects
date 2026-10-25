export const sudokuPuzzles: Array<{puzzle:string;solution:string}>;
export function getDailySudoku(dateKey:string): {puzzle:string;solution:string};
export function isValidSudokuSolution(puzzle:string,solution:string): boolean;
