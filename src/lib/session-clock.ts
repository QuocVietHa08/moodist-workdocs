/** A timer's value follows elapsed time, rather than the number of UI updates. */
export function createSessionClock(direction: 'up' | 'down') {
  let milliseconds = 0;
  let startedAt: number | null = null;

  const sample = (pause = false) => {
    const elapsed =
      startedAt === null ? 0 : Math.max(0, Date.now() - startedAt);
    const value = Math.max(
      0,
      milliseconds + (direction === 'up' ? elapsed : -elapsed),
    );
    const completed = direction === 'down' && startedAt !== null && value === 0;

    if (pause || completed) {
      milliseconds = value;
      startedAt = null;
    }

    return {
      seconds:
        direction === 'down'
          ? Math.ceil(value / 1000)
          : Math.floor(value / 1000),
      completed,
    };
  };

  return {
    start() {
      if (startedAt === null && (direction === 'up' || milliseconds > 0)) {
        startedAt = Date.now();
      }
    },
    pause: () => sample(true),
    tick: () => sample(),
    reset(seconds = 0) {
      milliseconds = seconds * 1000;
      startedAt = null;
    },
  };
}
