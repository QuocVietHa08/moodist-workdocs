import { useState, useEffect, useMemo, useCallback } from 'react';
import { FaUndo, FaPlay, FaPause, FaCheck } from 'react-icons/fa/index';
import { IoMdSettings } from 'react-icons/io/index';

import { Modal, ModalTitle } from '@/components/modal';
import { Button } from '../generics/button';
import { Timer } from './timer';
import { Tabs } from './tabs';
import { Setting } from './setting';

import { useLocalStorage } from '@/hooks/use-local-storage';
import { useSoundEffect } from '@/hooks/use-sound-effect';
import { useFlowmodoroStore } from '@/stores/flowmodoro';
import { useSettingsStore } from '@/stores/settings';
import { useCloseListener } from '@/hooks/use-close-listener';
import { createSessionClock } from '@/lib/session-clock';

import styles from './flowmodoro.module.css';

interface FlowmodoroProps {
  onClose: () => void;
  open: () => void;
  show: boolean;
}

export function Flowmodoro({ onClose, open, show }: FlowmodoroProps) {
  const [showSetting, setShowSetting] = useState(false);

  const [selectedTab, setSelectedTab] = useState<'flowmodoro' | 'break'>(
    'flowmodoro',
  );
  const [clocks] = useState(() => ({
    flowmodoro: createSessionClock('up'),
    break: createSessionClock('down'),
  }));

  const running = useFlowmodoroStore(state => state.running);
  const setRunning = useFlowmodoroStore(state => state.setRunning);

  const [focusSeconds, setFocusSeconds] = useState(0);
  const [breakSeconds, setBreakSeconds] = useState(0);
  const timer = selectedTab === 'break' ? breakSeconds : focusSeconds;
  const alarmVolume = useSettingsStore(state => state.alarmVolume);

  const alarm = useSoundEffect('/sounds/alarm.mp3', alarmVolume);

  const defaultBreakPercentage = useMemo(() => ({ break: 20 }), []);

  const [breakPercentage, setBreakPercentage] = useLocalStorage<
    Record<string, number>
  >('moodist-flowmodoro-setting', defaultBreakPercentage);
  const [breakDuration, setBreakDuration] = useState(0);

  const [completions, setCompletions] = useState<Record<string, number>>({
    flowmodoro: 0,
    break: 0,
  });

  const tabs = useMemo(
    () => [
      { id: 'flowmodoro', label: 'Flowmodoro' },
      { id: 'break', label: 'Break' },
    ],
    [],
  );

  useCloseListener(() => setShowSetting(false));

  const updateClock = useCallback(
    (pause = false) => {
      const clock = clocks[selectedTab];
      const snapshot = pause ? clock.pause() : clock.tick();
      if (selectedTab === 'break') setBreakSeconds(snapshot.seconds);
      else setFocusSeconds(snapshot.seconds);
      if (snapshot.completed) {
        alarm.play();
        setRunning(false);
        setCompletions(previous => ({
          ...previous,
          break: previous.break + 1,
        }));
      }
      return snapshot;
    },
    [clocks, selectedTab, setRunning, alarm],
  );

  useEffect(() => {
    if (!running) return;
    clocks[selectedTab].start();
    const update = () => updateClock();
    const interval = setInterval(update, 250);
    document.addEventListener('visibilitychange', update);
    update();

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', update);
    };
  }, [running, selectedTab, clocks, updateClock]);

  const selectTab = (tab: string) => {
    if (tab === selectedTab || (tab !== 'flowmodoro' && tab !== 'break'))
      return;
    updateClock(true);
    setRunning(false);
    setSelectedTab(tab);
  };

  const toggleRunning = () => {
    if (running) {
      updateClock(true);
      setRunning(false);
    } else if (selectedTab !== 'break' || breakSeconds > 0) {
      clocks[selectedTab].start();
      setRunning(true);
    }
  };

  const finishFocus = () => {
    const { seconds } = clocks.flowmodoro.pause();
    if (seconds === 0) return;
    const duration = Math.max(
      1,
      Math.round((seconds * breakPercentage.break) / 100),
    );
    clocks.flowmodoro.reset();
    clocks.break.reset(duration);
    setRunning(false);
    setBreakDuration(duration);
    setBreakSeconds(duration);
    setFocusSeconds(0);
    setCompletions(previous => ({
      ...previous,
      flowmodoro: previous.flowmodoro + 1,
    }));
    setSelectedTab('break');
  };

  const restart = () => {
    setRunning(false);
    if (selectedTab === 'break') {
      clocks.break.reset(breakDuration);
      setBreakSeconds(breakDuration);
    } else {
      clocks.flowmodoro.reset();
      setFocusSeconds(0);
    }
  };

  return (
    <>
      <Modal docked show={show} onClose={onClose}>
        <header className={styles.header}>
          <ModalTitle className={styles.title}>Flowmodoro timer</ModalTitle>

          <div className={styles.button}>
            <Button
              icon={<IoMdSettings />}
              tooltip="Change break percentage"
              onClick={() => {
                onClose();
                setShowSetting(true);
              }}
            />
          </div>
        </header>

        <Tabs selectedTab={selectedTab} tabs={tabs} onSelect={selectTab} />
        <Timer timer={timer} />

        <div className={styles.control}>
          <p className={styles.completed}>
            {completions[selectedTab] || 0} completed
          </p>
          <div className={styles.buttons}>
            <Button
              icon={<FaUndo />}
              smallIcon
              tooltip="Restart"
              onClick={restart}
            />
            <Button
              icon={running ? <FaPause /> : <FaPlay />}
              smallIcon
              tooltip={running ? 'Pause' : 'Start'}
              disabled={selectedTab === 'break' && breakSeconds === 0}
              onClick={toggleRunning}
            />
            {selectedTab === 'flowmodoro' && (
              <Button
                icon={<FaCheck />}
                smallIcon
                tooltip="Finish focus and prepare break"
                disabled={focusSeconds === 0}
                onClick={finishFocus}
              />
            )}
          </div>
        </div>
      </Modal>

      <Setting
        show={showSetting}
        times={breakPercentage}
        onChange={value => {
          setShowSetting(false);
          setBreakPercentage(value);
          open();
        }}
        onClose={() => {
          setShowSetting(false);
          open();
        }}
      />
    </>
  );
}
