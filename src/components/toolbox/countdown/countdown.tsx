import { useState, useEffect, useCallback } from 'react';

import {
  Modal,
  ModalActions,
  ModalButton,
  ModalDescription,
  ModalHeader,
  ModalTitle,
} from '@/components/modal';

import { useSoundEffect } from '@/hooks/use-sound-effect';
import { useSettingsStore } from '@/stores/settings';
import { padNumber } from '@/helpers/number';
import { createSessionClock } from '@/lib/session-clock';

import styles from './countdown.module.css';

interface CountdownProps {
  onClose: () => void;
  show: boolean;
}

export function Countdown({ onClose, show }: CountdownProps) {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [initialTime, setInitialTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [clock] = useState(() => createSessionClock('down'));
  const alarmVolume = useSettingsStore(state => state.alarmVolume);

  const alarm = useSoundEffect('/sounds/alarm.mp3', alarmVolume);

  const updateClock = useCallback(
    (pause = false) => {
      const snapshot = pause ? clock.pause() : clock.tick();
      setTimeLeft(snapshot.seconds);
      if (snapshot.completed) {
        alarm.play();
        setIsActive(false);
        setIsFormVisible(true);
      }
      return snapshot;
    },
    [clock, alarm],
  );

  useEffect(() => {
    if (!isActive) return;
    const update = () => updateClock();
    const interval = setInterval(update, 250);
    document.addEventListener('visibilitychange', update);
    update();

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', update);
    };
  }, [isActive, updateClock]);

  const startDuration = useCallback(
    (totalTime: number) => {
      if (!Number.isFinite(totalTime) || totalTime <= 0) return;
      clock.reset(totalTime);
      clock.start();
      setTimeLeft(totalTime);
      setInitialTime(totalTime);
      setIsActive(true);
      setIsFormVisible(false);
    },
    [clock],
  );

  const handleStart = useCallback(() => {
    startDuration((hours || 0) * 3600 + (minutes || 0) * 60 + (seconds || 0));
  }, [hours, minutes, seconds, startDuration]);

  const handleBack = useCallback(() => {
    clock.reset();
    setIsActive(false);
    setIsFormVisible(true);
    setTimeLeft(0);
  }, [clock]);

  const toggleTimer = useCallback(() => {
    if (isActive) {
      updateClock(true);
      setIsActive(false);
    } else if (clock.tick().seconds > 0) {
      clock.start();
      setIsActive(true);
    }
  }, [clock, isActive, updateClock]);

  const formatTime = useCallback((time: number) => {
    const hrs = Math.floor(time / 3600);
    const mins = Math.floor((time % 3600) / 60);
    const secs = time % 60;

    return `${padNumber(hrs)}:${padNumber(mins)}:${padNumber(secs)}`;
  }, []);

  const duration = hours * 3600 + minutes * 60 + seconds;
  const elapsedTime = initialTime - timeLeft;
  const progress = initialTime > 0 ? (elapsedTime / initialTime) * 100 : 0;

  return (
    <Modal docked show={show} onClose={onClose}>
      <ModalHeader>
        <div>
          <ModalTitle>Countdown Timer</ModalTitle>
          <ModalDescription>
            Set a duration and get an alert when time is up.
          </ModalDescription>
        </div>
      </ModalHeader>

      {isFormVisible ? (
        <form
          onSubmit={event => {
            event.preventDefault();
            handleStart();
          }}
        >
          <div
            aria-label="Quick countdown"
            role="group"
            className={styles.quickStart}
          >
            {[5, 15, 30].map(value => (
              <button
                aria-label={`Start ${value} minute countdown`}
                key={value}
                onClick={() => startDuration(value * 60)}
                type="button"
              >
                {value} min
              </button>
            ))}
          </div>
          <div className={styles.fields}>
            <div className={styles.field}>
              <label htmlFor="countdown-hours">Hours</label>
              <input
                id="countdown-hours"
                inputMode="numeric"
                min={0}
                type="number"
                value={hours}
                onChange={event =>
                  setHours(
                    Math.max(0, Number.parseInt(event.target.value, 10) || 0),
                  )
                }
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="countdown-minutes">Minutes</label>
              <input
                id="countdown-minutes"
                inputMode="numeric"
                max={59}
                min={0}
                type="number"
                value={minutes}
                onChange={event =>
                  setMinutes(
                    Math.max(
                      0,
                      Math.min(
                        59,
                        Number.parseInt(event.target.value, 10) || 0,
                      ),
                    ),
                  )
                }
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="countdown-seconds">Seconds</label>
              <input
                id="countdown-seconds"
                inputMode="numeric"
                max={59}
                min={0}
                type="number"
                value={seconds}
                onChange={event =>
                  setSeconds(
                    Math.max(
                      0,
                      Math.min(
                        59,
                        Number.parseInt(event.target.value, 10) || 0,
                      ),
                    ),
                  )
                }
              />
            </div>
          </div>

          <ModalActions>
            <ModalButton
              disabled={duration === 0}
              type="submit"
              variant="primary"
            >
              Start
            </ModalButton>
          </ModalActions>
        </form>
      ) : (
        <div>
          <div className={styles.displayTime}>
            <p className={styles.status}>
              {isActive ? 'Counting down' : 'Paused'}
            </p>
            <span className={styles.time} role="timer">
              {formatTime(timeLeft)}
            </span>
            <div
              aria-label="Countdown progress"
              aria-valuemax={initialTime}
              aria-valuemin={0}
              aria-valuenow={elapsedTime}
              className={styles.progress}
              role="progressbar"
            >
              <div
                className={styles.progressFill}
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className={styles.elapsed}>Elapsed {formatTime(elapsedTime)}</p>
          </div>

          <ModalActions>
            <ModalButton onClick={handleBack}>Change time</ModalButton>

            <ModalButton variant="primary" onClick={toggleTimer}>
              {isActive ? 'Pause' : 'Resume'}
            </ModalButton>
          </ModalActions>
        </div>
      )}
    </Modal>
  );
}
