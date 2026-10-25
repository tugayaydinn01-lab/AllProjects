import { dailyIndex } from './daily.mjs';

export const sudokuPuzzles = [
  { puzzle:'530070000600195000098000060800060003400803001700020006060000280000419005000080079', solution:'534678912672195348198342567859761423426853791713924856961537284287419635345286179' },
  { puzzle:'000260701680070090190004500820100040004602900050003028009300074040050036703018000', solution:'435269781682571493197834562826195347374682915951743628519326874248957136763418259' },
];

export function getDailySudoku(dateKey) {
  return sudokuPuzzles[dailyIndex(dateKey, sudokuPuzzles.length, 73)];
}

export function isValidSudokuSolution(puzzle, solution) {
  if (!/^\d{81}$/.test(puzzle) || !/^[1-9]{81}$/.test(solution)) return false;
  for (let index=0;index<81;index++) if (puzzle[index] !== '0' && puzzle[index] !== solution[index]) return false;
  const valid = values => new Set(values).size === 9 && values.every(value => value >= '1' && value <= '9');
  for (let row=0;row<9;row++) if (!valid(Array.from({length:9},(_,column)=>solution[row*9+column]))) return false;
  for (let column=0;column<9;column++) if (!valid(Array.from({length:9},(_,row)=>solution[row*9+column]))) return false;
  for (let boxRow=0;boxRow<3;boxRow++) for (let boxColumn=0;boxColumn<3;boxColumn++) {
    const values=[];
    for (let row=0;row<3;row++) for (let column=0;column<3;column++) values.push(solution[(boxRow*3+row)*9+boxColumn*3+column]);
    if (!valid(values)) return false;
  }
  return true;
}
