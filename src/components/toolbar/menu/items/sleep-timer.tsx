import { useTranslation } from '@/contexts/language';
import { IoMoonSharp } from 'react-icons/io5/index';
import { useSleepTimerStore } from '@/stores/sleep-timer';
import { Item } from '../item';
interface SleepTimerProps {
  open: () => void;
}
export function SleepTimer({ open }: SleepTimerProps) {
  const t = useTranslation();
  const active = useSleepTimerStore(state => state.active);
  return (
    <Item
      active={active}
      icon={<IoMoonSharp />}
      label={t('Sleep Timer')}
      shortcut="Shift + Alt + T"
      onClick={open}
    />
  );
}
