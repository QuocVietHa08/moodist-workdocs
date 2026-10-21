import assert from 'node:assert/strict';
import { test } from 'node:test';
import { findStarterMix } from '../src/lib/starter-mixes.ts';

test('recognizes a starter mix without counting unselected sounds', () => {
  assert.equal(
    findStarterMix({
      cafe: { isSelected: true, volume: 0.75 },
      'rain-on-window': { isSelected: true, volume: 0.15 },
      waves: { isSelected: false, volume: 0.5 },
    })?.name,
    'Rainy café',
  );
});

test('does not label a changed, incomplete or empty mix as a starter mix', () => {
  assert.equal(findStarterMix({}), undefined);
  assert.equal(
    findStarterMix({ cafe: { isSelected: true, volume: 0.75 } }),
    undefined,
  );
  assert.equal(
    findStarterMix({
      cafe: { isSelected: true, volume: 0.5 },
      'rain-on-window': { isSelected: true, volume: 0.15 },
    }),
    undefined,
  );
});
