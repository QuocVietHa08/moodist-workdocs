import { useTranslation } from '@/contexts/language';
import { BiShuffle } from 'react-icons/bi/index';
import { useSoundStore } from '@/stores/sound';
import { Item } from '../item';
export function Shuffle() {
  const t = useTranslation();
  const shuffle = useSoundStore(state => state.shuffle);
  const locked = useSoundStore(state => state.locked);
  return (
    <Item
      disabled={locked}
      icon={<BiShuffle />}
      label={t('Shuffle Sounds')}
      onClick={shuffle}
    />
  );
}
