import { useTranslation } from '@/contexts/language';
import { PlayButton } from './play';
import { UnselectButton } from './unselect';
import { SaveButton } from './save';
import { BsSoundwave } from 'react-icons/bs/index';
import { useSoundStore } from '@/stores/sound';
import { useShallow } from 'zustand/react/shallow';
import { sounds } from '@/data/sounds';
import { findStarterMix } from '@/lib/starter-mixes';
import styles from './buttons.module.css';
const soundLabels = Object.fromEntries(
  sounds.categories.flatMap(category =>
    category.sounds.map(sound => [sound.id, sound.label]),
  ),
);
export function Buttons() {
  const t = useTranslation();
  const selected = useSoundStore(
    useShallow(state =>
      Object.keys(state.sounds).filter(id => state.sounds[id].isSelected),
    ),
  );
  const playing = useSoundStore(state => state.isPlaying);
  const mixName = useSoundStore(state => findStarterMix(state.sounds)?.name);
  const count = selected.length;
  const description = selected.map(id => t(soundLabels[id] || id)).join(', ');
  return (
    <div className={styles.buttons} data-playing={count > 0 && playing}>
      <div className={styles.info}>
        <span className={styles.mark}>
          <BsSoundwave aria-hidden="true" />
        </span>
        <div className={styles.copy} role="status">
          <div className={styles.titleRow}>
            <p className={styles.title}>{t(mixName || 'Your sound mix')}</p>
            {count > 0 && (
              <span className={styles.state}>
                {playing ? t('Playing') : t('Paused')}
              </span>
            )}
          </div>
          <p className={styles.status} title={description || undefined}>
            {count === 0 ? t('Choose a mix or a sound to begin') : description}
          </p>
        </div>
      </div>
      <div className={styles.actions}>
        <PlayButton />
        <SaveButton />
        <UnselectButton />
      </div>
    </div>
  );
}
