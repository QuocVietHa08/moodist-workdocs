import assert from 'node:assert/strict';
import { afterEach, beforeEach, mock, test } from 'node:test';
import { createSessionClock } from '../src/lib/session-clock.ts';

beforeEach(() => mock.timers.enable({ apis: ['Date'], now: 100_000 }));
afterEach(() => mock.timers.reset());

test('countdown catches up after a long delayed tick and completes only once', () => {
  const clock = createSessionClock('down');
  clock.reset(300);
  clock.start();
  mock.timers.tick(245_500);
  assert.deepEqual(clock.tick(), { seconds: 55, completed: false });
  mock.timers.tick(120_000);
  assert.deepEqual(clock.tick(), { seconds: 0, completed: true });
  assert.deepEqual(clock.tick(), { seconds: 0, completed: false });
  assert.deepEqual(clock.pause(), { seconds: 0, completed: false });
});

test('countdown pause preserves partial seconds and excludes paused time', () => {
  const clock = createSessionClock('down');
  clock.reset(60);
  clock.start();
  mock.timers.tick(10_500);
  assert.deepEqual(clock.pause(), { seconds: 50, completed: false });
  mock.timers.tick(120_000);
  assert.deepEqual(clock.tick(), { seconds: 50, completed: false });
  clock.start();
  mock.timers.tick(49_000);
  assert.deepEqual(clock.tick(), { seconds: 1, completed: false });
  mock.timers.tick(500);
  assert.deepEqual(clock.pause(), { seconds: 0, completed: true });
  assert.equal(clock.tick().completed, false);
});

test('stopwatch catches up and preserves elapsed fractions across pause/resume', () => {
  const clock = createSessionClock('up');
  clock.start();
  mock.timers.tick(3_600_500);
  assert.deepEqual(clock.pause(), { seconds: 3600, completed: false });
  mock.timers.tick(600_000);
  clock.start();
  clock.start();
  mock.timers.tick(500);
  assert.deepEqual(clock.tick(), { seconds: 3601, completed: false });
  clock.reset();
  assert.deepEqual(clock.tick(), { seconds: 0, completed: false });
});

test('reset cancels the previous countdown and restarting uses the new duration', () => {
  const clock = createSessionClock('down');
  clock.reset(60);
  clock.start();
  mock.timers.tick(10_000);
  clock.reset(15);
  mock.timers.tick(120_000);
  assert.deepEqual(clock.tick(), { seconds: 15, completed: false });
  clock.start();
  mock.timers.tick(15_000);
  assert.deepEqual(clock.tick(), { seconds: 0, completed: true });
  clock.reset();
  clock.start();
  assert.deepEqual(clock.tick(), { seconds: 0, completed: false });
});

test('switching between focus and break keeps their clocks independent', () => {
  const focus = createSessionClock('up');
  const rest = createSessionClock('down');
  focus.start();
  mock.timers.tick(90_000);
  const elapsed = focus.pause().seconds;
  rest.reset(Math.round(elapsed * 0.2));
  rest.start();
  mock.timers.tick(5_500);
  assert.deepEqual(rest.pause(), { seconds: 13, completed: false });
  focus.start();
  mock.timers.tick(600_000);
  assert.deepEqual(focus.pause(), { seconds: 690, completed: false });
  assert.deepEqual(rest.tick(), { seconds: 13, completed: false });
  rest.start();
  mock.timers.tick(20_000);
  assert.deepEqual(rest.tick(), { seconds: 0, completed: true });
  assert.deepEqual(rest.tick(), { seconds: 0, completed: false });
  assert.deepEqual(focus.tick(), { seconds: 690, completed: false });
});
