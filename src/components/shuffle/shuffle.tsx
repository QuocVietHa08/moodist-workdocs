import { useTranslation } from '@/contexts/language';
import { BiShuffle } from 'react-icons/bi/index';
import { Tooltip } from '@/components/tooltip';
import { useSoundStore } from '@/stores/sound';
import styles from './shuffle.module.css';
export function Shuffle() {
  const t = useTranslation();
  const shuffle = useSoundStore(state => state.shuffle);
  return (
    <Tooltip.Provider delayDuration={0}>
      <Tooltip content={t('Shuffle sounds')}>
        <button
          aria-label={t('Shuffle sounds')}
          className={styles.button}
          onClick={shuffle}
        >
          <BiShuffle />
        </button>
      </Tooltip>
    </Tooltip.Provider>
  );
}
