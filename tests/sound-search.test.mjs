import assert from 'node:assert/strict';
import { test } from 'node:test';
import { filterSound } from '../src/lib/sound-search.ts';

test('rain finds its category without unrelated fuzzy matches', () => {
  assert.equal(filterSound('light-rain', 'rain', ['Light Rain', 'Rain']), 1);
  assert.equal(filterSound('thunder', 'rain', ['Thunder', 'Rain']), 1);
  assert.equal(filterSound('campfire', 'rain', ['Campfire', 'Nature']), 0);
});

test('search accepts accents, case and multiple words in any order', () => {
  assert.equal(filterSound('cafe', 'CAFÉ', ['Café', 'Places']), 1);
  assert.equal(filterSound('cafe', 'cafe', ['Café', 'Places']), 1);
  assert.equal(
    filterSound('rain-on-window', ' window  rain ', ['Rain on Window', 'Rain']),
    1,
  );
  assert.equal(
    filterSound('rain-on-window', 'window birds', ['Rain on Window', 'Rain']),
    0,
  );
  assert.equal(filterSound('cafe', '', ['Café', 'Places']), 1);
});

test('Vietnamese search accepts missing accents and the letter đ', () => {
  assert.equal(filterSound('heavy-rain', 'mua lon', ['Mưa lớn', 'Mưa']), 1);
  assert.equal(filterSound('crowd', 'dam dong', ['Đám đông', 'Thành phố']), 1);
  assert.equal(filterSound('light-rain', 'MƯA NHẸ', ['Mưa nhẹ', 'Mưa']), 1);
  assert.equal(filterSound('campfire', 'mua', ['Lửa trại', 'Thiên nhiên']), 0);
});
