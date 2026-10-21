import { useTranslation } from '@/contexts/language';
import {
  MdNotes,
  MdOutlineAvTimer,
  MdOutlineTimer,
  MdTaskAlt,
} from 'react-icons/md/index';
import { TbClockUp } from 'react-icons/tb/index';
import { IoMdFlower } from 'react-icons/io/index';
import type { FocusTool } from '@/constants/events';
import { formatPomodoroTime, usePomodoroStore } from '@/stores/pomodoro';
import { Portal } from '@/components/portal';
import styles from './focus-dock.module.css';
const tools = [
  {
    id: 'pomodoro',
    label: 'Focus timer',
    shortLabel: 'Focus',
    Icon: MdOutlineAvTimer,
  },
  {
    id: 'notepad',
    label: 'Notepad',
    shortLabel: 'Notes',
    Icon: MdNotes,
  },
  {
    id: 'todo',
    label: 'To-do list',
    shortLabel: 'Tasks',
    Icon: MdTaskAlt,
  },
  {
    id: 'flowmodoro',
    label: 'Flowmodoro',
    shortLabel: 'Flow',
    Icon: TbClockUp,
  },
  {
    id: 'countdown',
    label: 'Countdown',
    shortLabel: 'Timer',
    Icon: MdOutlineTimer,
  },
  {
    id: 'breathing',
    label: 'Breathing',
    shortLabel: 'Breathe',
    Icon: IoMdFlower,
  },
] as const;
interface FocusDockProps {
  active?: FocusTool;
  onOpen: (tool: FocusTool) => void;
  onClose: () => void;
}
export function FocusDock({ active, onOpen, onClose }: FocusDockProps) {
  const t = useTranslation();
  const running = usePomodoroStore(state => state.running);
  const remaining = usePomodoroStore(state => state.remaining);
  const pause = usePomodoroStore(state => state.pause);
  const start = usePomodoroStore(state => state.start);
  const duration = usePomodoroStore(state => state.durations[state.mode]);
  const hasSession = running || remaining < duration;
  const timerAction = running
    ? t('Pause')
    : remaining === 0
      ? t('Restart')
      : t('Resume');
  return (
    <Portal>
      <aside aria-label={t('Quick tools')} className={styles.dock}>
        {hasSession && (
          <button
            aria-label={t('{action} focus timer', { action: timerAction })}
            className={styles.time}
            onClick={running ? pause : start}
            type="button"
          >
            {formatPomodoroTime(remaining)}
            <span>{t(timerAction)}</span>
          </button>
        )}
        <nav aria-label={t('Focus tools')} className={styles.icons}>
          {tools.map(({ id, label, shortLabel, Icon }) => (
            <button
              aria-label={t(label)}
              aria-expanded={active === id}
              aria-controls={active === id ? 'focus-tool-panel' : undefined}
              aria-pressed={active === id}
              className={styles.icon}
              key={id}
              onClick={() => (active === id ? onClose() : onOpen(id))}
              title={t(label)}
              type="button"
            >
              <Icon aria-hidden="true" />
              <span aria-hidden="true" className={styles.caption}>
                {t(shortLabel)}
              </span>
              {id === 'pomodoro' && running && (
                <span aria-hidden="true" className={styles.dot} />
              )}
            </button>
          ))}
        </nav>
      </aside>
    </Portal>
  );
}
