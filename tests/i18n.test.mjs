import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { test } from 'node:test';
import { defaultLocale, translate, vietnamese } from '../src/lib/i18n.ts';

test('defaults to Vietnamese while preserving the English interface', () => {
  assert.equal(defaultLocale, 'vi');
  assert.equal(translate(defaultLocale, 'Light Rain'), 'Mưa nhẹ');
  assert.equal(translate('en', 'Light Rain'), 'Light Rain');
  assert.equal(
    translate('en', 'Start {minutes} minute countdown', { minutes: 15 }),
    'Start 15 minute countdown',
  );
});

test('interpolates Vietnamese counts without altering supplied user content', () => {
  assert.equal(translate('vi', '{count} sounds', { count: 84 }), '84 âm thanh');
  assert.equal(
    translate('vi', 'Edit task: {task}', { task: 'Rain {count}' }),
    'Sửa công việc: Rain {count}',
  );
  assert.equal(
    translate('vi', 'Untranslated station name'),
    'Untranslated station name',
  );
});

test('translates every ambient sound and category without changing catalog IDs', () => {
  for (const name of readdirSync(
    new URL('../src/data/sounds/', import.meta.url),
  )) {
    if (!name.endsWith('.tsx') || name === 'binaural.tsx') continue;
    const source = readFileSync(
      new URL(`../src/data/sounds/${name}`, import.meta.url),
      'utf8',
    );
    for (const [, key] of source.matchAll(/(?:label|title): '([^']+)'/g)) {
      assert.ok(Object.hasOwn(vietnamese, key), `Missing translation: ${key}`);
    }
  }
});
