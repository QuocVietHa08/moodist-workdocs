import { useSoundStore } from '@/stores/sound';
import type { CSSProperties } from 'react';

import styles from './range.module.css';

interface RangeProps {
  id: string;
  label: string;
}

export function Range({ id, label }: RangeProps) {
  const setVolume = useSoundStore(state => state.setVolume);
  const volume = useSoundStore(state => state.sounds[id].volume);
  const isSelected = useSoundStore(state => state.sounds[id].isSelected);
  const locked = useSoundStore(state => state.locked);

  return (
    <input
      aria-label={`${label} sound volume`}
      aria-valuetext={`${Math.round(volume * 100)}%`}
      autoComplete="off"
      className={styles.range}
      disabled={!isSelected || locked}
      max={100}
      min={0}
      type="range"
      style={{ '--volume': `${volume * 100}%` } as CSSProperties}
      value={volume * 100}
      onChange={e =>
        !locked && isSelected && setVolume(id, Number(e.target.value) / 100)
      }
    />
  );
}
