import test from 'node:test';
import assert from 'node:assert/strict';
import { calculatorGuides, pageGuides } from '../src/lib/guides.mjs';
import { isValidSudokuSolution, sudokuPuzzles } from '../src/lib/sudoku.mjs';

const calculatorSlugs=['yuzde-hesaplama','kdv-hesaplama','kredi-hesaplama','mevduat-hesaplama','yas-hesaplama','tarih-farki-hesaplama'];
const pageGuideKeys=['doviz','altin','hava','kelime','sudoku','quiz','takvim'];

test('priority tool pages have complete and distinct guides',()=>{
  assert.deepEqual(Object.keys(calculatorGuides).sort(),calculatorSlugs.sort());
  assert.deepEqual(Object.keys(pageGuides).sort(),pageGuideKeys.sort());
  const guides=[...Object.values(calculatorGuides),...Object.values(pageGuides)];
  assert.equal(new Set(guides.map(guide=>guide.summary)).size,guides.length);
  for(const guide of guides){
    assert.ok(guide.heading.length>8);
    assert.ok(guide.steps.length>=3);
    assert.ok(guide.formula.length>20);
    assert.ok(guide.example.length>20);
    assert.ok(guide.cautions.length>=2);
    assert.ok(guide.related.length>=2);
    for(const item of guide.related)assert.match(item.href,/^\/[a-z0-9/-]+$/);
  }
});

test('every daily sudoku matches a valid completed grid',()=>{
  assert.ok(sudokuPuzzles.length>=2);
  for(const item of sudokuPuzzles)assert.equal(isValidSudokuSolution(item.puzzle,item.solution),true);
});
