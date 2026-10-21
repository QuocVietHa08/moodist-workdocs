import assert from 'node:assert/strict';
import { test } from 'node:test';
import { addConfetti } from '../src/lib/confetti.ts';

test('reduced motion completes the celebration without creating a canvas', () => {
  const previousWindow = globalThis.window;
  globalThis.window = {
    matchMedia: query => {
      assert.equal(query, '(prefers-reduced-motion: reduce)');
      return { matches: true };
    },
  };
  try {
    assert.doesNotThrow(() => addConfetti());
  } finally {
    if (previousWindow === undefined) delete globalThis.window;
    else globalThis.window = previousWindow;
  }
});
